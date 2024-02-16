interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="pagination is-rounded is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <a className="pagination-previous">Précédent</a>
      <a className="pagination-next">Suivant</a>

      <ul className="pagination-list">
        {pageNumbers.map((num: number) => (
          <li key={num}>
            <a
              className={`pagination-link ${currentPage === num ? "is-current" : ""}`}
              onClick={() => onPageChange(num)}
            >
              {num}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
