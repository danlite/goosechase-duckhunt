import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type Props = {
  perPage: number;
  page: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
};

const MissionPagination: React.FC<Props> = ({
  page,
  perPage,
  totalCount,
  onPageChange,
}) => {
  const pages = Math.ceil(totalCount / perPage);
  const pagesArray = Array.from({ length: pages }, (_, i) => i);

  const nextEnabled = page < pages - 1;
  const prevEnabled = page > 0;

  return (
    <div className="flex gap-2 justify-center">
      <button
        className={!prevEnabled ? "text-slate-400" : ""}
        disabled={!prevEnabled}
        onClick={() => onPageChange(page - 1)}
      >
        <FaAngleLeft />
      </button>
      {pagesArray.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`p-1 border rounded-sm w-8 ${
            page === pageNumber ? "bg-gray-200 cursor-default" : "bg-white"
          }`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber + 1}
        </button>
      ))}
      <button
        className={!nextEnabled ? "text-slate-400" : ""}
        disabled={!nextEnabled}
        onClick={() => onPageChange(page + 1)}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default MissionPagination;
