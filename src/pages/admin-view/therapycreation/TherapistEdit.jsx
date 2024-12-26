import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IoCameraReverseOutline } from "react-icons/io5";
import { updateTherapist } from "@/store/therapy/therapist-slice";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";
import useImageUpload from "../image-upload/UseImage";

const TherapistEdit = ({ therapistData: propTherapistData }) => {
  const location = useLocation();
  const locationTherapistData = location.state?.therapistData;

  const [therapist, setTherapist] = useState(
    locationTherapistData || propTherapistData || {}
  );

  const dispatch = useDispatch();
  const { toast } = useToast();

  const {
    imageFile,
    uploadedImageURL,
    isLoading: isImageUploading,
    handleImageChange,
    uploadImage,
    setImageFile,
    setUploadedImageURL,
  } = useImageUpload("http://localhost:5000/api/admin/products/uploads");

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  useEffect(() => {
    if (uploadedImageURL) {
      setTherapist((prev) => ({ ...prev, imageUrl: uploadedImageURL }));
    }
  }, [uploadedImageURL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTherapist({ ...therapist, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const updatedData = { ...therapist, imageUrl: uploadedImageURL };

    // Dispatch the thunk with the token and data
    const updateResponse = await dispatch(
      updateTherapist({ data: updatedData, token })
    ).unwrap();

    if (updateResponse.success) {
      toast({
        title: "Success!",
        description: "Changes saved successfully!",
        status: "success",
        duration: 5000,
      });

      window.history.back();
    } else {
      throw new Error(updateResponse.message || "Failed to save changes.");
    }
  } catch (error) {
    let errorMessage = "Failed to save changes.";
    if (error.response) {
      console.error("Server Error:", error.response.data);
      errorMessage =
        error.response.data?.message ||
        `Server Error: ${error.response.statusText} (${error.response.status})`;
    } else if (error.request) {
      console.error("No Response Received:", error.request);
      errorMessage = "No response from the server. Please try again later.";
    } else {
      console.error("Error:", error.message);
      errorMessage = error.message || "An unexpected error occurred.";
    }

    toast({
      title: "Error!",
      description: errorMessage,
      status: "error",
      duration: 5000,
    });
  }
};


  const handleDeleteImage = () => {
    setImageFile(null);
    setUploadedImageURL("");
    setTherapist((prev) => ({ ...prev, imageUrl: "" }));
  };

  const goBack = () => window.history.back();

  return (
    <div className="py-10">
      {/* Back Button */}
      <div className="block mb-8 lg:ml-14 ">
        <button onClick={goBack}>
          <FaArrowLeftLong className="pl-4 w-[40px] h-[20px] text-pink-500" />
        </button>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[90vw] lg:w-1/2 bg-white p-10 rounded-lg shadow-md">
          {/* Image and Upload/Delete Buttons */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative h-32 w-32 lg:w-44 lg:h-44 rounded-full border-2 border-gray-300 overflow-hidden">
              {/* Display the image */}
              <img
                src={
                  uploadedImageURL ||
                  therapist.imageUrl ||
                  "https://via.placeholder.com/180"
                }
                alt="Therapist Avatar"
                className="object-cover w-full h-full"
              />

              {/* Camera icon overlay, visible only when no image is uploaded */}
              {!(uploadedImageURL || therapist.imageUrl) && (
                <label
                  htmlFor="upload"
                  className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white text-sm cursor-pointer"
                >
                  <IoCameraReverseOutline className="w-8 h-8 p-1 rounded-full bg-blue-500 " />
                </label>
              )}
            </div>

            <div className="flex items-center justify-center gap-8">
              {/* Button for Uploading New Image */}
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => document.getElementById("upload").click()}
                type="button"
              >
                Upload New
              </button>

              {/* Hidden input field for file selection */}
              <input
                type="file"
                id="upload"
                className="hidden"
                onChange={(e) => handleImageChange(e.target.files[0])}
              />

              {/* Button for Deleting the Image */}
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleDeleteImage}
                type="button"
              >
                Delete Avatar
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={therapist.firstName || ""}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={therapist.lastName || ""}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Email and Mobile Number */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={therapist.email || ""}
                  onChange={handleInputChange}
                  placeholder="example@example.com"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={therapist.phone || ""}
                  onChange={handleInputChange}
                  placeholder="+234"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Gender and Zodiac Sign */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700">
                  Gender
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={therapist.gender === "male"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />{" "}
                    Male
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={therapist.gender === "female"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />{" "}
                    Female
                  </label>
                </div>
              </div>
              <div>
                <label className="block font-semibold text-gray-700">
                  Zodiac Sign
                </label>
                <input
                  type="text"
                  name="zodiacSign"
                  value={therapist.zodiacSign || ""}
                  onChange={handleInputChange}
                  placeholder="Cancer"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* D.O.B, Marital Status, Age Range */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-gray-700">
                  D.O.B
                </label>
                <input
                  type="date"
                  name="dob"
                  value={therapist.dob || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  value={therapist.maritalStatus || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700">
                  Age Range
                </label>
                <select
                  name="ageRange"
                  value={therapist.ageRange || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>18-28</option>
                  <option>28-38</option>
                  <option>38-48</option>
                  <option>48-58</option>
                  <option>59+</option>
                </select>
              </div>
            </div>

            {/* Languages, State of Practice */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700">
                  Languages Spoken
                </label>
                <input
                  type="text"
                  name="languages"
                  value={therapist.languages || ""}
                  onChange={handleInputChange}
                  placeholder="English, Yoruba"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700">
                  State of Practice
                </label>
                <input
                  type="text"
                  name="stateOfPractice"
                  value={therapist.stateOfPractice || ""}
                  onChange={handleInputChange}
                  placeholder="Lagos"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isImageUploading}
              className={`w-full px-4 py-2 text-white rounded-md ${
                isImageUploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500"
              }`}
            >
              {isImageUploading ? "Uploading Image..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TherapistEdit;
