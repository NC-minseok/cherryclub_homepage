import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../utils/db";
import { verifyJwt } from "../../utils/jwt";

/**
 * @api 트레이닝 리소스 수정 API (PUT)
 * @description
 *  - 각 type별로 id와 body.detail을 받아 해당 row를 업데이트
 *  - JWT 인증 필요
 *
 * @test
 *  - 인증 없을 때 401 반환
 *  - 정상 수정 동작
 *  - 필수값 누락 시 400 반환
 *
 * @note Next.js 14+에서는 context(params)는 Promise이므로 await로 받아야 함
 */
export async function PUT(request: NextRequest) {
  // URL에서 id 추출
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // 또는 정규식 등으로 추출

  console.log({ id });
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  // 인증 체크
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token || !verifyJwt(token)) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  if (!type || !id) {
    return NextResponse.json(
      { error: "type, id 파라미터 필요" },
      { status: 400 }
    );
  }

  const TABLES: { [key: string]: string } = {
    meditation: "training_meditations",
    reading: "training_readings",
    prayer: "training_prayers",
    soc: "training_socs",
  };
  if (!(type in TABLES)) {
    return NextResponse.json(
      { error: "type 파라미터 잘못됨" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const d = body.detail || body; // detail 구조 또는 평면 구조 모두 지원

  let query = "";
  let paramsArr: any[] = [];

  switch (type) {
    case "meditation": {
      query = `UPDATE training_meditations SET date=?, title=?, bible_book_start=?, bible_chapter_start=?, bible_verse_start=?, bible_book_end=?, bible_chapter_end=?, bible_verse_end=?, question1=?, question2=?, question3=?, isShared=? WHERE id=?`;
      paramsArr = [
        d.date,
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
        d.isShared ? 1 : 0,
        id,
      ];
      break;
    }
    case "reading": {
      query = `UPDATE training_readings SET date=?, bible_book_start=?, bible_chapter_start=?, bible_verse_start=?, bible_book_end=?, bible_chapter_end=?, bible_verse_end=?, psalm_chapter_start=?, psalm_verse_start=?, psalm_chapter_end=?, psalm_verse_end=?, proverb_chapter_start=?, proverb_verse_start=?, proverb_chapter_end=?, proverb_verse_end=?, isShared=? WHERE id=?`;
      paramsArr = [
        d.date,
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
        d.isShared ? 1 : 0,
        id,
      ];
      break;
    }
    case "prayer": {
      query = `UPDATE training_prayers SET date=?, prayer_time=?, isShared=? WHERE id=?`;
      paramsArr = [d.date, d.prayer_time, d.isShared ? 1 : 0, id];
      break;
    }
    case "soc": {
      query = `UPDATE training_socs SET date=?, situation=?, my_class=?, my_teacher=?, my_subject=?, teaching=?, decision=?, isShared=? WHERE id=?`;
      paramsArr = [
        d.date,
        d.situation,
        d.my_class,
        d.my_teacher,
        d.my_subject,
        d.teaching,
        d.decision,
        d.isShared ? 1 : 0,
        id,
      ];
      break;
    }
  }

  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.query(query, paramsArr);
    connection.release();
    return NextResponse.json({ success: true, result });
  } catch (error) {
    if (connection) connection.release();
    return NextResponse.json(
      { error: "DB 오류", detail: (error as any).message },
      { status: 500 }
    );
  }
}
