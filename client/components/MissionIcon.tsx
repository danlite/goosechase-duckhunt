import {
  TiCameraOutline,
  TiDocument,
  TiLocationOutline,
  TiStarOutline,
} from "react-icons/ti";

type Props = {
  missionType: string;
};

export const gradientStyleForMissionType = (missionType: string) => {
  switch (missionType) {
    case "photo":
      return "from-orange-500 to-orange-400";
    case "text":
      return "from-blue-500 to-blue-400";
    case "location":
      return "from-purple-500 to-purple-400";
    default:
      return "from-gray-500 to-gray-400";
  }
};

export const iconTypeForMissionType = (missionType: string) => {
  switch (missionType) {
    case "photo":
      return TiCameraOutline;
    case "text":
      return TiDocument;
    case "location":
      return TiLocationOutline;
    default:
      return TiStarOutline;
  }
};

const MissionIcon: React.FC<Props> = ({ missionType }) => {
  const IconType = iconTypeForMissionType(missionType);
  return (
    <div
      className={`aspect-square w-16 rounded text-white bg-gradient-to-tl flex justify-center items-center ${gradientStyleForMissionType(
        missionType
      )}`}
    >
      <IconType size={40} />
    </div>
  );
};

export default MissionIcon;
