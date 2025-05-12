/**
 * 임시 메모리 저장소 (운영 환경에서는 Redis/DB로 대체)
 * email을 key로, { code, expiresAt } 객체를 저장
 */
const emailCodeStore: Record<string, { code: string; expiresAt: number }> = {};

/**
 * 인증번호 저장 함수
 * @param email 이메일
 * @param code 인증번호
 */
export function saveEmailCode(email: string, code: string) {
  // 5분(300초) 유효
  emailCodeStore[email] = {
    code,
    expiresAt: Date.now() + 5 * 60 * 1000,
  };
}

/**
 * 인증번호 조회 함수
 * @param email 이메일
 */
export function getEmailCodeRecord(email: string) {
  return emailCodeStore[email];
}

/**
 * 인증번호 삭제 함수
 * @param email 이메일
 */
export function deleteEmailCode(email: string) {
  delete emailCodeStore[email];
}
