import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../../utils/db";
import { verifyJwt } from "../../../../utils/jwt";

// 인증 헤더 상수
const AUTH_HEADER = "authorization";

/**
 * 사역보고 댓글 수정 API
 * PATCH /api/reports/board/comments/[id]
 * Frontend Design Guideline: Single Responsibility - 댓글 수정만 담당
 */
export async function PATCH(
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
    const { content } = body;

    // 내용 유효성 검증
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: "댓글 내용은 필수 항목입니다." },
        { status: 400 }
      );
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 댓글 존재 여부 및 작성자 확인
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
    const isAuthor = commentData.author_id === userId;

    // 새로운 권한 체제로 관리자 권한 확인
    const [adminRows] = await connection.query(
      `SELECT EXISTS(
        SELECT 1 FROM user_authorities ua 
        JOIN authorities a ON ua.authority_id = a.id 
        WHERE ua.user_id = ? AND a.name IN ('ADMIN', 'NCMN_STAFF', 'LEADERSHIP', 'BRANCH_DIRECTOR')
      ) AS is_admin`,
      [userId]
    );
    const isAdmin = !!(adminRows as any[])[0].is_admin;

    if (!isAuthor && !isAdmin) {
      await connection.rollback();
      connection.release();
      return NextResponse.json(
        { error: "수정 권한이 없습니다." },
        { status: 403 }
      );
    }

    // 댓글 수정
    await connection.query(
      "UPDATE report_board_comments SET content = ?, updated_at = NOW() WHERE id = ?",
      [content.trim(), id]
    );

    // 수정된 댓글 조회
    const [updatedRows] = await connection.query(
      `SELECT 
        rc.id,
        rc.report_id,
        rc.content,
        rc.parent_id,
        rc.created_at,
        rc.updated_at,
        rc.like_count,
        rc.author_id,
        u.name as author_name,
        univ.name as author_school,
        (SELECT COUNT(*) > 0 
         FROM report_comment_likes rcl 
         WHERE rcl.comment_id = rc.id AND rcl.user_id = ?) as is_liked
      FROM report_board_comments rc
      JOIN users u ON rc.author_id = u.id
      LEFT JOIN Universities univ ON u.universe_id = univ.id
      WHERE rc.id = ?`,
      [userId, id]
    );

    await connection.commit();
    connection.release();

    const comment = (updatedRows as any[])[0];

    return NextResponse.json({
      success: true,
      message: "댓글이 성공적으로 수정되었습니다.",
      data: {
        ...comment,
        is_liked: !!comment.is_liked,
      },
    });
  } catch (error) {
    console.error("사역보고 댓글 수정 오류:", error);
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    return NextResponse.json(
      { error: "댓글 수정에 실패했습니다." },
      { status: 500 }
    );
  }
}

/**
 * 사역보고 댓글 삭제 API
 * DELETE /api/reports/board/comments/[id]
 * Frontend Design Guideline: Single Responsibility - 댓글 삭제만 담당
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

    // 댓글 존재 여부 및 작성자, 부모 댓글 확인
    const [commentRows] = await connection.query(
      "SELECT id, author_id, report_id, parent_id FROM report_board_comments WHERE id = ?",
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
    const isAuthor = commentData.author_id === userId;
    const parentId = commentData.parent_id;

    // 새로운 권한 체제로 관리자 권한 확인
    const [adminRows] = await connection.query(
      `SELECT EXISTS(
        SELECT 1 FROM user_authorities ua 
        JOIN authorities a ON ua.authority_id = a.id 
        WHERE ua.user_id = ? AND a.name IN ('ADMIN', 'NCMN_STAFF', 'LEADERSHIP', 'BRANCH_DIRECTOR')
      ) AS is_admin`,
      [userId]
    );
    const isAdmin = !!(adminRows as any[])[0].is_admin;

    if (!isAuthor && !isAdmin) {
      await connection.rollback();
      connection.release();
      return NextResponse.json(
        { error: "삭제 권한이 없습니다." },
        { status: 403 }
      );
    }

    // 대댓글이 있는지 확인 (최상위 댓글인 경우)
    if (parentId === null) {
      const [repliesRows] = await connection.query(
        "SELECT COUNT(*) AS reply_count FROM report_board_comments WHERE parent_id = ?",
        [id]
      );

      const replyCount = (repliesRows as any[])[0].reply_count;

      // 대댓글이 있는 경우 삭제하지 않고 내용만 변경
      if (replyCount > 0) {
        await connection.query(
          "UPDATE report_board_comments SET content = '삭제된 댓글입니다.', updated_at = NOW() WHERE id = ?",
          [id]
        );

        await connection.commit();
        connection.release();

        return NextResponse.json({
          success: true,
          message: "댓글이 삭제되었습니다 (대댓글 존재로 내용만 변경).",
        });
      }
    }

    // 댓글 좋아요 삭제
    await connection.query(
      "DELETE FROM report_comment_likes WHERE comment_id = ?",
      [id]
    );

    // 댓글 삭제
    await connection.query("DELETE FROM report_board_comments WHERE id = ?", [
      id,
    ]);

    // 사역보고 댓글 수 감소
    await connection.query(
      "UPDATE report_board SET comment_count = GREATEST(comment_count - 1, 0) WHERE id = ?",
      [commentData.report_id]
    );

    await connection.commit();
    connection.release();

    return NextResponse.json({
      success: true,
      message: "댓글이 삭제되었습니다.",
    });
  } catch (error) {
    console.error("사역보고 댓글 삭제 오류:", error);
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    return NextResponse.json(
      { error: "댓글 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
