import { readdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    // public 폴더 내의 이미지 폴더 경로
    const imageDir = path.join(
      process.cwd(),
      "public",
      "images",
      "home",
      "HeroSession"
    );

    // 디렉토리 읽기
    const files = await readdir(imageDir);

    // 이미지 파일만 필터링 (jpg, jpeg, png, gif, webp 등)
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif|webp|JPG|JPEG|PNG|GIF|WEBP)$/i.test(file)
    );

    // 이미지 경로로 변환
    const imagePaths = imageFiles.map(
      (file) => `/images/home/HeroSession/${file}`
    );

    return NextResponse.json(imagePaths);
  } catch (error) {
    console.error("이미지를 가져오는 중 오류 발생:", error);
    return NextResponse.json(
      { error: "이미지를 가져오는 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
