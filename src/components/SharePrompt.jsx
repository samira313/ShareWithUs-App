import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./SharePrompt.css";
function SharePrompt() {
  const navigate = useNavigate();

  // Check if the user is logged in by checking the token
  const handleClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to add items.",
        icon: "error",
        confirmButtonText: "OK",
      });
      navigate("/auth");
      return;
    }
    navigate("/add-item");
  };

  return (
    <div className="share-prompt-section">
      <h2>Have something to share?</h2>
      <p>
        Let others borrow your tools or items — help your neighbors and save
        resources.
      </p>
      <button
        className="btn"
        onClick={() => handleClick()}
        aria-label="Add Item"
      >
        Add Your Item
      </button>
    </div>
  );
}

export default SharePrompt;
