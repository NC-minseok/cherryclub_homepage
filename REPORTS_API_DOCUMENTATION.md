# 5K 보고서 API 문서

## 개요

5K 집회 보고서의 생성, 조회, 수정, 삭제 기능을 제공하는 RESTful API입니다.

Frontend Design Guideline의 다음 원칙들을 적용했습니다:

- **Predictability**: 일관된 응답 구조와 HTTP 상태 코드
- **Single Responsibility**: 각 엔드포인트가 명확한 단일 책임
- **Error Handling**: 적절한 오류 처리 및 검증
- **Cohesion**: 관련 데이터의 통합 관리

## 인증

모든 API 요청에는 JWT 토큰이 필요합니다.

```
Authorization: Bearer {your_jwt_token}
```

## API 엔드포인트

### 1. 5K 보고서 목록 조회

**GET** `/api/reports`

#### 쿼리 매개변수

- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 항목 수 (기본값: 10)
- `search`: 검색어 (내용, 장소 검색)
- `author_id`: 작성자 ID로 필터링

#### 응답 예시

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "date": "2024-01-15",
      "start_time": "19:00:00",
      "end_time": "21:00:00",
      "location": "서울시 강남구 역삼동",
      "participants": 3,
      "content": "하나님의 은혜로...",
      "created_at": "2024-01-16T10:30:00Z",
      "updated_at": "2024-01-16T10:30:00Z",
      "author_id": 1,
      "author_name": "홍길동",
      "author_school": "서울대학교",
      "image_count": 2
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### 2. 5K 보고서 생성

**POST** `/api/reports`

#### 요청 본문

```json
{
  "date": "2024-01-15",
  "start_time": "19:00:00",
  "end_time": "21:00:00",
  "location": "서울시 강남구 역삼동",
  "participants": 3,
  "content": "하나님의 은혜로 이번 5K 집회를 성공적으로...",
  "image_urls": [
    "https://firebasestorage.googleapis.com/v0/b/.../image1.jpg",
    "https://firebasestorage.googleapis.com/v0/b/.../image2.jpg"
  ]
}
```

#### 필수 필드

- `date`: 집회 날짜 (YYYY-MM-DD 형식)
- `start_time`: 시작 시간 (HH:MM:SS 형식)
- `end_time`: 종료 시간 (HH:MM:SS 형식)
- `location`: 집회 장소
- `participants`: 참여간사 수 (0 이상의 정수)
- `content`: 보고서 내용

#### 선택 필드

- `image_urls`: 이미지 URL 배열 (Firebase Storage에 업로드된 이미지)

#### 응답 예시

```json
{
  "success": true,
  "report": {
    "id": 1,
    "date": "2024-01-15",
    "start_time": "19:00:00",
    "end_time": "21:00:00",
    "location": "서울시 강남구 역삼동",
    "participants": 3,
    "content": "하나님의 은혜로...",
    "created_at": "2024-01-16T10:30:00Z",
    "updated_at": "2024-01-16T10:30:00Z",
    "author_id": 1,
    "author_name": "홍길동",
    "author_school": "서울대학교",
    "image_urls": [
      "https://firebasestorage.googleapis.com/v0/b/.../image1.jpg",
      "https://firebasestorage.googleapis.com/v0/b/.../image2.jpg"
    ]
  },
  "message": "5K 보고서가 성공적으로 생성되었습니다."
}
```

### 3. 5K 보고서 상세 조회

**GET** `/api/reports/{id}`

#### 경로 매개변수

- `id`: 보고서 ID

#### 응답 예시

```json
{
  "success": true,
  "report": {
    "id": 1,
    "date": "2024-01-15",
    "start_time": "19:00:00",
    "end_time": "21:00:00",
    "location": "서울시 강남구 역삼동",
    "participants": 3,
    "content": "하나님의 은혜로...",
    "created_at": "2024-01-16T10:30:00Z",
    "updated_at": "2024-01-16T10:30:00Z",
    "author_id": 1,
    "author_name": "홍길동",
    "author_school": "서울대학교",
    "image_urls": ["https://firebasestorage.googleapis.com/v0/b/.../image1.jpg"]
  }
}
```

### 4. 5K 보고서 수정

**PUT** `/api/reports/{id}`

#### 경로 매개변수

- `id`: 보고서 ID

#### 요청 본문

생성 API와 동일한 형식

#### 권한

- 보고서 작성자만 수정 가능

#### 응답 예시

```json
{
  "success": true,
  "report": {
    "id": 1,
    "date": "2024-01-15",
    "start_time": "19:00:00",
    "end_time": "21:00:00",
    "location": "서울시 강남구 역삼동 (수정됨)",
    "participants": 5,
    "content": "수정된 보고서 내용...",
    "created_at": "2024-01-16T10:30:00Z",
    "updated_at": "2024-01-16T15:45:00Z",
    "author_id": 1,
    "author_name": "홍길동",
    "author_school": "서울대학교",
    "image_urls": []
  },
  "message": "5K 보고서가 성공적으로 수정되었습니다."
}
```

### 5. 5K 보고서 삭제

**DELETE** `/api/reports/{id}`

#### 경로 매개변수

- `id`: 보고서 ID

#### 권한

- 보고서 작성자만 삭제 가능

#### 응답 예시

```json
{
  "success": true,
  "message": "5K 보고서가 삭제되었습니다."
}
```

## 오류 응답

### 400 Bad Request

```json
{
  "error": "필수 항목이 누락되었습니다."
}
```

### 401 Unauthorized

```json
{
  "error": "인증이 필요합니다."
}
```

### 403 Forbidden

```json
{
  "error": "수정 권한이 없습니다."
}
```

### 404 Not Found

```json
{
  "error": "존재하지 않는 5K 보고서입니다."
}
```

### 500 Internal Server Error

```json
{
  "error": "5K 보고서 생성에 실패했습니다."
}
```

## 데이터베이스 테이블

### 5k_reports 테이블

- `id`: 보고서 ID (AUTO_INCREMENT)
- `date`: 집회 날짜 (DATE)
- `start_time`: 시작 시간 (TIME)
- `end_time`: 종료 시간 (TIME)
- `location`: 집회 장소 (VARCHAR)
- `participants`: 참여간사 수 (INT)
- `content`: 보고서 내용 (TEXT)
- `author_id`: 작성자 ID (FK to users.id)
- `created_at`: 생성일시 (TIMESTAMP)
- `updated_at`: 수정일시 (TIMESTAMP)

### 5k_report_images 테이블

- `id`: 이미지 ID (AUTO_INCREMENT)
- `report_id`: 보고서 ID (FK to 5k_reports.id)
- `image_url`: 이미지 URL (VARCHAR)
- `created_at`: 생성일시 (TIMESTAMP)

## 사용 예시 (Flutter)

```dart
// 보고서 목록 조회
final response = await http.get(
  Uri.parse('$baseUrl/api/reports?page=1&limit=10'),
  headers: {
    'Authorization': 'Bearer $token',
    'Content-Type': 'application/json',
  },
);

// 보고서 생성
final response = await http.post(
  Uri.parse('$baseUrl/api/reports'),
  headers: {
    'Authorization': 'Bearer $token',
    'Content-Type': 'application/json',
  },
  body: jsonEncode({
    'date': '2024-01-15',
    'start_time': '19:00:00',
    'end_time': '21:00:00',
    'location': '서울시 강남구 역삼동',
    'participants': 3,
    'content': '보고서 내용...',
    'image_urls': imageUrls,
  }),
);
```

## 주의사항

1. **이미지 업로드**: 이미지는 먼저 Firebase Storage에 업로드한 후 URL을 API에 전송해야 합니다.
2. **권한 관리**: 현재는 작성자만 수정/삭제가 가능하며, 향후 관리자 권한 추가 예정입니다.
3. **시간 형식**: 시간은 HH:MM:SS 형식(24시간)을 사용합니다.
4. **날짜 형식**: 날짜는 YYYY-MM-DD 형식을 사용합니다.
5. **트랜잭션**: 모든 수정/삭제 작업은 트랜잭션으로 처리되어 데이터 일관성을 보장합니다.
