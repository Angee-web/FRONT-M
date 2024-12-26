// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { Skeleton } from "@/components/ui/skeleton";

// const ProductImageUpload = ({
//   uploadedImageURLs, // Array for uploaded image URLs
//   setUploadedImageURLs, // Function to update uploaded image URLs state
//   setImageLoadingState, // Function to update loading state
//   imageLoadingState, // Loading state
//   isEditMode, // Edit mode flag
// }) => {
//   const inputRef = useRef(null);
//   const [imageFiles, setImageFiles] = useState([]); // Track multiple image files

//   // Handle file selection
//   const handleImageFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     if (selectedFiles.length) {
//       setImageFiles([...imageFiles, ...selectedFiles]); // Append to existing files
//     }
//   };

//   // Handle drag and drop
//   const handleDragOver = (e) => e.preventDefault();
//   const handleDrop = (e) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     if (droppedFiles.length) {
//       setImageFiles([...imageFiles, ...droppedFiles]); // Append dropped files
//     }
//   };

//   // Remove a specific file
//   const handleRemoveImage = (fileIndex) => {
//     setImageFiles(imageFiles.filter((_, index) => index !== fileIndex));
//   };

//   // Upload images to Cloudinary
//   const uploadImagesToCloudinary = async () => {
//     setImageLoadingState(true);
//     const data = new FormData();
//     imageFiles.forEach((file) => {
//       data.append("my_file", file);
//     });

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/admin/products/upload-images",
//         data,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       if (response?.data?.success) {
//         const uploadedUrls = response.data.results
//           .filter((result) => !result.error) // Filter out any failed uploads
//           .map((result) => result.url); // Extract URLs
//         setUploadedImageURLs([...uploadedImageURLs, ...uploadedUrls]); // Append to existing URLs
//       }
//     } catch (error) {
//       console.error("Error uploading images:", error);
//     } finally {
//       setImageLoadingState(false);
//     }
//   };

//   // Upload images when files change
//   useEffect(() => {
//     if (imageFiles.length > 0) {
//       uploadImagesToCloudinary();
//     }
//   }, [imageFiles]);

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <Label className="text-lg font-semibold my-2 block">Upload Images</Label>
//       <div
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
//         className={` ${
//           isEditMode ? "opacity-60" : ""
//         } border-2 border-dashed rounded-md p-4 mt-4`}
//       >
//         <Input
//           id="image-upload"
//           type="file"
//           className="hidden"
//           ref={inputRef}
//           onChange={handleImageFileChange}
//           disabled={isEditMode}
//           multiple // Allow multiple files
//         />
//         {!imageFiles.length ? (
//           <Label
//             htmlFor="image-upload"
//             className={`${
//               isEditMode ? "cursor-not-allowed" : ""
//             } flex flex-col justify-center items-center h-32 cursor-pointer`}
//           >
//             <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2 " />
//             <span>Drag and drop or click to upload images</span>
//           </Label>
//         ) : imageLoadingState ? (
//           <Skeleton className="h-10 bg-gray-100" />
//         ) : (
//           <div className="space-y-2">
//             {imageFiles.map((file, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between border p-2 rounded-md"
//               >
//                 <div className="flex items-center">
//                   <FileIcon className="w-8 text-primary mr-2 h-8" />
//                   <p className="text-sm font-medium">{file.name}</p>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="text-muted-foreground hover:text-foreground"
//                   onClick={() => handleRemoveImage(index)}
//                 >
//                   <XIcon className="w-4 h-4" />
//                   <span className="sr-only">Remove File</span>
//                 </Button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductImageUpload;


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const ProductImageUpload = ({
  uploadedImageURLs, // Array of uploaded image URLs
  setUploadedImageURLs, // Function to update uploaded image URLs state
  setImageLoadingState, // Function to update loading state
  imageLoadingState, // Loading state
  isEditMode, // Edit mode flag
}) => {
  const inputRef = useRef(null);
  const [imageFiles, setImageFiles] = useState([]); // Track selected image files

  // Handle file selection
  const handleImageFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setImageFiles([...imageFiles, ...selectedFiles]); // Update the selected files
      uploadImagesToServer(selectedFiles); // Automatically upload the images
    }
  };

  // Upload images to the server
  const uploadImagesToServer = async (files) => {
    setImageLoadingState(true);
    const data = new FormData();
    files.forEach((file) => data.append("my_file", file));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-images", // API for multiple uploads
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response?.data?.success) {
        const uploadedURLs = response.data.results.map(
          (result) => result.result.secure_url
        );
        setUploadedImageURLs((prevURLs) => [...prevURLs, ...uploadedURLs]); // Update the uploaded image URLs
      } else {
        console.error("Image upload failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setImageLoadingState(false);
    }
  };

  // Remove an uploaded image
  const handleRemoveImage = (url) => {
    setUploadedImageURLs(uploadedImageURLs.filter((image) => image !== url));
    setImageFiles([]);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold my-2 block">Upload Images</Label>
      <div
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-md p-4 mt-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          multiple // Allow multiple file selection
          disabled={isEditMode}
        />
        {!uploadedImageURLs.length && !imageLoadingState ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col justify-center items-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2 " />
            <span>Drag and drop or click to upload images</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div>
            {uploadedImageURLs.map((url, index) => (
              <div
                key={index}
                className="flex items-center justify-between border p-2 rounded-md mb-2"
              >
                <div className="flex items-center">
                  <FileIcon className="w-8 text-primary mr-2 h-8" />
                  <img
                    src={url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-12 h-12 rounded-md"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => handleRemoveImage(url)}
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Remove File</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
