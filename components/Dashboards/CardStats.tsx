import { CardStatsProps } from "@/utils/type";
import { StatIcons } from "./StatIcons";

const CardStats = ({ title, value }: CardStatsProps) => {
  return (
    <div className="flex bg-white p-5 rounded-lg shadow-md border border-gray-200 justify-between">
      <div className="w-max">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className="w-20 p-0 flex justify-end items-center">
        <StatIcons title={title} />
      </div>
    </div>
  );
};

export default CardStats;
