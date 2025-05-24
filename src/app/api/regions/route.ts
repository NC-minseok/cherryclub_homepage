import { NextRequest, NextResponse } from "next/server";
import { pool } from "../utils/db";

/**
 * 모든 지역 목록을 가져오는 API
 * @returns 사용 가능한 지역 목록
 */
export async function GET() {
  try {
    const connection = await pool.getConnection();

    // 지역 그룹 테이블에서 고유한 지역 목록 가져오기
    const [regions] = await connection.query(
      `SELECT DISTINCT region FROM region_groups ORDER BY region`
    );

    connection.release();

    return NextResponse.json({
      success: true,
      regions,
    });
  } catch (error) {
    console.error("지역 데이터 조회 오류:", error);
    return NextResponse.json({ error: "지역 목록 조회 실패" }, { status: 500 });
  }
}

/**
 * 특정 지역의 그룹 목록을 가져오는 API
 * @param request 요청 객체 (지역 정보를 쿼리 파라미터로 받음)
 * @returns 해당 지역의 그룹 목록
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { region } = data;

    if (!region) {
      return NextResponse.json({ error: "지역이 필요합니다" }, { status: 400 });
    }

    const connection = await pool.getConnection();

    // 특정 지역에 속한 그룹 목록 가져오기
    const [groups] = await connection.query(
      `SELECT id, region, group_number FROM region_groups WHERE region = ? ORDER BY group_number`,
      [region]
    );

    connection.release();

    return NextResponse.json({
      success: true,
      groups,
    });
  } catch (error) {
    console.error("그룹 데이터 조회 오류:", error);
    return NextResponse.json({ error: "그룹 목록 조회 실패" }, { status: 500 });
  }
}
