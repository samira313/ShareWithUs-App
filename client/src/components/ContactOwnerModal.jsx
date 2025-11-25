import { useState } from "react";
import "./ContactOwnerModal.css";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const ContactOwnerModal = ({ ownerEmail, isOpen, onClose }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Message Sent",
      html: `<strong>To:</strong> ${ownerEmail}<br><strong>Message:</strong> ${message}`,
      icon: "success",
      confirmButtonText: "OK",
    });
    setMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Contact the Owner</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            rows={4}
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <div className="modal-buttons">
            <button type="submit" className="send-btn">
              Send
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ContactOwnerModal.propTypes = {
  ownerEmail: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ContactOwnerModal;
