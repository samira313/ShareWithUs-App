import PropTypes from "prop-types";
import "./Rating.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Component to display rating stars
const Rating = ({ rating }) => {
  return (
    <div
      className="rating-stars"
      title={rating}
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((_, i) => {
        const difference = rating - i;
        if (difference >= 1) return <FaStar key={i} />;
        if (difference >= 0.5) return <FaStarHalfAlt key={i} />;
        return <FaRegStar key={i} />;
      })}
    </div>
  );
};

// Prop type checking
Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Rating;
