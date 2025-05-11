import { NextRequest, NextResponse } from "next/server";
import { pool } from "../utils/db";
import { verifyJwt } from "../utils/jwt";

// 인증 헤더 상수
const AUTH_HEADER = "authorization";

/**
 * @api training_meditations, training_readings, training_prayers, training_socs CRUD API
 * @description
 *  - POST: 각 리소스 생성
 *  - GET: 각 리소스 전체 조회 (training_id로 필터)
 *  - JWT 인증 필요 (Authorization: Bearer ...)
 *
 * @test
 *  - 인증 없을 때 401 반환
 *  - POST/GET 정상 동작
 *  - 필수값 누락 시 400 반환
 */
export async function POST(request: NextRequest) {
  // 경로에서 리소스 추출 (예: /api/traings?type=meditations)
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  console.log({ type });

  // 인증 체크
  const authHeader = request.headers.get(AUTH_HEADER);
  const token = authHeader?.split(" ")[1];
  if (!token || !verifyJwt(token)) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  const body = await request.json();
  let query = "";
  let params: any[] = [];

  console.log({ body });

  // 매직 문자열 상수화
  const TABLES: { [key: string]: string } = {
    meditation: "training_meditations",
    reading: "training_readings",
    prayer: "training_prayers",
    soc: "training_socs",
  };

  if (!type || !(type in TABLES)) {
    return NextResponse.json(
      { error: "type 파라미터 필요 또는 잘못됨" },
      { status: 400 }
    );
  }

  // JWT에서 userID 추출
  const payload = verifyJwt(token);
  const userId = payload?.id;

  // 각 리소스별 INSERT 쿼리 분기
  switch (type) {
    case "meditation": {
      // 묵상 저장: body.detail에서 값 추출, 컬럼 순서에 맞게 저장
      const d = body.detail;
      query = `INSERT INTO training_meditations (
        date,  title, bible_book_start, bible_chapter_start, bible_verse_start, bible_book_end, bible_chapter_end, bible_verse_end, question1, question2, question3, user_id, isShared
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      params = [
        d.date || body.date,
        d.title,
        d.bible_book_start,
        d.bible_chapter_start,
        d.bible_verse_start,
        d.bible_book_end,
        d.bible_chapter_end,
        d.bible_verse_end,
        d.question1,
        d.question2,
        d.question3,
        userId,
        d.isShared ? 1 : 0,
      ];
      break;
    }
    case "reading": {
      // 성경읽기 저장: body.detail에서 값 추출, 컬럼 순서에 맞게 저장
      const d = body.detail;
      query = `INSERT INTO training_readings (
        date,
        bible_book_start, bible_chapter_start, bible_verse_start,
        bible_book_end, bible_chapter_end, bible_verse_end,
        psalm_chapter_start, psalm_verse_start, psalm_chapter_end, psalm_verse_end,
        proverb_chapter_start, proverb_verse_start, proverb_chapter_end, proverb_verse_end,
        user_id,
        isShared
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      params = [
        d.date || body.date,
        d.bible_book_start,
        d.bible_chapter_start,
        d.bible_verse_start,
        d.bible_book_end,
        d.bible_chapter_end,
        d.bible_verse_end,
        d.psalm_chapter_start,
        d.psalm_verse_start,
        d.psalm_chapter_end,
        d.psalm_verse_end,
        d.proverb_chapter_start,
        d.proverb_verse_start,
        d.proverb_chapter_end,
        d.proverb_verse_end,
        userId,
        d.isShared ? 1 : 0,
      ];
      break;
    }
    case "prayer": {
      const d = body.detail;
      query = `INSERT INTO training_prayers (
        date, user_id, prayer_time, isShared
      ) VALUES (?, ?, ?, ?)`;
      params = [d.date, userId, d.prayer_time, d.isShared ? 1 : 0];
      break;
    }
    case "soc": {
      const d = body.detail;
      query = `INSERT INTO training_socs (
        user_id, date, situation, my_class, my_teacher, my_subject, teaching, decision, isShared
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      params = [
        userId,
        d.date,
        d.situation,
        d.my_class,
        d.my_teacher,
        d.my_subject,
        d.teaching,
        d.decision,
        d.isShared ? 1 : 0,
      ];
      break;
    }
  }

  // DB 저장
  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.query(query, params);
    connection.release();
    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    if (connection) connection.release();
    return NextResponse.json(
      { error: "DB 오류", detail: (error as any).message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // 경로에서 리소스 추출 (예: /api/traings?type=meditations)
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  // 인증 체크
  const authHeader = request.headers.get(AUTH_HEADER);
  const token = authHeader?.split(" ")[1];
  if (!token || !verifyJwt(token)) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  // JWT에서 userId 추출
  const payload = verifyJwt(token);
  const userId = payload?.id;

  // 매직 문자열 상수화
  const TABLES: { [key: string]: string } = {
    meditation: "training_meditations",
    reading: "training_readings",
    prayer: "training_prayers",
    soc: "training_socs",
  };

  if (!type || !(type in TABLES)) {
    return NextResponse.json(
      { error: "type 파라미터 필요 또는 잘못됨" },
      { status: 400 }
    );
  }

  // 각 리소스별 SELECT 쿼리 (userId로 필터)
  const query = `SELECT * FROM ${TABLES[type]} WHERE user_id = ?`;
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(query, [userId]);
    connection.release();
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    if (connection) connection.release();
    return NextResponse.json(
      { error: "DB 오류", detail: (error as any).message },
      { status: 500 }
    );
  }
}
