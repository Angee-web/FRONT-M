import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTherapist } from "@/store/therapy/therapist-slice";
import { MdDelete } from "react-icons/md";


const TherapistCard = ({ therapist }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!therapist || !therapist._id) {
    return (
      <div className="text-red-500">Therapist data is missing or invalid.</div>
    );
  }

  const handleCardClick = () => {
    navigate(`/admin/edit/${therapist._id}`);
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation(); // Prevent triggering the card click event
    if (window.confirm("Are you sure you want to delete this therapist?")) {
      try {
        await dispatch(deleteTherapist(therapist._id)).unwrap();
        alert("Therapist deleted successfully.");
      } catch (error) {
        console.error("Failed to delete therapist:", error);
        alert("Failed to delete therapist.");
      }
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer border rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col lg:flex-row justify-center gap-5 items-center lg:w-[500px]"
    >
      <div>
        <img
          src={therapist.imageUrl || "/path-to-your-default-image.jpg"}
          alt={`${therapist.firstName || "Unknown"}'s Profile`}
          className="w-[150px] h-[150px] md:w-36 md:h-36 lg:w-[200px] lg:h-[200px] mb-4 rounded-full border-4 border-gray-300 object-cover mx-auto"
        />
      </div>

      <div className="text-center">
        <p className="text-lg font-bold">
          {therapist.firstName || "First Name"}{" "}
          {therapist.lastName || "Last Name"}
        </p>
        <p className="text-sm text-gray-500">
          {therapist.specialty || "Specialty not available"}
        </p>
      </div>

      <button
        onClick={handleDeleteClick}
        className="text-red-500 hover:text-red-700"
        title="Delete Therapist"
      >
        <MdDelete className="w-8 h-8" />
      </button>
    </div>
  );
};

export default TherapistCard;
