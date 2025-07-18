import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../utils/db";
import { verifyJwt } from "../../utils/jwt";

// 인증 헤더 상수
const AUTH_HEADER = "authorization";

/**
 * 5K 보고서 상세 조회 API
 * GET /api/reports/[id]
 * @param request - NextRequest 객체
 * @param context - 라우트 매개변수를 포함하는 컨텍스트 객체
 * @returns 5K 보고서 상세 정보
 *
 * @description
 * Frontend Design Guideline 적용:
 * - Single Responsibility: 특정 보고서 상세 조회만 담당
 * - Predictability: 일관된 응답 구조 제공
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: "유효하지 않은 ID입니다." },
        { status: 400 }
      );
    }

    // 인증 확인 (선택적 - 조회는 인증된 사용자만 가능)
    const authHeader = request.headers.get(AUTH_HEADER);
    const token = authHeader?.split(" ")[1];
    if (!token || !verifyJwt(token)) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const connection = await pool.getConnection();

    // 5K 보고서 상세 조회
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
      [id]
    );

    if ((reportRows as any[]).length === 0) {
      connection.release();
      return NextResponse.json(
        { error: "존재하지 않는 5K 보고서입니다." },
        { status: 404 }
      );
    }

    // 이미지 조회
    const [imageRows] = await connection.query(
      "SELECT image_url FROM 5k_report_images WHERE report_id = ?",
      [id]
    );

    // Frontend Design Guideline: Cohesion - 관련 데이터를 함께 구성
    const report = {
      ...(reportRows as any[])[0],
      image_urls: (imageRows as any[]).map((img) => img.image_url),
    };

    connection.release();

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error("5K 보고서 상세 조회 오류:", error);
    return NextResponse.json(
      { error: "5K 보고서 상세 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}

/**
 * 5K 보고서 수정 API
 * PUT /api/reports/[id]
 * @param request - 요청 객체 (보고서 정보, 이미지 포함)
 * @param context - 라우트 매개변수를 포함하는 컨텍스트 객체
 * @returns 수정된 보고서 정보
 *
 * @description
 * Frontend Design Guideline 적용:
 * - Single Responsibility: 보고서 수정만 담당
 * - Error Handling: 권한 검증 및 트랜잭션 처리
 * - Predictability: 일관된 응답 형식
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // 인증 확인
  const authHeader = request.headers.get(AUTH_HEADER);
  const token = authHeader?.split(" ")[1];
  if (!token || !verifyJwt(token)) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const payload = verifyJwt(token);
  const userId = payload?.id;
  const { id } = await context.params;

  if (!id || isNaN(parseInt(id))) {
    return NextResponse.json(
      { error: "유효하지 않은 ID입니다." },
      { status: 400 }
    );
  }

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

      // 5K 보고서 작성자 확인
      const [authorRows] = await connection.query(
        "SELECT author_id FROM 5k_reports WHERE id = ?",
        [id]
      );

      if ((authorRows as any[]).length === 0) {
        await connection.rollback();
        connection.release();
        return NextResponse.json(
          { error: "존재하지 않는 5K 보고서입니다." },
          { status: 404 }
        );
      }

      const authorId = (authorRows as any[])[0].author_id;

      // Frontend Design Guideline: Single Responsibility - 권한 검증 로직 분리
      const isAuthor = authorId === userId;
      // TODO: 추후 관리자 권한 체크 로직 추가 가능
      // const isAdmin = userAuthority <= 4;

      if (!isAuthor) {
        await connection.rollback();
        connection.release();
        return NextResponse.json(
          { error: "수정 권한이 없습니다." },
          { status: 403 }
        );
      }

      // 5K 보고서 수정
      await connection.query(
        `UPDATE 5k_reports 
         SET date = ?, start_time = ?, end_time = ?, location = ?, participants = ?, content = ?, updated_at = NOW() 
         WHERE id = ?`,
        [date, start_time, end_time, location, participants, content, id]
      );

      // 기존 이미지 모두 삭제 후 새로운 이미지 URLs로 교체
      await connection.query(
        "DELETE FROM 5k_report_images WHERE report_id = ?",
        [id]
      );

      // 새로운 이미지 URLs 저장 (Firebase Storage에 이미 업로드된 상태)
      if (imageUrls.length > 0) {
        for (const imageUrl of imageUrls) {
          await connection.query(
            "INSERT INTO 5k_report_images (report_id, image_url) VALUES (?, ?)",
            [id, imageUrl]
          );
        }
      }

      // 수정된 보고서 조회
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
        [id]
      );

      // 이미지 조회
      const [imageRows] = await connection.query(
        "SELECT image_url FROM 5k_report_images WHERE report_id = ?",
        [id]
      );

      await connection.commit();
      connection.release();

      // Frontend Design Guideline: Cohesion - 관련 데이터를 함께 구성
      const report = {
        ...(reportRows as any[])[0],
        image_urls: (imageRows as any[]).map((img) => img.image_url),
      };

      return NextResponse.json({
        success: true,
        report,
        message: "5K 보고서가 성공적으로 수정되었습니다.",
      });
    } catch (dbError) {
      console.error("5K 보고서 수정 DB 오류:", dbError);
      if (connection) {
        await connection.rollback();
        connection.release();
      }
      return NextResponse.json(
        { error: "5K 보고서 수정에 실패했습니다." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("5K 보고서 수정 오류:", error);
    return NextResponse.json(
      { error: "요청 처리 중 오류가 발생했습니다." },
      { status: 400 }
    );
  }
}

/**
 * 5K 보고서 삭제 API
 * DELETE /api/reports/[id]
 * @param request - NextRequest 객체
 * @param context - 라우트 매개변수를 포함하는 컨텍스트 객체
 * @returns 성공 여부
 *
 * @description
 * Frontend Design Guideline 적용:
 * - Single Responsibility: 보고서 삭제만 담당
 * - Error Handling: 권한 검증 및 트랜잭션 처리
 * - Predictability: 외래키 제약을 고려한 순서대로 삭제
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // 인증 확인
  const authHeader = request.headers.get(AUTH_HEADER);
  const token = authHeader?.split(" ")[1];
  if (!token || !verifyJwt(token)) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const payload = verifyJwt(token);
  const userId = payload?.id;
  const { id } = await context.params;

  if (!id || isNaN(parseInt(id))) {
    return NextResponse.json(
      { error: "유효하지 않은 ID입니다." },
      { status: 400 }
    );
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 5K 보고서 작성자 확인
    const [authorRows] = await connection.query(
      "SELECT author_id FROM 5k_reports WHERE id = ?",
      [id]
    );

    if ((authorRows as any[]).length === 0) {
      await connection.rollback();
      connection.release();
      return NextResponse.json(
        { error: "존재하지 않는 5K 보고서입니다." },
        { status: 404 }
      );
    }

    const authorId = (authorRows as any[])[0].author_id;

    // Frontend Design Guideline: Single Responsibility - 권한 검증 로직 분리
    const isAuthor = authorId === userId;
    // TODO: 추후 관리자 권한 체크 로직 추가 가능
    // const isAdmin = userAuthority <= 4;

    if (!isAuthor) {
      await connection.rollback();
      connection.release();
      return NextResponse.json(
        { error: "삭제 권한이 없습니다." },
        { status: 403 }
      );
    }

    // Frontend Design Guideline: Predictability - 외래키 제약을 고려한 순서대로 삭제
    // 연관 데이터 삭제 (이미지 먼저 삭제)
    await connection.query("DELETE FROM 5k_report_images WHERE report_id = ?", [
      id,
    ]);

    // 5K 보고서 삭제
    await connection.query("DELETE FROM 5k_reports WHERE id = ?", [id]);

    await connection.commit();
    connection.release();

    return NextResponse.json({
      success: true,
      message: "5K 보고서가 삭제되었습니다.",
    });
  } catch (error) {
    console.error("5K 보고서 삭제 오류:", error);
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    return NextResponse.json(
      { error: "5K 보고서 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
