import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../../../utils/db";
import { verifyJwt } from "../../../../../utils/jwt";

// 인증 헤더 상수
const AUTH_HEADER = "authorization";

/**
 * 사역보고 댓글 목록 조회 API
 * GET /api/reports/board/[id]/comments
 * Frontend Design Guideline: Single Responsibility - 댓글 조회만 담당
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

    // 사역보고 존재 여부 확인
    const [reportRows] = await connection.query(
      "SELECT id FROM report_board WHERE id = ?",
      [id]
    );

    if ((reportRows as any[]).length === 0) {
      connection.release();
      return NextResponse.json(
        { error: "존재하지 않는 사역보고입니다." },
        { status: 404 }
      );
    }

    // 댓글 목록 조회 (최상위 댓글만)
    const [commentRows] = await connection.query(
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
        -- 현재 사용자가 좋아요를 눌렀는지 확인
        (SELECT COUNT(*) > 0 
         FROM report_comment_likes rcl 
         WHERE rcl.comment_id = rc.id AND rcl.user_id = ?) as is_liked
      FROM report_board_comments rc
      JOIN users u ON rc.author_id = u.id
      LEFT JOIN Universities univ ON u.universe_id = univ.id
      WHERE rc.report_id = ? AND rc.parent_id IS NULL
      ORDER BY rc.created_at ASC`,
      [userId, id]
    );

    // 각 댓글의 대댓글 조회
    const comments = [];
    for (const comment of commentRows as any[]) {
      const [replyRows] = await connection.query(
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
          -- 현재 사용자가 좋아요를 눌렀는지 확인
          (SELECT COUNT(*) > 0 
           FROM report_comment_likes rcl 
           WHERE rcl.comment_id = rc.id AND rcl.user_id = ?) as is_liked
        FROM report_board_comments rc
        JOIN users u ON rc.author_id = u.id
        LEFT JOIN Universities univ ON u.universe_id = univ.id
        WHERE rc.parent_id = ?
        ORDER BY rc.created_at ASC`,
        [userId, comment.id]
      );

      comments.push({
        ...comment,
        is_liked: !!comment.is_liked,
        replies: (replyRows as any[]).map((reply) => ({
          ...reply,
          is_liked: !!reply.is_liked,
        })),
      });
    }

    connection.release();

    return NextResponse.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error("사역보고 댓글 조회 오류:", error);
    if (connection) connection.release();
    return NextResponse.json(
      { error: "댓글 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}

/**
 * 사역보고 댓글 생성 API
 * POST /api/reports/board/[id]/comments
 * Frontend Design Guideline: Single Responsibility - 댓글 생성만 담당
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
    const body = await request.json();
    const { content, parentId } = body;

    // 내용 유효성 검증
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: "댓글 내용은 필수 항목입니다." },
        { status: 400 }
      );
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 사역보고 존재 여부 및 작성자 확인
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

    const reportData = (reportRows as any[])[0];

    // 부모 댓글 존재 여부 확인 (대댓글인 경우)
    if (parentId) {
      const [parentRows] = await connection.query(
        "SELECT id FROM report_board_comments WHERE id = ? AND report_id = ?",
        [parentId, id]
      );

      if ((parentRows as any[]).length === 0) {
        await connection.rollback();
        connection.release();
        return NextResponse.json(
          { error: "존재하지 않는 부모 댓글입니다." },
          { status: 404 }
        );
      }
    }

    // 댓글 생성
    const [result] = await connection.query(
      `INSERT INTO report_board_comments (report_id, author_id, content, parent_id, created_at, like_count) 
       VALUES (?, ?, ?, ?, NOW(), 0)`,
      [id, userId, content.trim(), parentId || null]
    );

    const commentId = (result as any).insertId;

    // 사역보고 댓글 수 증가
    await connection.query(
      "UPDATE report_board SET comment_count = comment_count + 1 WHERE id = ?",
      [id]
    );

    // 생성된 댓글 조회
    const [newCommentRows] = await connection.query(
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
        -- 현재 사용자가 좋아요를 눌렀는지 확인
        (SELECT COUNT(*) > 0 
         FROM report_comment_likes rcl 
         WHERE rcl.comment_id = rc.id AND rcl.user_id = ?) as is_liked
      FROM report_board_comments rc
      JOIN users u ON rc.author_id = u.id
      LEFT JOIN Universities univ ON u.universe_id = univ.id
      WHERE rc.id = ?`,
      [userId, commentId]
    );

    // 댓글 알림 생성 (자기 자신에게는 알림 보내지 않음)
    try {
      if (reportData.author_id !== userId) {
        await connection.query(
          `INSERT INTO notifications (user_id, title, message, type, related_id, created_at, is_read) 
           VALUES (?, ?, ?, ?, ?, NOW(), 0)`,
          [
            reportData.author_id,
            "사역보고 댓글",
            "회원님의 사역보고에 댓글이 달렸습니다.",
            "report_comment",
            id,
          ]
        );
      }
    } catch (notificationError) {
      console.error("사역보고 댓글 알림 생성 실패:", notificationError);
      // 알림 생성 실패해도 핵심 기능에는 영향 없음
    }

    await connection.commit();
    connection.release();

    const newComment = (newCommentRows as any[])[0];

    return NextResponse.json({
      success: true,
      message: "댓글이 성공적으로 생성되었습니다.",
      data: {
        ...newComment,
        is_liked: !!newComment.is_liked,
      },
    });
  } catch (error) {
    console.error("사역보고 댓글 생성 오류:", error);
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    return NextResponse.json(
      { error: "댓글 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}
