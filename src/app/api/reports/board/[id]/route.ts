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
