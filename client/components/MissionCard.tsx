import MissionIcon from "./MissionIcon";

type Props = {
  title: string;
  description: string;
  missionType: string;
  points: number;
};

const MissionCard: React.FC<Props> = ({
  description,
  missionType,
  points,
  title,
}) => {
  return (
    <div className="flex justify-between -mx-4 p-4 border-t last:border-b gap-4 transition-colors hover:bg-slate-50">
      <div>
        <MissionIcon missionType={missionType} />
      </div>
      <div className="grow">
        <h1 className="font-semibold">{title}</h1>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <div className="text-xs text-slate-500 whitespace-nowrap">
        {points} {points === 1 ? "Point" : "Points"}
      </div>
    </div>
  );
};

export default MissionCard;
