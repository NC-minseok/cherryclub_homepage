import { NextResponse } from "next/server";
import { pool } from "../../utils/db";

export async function GET() {
  try {
    const connection = await pool.getConnection();

    // 대학교 데이터와 지역별 인원수 데이터를 함께 가져옴
    const [universitiesRows] = await connection.query(
      `SELECT DISTINCT 
      region, 
      university 
      FROM users
      WHERE region != '0' AND region != '졸업'`
    );

    const [membersRows] = await connection.query(
      `SELECT 
      region,
      count(*) as totalCount 
      FROM users
      WHERE region != '0'
      GROUP BY region;`
    );

    connection.release();

    // 타입 캐스팅
    const universities = universitiesRows as Array<{
      region: string;
      university: string;
    }>;

    const members = membersRows as Array<{
      region: string;
      totalCount: number;
    }>;

    // 클라이언트에 필요한 데이터 구조로 응답
    return NextResponse.json({
      universities: universities.map((uni) => ({
        region: uni.region,
        university: uni.university,
      })),
      memberCounts: members.map((member) => ({
        region: member.region,
        totalCount: member.totalCount,
      })),
    });
  } catch (error) {
    console.error("DB 검색 오류:", error);
    return NextResponse.json(
      { error: "지역 데이터 검색 실패" },
      { status: 500 }
    );
  }
}
