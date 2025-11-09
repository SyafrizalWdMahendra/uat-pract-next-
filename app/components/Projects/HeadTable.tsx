import { COLUMNTEXT } from "@/app/utils/cons";

export const HeadTable = () => {
  const columns = COLUMNTEXT;

  return (
    <tr className="border-b border-gray-200 bg-gray-50">
      {columns.map((column) => (
        <th
          key={column.label}
          className={`text-${column.align} p-4 text-sm font-semibold text-gray-700`}
        >
          {column.label}
        </th>
      ))}
    </tr>
  );
};
