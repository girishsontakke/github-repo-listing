import usePagination, { DOTS } from "./usePagination";
import styles from "./Pagination.module.scss";

interface Iprops {
  totalCount: number;
  currentPage: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}
function Pagination({
  totalCount,
  currentPage,
  pageSize = 10,
  onPageChange
}: Iprops) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (!paginationRange || currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={styles.paginationContainer}>
      {/* Left navigation arrow */}
      <li
        className={`${styles.paginationItem} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={onPrevious}
      >
        <div className={`${styles.arrow} ${styles.left}`} />
      </li>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            key={pageNumber}
            className={`${styles.paginationItem} ${
              pageNumber === currentPage ? styles.selected : ""
            }`}
            onClick={() =>
              typeof pageNumber === "number" && onPageChange(pageNumber)
            }
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={`${styles.paginationItem} ${
          currentPage === lastPage ? styles.disabled : ""
        } `}
        onClick={onNext}
      >
        <div className={`${styles.arrow} ${styles.right}`} />
      </li>
    </ul>
  );
}

export default Pagination;
