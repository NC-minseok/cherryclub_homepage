-- 5K 보고서 테이블 생성
-- Frontend Design Guideline: Predictability - 일관된 테이블 구조 및 네이밍

CREATE TABLE IF NOT EXISTS 5k_reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  date DATE NOT NULL COMMENT '5K 날짜',
  start_time TIME NOT NULL COMMENT '시작 시간',
  end_time TIME NOT NULL COMMENT '종료 시간',
  location VARCHAR(255) NOT NULL COMMENT ' 장소',
  participants INT NOT NULL DEFAULT 0 COMMENT '참여간사 수',
  content TEXT NOT NULL COMMENT '보고서 내용',
  author_id INT NOT NULL COMMENT '작성자 ID',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  
  -- 외래키 제약 조건
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
  
  -- 인덱스 추가 (성능 최적화)
  INDEX idx_5k_reports_author_id (author_id),
  INDEX idx_5k_reports_date (date),
  INDEX idx_5k_reports_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='5K 집회 보고서';

-- 5K 보고서 이미지 테이블 생성
CREATE TABLE IF NOT EXISTS 5k_report_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  report_id INT NOT NULL COMMENT '보고서 ID',
  image_url VARCHAR(500) NOT NULL COMMENT '이미지 URL (Firebase Storage)',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  
  -- 외래키 제약 조건
  FOREIGN KEY (report_id) REFERENCES 5k_reports(id) ON DELETE CASCADE,
  
  -- 인덱스 추가
  INDEX idx_5k_report_images_report_id (report_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='5K 보고서 첨부 이미지';

-- 샘플 데이터 삽입 (선택적)
-- INSERT INTO reports (date, start_time, end_time, location, participants, content, author_id) 
-- VALUES 
-- ('2024-01-15', '19:00:00', '21:00:00', '서울시 강남구 역삼동', 3, 
--  '하나님의 은혜로 이번 5K 집회를 성공적으로 마칠 수 있었습니다. 총 30명의 학생들이 참석했으며...', 1); 