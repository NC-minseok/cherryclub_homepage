import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../../utils/db";
import { verifyJwt } from "../../../../utils/jwt";

// 인증 헤더 상수
const AUTH_HEADER = "authorization";

/**
 * 사역보고서 좋아요 토글 API
 * POST /api/reports/board/[id]/like
 * Frontend Design Guideline: Single Responsibility - 좋아요 토글만 담당
 */
export async function POST(
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

    // 현재 좋아요 상태 확인
    const [likeRows] = await connection.query(
      "SELECT COUNT(*) as count FROM report_board_likes WHERE report_id = ? AND user_id = ?",
      [id, userId]
    );

    const isCurrentlyLiked = (likeRows as any[])[0].count > 0;
    let isLiked = false;

    if (isCurrentlyLiked) {
      // 좋아요 취소
      await connection.query(
        "DELETE FROM report_board_likes WHERE report_id = ? AND user_id = ?",
        [id, userId]
      );

      // 좋아요 수 감소
      await connection.query(
        "UPDATE report_board SET like_count = like_count - 1 WHERE id = ?",
        [id]
      );

      isLiked = false;
    } else {
      // 좋아요 추가
      await connection.query(
        "INSERT INTO report_board_likes (report_id, user_id, created_at) VALUES (?, ?, NOW())",
        [id, userId]
      );

      // 좋아요 수 증가
      await connection.query(
        "UPDATE report_board SET like_count = like_count + 1 WHERE id = ?",
        [id]
      );

      isLiked = true;
    }

    connection.release();

    return NextResponse.json({
      success: true,
      isLiked: isLiked,
    });
  } catch (error) {
    console.error("사역보고서 좋아요 토글 오류:", error);
    if (connection) connection.release();
    return NextResponse.json(
      { error: "좋아요 처리에 실패했습니다." },
      { status: 500 }
    );
  }
}
