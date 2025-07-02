import { useState } from "react";
import "./EditProfileForm.css";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

// EditProfileForm component allows users to edit their profile information
// It takes user data and a callback function onSuccess as props
const EditProfileForm = ({ user, onSuccess }) => {
  const [formData, setFormData] = useState({
    // Initialize form data with user info or empty strings
    email: user.email || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phone: user.phone || "",
    city: user.city || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      Swal.fire({
        title: "Profile Updated",
        text: "Your profile has been successfully updated.",
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000,
      });
      onSuccess(formData); // Update the parent component with the new form data
      setLoading(false); // Reset loading state after success
    }, 300);
  };

  if (!user) {
    return <p>Loading user info...</p>;
  }

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      <h3>Edit Profile</h3>

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>First Name</label>
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />

      <label>Last Name</label>
      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />

      <label>Phone</label>
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <label>City</label>
      <input
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Save Changes"}
      </button>
    </form>
  );
};

EditProfileForm.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    city: PropTypes.string,
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default EditProfileForm;
