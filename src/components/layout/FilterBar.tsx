import Select from "../ui/Select";
import { PLATFORMS } from "../../data/mockGames";

interface Props {
  onChangePlatform: (platform:string) => void;
  onChangeGeneral: (general:string) => void;
}

export default function Filter({onChangePlatform, onChangeGeneral}:Props) {
  const platformNames = PLATFORMS.map((item) => item.name);

  const order = ["Relevance", "Rating"];

  return (
    <div className="flex flex-row gap-6">
      <Select
        customTitle="Platforms"
        options={platformNames}
        label="Sort by Platforms"
        onChange={onChangePlatform}
      />
      <Select
        customDesc="Sorty by: "
        options={order}
        label="Sort by Custom Order"
        onChange={onChangeGeneral}
      />
    </div>
  );
}
