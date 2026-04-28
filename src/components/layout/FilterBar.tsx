import Select from "../ui/Select";
import PLATFORMS from "../../hooks/usePlatforms";

interface Props {
  onChangePlatform: (platform: string) => void;
  onChangeSort: (general: string) => void;
}

const SORT_OPTIONS = [
  { label: "Relevance", value: "" },
  { label: "Rating", value: "-rating" },
];

export default function Filter({ onChangePlatform, onChangeSort }: Props) {
  const { data:platforms = [] } = PLATFORMS();
  const platformOption = platforms.map((platform) => ({
    label: platform.name,
    value: String(platform.id),
  }));

  return (
    <div className="flex flex-row gap-6">
      <Select
        customTitle="All Platforms"
        options={platformOption}
        onChange={onChangePlatform}
      />
      <Select
        customDesc="Sort by: "
        options={SORT_OPTIONS}
        onChange={onChangeSort}
      />
    </div>
  );
}
