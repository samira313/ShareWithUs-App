import PropTypes from "prop-types";
import "./ItemCard.css";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

// component to display a single item card on ResultPage and HomePage
const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="item-card"
      role="button"
      tabIndex="0"
      onClick={() => navigate(`/items/${item._id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/items/${item._id}`);
        }
      }}
    >
      <img className="item-card-image" src={item.images[0]} alt={item.title} />
      <h3 className="item-card-title">{item.title}</h3>
      <Rating rating={item.reviews.averageRating} />
      <p className="item-card-condition">
        <strong>Condition:</strong>{" "}
        {
          <span
            className={`item-condition ${
              item.condition === "Excellent"
                ? "item-condition-excellent"
                : item.condition === "Good"
                  ? "item-condition-good"
                  : "item-condition-fair"
            }`}
          >
            {item.condition}
          </span>
        }
      </p>
      <p className="item-card-duration">
        <strong>Rental Period:</strong> {item.borrowDuration}{" "}
        {item.borrowDuration === 1 ? "day" : "days"}
      </p>
      <p className="item-card-price">
        <strong>Rental Price:</strong> €{item.price}
      </p>
      {item.availability ? (
        <p className="available">✅Available</p>
      ) : (
        <p className="unavailable">Unavailable</p>
      )}
    </div>
  );
};

// Type checking for the item prop to catch errors early
ItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    borrowDuration: PropTypes.number.isRequired,
    availability: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    reviews: PropTypes.shape({
      averageRating: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ItemCard;
