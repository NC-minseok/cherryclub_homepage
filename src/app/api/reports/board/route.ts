import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../utils/db";
import { verifyJwt } from "../../utils/jwt";

// 인증 헤더 상수
const AUTH_HEADER = "authorization";

/**
 * 안전한 JSON 파싱 함수
 * Frontend Design Guideline: Error Handling - 안전한 JSON 처리
 */
function safeJsonParse(jsonString: any): any[] {
  // null, undefined, 빈 값 체크
  if (!jsonString) {
    return [];
  }

  // 문자열이 아닌 경우 문자열로 변환
  let jsonStr: string;
  if (typeof jsonString === "string") {
    jsonStr = jsonString;
  } else if (Buffer.isBuffer(jsonString)) {
    jsonStr = jsonString.toString();
  } else if (typeof jsonString === "object") {
    // 이미 객체인 경우 그대로 반환 (배열인지 확인)
    return Array.isArray(jsonString) ? jsonString : [];
  } else {
    jsonStr = String(jsonString);
  }

  // 빈 문자열 체크
  if (jsonStr.trim() === "") {
    return [];
  }

  try {
    const parsed = JSON.parse(jsonStr);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(
      "JSON 파싱 오류:",
      error,
      "원본 데이터:",
      jsonString,
      "타입:",
      typeof jsonString
    );
    return [];
  }
}

/**
 * 게시판용 사역보고 목록 조회 API
 * GET /api/reports/board
 * Frontend Design Guideline: Predictability - 일관된 응답 구조 제공
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get(AUTH_HEADER);
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { error: "인증 토큰이 필요합니다." },
      { status: 401 }
    );
  }

  const payload = verifyJwt(token);
  if (!payload) {
    return NextResponse.json(
      { error: "인증토큰이 만료되었습니다." },
      { status: 401 }
    );
  }

  const userId = payload.id;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const search = searchParams.get("search");

  let connection;
  try {
    connection = await pool.getConnection();

    // 검색 조건 설정
    let whereClause = "";
    let queryParams: any[] = [];

    if (search) {
      whereClause = `WHERE (rb.title LIKE ? OR rb.content LIKE ? OR rb.location LIKE ?)`;
      queryParams = [`%${search}%`, `%${search}%`, `%${search}%`];
    }

    // 전체 개수 조회
    const [countRows] = await connection.query(
      `SELECT COUNT(*) as total 
       FROM report_board rb 
       ${whereClause}`,
      queryParams
    );

    const totalCount = (countRows as any[])[0].total;

    // 페이지네이션 적용하여 사역보고 목록 조회
    const offset = (page - 1) * pageSize;
    const [reportRows] = await connection.query(
      `SELECT 
        rb.id,
        rb.title,
        rb.content,
        rb.image_urls,
        rb.author_id,
        rb.author_name,
        rb.author_school,
        rb.created_at,
        rb.updated_at,
        rb.view_count,
        rb.like_count,
        rb.comment_count,
        rb.original_report_id,
        rb.report_date,
        rb.location,
        rb.participants,
        rb.time_range,
        -- 현재 사용자가 좋아요를 눌렀는지 확인
        (SELECT COUNT(*) > 0 
         FROM report_board_likes rbl 
         WHERE rbl.report_id = rb.id AND rbl.user_id = ?) as is_liked
      FROM report_board rb
      ${whereClause}
      ORDER BY rb.created_at DESC
      LIMIT ? OFFSET ?`,
      [...queryParams, userId, pageSize, offset]
    );

    connection.release();

    // Frontend Design Guideline: Predictability - 일관된 응답 구조
    const reports = (reportRows as any[]).map((report) => ({
      id: report.id,
      title: report.title,
      content: report.content,
      imageUrls: safeJsonParse(report.image_urls),
      authorId: report.author_id,
      authorName: report.author_name,
      authorSchool: report.author_school,
      createdAt: report.created_at,
      updatedAt: report.updated_at,
      viewCount: report.view_count,
      likeCount: report.like_count,
      commentCount: report.comment_count,
      isLiked: !!report.is_liked,
      originalReportId: report.original_report_id,
      reportDate: report.report_date,
      location: report.location,
      participants: report.participants,
      timeRange: report.time_range,
    }));

    return NextResponse.json({
      success: true,
      data: reports,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    });
  } catch (error) {
    console.error("사역보고 목록 조회 오류:", error);
    if (connection) connection.release();
    return NextResponse.json(
      { error: "사역보고 목록 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}

/**
 * 5K 보고서를 게시판용 사역보고로 생성 API
 * POST /api/reports/board
 * Frontend Design Guideline: Single Responsibility - 게시판 보고서 생성만 담당
 */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get(AUTH_HEADER);
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { error: "인증 토큰이 필요합니다." },
      { status: 401 }
    );
  }

  const payload = verifyJwt(token);
  if (!payload) {
    return NextResponse.json(
      { error: "인증토큰이 만료되었습니다." },
      { status: 401 }
    );
  }

  const userId = payload.id;

  let connection;
  try {
    const body = await request.json();
    const {
      originalReportId,
      title,
      content,
      imageUrls,
      reportDate,
      location,
      participants,
      timeRange,
    } = body;

    // 필수 필드 검증
    if (!originalReportId || !title || !content || !reportDate || !location) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    connection = await pool.getConnection();

    // 사용자 정보 조회
    const [userRows] = await connection.query(
      `SELECT u.name, univ.name as school_name 
       FROM users u 
       LEFT JOIN Universities univ ON u.universe_id = univ.id 
       WHERE u.id = ?`,
      [userId]
    );

    if ((userRows as any[]).length === 0) {
      connection.release();
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const user = (userRows as any[])[0];

    // 중복 생성 방지 - 이미 해당 5K 보고서로 게시판 보고서가 생성되었는지 확인
    const [existingRows] = await connection.query(
      "SELECT id FROM report_board WHERE original_report_id = ?",
      [originalReportId]
    );

    if ((existingRows as any[]).length > 0) {
      connection.release();
      return NextResponse.json(
        { error: "이미 해당 5K 보고서로 게시판 보고서가 생성되었습니다." },
        { status: 400 }
      );
    }

    // 게시판용 사역보고 생성
    const [result] = await connection.query(
      `INSERT INTO report_board (
        title, content, image_urls, author_id, author_name, author_school,
        created_at, view_count, like_count, comment_count,
        original_report_id, report_date, location, participants, time_range
      ) VALUES (?, ?, ?, ?, ?, ?, NOW(), 0, 0, 0, ?, ?, ?, ?, ?)`,
      [
        title,
        content,
        imageUrls ? JSON.stringify(imageUrls) : null,
        userId,
        user.name,
        user.school_name,
        originalReportId,
        reportDate,
        location,
        participants,
        timeRange,
      ]
    );

    const reportId = (result as any).insertId;

    // 생성된 보고서 조회
    const [newReportRows] = await connection.query(
      `SELECT 
        rb.*,
        (SELECT COUNT(*) > 0 
         FROM report_board_likes rbl 
         WHERE rbl.report_id = rb.id AND rbl.user_id = ?) as is_liked
      FROM report_board rb
      WHERE rb.id = ?`,
      [userId, reportId]
    );

    connection.release();

    const newReport = (newReportRows as any[])[0];

    return NextResponse.json({
      success: true,
      message: "게시판용 사역보고가 성공적으로 생성되었습니다.",
      data: {
        id: newReport.id,
        title: newReport.title,
        content: newReport.content,
        imageUrls: safeJsonParse(newReport.image_urls),
        authorId: newReport.author_id,
        authorName: newReport.author_name,
        authorSchool: newReport.author_school,
        createdAt: newReport.created_at,
        updatedAt: newReport.updated_at,
        viewCount: newReport.view_count,
        likeCount: newReport.like_count,
        commentCount: newReport.comment_count,
        isLiked: !!newReport.is_liked,
        originalReportId: newReport.original_report_id,
        reportDate: newReport.report_date,
        location: newReport.location,
        participants: newReport.participants,
        timeRange: newReport.time_range,
      },
    });
  } catch (error) {
    console.error("게시판용 사역보고 생성 오류:", error);
    if (connection) connection.release();
    return NextResponse.json(
      { error: "게시판용 사역보고 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}
