import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../utils/db";

export async function GET() {
  try {
    const connection = await pool.getConnection();

    // 대학교 정보 및 멤버 수, 리더명 조회
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
      LEFT JOIN users u ON u.universe_id = univ.id
      GROUP BY 
        univ.id,
        univ.name,
        univ.is_cherry_club,
        univ.ministry_status,
        univ.image_url,
        univ.latitude,
        univ.longitude
      HAVING member_count != 0`
    );

    // 지역별 멤버 수 조회
    const [membersRows] = await connection.query(
      `SELECT 
        rg.region AS region,
        COUNT(*) AS totalCount
      FROM users u
      JOIN region_groups rg ON u.region_group_id = rg.id
      GROUP BY rg.region`
    );

    connection.release();

    // 응답 타입 캐스팅
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

    return NextResponse.json({
      universities,
      memberCounts: members,
    });
  } catch (error) {
    console.error("DB 검색 오류:", error);
    return NextResponse.json(
      { error: "지역 데이터 검색 실패" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, is_cherry_club, ministry_status } = await request.json();

    // 필수 파라미터 검증
    if (!id) {
      return NextResponse.json(
        { error: "대학교 ID가 필요합니다" },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();

    // 대학교 상태 업데이트
    const [result] = await connection.query(
      `UPDATE Universities 
       SET is_cherry_club = ?, ministry_status = ? 
       WHERE id = ?`,
      [is_cherry_club, ministry_status, id]
    );

    connection.release();

    // 쿼리 결과 확인
    const updateResult = result as any;
    if (updateResult.affectedRows === 0) {
      return NextResponse.json(
        { error: "해당 ID의 대학교를 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("대학교 상태 업데이트 오류:", error);
    return NextResponse.json(
      { error: "대학교 상태 업데이트에 실패했습니다" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    // 필수 파라미터 검증
    if (!userId) {
      return NextResponse.json(
        { error: "사용자 ID가 필요합니다" },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();

    // 해당 사용자 정보 조회
    const [userRows] = await connection.query(
      `SELECT * FROM users WHERE id = ?`,
      [userId]
    );

    // 사용자 존재 여부 확인
    const userInfo = (userRows as any[])[0];
    if (!userInfo) {
      connection.release();
      return NextResponse.json(
        { error: "해당 ID의 사용자를 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    // 같은 대학교(universe_id)를 가진 사용자들 조회
    const [sameUniversityUsers] = await connection.query(
      `SELECT id, name FROM users WHERE universe_id = ? AND id != ?`,
      [userInfo.universe_id, userId]
    );

    connection.release();

    return NextResponse.json((sameUniversityUsers as any[])[0]);
  } catch (error) {
    console.error("사용자 및 대학교 정보 조회 오류:", error);
    return NextResponse.json(
      { error: "사용자 및 대학교 정보 조회에 실패했습니다" },
      { status: 500 }
    );
  }
}
