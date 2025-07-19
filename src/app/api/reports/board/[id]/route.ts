import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../utils/db";
import { verifyJwt } from "../../../utils/jwt";

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
 * 게시판용 사역보고 상세 조회 API
 * GET /api/reports/board/[id]
 * Frontend Design Guideline: Single Responsibility - 사역보고 상세 조회만 담당
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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

    // 사역보고 상세 조회
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
      WHERE rb.id = ?`,
      [userId, id]
    );

    if ((reportRows as any[]).length === 0) {
      connection.release();
      return NextResponse.json(
        { error: "사역보고를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const report = (reportRows as any[])[0];

    // 조회수 증가
    await connection.query(
      "UPDATE report_board SET view_count = view_count + 1 WHERE id = ?",
      [id]
    );

    connection.release();

    // Frontend Design Guideline: Predictability - 일관된 응답 구조
    return NextResponse.json({
      success: true,
      data: {
        id: report.id,
        title: report.title,
        content: report.content,
        imageUrls: safeJsonParse(report.image_urls),
        authorId: report.author_id,
        authorName: report.author_name,
        authorSchool: report.author_school,
        createdAt: report.created_at,
        updatedAt: report.updated_at,
        viewCount: report.view_count + 1, // 증가된 조회수 반영
        likeCount: report.like_count,
        commentCount: report.comment_count,
        isLiked: !!report.is_liked,
        originalReportId: report.original_report_id,
        reportDate: report.report_date,
        location: report.location,
        participants: report.participants,
        timeRange: report.time_range,
      },
    });
  } catch (error) {
    console.error("사역보고 상세 조회 오류:", error);
    if (connection) connection.release();
    return NextResponse.json(
      { error: "사역보고 상세 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}

/**
 * 게시판용 사역보고 수정 API
 * PUT /api/reports/board/[id]
 * Frontend Design Guideline: Single Responsibility - 사역보고 수정만 담당
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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
  const { id } = await context.params;

  if (!id || isNaN(parseInt(id))) {
    return NextResponse.json(
      { error: "유효하지 않은 ID입니다." },
      { status: 400 }
    );
  }

  let connection;
  try {
    const body = await request.json();
    const {
      title,
      content,
      imageUrls,
      reportDate,
      location,
      participants,
      timeRange,
    } = body;

    // 필수 필드 검증
    if (!title || !content || !reportDate || !location) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    connection = await pool.getConnection();

    // 사역보고 존재 여부 및 권한 확인
    const [reportRows] = await connection.query(
      "SELECT id, author_id FROM report_board WHERE id = ?",
      [id]
    );

    if ((reportRows as any[]).length === 0) {
      connection.release();
      return NextResponse.json(
        { error: "존재하지 않는 사역보고입니다." },
        { status: 404 }
      );
    }

    const report = (reportRows as any[])[0];

    // 작성자 본인만 수정 가능 (추후 권한 체크 로직 추가 가능)
    if (report.author_id !== userId) {
      connection.release();
      return NextResponse.json(
        { error: "수정 권한이 없습니다." },
        { status: 403 }
      );
    }

    // 사역보고 수정
    await connection.query(
      `UPDATE report_board SET 
        title = ?, 
        content = ?, 
        image_urls = ?, 
        report_date = ?, 
        location = ?, 
        participants = ?, 
        time_range = ?,
        updated_at = NOW()
      WHERE id = ?`,
      [
        title,
        content,
        imageUrls ? JSON.stringify(imageUrls) : null,
        reportDate,
        location,
        participants,
        timeRange,
        id,
      ]
    );

    // 수정된 보고서 조회
    const [updatedReportRows] = await connection.query(
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
      WHERE rb.id = ?`,
      [userId, id]
    );

    connection.release();

    const updatedReport = (updatedReportRows as any[])[0];

    return NextResponse.json({
      success: true,
      message: "게시판용 사역보고가 성공적으로 수정되었습니다.",
      data: {
        id: updatedReport.id,
        title: updatedReport.title,
        content: updatedReport.content,
        imageUrls: safeJsonParse(updatedReport.image_urls),
        authorId: updatedReport.author_id,
        authorName: updatedReport.author_name,
        authorSchool: updatedReport.author_school,
        createdAt: updatedReport.created_at,
        updatedAt: updatedReport.updated_at,
        viewCount: updatedReport.view_count,
        likeCount: updatedReport.like_count,
        commentCount: updatedReport.comment_count,
        isLiked: !!updatedReport.is_liked,
        originalReportId: updatedReport.original_report_id,
        reportDate: updatedReport.report_date,
        location: updatedReport.location,
        participants: updatedReport.participants,
        timeRange: updatedReport.time_range,
      },
    });
  } catch (error) {
    console.error("게시판용 사역보고 수정 오류:", error);
    if (connection) connection.release();
    return NextResponse.json(
      { error: "사역보고 수정에 실패했습니다." },
      { status: 500 }
    );
  }
}

/**
 * 게시판용 사역보고 삭제 API
 * DELETE /api/reports/board/[id]
 * Frontend Design Guideline: Single Responsibility - 사역보고 삭제만 담당
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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

    // 사역보고 존재 여부 및 권한 확인
    const [reportRows] = await connection.query(
      "SELECT id, author_id FROM report_board WHERE id = ?",
      [id]
    );

    if ((reportRows as any[]).length === 0) {
      await connection.rollback();
      connection.release();
      return NextResponse.json(
        { error: "존재하지 않는 사역보고입니다." },
        { status: 404 }
      );
    }

    const report = (reportRows as any[])[0];

    // 작성자 본인만 삭제 가능 (추후 권한 체크 로직 추가 가능)
    if (report.author_id !== userId) {
      await connection.rollback();
      connection.release();
      return NextResponse.json(
        { error: "삭제 권한이 없습니다." },
        { status: 403 }
      );
    }

    // 관련 데이터 삭제 (Foreign Key Cascade로 처리되지만 명시적으로 삭제)
    // 1. 댓글 좋아요 삭제
    await connection.query(
      `DELETE rcl FROM report_comment_likes rcl 
       JOIN report_board_comments rbc ON rcl.comment_id = rbc.id 
       WHERE rbc.report_id = ?`,
      [id]
    );

    // 2. 댓글 삭제
    await connection.query(
      "DELETE FROM report_board_comments WHERE report_id = ?",
      [id]
    );

    // 3. 좋아요 삭제
    await connection.query(
      "DELETE FROM report_board_likes WHERE report_id = ?",
      [id]
    );

    // 4. 사역보고 삭제
    await connection.query("DELETE FROM report_board WHERE id = ?", [id]);

    await connection.commit();
    connection.release();

    return NextResponse.json({
      success: true,
      message: "게시판용 사역보고가 성공적으로 삭제되었습니다.",
    });
  } catch (error) {
    console.error("게시판용 사역보고 삭제 오류:", error);
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    return NextResponse.json(
      { error: "사역보고 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
