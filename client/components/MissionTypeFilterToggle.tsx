import { Switch } from "@headlessui/react";
import {
  gradientStyleForMissionType,
  iconTypeForMissionType,
} from "./MissionIcon";

type Props = {
  type: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

const MissionTypeFilterToggle: React.FC<Props> = ({
  type,
  onChange,
  checked,
}) => {
  const IconType = iconTypeForMissionType(type);
  return (
    <Switch
      key={type}
      checked={checked}
      onChange={onChange}
      className={`p-1 px-2 inline-flex items-center gap-1 rounded-sm ${
        checked
          ? `text-white bg-gradient-to-tl ${gradientStyleForMissionType(type)}`
          : "text-slate-500 bg-slate-200"
      }`}
    >
      <IconType /> <span>{type}</span>
    </Switch>
  );
};

export default MissionTypeFilterToggle;
