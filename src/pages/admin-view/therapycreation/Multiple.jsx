import React, { useState } from "react";
import useMultiple from "../image-upload/UseMultiple";
import { useToast } from "@/hooks/use-toast"; // Import your custom useToast hook
import { Input } from "@/components/ui/input";

const MultiImageUpload = ({ uploadUrl }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { isLoading, setImageFile, uploadImage } = useMultiple(uploadUrl);
  const { toast } = useToast(); // Destructure toast from useToast
  const [isUploading, setIsUploading] = useState(false); // Track upload state
  const [uploadAbortController, setUploadAbortController] = useState(null); // Controller to abort the upload

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // console.log("Selected files:", files); // Debugging
    setSelectedFiles(files);
  };

  // Function to handle canceling the upload
  const cancelUpload = () => {
    if (uploadAbortController) {
      uploadAbortController.abort(); // Abort the upload
      toast({
        title: "Upload Canceled",
        description: "The upload process was canceled.",
        status: "error",
      });
    }
    setIsUploading(false); // Reset upload state
    setSelectedFiles([]); // Clear selected files
    // console.log("Upload canceled. Clearing selected files."); // Debugging
  };

  // Upload all selected files
  const uploadAllImages = async () => {
    // console.log("Starting upload for selected files:", selectedFiles); // Debugging
    let successCount = 0;
    const abortController = new AbortController(); // Create an AbortController instance
    setUploadAbortController(abortController); // Save the controller to cancel if needed

    setIsUploading(true); // Start the upload process

    for (const [index, file] of selectedFiles.entries()) {
      if (abortController.signal.aborted) {
        // console.log("Upload aborted."); // Debugging
        break; // Stop the loop if the upload was aborted
      }

      // console.log(`Uploading file ${index + 1}/${selectedFiles.length}:`, file); // Debugging
      try {
        setImageFile(file);
        await uploadImage(abortController.signal); // Pass the signal to cancel
        successCount++;
        toast({
          title: "Success",
          description: `File ${file.name} uploaded successfully!`,
          status: "success",
        });
        // console.log(`File ${file.name} uploaded successfully.`); // Debugging
      } catch (error) {
        if (abortController.signal.aborted) {
          break; // Stop the loop if the upload was aborted
        }
        toast({
          title: "Error",
          description: `Failed to upload file ${file.name}.`,
          status: "error",
        });
        // console.error(`Error uploading file ${file.name}:`, error); // Debugging
      }
    }

    if (successCount > 0) {
      toast({
        title: "All files uploaded",
        description: `Successfully uploaded ${successCount} file(s)!`,
        status: "success",
      });
    }

    setIsUploading(false); // End the upload process
    // console.log("All files uploaded. Clearing selected files."); // Debugging
    setSelectedFiles([]); // Clear after upload
  };

  return (
    <div className="multi-image-upload">
      <h2 className="text-lg font-bold mb-4">Upload Multiple Images</h2>

      {/* File Input */}
      {/* <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-4"
      /> */}

      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-4"
      />

      {/* Preview Section */}
      <div className="image-preview grid grid-cols-2 gap-4 mb-4">
        {selectedFiles.map((file, index) => (
          <div key={index} className="preview-item">
            <img
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              className="h-32 w-32 object-cover rounded"
              onLoad={() => console.log(`Preview loaded for ${file.name}`)} // Debugging
            />
            <p className="text-sm mt-2">{file.name}</p>
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <button
        onClick={uploadAllImages}
        disabled={isLoading || isUploading}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {isUploading
          ? "Uploading..."
          : isLoading
          ? "Processing..."
          : "Upload Images"}
      </button>

      <button
        onClick={cancelUpload}
        className="bg-red-500 text-white py-2 px-4 rounded ml-6 hover:bg-red-600 mt-2"
      >
        Cancel Upload
      </button>

      {/* Cancel Button */}
      {isUploading && (
        <button
          onClick={cancelUpload}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-2"
        >
          Cancel Upload
        </button>
      )}
    </div>
  );
};

export default MultiImageUpload;
