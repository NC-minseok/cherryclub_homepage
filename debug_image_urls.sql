-- image_urls 필드 디버깅 쿼리
-- Frontend Design Guideline: Error Handling - 데이터 타입 확인

-- 1. report_board 테이블의 image_urls 상태 확인
SELECT 
  id,
  title,
  image_urls,
  LENGTH(image_urls) as url_length,
  CHAR_LENGTH(image_urls) as char_length,
  HEX(image_urls) as hex_value,
  CASE 
    WHEN image_urls IS NULL THEN 'NULL'
    WHEN image_urls = '' THEN 'EMPTY_STRING'
    WHEN image_urls = '[]' THEN 'EMPTY_ARRAY'
    WHEN image_urls = 'null' THEN 'NULL_STRING'
    WHEN JSON_VALID(image_urls) THEN 'VALID_JSON'
    ELSE 'INVALID_JSON'
  END as status
FROM report_board 
ORDER BY id DESC 
LIMIT 10;

-- 2. 컬럼 타입 확인
DESCRIBE report_board;

-- 3. 잘못된 데이터 정리 (필요시 실행)
-- UPDATE report_board SET image_urls = NULL WHERE image_urls = '';
-- UPDATE report_board SET image_urls = '[]' WHERE image_urls IS NULL;

-- 4. 테스트 데이터 삽입 (디버깅용)
-- INSERT INTO report_board (title, content, author_id, author_name, created_at, image_urls) 
-- VALUES ('테스트', '테스트 내용', 1, '테스트 사용자', NOW(), '["test1.jpg", "test2.jpg"]'); 