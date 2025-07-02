import { useState, useEffect } from "react";
import {
  showAddItemSuccessAlert,
  showAddItemErrorAlert,
  showAddItemErrorAlertLogin,
} from "../util/showAlert";
import uploadToCloudinary from "../util/uploadToCloudinary";
import "./AddItemForm.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// AddItemForm component for adding new items
const AddItemForm = () => {
  // Check if user is logged in
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    model: "",
    category: "",
    condition: "",
    price: "",
    value: "",
    duration: "",
    available: true,
    images: [],
  });
  // State to store local image previews
  const [localPreviews, setLocalPreviews] = useState([]);

  // Check if user is logged in when component mounts
  useEffect(() => {
    const checkLogin = async () => {
      if (!isLoggedIn) {
        await showAddItemErrorAlertLogin(
          "You must be logged in to add an item.",
        );
        navigate("/auth");
      }
    };

    checkLogin();
  }, [isLoggedIn, navigate]);

  // Handle form input changes (text, checkbox, file)
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      // Update boolean field for checkbox inputs
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      const selectedFiles = Array.from(files);

      if (formData.images.length + selectedFiles.length > 2) {
        showAddItemErrorAlert("You can only upload up to 2 images.");
        return;
      }
      // Update formData with selected image files
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...selectedFiles],
      }));

      const newPreviews = selectedFiles.map((file) =>
        URL.createObjectURL(file),
      );
      // Update local previews with new image URLs
      setLocalPreviews((prev) => [...prev, ...newPreviews]);
    } else {
      // Update text/number input fields
      setFormData({ ...formData, [name]: value });
    }
  };
  // Remove an image from the preview and formData
  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    const updatedPreviews = [...localPreviews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    // Update formData and local previews after removal
    setFormData({ ...formData, images: updatedImages });
    setLocalPreviews(updatedPreviews);
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in before proceeding
    if (!isLoggedIn) {
      showAddItemErrorAlertLogin("You must be logged in to add an item.");
      navigate("/auth");
      return;
    }

    try {
      // Validate required fields
      const imageUrls = await uploadToCloudinary(formData.images);

      // Prepare the new item object with image URLs
      const newItem = {
        ...formData,
        images: imageUrls,
        price: Number(formData.price.replace("€", "").trim()), // Default to 0 if not provided
        value: Number(formData.value.replace("€", "").trim()), // Default to 0 if not provided
        borrowDuration: Number(formData.duration) || 1, // Default to 1 day if not provided
      };

      console.log("Final item to submit:", newItem);
      showAddItemSuccessAlert();

      // Send POST request to add the new item
      await axios.post("/api/items", newItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear form
      setFormData({
        title: "",
        description: "",
        model: "",
        category: "",
        condition: "",
        price: "",
        value: "",
        duration: "",
        available: true,
        images: [],
      });
      // Clear local previews
      setLocalPreviews([]);
    } catch (err) {
      console.error(err);
      showAddItemErrorAlert("There was an error adding the item.", err);
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="add-item-form">
        <h2>Add New Item</h2>

        <label>Title:</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Model:</label>
        <input name="model" value={formData.model} onChange={handleChange} />

        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          <option value="Electronics">Electronics</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Tools">Tools</option>
          <option value="Transportation">Transportation</option>
          <option value="Gaming">Gaming</option>
          <option value="Books">Books</option>
          <option value="Media">Media</option>
          <option value="Clothing">Clothing</option>
          <option value="Musical Instruments">Musical Instruments</option>
        </select>

        <label>Condition:</label>
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          required
        >
          <option value="">Select condition</option>
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
        </select>

        <label>Price (€):</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Value (€):</label>
        <input
          type="number"
          name="value"
          value={formData.value}
          onChange={handleChange}
        />

        <label>Borrow Duration (days):</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          min="1"
          max="7"
          onChange={handleChange}
          required
        />

        <div className="checkbox-container">
          <label>Available to borrow:</label>
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
        </div>
        {formData.images.length < 2 && (
          <div className="custom-file-upload">
            <label htmlFor="image" className="upload-label">
              Upload Your Images
            </label>

            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              multiple
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>
        )}
        <div className="preview-container">
          {localPreviews.map((src, index) => (
            <div key={index} className="preview-box">
              <img src={src} alt={`preview-${index}`} className="preview" />
              <button
                type="button"
                className="remove-button"
                onClick={() => removeImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
      <Footer />
    </>
  );
};

export default AddItemForm;
