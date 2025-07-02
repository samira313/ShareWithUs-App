import PropTypes from "prop-types";
import { FaChevronDown } from "react-icons/fa";

const Filter = ({ title, isOpen, toggle, children }) => (
  <div className="filter">
    <div className="filter-header" onClick={toggle}>
      <h4>{title}</h4>
      <FaChevronDown className={`filter-arrow ${isOpen ? "open" : ""}`} />
    </div>
    {isOpen && <div className="filter-body">{children}</div>}
  </div>
);

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Filter;
