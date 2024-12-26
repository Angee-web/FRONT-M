import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpeningsList from "./OpeningsList";
import { getTherapistById } from "@/store/therapy/therapist-slice";

const TherapistProfile = ({ therapistId }) => {
  // Add therapistId as a prop
  const dispatch = useDispatch();
  const { therapist, loading, error } = useSelector(
    (state) => state.therapists
  );

  useEffect(() => {
    if (therapistId) {
      dispatch(getTherapistById(therapistId));
    }
  }, [dispatch, therapistId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {therapist ? (
        <div>
          {/* Remove therapist.name */}
          <OpeningsList openings={therapist.openings} />
        </div>
      ) : (
        <p>No therapist found.</p>
      )}
    </div>
  );
};

export default TherapistProfile;
