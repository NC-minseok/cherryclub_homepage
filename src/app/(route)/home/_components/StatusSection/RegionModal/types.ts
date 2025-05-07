export interface RegionData {
  name: string;
  leader: string;
  universities: string[];
  count: number;
}

export interface RegionModalProps {
  selectedRegion: RegionData | null;
  onClose: () => void;
}
