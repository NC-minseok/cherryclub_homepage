import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { pool } from "../../utils/db";
import { signJwt, generateRefreshToken } from "../../utils/jwt";

/**
 * 로그인 API
 * 전화번호(하이픈 유무 상관없음)와 비밀번호로 로그인합니다.
 * @param request - { phone: string, password: string } JSON body
 * @returns { success: true, user: { ... }, token: string, refreshToken: string } 또는 { error: string }
 * @example
 * fetch('/api/auth/login', {
 *   method: 'POST',
 *   body: JSON.stringify({ phone: '01000000000', password: 'pw1234' })
 * })
 *   .then(res => res.json())
 *   .then(data => {
 *     if (data.success) {
 *       localStorage.setItem('token', data.token);
 *       localStorage.setItem('refreshToken', data.refreshToken);
 *     }
 *   });
 */

export async function POST(request: Request) {
  try {
    const connection = await pool.getConnection();
    const data = await request.json();
    const { phone, password } = data;

    if (!phone || !password) {
      return NextResponse.json(
        { error: "전화번호와 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    // 입력값에서 숫자만 추출 (010-0000-0000, 01000000000 모두 지원)
    const normalizePhone = (p: string) => p.replace(/[^0-9]/g, "");
    const inputPhone = normalizePhone(phone);

    // DB에서 모든 유저의 phone을 가져와서 normalize 후 비교 (최적화 필요시 쿼리에서 처리 가능)
    const [users] = await connection.query("SELECT * FROM users");
    const user = (users as any[]).find(
      (u) => normalizePhone(u.phone) === inputPhone
    );

    if (!user) {
      connection.release();
      return NextResponse.json(
        { error: "등록되지 않은 전화번호입니다." },
        { status: 401 }
      );
    }

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      connection.release();
      return NextResponse.json(
        { error: "비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    // 로그인 성공 (user 정보에서 비밀번호 등 민감 정보 제외)
    const { password: _, ...userInfo } = user;
    // JWT 토큰 발급 (id, role/authority 등 주요 정보 포함)
    const token = signJwt({ id: userInfo.id, role: userInfo.authority });
    // 리프레시 토큰 발급 및 DB 저장
    const refreshToken = generateRefreshToken();
    await connection.query("UPDATE users SET refresh_token = ? WHERE id = ?", [
      refreshToken,
      userInfo.id,
    ]);
    connection.release();
    return NextResponse.json({
      success: true,
      user: userInfo,
      token,
      refreshToken,
    });
  } catch (error) {
    console.error("로그인 오류:", error);
    return NextResponse.json(
      { error: "서버 내부 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
