/**
 * 비밀번호 재설정 API
 *
 * @description
 * 전화번호와 새 비밀번호를 받아 해당 유저의 비밀번호를 변경합니다.
 *
 * @param {Request} request - JSON body: { phone: string, pw: string }
 * @returns {Object} { success: true } 또는 { error: string }
 * @example
 * fetch('/api/auth/reset-password', {
 *   method: 'POST',
 *   body: JSON.stringify({ phone: '010-1234-5678', pw: 'newpassword' })
 * })
 */
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { pool } from "../../utils/db";

// 비밀번호 해싱 라운드 상수화
const BCRYPT_SALT_ROUNDS = 10;

/**
 * 전화번호에서 숫자만 추출하는 함수
 * @param {string} p
 * @returns {string}
 */
function normalizePhone(p: string): string {
  return p.replace(/[^0-9]/g, "");
}

export async function POST(request: Request) {
  let connection;
  try {
    const { phone, password } = await request.json();

    console.log(phone, password);

    // 입력값 검증
    const isInvalidInput = !phone || !password;
    if (isInvalidInput) {
      return NextResponse.json(
        { error: "전화번호와 새 비밀번호를 모두 입력해주세요." },
        { status: 400 }
      );
    }

    connection = await pool.getConnection();
    const inputPhone = normalizePhone(phone);

    // DB에서 모든 유저의 phone을 가져와서 normalize 후 비교
    const [users] = await connection.query("SELECT id, phone FROM users");
    const user = (users as any[]).find(
      (u) => normalizePhone(u.phone) === inputPhone
    );

    const isUserNotFound = !user;
    if (isUserNotFound) {
      connection.release();
      return NextResponse.json(
        { error: "등록되지 않은 전화번호입니다." },
        { status: 404 }
      );
    }

    // 비밀번호 해싱
    const hashedPw = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    // 비밀번호 업데이트
    await connection.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedPw,
      user.id,
    ]);
    connection.release();
    return NextResponse.json({ success: true });
  } catch (error) {
    if (connection) connection.release();
    console.error("비밀번호 재설정 오류:", error);
    return NextResponse.json(
      { error: "서버 내부 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
