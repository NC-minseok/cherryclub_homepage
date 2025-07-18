-- 사역보고 게시판 기능을 위한 데이터베이스 테이블 생성
-- Frontend Design Guideline: Single Responsibility - 각 테이블이 명확한 역할을 가지도록 설계

-- 1. 게시판용 사역보고 테이블
CREATE TABLE IF NOT EXISTS report_board (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL COMMENT '제목 (날짜 + 장소)',
    content TEXT NOT NULL COMMENT '내용',
    image_urls JSON COMMENT '이미지 URL 목록',
    author_id INT NOT NULL COMMENT '작성자 ID',
    author_name VARCHAR(100) NOT NULL COMMENT '작성자 이름',
    author_school VARCHAR(100) COMMENT '작성자 학교',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
    view_count INT DEFAULT 0 COMMENT '조회수',
    like_count INT DEFAULT 0 COMMENT '좋아요 수',
    comment_count INT DEFAULT 0 COMMENT '댓글 수',
    original_report_id VARCHAR(255) NOT NULL COMMENT '원본 5K 보고서 ID',
    report_date DATE NOT NULL COMMENT '보고서 날짜',
    location VARCHAR(255) NOT NULL COMMENT '장소',
    participants INT DEFAULT 0 COMMENT '참여간사 수',
    time_range VARCHAR(50) COMMENT '시간대 (예: 19:00-21:00)',
    
    INDEX idx_author_id (author_id),
    INDEX idx_created_at (created_at),
    INDEX idx_original_report_id (original_report_id),
    INDEX idx_report_date (report_date),
    
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='게시판용 사역보고';

-- 2. 사역보고 좋아요 테이블
CREATE TABLE IF NOT EXISTS report_board_likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL COMMENT '사역보고 ID',
    user_id INT NOT NULL COMMENT '사용자 ID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
    
    UNIQUE KEY unique_report_user (report_id, user_id),
    INDEX idx_report_id (report_id),
    INDEX idx_user_id (user_id),
    
    FOREIGN KEY (report_id) REFERENCES report_board(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='사역보고 좋아요';

-- 3. 사역보고 댓글 테이블
CREATE TABLE IF NOT EXISTS report_board_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL COMMENT '사역보고 ID',
    author_id INT NOT NULL COMMENT '작성자 ID',
    content TEXT NOT NULL COMMENT '댓글 내용',
    parent_id INT NULL COMMENT '부모 댓글 ID (대댓글인 경우)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
    like_count INT DEFAULT 0 COMMENT '좋아요 수',
    
    INDEX idx_report_id (report_id),
    INDEX idx_author_id (author_id),
    INDEX idx_parent_id (parent_id),
    INDEX idx_created_at (created_at),
    
    FOREIGN KEY (report_id) REFERENCES report_board(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES report_board_comments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='사역보고 댓글';

-- 4. 사역보고 댓글 좋아요 테이블
CREATE TABLE IF NOT EXISTS report_comment_likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment_id INT NOT NULL COMMENT '댓글 ID',
    user_id INT NOT NULL COMMENT '사용자 ID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
    
    UNIQUE KEY unique_comment_user (comment_id, user_id),
    INDEX idx_comment_id (comment_id),
    INDEX idx_user_id (user_id),
    
    FOREIGN KEY (comment_id) REFERENCES report_board_comments(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='사역보고 댓글 좋아요';


-- 6. 인덱스 최적화를 위한 추가 인덱스
CREATE INDEX idx_report_board_search ON report_board(title, location, content(100));
CREATE INDEX idx_report_board_author_date ON report_board(author_id, created_at);
CREATE INDEX idx_report_comments_report_parent ON report_board_comments(report_id, parent_id); 