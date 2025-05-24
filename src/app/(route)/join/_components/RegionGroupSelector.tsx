import { useEffect, useState } from "react";

/**
 * 지역 정보 타입
 */
interface Region {
  region: string;
}

/**
 * 그룹 정보 타입
 */
interface Group {
  id: number;
  region: string;
  group_number: string;
}

interface RegionGroupSelectorProps {
  onRegionChange?: (region: string) => void;
  onGroupChange?: (groupId: number) => void;
}

/**
 * 지역과 그룹을 선택하는 컴포넌트
 *
 * @param onRegionChange 지역 변경 시 호출되는 콜백
 * @param onGroupChange 그룹 변경 시 호출되는 콜백
 */
const RegionGroupSelector = ({
  onRegionChange,
  onGroupChange,
}: RegionGroupSelectorProps) => {
  // 상태 관리
  const [regions, setRegions] = useState<Region[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [loading, setLoading] = useState({
    regions: false,
    groups: false,
  });
  const [error, setError] = useState({
    regions: "",
    groups: "",
  });

  // 지역 목록 불러오기
  useEffect(() => {
    const fetchRegions = async () => {
      setLoading((prev) => ({ ...prev, regions: true }));
      setError((prev) => ({ ...prev, regions: "" }));

      try {
        const response = await fetch("/api/region");
        const data = await response.json();

        if (data.success) {
          setRegions(data.regions);
        } else {
          setError((prev) => ({
            ...prev,
            regions: data.error || "지역 목록을 불러오는데 실패했습니다.",
          }));
        }
      } catch (err) {
        setError((prev) => ({
          ...prev,
          regions: "지역 목록을 불러오는데 실패했습니다.",
        }));
        console.error("지역 목록 조회 실패:", err);
      } finally {
        setLoading((prev) => ({ ...prev, regions: false }));
      }
    };

    fetchRegions();
  }, []);

  // 지역 변경 시 해당 지역의 그룹 목록 불러오기
  useEffect(() => {
    if (!selectedRegion) {
      setGroups([]);
      setSelectedGroupId(null);
      return;
    }

    const fetchGroups = async () => {
      setLoading((prev) => ({ ...prev, groups: true }));
      setError((prev) => ({ ...prev, groups: "" }));

      try {
        const response = await fetch("/api/region", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ region: selectedRegion }),
        });

        const data = await response.json();

        if (data.success) {
          setGroups(data.groups);
        } else {
          setError((prev) => ({
            ...prev,
            groups: data.error || "그룹 목록을 불러오는데 실패했습니다.",
          }));
        }
      } catch (err) {
        setError((prev) => ({
          ...prev,
          groups: "그룹 목록을 불러오는데 실패했습니다.",
        }));
        console.error("그룹 목록 조회 실패:", err);
      } finally {
        setLoading((prev) => ({ ...prev, groups: false }));
      }
    };

    fetchGroups();
  }, [selectedRegion]);

  // 지역 선택 핸들러
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setSelectedGroupId(null);

    if (onRegionChange) {
      onRegionChange(region);
    }
  };

  // 그룹 선택 핸들러
  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const groupId = parseInt(e.target.value);
    setSelectedGroupId(groupId);

    if (onGroupChange) {
      onGroupChange(groupId);
    }
  };

  return (
    <div className="space-y-4">
      {/* 지역 선택 */}
      <div>
        <label
          htmlFor="region"
          className="block mb-2 font-medium text-gray-700"
        >
          지역
        </label>
        <select
          id="region"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          value={selectedRegion}
          onChange={handleRegionChange}
          disabled={loading.regions}
        >
          <option value="">지역 선택</option>
          {regions.map((item) => (
            <option key={item.region} value={item.region}>
              {item.region}
            </option>
          ))}
        </select>
        {error.regions && (
          <p className="mt-1 text-sm text-red-500">{error.regions}</p>
        )}
      </div>

      {/* 그룹 선택 */}
      <div>
        <label htmlFor="group" className="block mb-2 font-medium text-gray-700">
          그룹
        </label>
        <select
          id="group"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          value={selectedGroupId ?? ""}
          onChange={handleGroupChange}
          disabled={!selectedRegion || loading.groups}
        >
          <option value="">그룹 선택</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.group_number}
            </option>
          ))}
        </select>
        {error.groups && (
          <p className="mt-1 text-sm text-red-500">{error.groups}</p>
        )}
        {!selectedRegion && !error.groups && (
          <p className="mt-1 text-sm text-gray-500">지역을 먼저 선택해주세요</p>
        )}
      </div>
    </div>
  );
};

export default RegionGroupSelector;
