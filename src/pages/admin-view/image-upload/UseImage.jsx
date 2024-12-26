import { useState } from "react";
import axios from "axios";

const useImageUpload = (uploadUrl) => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const uploadImage = async () => {
    if (!imageFile) return null; // Explicitly return null if no file is provided.

    setIsLoading(true);
    const formData = new FormData();
    formData.append("my_file", imageFile);

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.success) {
        const imageUrl =
          response.data.results[0]?.result?.secure_url ||
          response.data.results[0]?.result?.url;
        if (imageUrl) {
          setUploadedImageURL(imageUrl); // Save the uploaded image URL to state
          return imageUrl; // Return the URL
        }
      }

      throw new Error("Image upload failed or URL not found.");
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    } finally {
      setIsLoading(false); // Reset loading state once the upload is complete.
    }
  };

  return {
    imageFile,
    uploadedImageURL,
    isLoading,
    handleImageChange,
    uploadImage,
    setImageFile,
    setUploadedImageURL,
  };
};

export default useImageUpload;
