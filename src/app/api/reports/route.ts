import { NextRequest, NextResponse } from "next/server";
import { pool } from "../utils/db";
import { verifyJwt } from "../utils/jwt";

// 인증 헤더 상수
const AUTH_HEADER = "authorization";

/**
 * 5K 보고서 목록 조회 API
 * GET /api/reports
 * @param request - NextRequest 객체
 * @returns 5K 보고서 목록
 *
 * @description
 * Frontend Design Guideline 적용:
 * - Predictability: 일관된 응답 구조 제공
 * - Single Responsibility: 보고서 목록 조회만 담당
 * - Cohesion: 캠퍼스 필터링 기능 추가
 */
export async function GET(request: NextRequest) {
  // 인증 확인
  const authHeader = request.headers.get(AUTH_HEADER);
  const token = authHeader?.split(" ")[1];
  if (!token || !verifyJwt(token)) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const payload = verifyJwt(token);
  const userId = payload?.id;

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const authorId = searchParams.get("author_id");
    const campusFilter = searchParams.get("campus_filter"); // 캠퍼스 필터링 추가

    // Frontend Design Guideline: Readability - 페이징 변수명 명확화
    const offset = (page - 1) * limit;

    const connection = await pool.getConnection();

    // 검색 조건 구성
    let whereClause = "WHERE 1=1";
    const queryParams: any[] = [];

    if (search) {
      whereClause += " AND (r.content LIKE ? OR r.location LIKE ?)";
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (authorId) {
      whereClause += " AND r.author_id = ?";
      queryParams.push(authorId);
    }

    // Frontend Design Guideline: Cohesion - 캠퍼스 필터링 조건 추가
    if (campusFilter) {
      whereClause += " AND univ.name = ?";
      queryParams.push(campusFilter);
    }

    // 총 개수 조회
    const [countRows] = await connection.query(
      `SELECT COUNT(*) as total FROM 5k_reports r 
       JOIN users u ON r.author_id = u.id
       LEFT JOIN Universities univ ON u.universe_id = univ.id
       ${whereClause}`,
      queryParams
    );
    const total = (countRows as any[])[0].total;

    // 보고서 목록 조회
    const [reportRows] = await connection.query(
      `SELECT 
        r.id,
        r.date,
        r.start_time,
        r.end_time,
        r.location,
        r.participants,
        r.content,
        r.created_at,
        r.updated_at,
        u.id AS author_id,
        u.name AS author_name,
        univ.name AS author_school,
        (SELECT COUNT(*) FROM 5k_report_images WHERE report_id = r.id) AS image_count
      FROM 5k_reports r
      JOIN users u ON r.author_id = u.id
      LEFT JOIN Universities univ ON u.universe_id = univ.id
      ${whereClause}
      ORDER BY r.created_at DESC
      LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    connection.release();

    // Frontend Design Guideline: Predictability - 일관된 응답 구조
    return NextResponse.json({
      success: true,
      data: reportRows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("5K 보고서 목록 조회 오류:", error);
    return NextResponse.json(
      { error: "5K 보고서 목록 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}

/**
 * 5K 보고서 생성 API
 * POST /api/reports
 * @param request - 요청 객체 (보고서 정보, 이미지 포함)
 * @returns 생성된 보고서 정보
 *
 * @description
 * Frontend Design Guideline 적용:
 * - Single Responsibility: 보고서 생성만 담당
 * - Error Handling: 입력 검증 및 트랜잭션 처리
 * - Predictability: 일관된 응답 형식
 */
export async function POST(request: NextRequest) {
  // 인증 확인
  const authHeader = request.headers.get(AUTH_HEADER);
  const token = authHeader?.split(" ")[1];
  if (!token || !verifyJwt(token)) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const payload = verifyJwt(token);
  const userId = payload?.id;

  try {
    // JSON 파싱 (Flutter에서 Firebase Storage URLs 전송)
    const body = await request.json();
    const {
      date,
      start_time,
      end_time,
      location,
      participants,
      content,
      image_urls,
    } = body;

    // Frontend Design Guideline: Readability - 검증 조건을 명명된 변수로 분리
    const isRequiredFieldsMissing =
      !date ||
      !start_time ||
      !end_time ||
      !location ||
      participants === undefined ||
      !content;

    if (isRequiredFieldsMissing) {
      return NextResponse.json(
        { error: "필수 항목이 누락되었습니다." },
        { status: 400 }
      );
    }

    // 참여간사 수 유효성 검증
    const isParticipantsValid =
      Number.isInteger(participants) && participants >= 0;
    if (!isParticipantsValid) {
      return NextResponse.json(
        { error: "참여간사 수는 0 이상의 정수여야 합니다." },
        { status: 400 }
      );
    }

    // 이미지 URLs (Firebase Storage에 이미 업로드된 상태)
    const imageUrls = image_urls || [];

    let connection;
    try {
      connection = await pool.getConnection();
      await connection.beginTransaction();

      // 5K 보고서 생성
      const [result] = await connection.query(
        `INSERT INTO 5k_reports (date, start_time, end_time, location, participants, content, author_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [date, start_time, end_time, location, participants, content, userId]
      );

      const reportId = (result as any).insertId;

      // 이미지 URLs 저장 (Firebase Storage에 이미 업로드된 상태)
      if (imageUrls.length > 0) {
        for (const imageUrl of imageUrls) {
          await connection.query(
            "INSERT INTO 5k_report_images (report_id, image_url) VALUES (?, ?)",
            [reportId, imageUrl]
          );
        }
      }

      // 생성된 보고서 조회
      const [reportRows] = await connection.query(
        `SELECT 
          r.id,
          r.date,
          r.start_time,
          r.end_time,
          r.location,
          r.participants,
          r.content,
          r.created_at,
          r.updated_at,
          u.id AS author_id,
          u.name AS author_name,
          univ.name AS author_school
        FROM 5k_reports r
        JOIN users u ON r.author_id = u.id
        LEFT JOIN Universities univ ON u.universe_id = univ.id
        WHERE r.id = ?`,
        [reportId]
      );

      // 이미지 조회
      const [imageRows] = await connection.query(
        "SELECT image_url FROM 5k_report_images WHERE report_id = ?",
        [reportId]
      );

      await connection.commit();
      connection.release();

      // Frontend Design Guideline: Cohesion - 관련 데이터를 함께 구성
      const report = {
        ...(reportRows as any[])[0],
        image_urls: (imageRows as any[]).map((img) => img.image_url),
      };

      return NextResponse.json(
        {
          success: true,
          report,
          message: "5K 보고서가 성공적으로 생성되었습니다.",
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("5K 보고서 생성 DB 오류:", dbError);
      if (connection) {
        await connection.rollback();
        connection.release();
      }
      return NextResponse.json(
        { error: "5K 보고서 생성에 실패했습니다." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("5K 보고서 생성 오류:", error);
    return NextResponse.json(
      { error: "요청 처리 중 오류가 발생했습니다." },
      { status: 400 }
    );
  }
}
