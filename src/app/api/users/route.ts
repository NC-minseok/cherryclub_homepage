import { NextResponse } from "next/server";
import { pool } from "../utils/db";
import { verifyJwt } from "../utils/jwt";
import { log } from "console";

/**
 * @function GET
 * @description users 테이블에서 password를 제외한 모든 유저 정보를 반환합니다. (관리자 인증 필요)
 * @param {Request} request - 인증 토큰 포함 요청
 * @returns {Object} { users: Array<UserInfo> }
 * @example
 * fetch('/api/users', { headers: { authorization: 'Bearer ...' } })
 *   .then(res => res.json())
 *   .then(data => console.log(data.users));
 */
export async function GET(request: Request) {
  const AUTH_HEADER = "authorization";
  try {
    // 1. JWT 인증
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
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    const connection = await pool.getConnection();
    // password 컬럼을 제외한 모든 컬럼 조회
    const [usersRows] = await connection.query(
      `SELECT id, name, gender, authority, phone, birthday, region, university, major, student_id, grade, semester, enrollment_status, vision_camp_batch, ministry_status, is_cherry_club_member, group_number, created_at, isCampusLeader FROM users WHERE region != '0'`
    );
    connection.release();

    // usersRows를 명확한 타입으로 캐스팅
    const users = usersRows as Array<{
      id: number;
      name: string;
      gender: string;
      authority: number;
      phone: string;
      birthday: string;
      region: string;
      university: string;
      major: string;
      student_id: string;
      grade: string;
      semester: string;
      enrollment_status: string;
      vision_camp_batch: string;
      ministry_status: string;
      is_cherry_club_member: number;
      group_number: number;
      created_at: string;
      isCampusLeader: number;
    }>;

    // users 배열로 응답
    return NextResponse.json({ users });
  } catch (error) {
    // DB 오류 처리
    console.error("DB 검색 오류:", error);
    return NextResponse.json(
      { error: "유저 데이터 검색 실패" },
      { status: 500 }
    );
  }
}

/**
 * @function PATCH
 * @description 여러 명의 유저 권한/캠퍼스 리더 정보를 한 번에 수정합니다.
 * @param {Object} req - { updates: Array<{ id: number, authority?: number, isCampusLeader?: number }> }
 * @returns {Object} { results: Array<{ id: number, success: boolean, reason?: string }> }
 * @example
 * fetch('/api/users', {
 *   method: 'PATCH',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     updates: [
 *       { id: 1, authority: 1, isCampusLeader: 0 },
 *       { id: 2, authority: 0, isCampusLeader: 1 }
 *     ]
 *   })
 * })
 *   .then(res => res.json())
 *   .then(data => console.log(data.results));
 */
export async function PATCH(request: Request) {
  const UPDATE_FIELDS = ["authority", "isCampusLeader"];
  const AUTH_HEADER = "authorization";
  let connection;
  try {
    // 1. JWT 인증
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
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    // 2. 요청 파싱 및 유효성 검사
    const { updates } = await request.json();
    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json(
        { error: "업데이트할 유저 정보가 없습니다." },
        { status: 400 }
      );
    }
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const results: Array<{ id: number; success: boolean; reason?: string }> =
      [];

    for (const update of updates) {
      const { id, ...fields } = update;
      if (!id || Object.keys(fields).length === 0) {
        results.push({
          id,
          success: false,
          reason: "id 또는 수정할 필드가 없습니다.",
        });
        continue;
      }
      // 허용된 필드만 업데이트
      const setClauses = Object.entries(fields)
        .filter(([key]) => UPDATE_FIELDS.includes(key))
        .map(([key, value]) => `${key} = ?`);
      const values = Object.entries(fields)
        .filter(([key]) => UPDATE_FIELDS.includes(key))
        .map(([, value]) => value);
      if (setClauses.length === 0) {
        results.push({
          id,
          success: false,
          reason: "수정 가능한 필드가 없습니다.",
        });
        continue;
      }
      try {
        await connection.query(
          `UPDATE users SET ${setClauses.join(", ")} WHERE id = ?`,
          [...values, id]
        );
        results.push({ id, success: true });
      } catch (err) {
        results.push({ id, success: false, reason: (err as Error).message });
      }
    }
    await connection.commit();
    connection.release();
    return NextResponse.json({ results });
  } catch (error) {
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    console.error("유저 정보 수정 오류:", error);
    return NextResponse.json({ error: "유저 정보 수정 실패" }, { status: 500 });
  }
}
