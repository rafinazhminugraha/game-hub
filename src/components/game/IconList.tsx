import { IoLogoPlaystation, IoLogoWindows, IoLogoXbox } from "react-icons/io";
import { IoLogoApple } from "react-icons/io5";
import { type Platform } from "../../hooks/usePlatforms";
import type { JSX } from "react";

// Map platform slugs to icons
const platformIconMap: Record<string, JSX.Element> = {
  pc: <IoLogoWindows />,
  playstation: <IoLogoPlaystation />,
  xbox: <IoLogoXbox />,
  mac: <IoLogoApple />,
};

interface Props {
  Platforms: Platform[];
}

export default function IconList({ Platforms }: Props) {
  return (
    <ul className="flex flex-row gap-1.5" aria-label="Available platforms">
      {/* Render based on the slug then use the component match the slug */}
      {Platforms?.map((platform) => {
        return <li key={platform.slug}>{platformIconMap[platform.slug]}</li>;
      })}
    </ul>
  );
}
