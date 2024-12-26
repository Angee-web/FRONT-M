import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTherapists } from "@/store/therapy/therapist-slice";
import { TherapyCards } from "./TeenTherapyCards";

const Therapists = () => {
  const dispatch = useDispatch();
  const { therapists, loading, error } = useSelector(
    (state) => state.therapists
  );

  useEffect(() => {
    console.log(therapists);
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

  const imageArray = [
    "https://media.istockphoto.com/id/1180991516/vector/doctor-help-pattient-mental-treatment-problems-vector-psychology-concept.jpg?s=612x612&w=0&k=20&c=jD9j8gZY_0xfJRjjepHgfbVPN6fu0Rli8mZP4LP8B7k=",

    "https://st2.depositphotos.com/3474627/45987/v/380/depositphotos_459876048-stock-illustration-psychology-therapy-counseling-vector-concept.jpg",

    "https://media.istockphoto.com/id/1226372771/vector/family-therapy-session-semi-flat-rgb-color-vector-illustration-parenting-difficulties.jpg?s=612x612&w=0&k=20&c=uoemEqBlqulcf3pSBkhZyQkxZhebJaaYN5GgmzcbyaY=",

    "https://media.istockphoto.com/id/2129172392/vector/women-sitting-on-couch-together-support-each-other-mother-consoles-her-depressed-daughter.jpg?s=612x612&w=0&k=20&c=9QazBmnlBc8hzqRTHuqy27d1QbdN4PuLSEUFn03HF0k=",
  ];

  // Check if therapists is an array before mapping
  return (
    <div className="flex flex-wrap gap-5 my-10 justify-center">
      {Array.isArray(therapists) && therapists.length > 0 ? (
        therapists.map((therapist, index) => (
          <TherapyCards
            key={therapist._id}
            therapist={therapist}
            imageArray={imageArray}
            index={index} // Passing the index to select the image
          />
        ))
      ) : (
        <p>No therapists found.</p>
      )}
    </div>
  );
};

export default Therapists;
