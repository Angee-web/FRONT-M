import { getTherapistById } from "@/store/therapy/therapist-slice";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MdEdit  } from "react-icons/md";


const TherapistView = () => {
  const { id } = useParams(); // Get the id from the URL
  const dispatch = useDispatch();
  const [therapist, setTherapist] = useState(null); // Local state for therapist data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError("No therapist ID provided.");
      return;
    }

    // Fetch therapist data from API when the id changes
    const fetchTherapist = async () => {
      try {
        setLoading(true);
        const resultAction = await dispatch(getTherapistById(id)).unwrap();
        // console.log("Fetched therapist data:", resultAction); // Log the response to debug
        setTherapist(resultAction.therapist); // Set therapist data in state
      } catch (error) {
        console.error("Failed to fetch therapist data:", error);
        setTherapist(null); // Clear therapist data if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchTherapist(); // Fetch data when the component mounts or id changes
  }, [id, dispatch]); // Re-fetch if id changes

  const goBack = () => {
    window.history.back();
  };

  // Placeholder data to show while loading
  const placeholderText = "Therapist...";
  const therapistData = therapist || {
    firstName: placeholderText,
    lastName: placeholderText,
    email: placeholderText,
    mobile: placeholderText,
    dob: "yyyy-MM-dd",
    gender: placeholderText,
    maritalStatus: placeholderText,
    ageRange: placeholderText,
    zodiacSign: placeholderText,
    languages: [placeholderText],
    stateOfPractice: placeholderText,
    summary: placeholderText,
    degree: placeholderText,
    yearsOfPractice: placeholderText,
    institute: placeholderText,
    imageUrl: "https://via.placeholder.com/150",
  };

  const goToEdit = () => {
    navigate(`/admin/editTherapist/${therapist._id}`, {
      state: { therapistData },
    });
    // console.log("Edit therapist data:", therapistData);
  };


  return (
    <div>
      <div className="py-0 lg:pb-20">
        {/* Back Button */}
        <div className=" pl-4 lg:pl-[5rem] ">
          <button onClick={goBack} type="button">
            <FaArrowLeftLong className="mt-10 w-[40px] h-[20px] text-pink-500" />
          </button>
        </div>

        <div className="px-4 pt-4 lg:px-12 lg:mx-24">
          {/* Profile Section */}
          <div className="flex justify-between items-center mb-10">
            <p className="font-semibold">My Profile</p>
            <div>
              <p className="px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md text-sm">
                Top up
              </p>
            </div>
          </div>

          {/* Therapist Header */}
          <div className="flex justify-between p-2 lg:p-6 border-2 border-slate-200 rounded-3xl">
            <div className="flex flex-col lg:flex-row  mt-6 gap-2 items-center pt-4">
              <img
                src={therapistData.imageUrl}
                alt="therapist"
                className="lg:w-44 lg:h-44 rounded-full w-36 h-36"
              />
              <div>
                <p className="font-bold text-lg">
                  {therapistData.firstName} {therapistData.lastName}
                </p>
                <p className="text-sm">
                  {therapistData.stateOfPractice}, Nigeria
                </p>
              </div>
            </div>

            <button className="w-12 h-6 flex items-center justify-center border-2 border-slate-200 rounded-lg shadow-md">
              <MdEdit onClick={goToEdit} className="text-blue-500" />
            </button>
          </div>

          {/* Personal details */}
          <div className="flex flex-col justify-between p-2 lg:p-6 border-2 border-slate-200 rounded-3xl mt-5">
            <div className="flex justify-between pt-4">
              <p className="font-semibold text-lg">Personal Information</p>
              <button className="w-12 h-6 flex items-center justify-center border-2 border-slate-200 rounded-lg shadow-md">
                <MdEdit onClick={goToEdit} className="text-blue-500" />
              </button>
            </div>

            <div className="pt-4 space-y-2 lg:flex gap-20">
              <div>
                <p className="font-semibold">First Name:</p>
                <p>{therapistData.firstName}</p>

                <p className="font-semibold">Last Name:</p>
                <p>{therapistData.lastName}</p>

                <p className="font-semibold">Email:</p>
                <p>{therapistData.email}</p>

                <p className="font-semibold">Mobile Number:</p>
                <p>{therapistData.mobile}</p>
              </div>

              <div>
                <p className="font-semibold">Date of Birth:</p>
                <p>{therapistData.dob}</p>

                <p className="font-semibold">Gender:</p>
                <p>{therapistData.gender}</p>

                <p className="font-semibold">Marital Status:</p>
                <p>{therapistData.maritalStatus}</p>

                <p className="font-semibold">Age Range:</p>
                <p>{therapistData.ageRange}</p>
              </div>

              <div>
                <p className="font-semibold">Zodiac Sign:</p>
                <p>{therapistData.zodiacSign}</p>

                <p className="font-semibold">
                  Languages Spoken By This Provider:
                </p>
                <p>
                  {Array.isArray(therapistData.languages)
                    ? therapistData.languages.map((lang, index) => (
                        <React.Fragment key={index}>
                          {lang}
                          <br />
                        </React.Fragment>
                      ))
                    : "No languages available"}
                </p>

                <p className="font-semibold">State of Practice:</p>
                <p>{therapistData.stateOfPractice}</p>
              </div>
            </div>
          </div>

          {/* First Bio */}
          <div className="flex flex-col justify-between p-2 lg:p-6 border-2 border-slate-200 rounded-3xl mt-5">
            <div className="flex justify-between py-4 ">
              <p className="font-semibold text-lg">Bio Description</p>
              <button className="w-12 h-6 flex items-center justify-center border-2 border-slate-200 rounded-lg shadow-md">
                <MdEdit onClick={goToEdit} className="text-blue-500" />
              </button>
            </div>
            <p>{therapistData.summary}</p>
          </div>

          {/* Education and Training */}
          <div className="flex flex-col justify-between p-2 lg:p-6 border-2 border-slate-200 rounded-3xl mt-5">
            <div className="flex justify-between py-4 ">
              <p className="font-semibold text-lg">Education and Training</p>
              <button className="w-12 h-6 flex items-center justify-center border-2 border-slate-200 rounded-lg shadow-md">
                <MdEdit onClick={goToEdit} className="text-blue-500" />
              </button>
            </div>
            <div className=" lg:flex gap-14">
              <div>
                <p className="font-semibold">Graduating Degree:</p>
                <p>{therapistData.degree}</p>
              </div>

              <div>
                <p className="font-semibold">Years In Practice:</p>
                <p>{therapistData.yearsOfPractice} Years</p>
              </div>

              <div>
                <p className="font-semibold">Graduating Institute:</p>
                <p>{therapistData.institute}</p>
              </div>
            </div>
          </div>

          {/* edit mode */}

          {/* edit mode */}
        </div>
      </div>
    </div>
  );
};

export default TherapistView;
