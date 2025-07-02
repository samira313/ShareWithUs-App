import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onClose }) {
  const staticCategories = [
    "Electronics",
    "Home Appliances",
    "Tools",
    "Transportation",
    "Gaming",
    "Books",
    "Media",
    "Clothing",
    "Musical Instruments",
  ].sort();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const handleCategoryClick = (category) => {
    navigate(`/result?category=${encodeURIComponent(category)}`);
    onClose();
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <h4 className="sidebar-title">Categories</h4>
      <ul className="category-list">
        {staticCategories.map((cat) => (
          <li key={cat}>
            <button
              className="category-btn"
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
