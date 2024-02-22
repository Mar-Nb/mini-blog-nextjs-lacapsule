import { useState } from "react";

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
  const [isVisible, setVisible] = useState<boolean>(false);
  const [goTo, setGoTo] = useState<number>(1);

  return (
    <>
      <nav
        className="pagination is-rounded is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <a
          className={`pagination-previous ${currentPage === 1 && "is-disabled has-background-light-grey"}`}
          onClick={() => {
            currentPage > 1 && onPageChange(currentPage - 1);
          }}
        >
          Précédent
        </a>
        <a
          className={`pagination-next ${currentPage === totalPages && "is-disabled has-background-light-grey"}`}
          onClick={() => {
            currentPage < totalPages && onPageChange(currentPage + 1);
          }}
        >
          Suivant
        </a>

        <ul className="pagination-list">
          <span>Page</span>
          <li>
            <a className="pagination-link" onClick={() => setVisible(true)}>
              {currentPage}
            </a>
          </li>
          <span>/</span>
          <li>
            <a className="pagination-link has-background-grey is-total">
              {totalPages}
            </a>
          </li>
        </ul>
      </nav>

      <div
        id="modal-pagination"
        className={`modal ${isVisible && "is-active"}`}
      >
        <div
          className="modal-background"
          onClick={() => setVisible(false)}
        ></div>

        <div className="modal-content">
          <div className="box">
            <div className="field">
              <label className="label">Page</label>
              <div className="control">
                <input
                  className="input is-rounded"
                  type="number"
                  placeholder="Aller à la page..."
                  min={1}
                  max={totalPages}
                  value={goTo}
                  onChange={(e) => setGoTo(Number(e.target.value))}
                />
              </div>
            </div>
            <button
              className="button is-rounded is-small is-fullwidth"
              onClick={() => {
                onPageChange(goTo);
                setVisible(false);
              }}
            >
              Go !
            </button>
          </div>
        </div>

        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => setVisible(false)}
        ></button>
      </div>
    </>
  );
}
