import { useState } from "react";
import Filter from "./Filter";
import PropTypes from "prop-types";
import "./FilterSidebar.css";

const CATEGORIES = [
  "Electronics",
  "Home Appliances",
  "Tools",
  "Transportation",
  "Gaming",
  "Books",
  "Media",
  "Clothing",
  "Musical Instruments",
];
const CONDITIONS = ["Excellent", "Good", "Fair"];

const FilterSidebar = ({ filters, setFilters }) => {
  const [priceInput, setPriceInput] = useState({
    min: filters.minPrice || "",
    max: filters.maxPrice || "",
  });
  const [durationInput, setDurationInput] = useState({
    min: filters.minDuration || "",
    max: filters.maxDuration || "",
  });
  const [open, setOpen] = useState({
    category: false,
    condition: false,
    availability: false,
    price: false,
    duration: false,
  });

  // Expands/collapses individual filter
  const toggleFilter = (filter) => {
    setOpen((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  // Updates filter state with new value
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Updates filter state for duration and price
  const updateMinMax = (minName, maxName, state) => {
    const minValue = parseFloat(state.min);
    const maxValue = parseFloat(state.max);

    if (!isNaN(minValue) && !isNaN(maxValue) && minValue > maxValue) {
      alert("Minimum price must be less than or equal to maximum price.");
      return;
    }

    setFilters((prev) => ({
      ...prev,
      [minName]: minValue || undefined,
      [maxName]: maxValue || undefined,
    }));
  };

  return (
    <div className="filter-sidebar">
      {/* CATEGORIES */}
      <Filter
        title="Category"
        isOpen={open.category}
        toggle={() => toggleFilter("category")}
      >
        <div className="filter-option">
          <input
            type="radio"
            id="category-all"
            name="category"
            checked={!filters.category}
            onChange={() => updateFilter("category", "")}
          />
          <label htmlFor="category-all" className="filter-label">
            All Categories
          </label>
        </div>
        {CATEGORIES.map((cat) => (
          <div key={cat} className="filter-option">
            <input
              type="radio"
              id={`category-${cat}`}
              name="category"
              value={cat}
              checked={filters.category === cat}
              onChange={(e) => updateFilter("category", e.target.value)}
            />
            <label htmlFor={`category-${cat}`} className="filter-label">
              {cat}
            </label>
          </div>
        ))}
      </Filter>

      {/* AVAILABILITY */}
      <Filter
        title="Availability"
        isOpen={open.availability}
        toggle={() => toggleFilter("availability")}
      >
        <div className="filter-option">
          <input
            type="radio"
            id="availability-all"
            name="availability"
            checked={!filters.availability}
            onChange={() => updateFilter("availability", "")}
          />
          <label htmlFor="availability-all" className="filter-label">
            All Items
          </label>
        </div>
        <div className="filter-option">
          <input
            type="radio"
            id="availability-true"
            name="availability"
            checked={filters.availability === "true"}
            onChange={() => updateFilter("availability", "true")}
          />
          <label htmlFor="availability-true" className="filter-label">
            Available Items
          </label>
        </div>
      </Filter>

      {/* CONDITION */}
      <Filter
        title="Condition"
        isOpen={open.condition}
        toggle={() => toggleFilter("condition")}
      >
        <div className="filter-option">
          <input
            type="radio"
            id="condition-all"
            name="condition"
            checked={!filters.condition}
            onChange={() => updateFilter("condition", "")}
          />
          <label htmlFor="condition-all" className="filter-label">
            All
          </label>
        </div>
        {CONDITIONS.map((cond) => (
          <div key={cond} className="filter-option">
            <input
              type="radio"
              id={`condition-${cond}`}
              name="condition"
              value={cond}
              checked={filters.condition === cond}
              onChange={(e) => updateFilter("condition", e.target.value)}
            />
            <label htmlFor={`condition-${cond}`} className="filter-label">
              {cond}
            </label>
          </div>
        ))}
      </Filter>

      {/* PRICE */}
      <Filter
        title="Price"
        isOpen={open.price}
        toggle={() => toggleFilter("price")}
      >
        <input
          className="filter-input"
          type="number"
          placeholder="Min"
          value={priceInput.min}
          onChange={(e) =>
            setPriceInput((prev) => ({
              ...prev,
              min: e.target.value,
            }))
          }
        />
        <input
          className="filter-input"
          type="number"
          placeholder="Max"
          value={priceInput.max}
          onChange={(e) =>
            setPriceInput((prev) => ({
              ...prev,
              max: e.target.value,
            }))
          }
        />
        <button
          className="filter-apply-btn"
          onClick={() => updateMinMax("minPrice", "maxPrice", priceInput)}
        >
          Apply
        </button>
      </Filter>

      {/* DURATION */}
      <Filter
        title="Rental Period"
        isOpen={open.duration}
        toggle={() => toggleFilter("duration")}
      >
        <input
          className="filter-input"
          type="number"
          placeholder="Min (days)"
          value={durationInput.min}
          onChange={(e) =>
            setDurationInput((prev) => ({
              ...prev,
              min: e.target.value,
            }))
          }
        />
        <input
          className="filter-input"
          type="number"
          placeholder="Max (days)"
          value={durationInput.max}
          onChange={(e) =>
            setDurationInput((prev) => ({
              ...prev,
              max: e.target.value,
            }))
          }
        />
        <button
          className="filter-apply-btn"
          onClick={() =>
            updateMinMax("minDuration", "maxDuration", durationInput)
          }
        >
          Apply
        </button>
      </Filter>
    </div>
  );
};

FilterSidebar.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string,
    availability: PropTypes.string,
    condition: PropTypes.string,
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    minDuration: PropTypes.number,
    maxDuration: PropTypes.number,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default FilterSidebar;
