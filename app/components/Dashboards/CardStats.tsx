interface CardStatsProps {
  title: string;
  value: number | string;
}

const CardStats = ({ title, value }: CardStatsProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
};

export default CardStats;
