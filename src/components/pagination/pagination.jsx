import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./pagination.css";

const Pagination = ({
  showNextPageButton,
  page,
  handlePreviousPage,
  handleNextPage,
  nextPage,
}) => {
  return (
    <div className="pagination">
      <button
        onClick={handlePreviousPage}
        className={page > 1 ? "previous-btn" : "hidden-btn"}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        &nbsp; Previous
      </button>
      <div className="page"> - Page {page} -</div>
      <button
        onClick={handleNextPage}
        className={showNextPageButton.current ? "next-btn" : "hidden-btn"}
      >
        Next &nbsp;
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Pagination;
