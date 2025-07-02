import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
  // Local state to store the search query
  const [query, setQuery] = useState("");

  // Hook to programmatically navigate to another page
  const navigate = useNavigate();

  // Handles "Enter" key press to trigger navigation to catalogue page with search query
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }
    navigate(`/result?search=${query.trim()}`);
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        className="search-input"
        placeholder="Search your item..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button" aria-label="Search">
        <FiSearch className="search-icon" />
      </button>
    </form>
  );
}

export default SearchBar;
