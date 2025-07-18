-- 게시판 사역보고 테이블의 잘못된 JSON 데이터 정리
-- Frontend Design Guideline: Error Handling - 데이터 무결성 보장

-- 1. 빈 문자열이나 NULL인 image_urls를 NULL로 정리
UPDATE report_board 
SET image_urls = NULL 
WHERE image_urls = '' OR image_urls = '""' OR image_urls = '[]';

-- 2. 잘못된 JSON 형식 확인 및 정리 (MySQL 5.7.8 이상에서 사용 가능)
-- 유효하지 않은 JSON을 NULL로 변경
UPDATE report_board 
SET image_urls = NULL 
WHERE image_urls IS NOT NULL 
  AND image_urls != '' 
  AND NOT JSON_VALID(image_urls);

-- 3. 확인 쿼리 - 정리 후 상태 확인
SELECT 
  id,
  title,
  image_urls,
  CASE 
    WHEN image_urls IS NULL THEN 'NULL'
    WHEN image_urls = '' THEN 'EMPTY'
    WHEN JSON_VALID(image_urls) THEN 'VALID_JSON'
    ELSE 'INVALID_JSON'
  END as json_status
FROM report_board 
ORDER BY id DESC 
LIMIT 10;

-- 4. 5K 보고서 테이블도 같은 방식으로 정리 (필요한 경우)
-- UPDATE 5k_report_images SET image_url = NULL WHERE image_url = ''; 