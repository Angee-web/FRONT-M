import React from "react";



import api from "../../../store/auth-slice/api"

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageURL,
  setUploadedImageURL,
  uploadedImageURLs, // For multiple image URLs
  setUploadedImageURLs, // For setting multiple image URLs
  setImageLoadingState,
  imageLoadingState,
  isEditMode,
  multiple = false, // Allow multiple uploads if true
}) => {
  // Function to upload the image to Cloudinary
  const uploadImageToCloudinary = async (imageFile) => {
    const dataImage = new FormData();
    dataImage.append("my_file", imageFile);

    const response = await api.post(
      `/admin/products/upload-image`,
      dataImage,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response?.data?.success) {
      return response.data.result.url; // Return the uploaded image URL
    } else {
      throw new Error("Failed to upload image");
    }
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    setImageLoadingState(true);
    try {
      if (multiple) {
        // If multiple, handle an array of images
        const fileArray = Array.from(files);
        const urls = await Promise.all(
          fileArray.map(async (file) => {
            const url = await uploadImageToCloudinary(file);
            return url;
          })
        );
        setUploadedImageURLs(urls);
      } else {
        // If single, handle just one image
        const file = files[0];
        const url = await uploadImageToCloudinary(file);
        setUploadedImageURL(url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageLoadingState(false);
    }
  };

  return (
    <div className="image-upload">
      <input
        type="file"
        accept="image/*"
        multiple={multiple} // Enable multiple file selection
        onChange={handleImageChange}
        disabled={isEditMode}
      />
      {imageLoadingState && <p>Uploading...</p>}
      {multiple
        ? uploadedImageURLs?.length > 0 && (
            <div className="uploaded-images">
              {uploadedImageURLs.map((url, index) => (
                <img key={index} src={url} alt={`Uploaded ${index}`} />
              ))}
            </div>
          )
        : uploadedImageURL && (
            <div className="uploaded-image">
              <img src={uploadedImageURL} alt="Uploaded" />
            </div>
          )}
    </div>
  );
};

export default ProductImageUpload;
