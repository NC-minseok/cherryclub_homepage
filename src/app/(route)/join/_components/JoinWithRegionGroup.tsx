import { useState } from "react";
import RegionGroupSelector from "./RegionGroupSelector";

/**
 * 회원가입 예시 컴포넌트
 * 지역과 그룹을 선택하고 회원가입 정보에 포함시키는 예시를 보여줍니다.
 */
const JoinWithRegionGroup = () => {
  // 회원가입 폼 상태
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    region: "",
    region_group_id: null as number | null,
    // 다른 필요한 필드들...
  });

  // 지역 변경 핸들러
  const handleRegionChange = (region: string) => {
    setFormData({
      ...formData,
      region,
      region_group_id: null, // 지역이 변경되면 그룹 ID 초기화
    });
  };

  // 그룹 변경 핸들러
  const handleGroupChange = (groupId: number) => {
    setFormData({
      ...formData,
      region_group_id: groupId,
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.region_group_id) {
      alert("지역과 그룹을 선택해주세요.");
      return;
    }

    // 여기서 실제 회원가입 API 호출
    console.log("회원가입 데이터:", formData);

    // 실제 API 호출 예시
    /*
    try {
      const response = await fetch('/api/join/member-join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // 회원가입 성공 처리
      } else {
        // 에러 처리
      }
    } catch (err) {
      console.error('회원가입 실패:', err);
    }
    */
  };

  // 이름, 전화번호 등 기본 정보 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이름 입력 */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 font-medium text-gray-700"
          >
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>

        {/* 전화번호 입력 */}
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 font-medium text-gray-700"
          >
            전화번호
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>

        {/* 지역 및 그룹 선택 */}
        <RegionGroupSelector
          onRegionChange={handleRegionChange}
          onGroupChange={handleGroupChange}
        />

        {/* 기타 필요한 입력 필드들... */}

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default JoinWithRegionGroup;
