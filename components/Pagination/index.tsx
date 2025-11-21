import { Pagination } from "@/types/transaction";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Pagination Component
interface PaginationProps {
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

const PaginationWrapper = ({ pagination, onPageChange }: PaginationProps) => {
  const { current_page, total_pages, has_next, has_previous } = pagination;

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxPagesToShow = 5; // adjust for how many numbers to show around current
    let start = Math.max(current_page - 2, 1);
    let end = Math.min(start + maxPagesToShow - 1, total_pages);

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(end - maxPagesToShow + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return { pages, start, end }; // return start and end too
  };

  const { pages: pageNumbers, start, end } = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 lg:gap-3 mt-4">
      <button
        disabled={!has_previous}
        onClick={() => onPageChange(current_page - 1)}
        className="px-3 py-1 rounded disabled:opacity-50 text-[15px] flex items-center gap-1 bg-transparent text-[#0046A7] disabled:text-black"
      >
        <ArrowLeft className="h-[18px] w-[18px]" /> Previous
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`px-3 py-2 rounded-[8px] text-base tracking-[0.5px] ${
              current_page === 1 ? "bg-[#0046A7] text-[#F5F5F5]" : ""
            }`}
          >
            1
          </button>
          {start > 2 && <span className="px-1">...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-[8px] text-base tracking-[0.5px] ${
            page === current_page ? "bg-[#0046A7] text-[#F5F5F5]" : ""
          }`}
        >
          {page}
        </button>
      ))}

      {end < total_pages && (
        <>
          {end < total_pages - 1 && <span className="px-1">...</span>}
          <button
            onClick={() => onPageChange(total_pages)}
            className={`px-3 py-2 rounded-[8px] text-base tracking-[0.5px] ${
              current_page === total_pages ? "bg-[#0046A7] text-[#F5F5F5]" : ""
            }`}
          >
            {total_pages}
          </button>
        </>
      )}

      <button
        disabled={!has_next}
        onClick={() => onPageChange(current_page + 1)}
        className="px-3 py-1 rounded disabled:opacity-50 text-[15px] flex items-center gap-1 bg-transparent text-[#0046A7] disabled:text-black"
      >
        Next
        <ArrowRight className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
};

export default PaginationWrapper;
