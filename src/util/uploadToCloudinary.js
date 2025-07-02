import axios from "axios";

// This function takes an array of files and uploads them to Cloudinary.
const uploadToCloudinary = async (files) => {
  // Ensure that the input is an array of files.
  if (!Array.isArray(files)) {
    throw new Error("uploadToCloudinary: files must be an array");
  }

  try {
    // Prepare an array of promises to upload each file.
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file); // Actual file to upload
      formData.append("upload_preset", "item_images"); // Cloudinary upload preset

      // Send a POST request to Cloudinary's upload endpoint.
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dc2jjp07h/image/upload",
        formData,
      );

      return res.data.secure_url;
    });
    // Wait for all uploads to complete and return the array of URLs.
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

export default uploadToCloudinary;
