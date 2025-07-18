import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../../../utils/db";
import { verifyJwt } from "../../../../../utils/jwt";

// 인증 헤더 상수
const AUTH_HEADER = "authorization";

/**
 * 사역보고 댓글 좋아요 토글 API
 * POST /api/reports/board/comments/[id]/like
 * Frontend Design Guideline: Single Responsibility - 댓글 좋아요 토글만 담당
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
    await connection.beginTransaction();

    // 댓글 존재 여부 및 작성자, 사역보고 ID 확인
    const [commentRows] = await connection.query(
      "SELECT id, author_id, report_id FROM report_board_comments WHERE id = ?",
      [id]
    );

    if ((commentRows as any[]).length === 0) {
      await connection.rollback();
      connection.release();
      return NextResponse.json(
        { error: "존재하지 않는 댓글입니다." },
        { status: 404 }
      );
    }

    const commentData = (commentRows as any[])[0];

    // 좋아요 상태 확인
    const [likeRows] = await connection.query(
      "SELECT id FROM report_comment_likes WHERE comment_id = ? AND user_id = ?",
      [id, userId]
    );

    const isLiked = (likeRows as any[]).length > 0;

    if (isLiked) {
      // 좋아요 취소
      await connection.query(
        "DELETE FROM report_comment_likes WHERE comment_id = ? AND user_id = ?",
        [id, userId]
      );

      // 좋아요 수 감소
      await connection.query(
        "UPDATE report_board_comments SET like_count = GREATEST(like_count - 1, 0) WHERE id = ?",
        [id]
      );
    } else {
      // 좋아요 추가
      await connection.query(
        "INSERT INTO report_comment_likes (comment_id, user_id, created_at) VALUES (?, ?, NOW())",
        [id, userId]
      );

      // 좋아요 수 증가
      await connection.query(
        "UPDATE report_board_comments SET like_count = like_count + 1 WHERE id = ?",
        [id]
      );

      // 좋아요 알림 생성 (자기 자신에게는 알림 보내지 않음)
      try {
        if (commentData.author_id !== userId) {
          await connection.query(
            `INSERT INTO notifications (user_id, title, message, type, related_id, created_at, is_read) 
             VALUES (?, ?, ?, ?, ?, NOW(), 0)`,
            [
              commentData.author_id,
              "사역보고 댓글 좋아요",
              "회원님의 사역보고 댓글에 좋아요를 눌렀습니다.",
              "report_comment_like",
              commentData.report_id,
            ]
          );
        }
      } catch (notificationError) {
        console.error(
          "사역보고 댓글 좋아요 알림 생성 실패:",
          notificationError
        );
        // 알림 생성 실패해도 핵심 기능에는 영향 없음
      }
    }

    // 최종 좋아요 수 조회
    const [updateRows] = await connection.query(
      "SELECT like_count FROM report_board_comments WHERE id = ?",
      [id]
    );

    await connection.commit();
    connection.release();

    return NextResponse.json({
      success: true,
      liked: !isLiked,
      like_count: (updateRows as any[])[0].like_count,
    });
  } catch (error) {
    console.error("사역보고 댓글 좋아요 토글 오류:", error);
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    return NextResponse.json(
      { error: "댓글 좋아요 처리에 실패했습니다." },
      { status: 500 }
    );
  }
}
