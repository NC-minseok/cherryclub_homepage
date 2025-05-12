import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../utils/db";

/**
 * 이메일 인증번호 검증 API
 * POST /api/auth/verify-email-code
 * @param {NextRequest} req
 * @returns {Promise<NextResponse>}
 * @example
 *   fetch('/api/auth/verify-email-code', { method: 'POST', body: JSON.stringify({ email, code }) })
 */
export async function POST(req: NextRequest) {
  let connection;
  try {
    const { email, code } = await req.json();
    if (!email || !code) {
      return NextResponse.json(
        { ok: false, reason: "이메일과 인증번호가 필요합니다." },
        { status: 400 }
      );
    }
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM email_verification_codes WHERE email = ? AND code = ?",
      [email, code]
    );
    const record = (rows as any[])[0];
    if (!record) {
      connection.release();
      return NextResponse.json(
        { ok: false, reason: "인증번호가 존재하지 않거나 일치하지 않습니다." },
        { status: 400 }
      );
    }
    if (new Date() > record.expires_at) {
      await connection.query(
        "DELETE FROM email_verification_codes WHERE id = ?",
        [record.id]
      );
      connection.release();
      return NextResponse.json(
        { ok: false, reason: "인증번호가 만료되었습니다." },
        { status: 400 }
      );
    }
    // 인증 성공 시 삭제
    await connection.query(
      "DELETE FROM email_verification_codes WHERE id = ?",
      [record.id]
    );
    connection.release();
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (connection) connection.release();
    return NextResponse.json(
      { ok: false, reason: error.message || "서버 오류" },
      { status: 500 }
    );
  }
}
