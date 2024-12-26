
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const TherapistInfo = ({ therapist }) => {
  const navigate = useNavigate();

  // Function to go back to the previous page
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="lg:hidden block pl-6">
        <button onClick={goBack}>
          <FaArrowLeftLong className="mt-10 w-[40px] h-[20px] text-pink-500" />
        </button>

        <div className="flex justify-center">
          <img
            src={therapist?.imageUrl || "/path-to-your-image.jpg"}
            alt="therapist"
            className="w-40 h-40 rounded-full"
          />
        </div>

        <div className="flex justify-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            {therapist?.name || "Name not available"}
          </h2>
        </div>

        <div className="flex justify-center">
          <p className="text-md text-black">
            {therapist?.specialty || "Specialty not available"}
          </p>
        </div>

        <div className="flex justify-center">
          <p className="text-md text-black">
            {therapist?.email || "Email not available"}
          </p>
        </div>

        {/* Add more details as needed */}
        <div className="flex justify-center">
          <p className="text-md text-black">
            {therapist?.description || "Description not available"}
          </p>
        </div>
        <div className="flex justify-center">
          <p className="text-md text-black">
            {therapist?.institute || "Institute not available"}
          </p>
        </div>
        <div className="flex justify-center">
          <p className="text-md text-black">
            {therapist?.yearsOfPractice || "Years of practice not available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TherapistInfo;
