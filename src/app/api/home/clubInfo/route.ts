import { NextResponse } from "next/server";
import { pool } from "../../utils/db";

export async function GET() {
  try {
    const connection = await pool.getConnection();

    // 대학교 데이터와 지역별 인원수 데이터를 함께 가져옴
    const [universitiesRows] = await connection.query(
      `SELECT 
  univ.id,
  univ.name AS title,
  univ.is_cherry_club,
  univ.ministry_status,
  univ.image_url,
  univ.latitude,
  univ.longitude,
  COUNT(u.id) AS member_count,
  MAX(CASE WHEN u.isCampusLeader = 1 THEN u.name ELSE NULL END) AS leader_name
FROM Universities univ
LEFT JOIN users u ON u.university = univ.name
GROUP BY 
  univ.id,
  univ.name,
  univ.is_cherry_club,
  univ.ministry_status,
  univ.image_url,
  univ.latitude,
  univ.longitude
HAVING member_count != 0;`
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
      id: number;
      title: string;
      is_cherry_club: number;
      ministry_status: string;
      image_url: string;
      latitude: number;
      longitude: number;
      member_count: number;
      leader_name: string | null;
    }>;

    const members = membersRows as Array<{
      region: string;
      totalCount: number;
    }>;

    // 클라이언트에 필요한 데이터 구조로 응답
    return NextResponse.json({
      universities: universities.map((uni) => ({
        id: uni.id,
        title: uni.title,
        is_cherry_club: uni.is_cherry_club,
        ministry_status: uni.ministry_status,
        image_url: uni.image_url,
        latitude: uni.latitude,
        longitude: uni.longitude,
        member_count: uni.member_count,
        leader_name: uni.leader_name,
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
