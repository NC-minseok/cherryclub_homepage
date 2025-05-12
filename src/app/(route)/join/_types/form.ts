/**
 * @typedef FormData
 * @description 동아리 가입 폼의 입력값 타입 정의
 * @property {string} name 이름
 * @property {string} gender 성별
 * @property {string} phone 연락처
 * @property {string} birthday 생년월일
 * @property {string} region 지역
 * @property {string} university 학교
 * @property {string} major 전공
 * @property {string} student_id 학번
 * @property {string} grade 학년
 * @property {string} semester 학기
 * @property {string} message 가입동기
 * @property {boolean} agree 개인정보 동의
 */
export interface FormData {
  name: string;
  gender: string;
  phone: string;
  birthday: string;
  region: string;
  university: string;
  major: string;
  student_id: string;
  grade: string;
  semester: string;
  message: string;
  agree: boolean;
}
