import { PaginationProps } from "../../types/interfaces";

export default function Pagination({ sortedNews, handlePageChange, currentPage }: PaginationProps) {
  return (
    <div className="pagination">
      {Array.from({ length: Math.ceil(sortedNews?.length / 10) }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          className={`pagination-btn`}
          onClick={() => handlePageChange(page)}
          style={{ backgroundColor: page === currentPage ? 'orange' : '' }}
        >
          <span className={`small-header ${page === currentPage ? 'active-text' : ''}`}>{page}</span>
        </button>
      ))}
    </div>
  )
}