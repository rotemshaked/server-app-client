import "./pagination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({
  page,
  handlePreviousPage,
  handleNextPage,
  nextServers,
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
      <div className="page"> - {page} -</div>
      <button
        onClick={handleNextPage}
        className={nextServers.length ? "next-btn" : "hidden-btn"}
      >
        Next &nbsp;
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Pagination;
