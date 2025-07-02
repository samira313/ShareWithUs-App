import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./BorrowButton.css";
import PropTypes from "prop-types";

// This component displays a borrow button for an item
const BorrowButton = ({ itemId, disabled = false, onSuccess }) => {
  const navigate = useNavigate();

  // Check if the user is logged in by checking the token
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  const handleBorrowClick = async (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the item card

    // If the user is not logged in, show a warning and redirect to login
    if (!isLoggedIn) {
      Swal.fire({
        title: "Not logged in",
        text: "Please log in to borrow items.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      navigate("/auth");
      return;
    }

    // Show a confirmation dialog before borrowing
    const result = await Swal.fire({
      title: "Confirm Borrow",
      text: "Are you sure you want to borrow this item?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, borrow it",
    });

    // If user cancels, stop here
    if (!result.isConfirmed) return;

    try {
      // Send PUT request to backend to borrow the item
      const response = await fetch(`/api/items/${itemId}/borrow`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in headers
        },
        body: JSON.stringify({
          borrowedUntil: "2025-06-15", // Temporary value – replace with real logic later
        }),
      });

      const data = await response.json();

      // Show success or error message based on response
      if (response.ok) {
        Swal.fire(
          "Success",
          data.msg || "Item borrowed successfully",
          "success",
        );
        if (onSuccess) onSuccess(); // Call success callback if provided
      } else {
        Swal.fire("Error", data.msg || "Failed to borrow item", "error");
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error("Borrow error:", error);
      Swal.fire(
        "Error",
        "Something went wrong while processing your request.",
        "error",
      );
    }
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={`borrow-button ${disabled ? "borrow--disabled" : ""}`}
      onClick={handleBorrowClick}
    >
      {disabled ? "Not Available" : "Borrow Item"}
    </button>
  );
};

// Define expected prop types
BorrowButton.propTypes = {
  itemId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onSuccess: PropTypes.func,
};

export default BorrowButton;
