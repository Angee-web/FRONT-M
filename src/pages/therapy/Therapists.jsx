import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TherapyCards } from "./TherapyCards";
import { getAllTherapists } from "@/store/therapy/therapist-slice";

const Therapists = () => {
  const dispatch = useDispatch();
  const { therapists, loading, error } = useSelector(
    (state) => state.therapists
  );

  useEffect(() => {
    // console.log(therapists);
    dispatch(getAllTherapists());
  }, [dispatch]);

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
   
  // Check if therapists is an array before mapping
  return (
    <div className="flex flex-wrap gap-5 my-10 justify-center">
      {Array.isArray(therapists) && therapists.length > 0 ? (
        therapists.map((therapist) => (
          <TherapyCards key={therapist._id} therapist={therapist} />
        ))
      ) : (
        <p>No therapists found.</p>
      )}
    </div>
  );
};

export default Therapists;
