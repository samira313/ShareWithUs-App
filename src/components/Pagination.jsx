import PropTypes from "prop-types";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, setCurrentPage, pages }) => {
  // Handles state changes for current page
  const handlePageChange = (newPage) => {
    setCurrentPage((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-btn ${currentPage === page ? "active" : ""}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  pages: PropTypes.array.isRequired,
};

export default Pagination;
