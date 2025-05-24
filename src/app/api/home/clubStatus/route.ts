import { NextResponse } from "next/server";
import { pool } from "../../utils/db";

export async function GET() {
  try {
    const connection = await pool.getConnection();

    // 대학교 데이터와 지역별 인원수 데이터를 함께 가져옴 (region_groups 조인)
    const [universitiesRows] = await connection.query(
      `SELECT DISTINCT 
      rg.region, 
      univ.name AS university,
      univ.latitude,
      univ.longitude
      FROM users u
      LEFT JOIN region_groups rg ON u.region_group_id = rg.id
      LEFT JOIN Universities univ ON u.universe_id = univ.id
      WHERE u.region_group_id IS NOT NULL AND rg.region IS NOT NULL`
    );

    const [membersRows] = await connection.query(
      `SELECT 
      rg.region AS region,
      count(*) as totalCount 
      FROM users u
      LEFT JOIN region_groups rg ON u.region_group_id = rg.id
      WHERE u.region_group_id IS NOT NULL AND rg.region IS NOT NULL
      GROUP BY rg.region;`
    );

    connection.release();

    // 타입 캐스팅
    const universities = universitiesRows as Array<{
      region: string;
      university: string;
      latitude: number;
      longitude: number;
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
        latitude: uni.latitude,
        longitude: uni.longitude,
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
