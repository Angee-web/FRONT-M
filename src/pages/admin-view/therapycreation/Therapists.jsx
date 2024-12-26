import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTherapists } from "@/store/therapy/therapist-slice";
import { useNavigate } from "react-router-dom"; // Assuming React Router is used for navigation
import { IoAdd } from "react-icons/io5"; // Plus icon
import TherapistCard from "./TherapistCard";

const Therapists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { therapists, loading, error } = useSelector(
    (state) => state.therapists
  );

  useEffect(() => {
    console.log("Fetching therapists...");
    dispatch(getAllTherapists()); // Dispatch the action to fetch therapists
  }, [dispatch]);

  // Log the therapists state for debugging purposes
  useEffect(() => {
    console.log("Therapists data:", therapists);
  }, [therapists]);

  if (loading)
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <p className="text-center font-bold text-3xl">Loading...</p>
        <div className="mt-4 border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );

  if (error) {
    return <p>Error: {typeof error === "string" ? error : error.message}</p>;
  }

  return (
    <div className="relative flex items-center justify-center my-10 lg:my-5">
      <div className="absolute top-4 left-4 flex gap-4 items-center">
        <p className="font-semibold">Add New Therapist</p>
        {/* Plus icon for adding a new therapist */}
        <button
          onClick={() => navigate("/admin/add-therapist")}
          className=" bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600"
        >
          <IoAdd className="w-6 h-6" />
        </button>

       
      </div>

      {/* Therapists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-24">
        {Array.isArray(therapists) && therapists.length > 0 ? (
          therapists.map((therapist) => (
            <TherapistCard key={therapist._id} therapist={therapist} />
          ))
        ) : (
          <p>No therapists found.</p>
        )}
      </div>
    </div>
  );
};

export default Therapists;
