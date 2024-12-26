import { useState } from "react";
import axios from "axios";

const useMultiple = (uploadUrl) => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageURLs, setUploadedImageURLs] = useState([]); // Array to store URLs
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const uploadImage = async () => {
    if (!imageFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("my_file", imageFile);

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Backend Response:", response.data); // Debugging
      if (response?.data?.success) {
        setUploadedImageURLs((prev) => {
          const updated = [...prev, response.data.result.url];
          console.log("Updated Uploaded Image URLs:", updated); // Debugging
          return updated;
        });
      } else {
        console.error("Image upload failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    imageFile,
    uploadedImageURLs,
    isLoading,
    handleImageChange,
    uploadImage,
    setImageFile,
    setUploadedImageURLs,
  };
};

export default useMultiple;
