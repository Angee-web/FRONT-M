import React, { useEffect, useState } from "react";
import { FaArrowLeftLong, FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTherapistById } from "@/store/therapy/therapist-slice";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineChair, MdOutlinePhoneInTalk } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { GiTripleYin } from "react-icons/gi";
import { TfiCreditCard } from "react-icons/tfi";
import { IoIosSchool } from "react-icons/io";
import TherapistProfile from "./OpenDisplay";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const TherapistDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation(); // Access the state passed through navigate

  const therapist = useSelector((state) => state.therapists.therapist);
  const loading = useSelector((state) => state.therapists.loading);
  const error = useSelector((state) => state.therapists.error);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    // console.log("modal is to open...");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const numberToWords = (num) => {
    const words = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
    ];
    return words[num] || num.toString(); // Fallback to number if out of bounds
  };

  // Trigger modal open if specified in location state
  useEffect(() => {
    if (location.state?.openModal) {
      openModal();
    }
  }, [location.state]);

  // Effect to fetch therapist data when the component mounts or ID changes
  useEffect(() => {
    if (id) {
      dispatch(getTherapistById(id));
    }
  }, [dispatch, id]);

  // Save therapist ID to localStorage after fetching
  useEffect(() => {
    if (therapist?.id) {
      localStorage.setItem("selectedTherapistId", therapist.id);
      // console.log("Therapist ID saved to localStorage:", therapist.id);
    }
  }, [therapist]);

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

  const handleScheduling = () => {
    navigate("/therapy/scheduling");
  };

  const goBack = () => {
    window.history.back();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100); // Delay to ensure navigation completes
  };

  // console.log("Therapist data:", therapist);

  return (
    <div className="block lg:flex lg:justify-between px-12 bg-[#F5F5DC] ">
      {/* first part */}
      <div className="pt-8">
        <div className=" ">
          <button onClick={goBack} type="button">
            <FaArrowLeftLong className="mt-10 w-[40px] h-[20px] text-pink-500" />
          </button>
        </div>
        <div className="flex flex-col">
          <div className="lg:flex justify-start gap-3">
            <div>
              <img
                src={therapist?.imageUrl || "default-image.jpg"}
                alt="therapist"
                className="w-[250px] h-[250px] md:w-36 md:h-36 lg:w-[200px] lg:h-[200px] mb-4 rounded-full border-4 border-gray-300 object-cover mx-auto"
              />
            </div>

            <div>
              <div className="mt-4">
                <h2 className="text-3xl font-semibold text-gray-900 lg:text-4xl">
                  {therapist?.firstName || "Name not available"} {therapist?.lastName || "Name is not available"}
                </h2>
              </div>

              <div className="">
                <p className="text-md text-black lg:text-lg">
                  {therapist?.specialty || "Specialty not available"}
                </p>
              </div>

              <div className="">
                <p className="text-md text-blue-700 lg:text-lg">
                  E-mail: {therapist?.email || "Email not available"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="flex items-center gap-2 text-[15px] lg:text-lg">
              <CiCalendar className="w-6 h-6" />
              {therapist?.openings && therapist.openings.length > 0
                ? `${numberToWords(therapist.openings.length)} (${
                    therapist.openings.length
                  }) Openings This Week`
                : "No Openings This Week"}
            </p>
            <p className="flex items-center gap-2 text-[15px] lg:text-lg">
              <BiCoinStack className="w-6 h-6" />5 Coins per Minute Audio Call
              Session
            </p>
            <p className="flex items-center gap-2 text-[15px] lg:text-lg">
              <MdOutlineChair className="w-6 h-6" />
              {therapist?.therapyType
                ?.join(", ")
                .replace(/, ([^,]*)$/, " and $1") + " Counseling" ||
                "Therapy type not available"}
            </p>
          </div>

          {/* buttons */}
          <div className="mt-4 flex flex-col justify-start gap-4 lg:flex-row lg:gap-2 lg:items-center mb-6 ">
            <button
              type="button"
              className="text-sm lg:text-[16px] border border-blue-600 rounded-full px-4 py-1 lg:px-6 text-blue-600 w-fit"
            >
              {therapist?.maritalStatus}
            </button>
            <button
              type="button"
              className="flex items-center lg:text-[16px] text-md bg-blue-600 text-white rounded-full px-3 py-1 gap-1 w-fit"
            >
              <MdOutlinePhoneInTalk className="w-5 h-5 lg:w-6 lg:h-6" />
              Call Now
            </button>
            <button
              type="button"
              className="w-fit flex items-center lg:text-[16px] text-md bg-green-500 text-white rounded-full px-3 py-1 gap-1"
            >
              <BsChatDots className="w-5 h-5 lg:w-6 lg:h-6" />
              Chat Now
            </button>

            <div className="playfair-display-select block lg:hidden md:hidden md:mb-2 ">
              <p className="border py-2 px-6 border-slate-300 rounded-3xl md:text-sm mb-4 w-fit ">
                {therapist?.yearsOfPractice} Years in Practice
              </p>
              <p className="border py-2 px-6 border-slate-300 rounded-3xl md:text-sm w-fit ">
                Client age: {therapist?.clientAge}
              </p>
              {/* Book Appointment Button */}
              {/* Book Appointment Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={openModal}
                  className="lg:mt-4 border py-2 px-6 bg-gradient-to-r from-pink-400 via-blue-600 to-pink-600 rounded-3xl md:text-sm mb-4 w-fit text-white"
                >
                  Book Appointment
                </button>
              </div>

              {/* Modal */}
              <AnimatePresence>
                {isModalOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                  >
                    {/* Modal Content */}
                    <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-[90vw] max-h-[90vh] overflow-y-auto">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="absolute top-2 right-2 text-white hover:text-gray-700 border-2 border-white py-1 px-2 rounded-full"
                      >
                        ✕
                      </button>

                      <div className="text-center bg-blue-500 text-xl text-white font-bold px-6 py-10 rounded-t-lg">
                        Book An Appointment
                      </div>
                      <div className="p-4">
                        <p className="fint">
                          {therapist?.therapyType?.join(" / ")}
                        </p>
                        <p>
                          {therapist?.firstName} is available for on-site audio
                          calls.
                        </p>
                        {/* Insert any other modal content */}
                        <div className="mt-8">
                          <TherapistProfile />
                        </div>
                        <div className="flex items-center justify-center m-auto mt-12">
                          <a href="#bookings" className="lg:text-lg">
                            <button className="mt-4 border py-2 px-6 bg-gradient-to-r from-pink-400 via-blue-600 to-pink-600 rounded-3xl md:text-sm mb-4 w-fit text-white lg:text-lg ">
                              <a onClick={handleScheduling}>Book Appointment</a>
                            </button>
                          </a>
                        </div>
                        <hr className="w-[100%] h-[2px] bg-slate-300 mx-0 mt-2" />
                        <div className="flex flex-col items-center justify-center gap-2 w-full mt-4 mb-8 text-lg">
                          <h3>Want Help Booking</h3>
                          <h3 className="text-blue-600">
                            <a href="tel:+2348093882468">
                              Call Us At (+234) 809 388 2468
                            </a>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="playfair-display-select hidden lg:block md:block w-fit lg:ml-0 ml-5">
              <p className="border p-2 border-slate-300 rounded-3xl lg:py-1 text-md ">
                Client age: {therapist?.clientAge}
              </p>
            </div>
          </div>
        </div>
        {/* About Section and Other Sections */}
        <div className="lg:w-[40vw]">
          <div className="mt-12 flex items-center gap-2">
            <img
              src={therapist?.imageUrl || "/path-to-your-image.jpg"}
              alt="therapist"
              className="w-12 h-12 rounded-full lg:12 lg:h-12"
            />
            <h3 className="text-xl font-semibold text-gray-900">
              About {therapist?.firstName || "Name not available"}
            </h3>
          </div>
          <hr className="w-50 h-[2px] bg-black mt-2" />
          <div>
            <p className="text-md text-black mt-4">
              Gender: {therapist?.gender || "Institute not available"}
            </p>
            <p className="text-md text-black mt-4">
              Age Range: {therapist?.ageRange}
            </p>
            <p className="text-md text-black mt-4 flex gap-1 items-center">
              Zodiac Sign: {therapist?.zodiacSign}{" "}
              <GiTripleYin className="text-blue-600" />
            </p>
            <p className="text-md text-black mt-4">
              {therapist?.summary || "Summary not available"}{" "}
            </p>
          </div>
        </div>
        {/* how to get coins */}
        <div className="lg:w-[40vw] mt-10">
          <p className="flex items-center gap-2 lg-text-xl font-semibold">
            <BiCoinStack className="w-6 h-6" />
            How To Get Coins To Pay For Sessions
          </p>
          <hr className="w-50 h-[2px] bg-black mt-2" />
          <p className="text-md mt-2">How It Works</p>
          <ol className="list-decimal pl-6 font-medium">
            <li className="text-md mt-2">
              <strong>Select a Coin Package:</strong>
              <span className="font-normal list-item-text">
                {" "}
                Choose From A Variety Of Packages That Fit Your Needs And
                Budget.
              </span>
            </li>
            <li className="text-md mt-2">
              <strong>Make A Secure Payment:</strong>
              <span className="font-normal list-item-text">
                {" "}
                Pay Using Your Preferred Payment Method Through Our Secure
                Checkout.
              </span>
            </li>
            <li className="text-md mt-2">
              <strong>Instant Top-up:</strong>
              <span className="font-normal list-item-text">
                {" "}
                Once Payment Is Complete, Your Account Will Be Instantly
                Credited With Your Talk Time Coins.
              </span>
            </li>
            <li className="text-md mt-2">
              <strong>Start Talking:</strong>
              <span className="font-normal list-item-text">
                {" "}
                Use Your Coins To Chat Or Call Without Interruptions.
              </span>
            </li>
          </ol>
        </div>
        {/* coins audio */}
        <div className="lg:w-[40vw] mt-10">
          <p className="flex items-center gap-2 lg-text-xl font-semibold  md:text-md">
            <TfiCreditCard className="w-6 h-6" />
            Coin Costs Per Audio Call / Messages Sessions
          </p>
          <hr className="w-50 h-[2px] bg-black mt-2" />
          <div className="flex flex-col lg:flex-row  gap-8 justify-start mt-6">
            <div className="space-y-3">
              <p>
                5 Coins / 1 Minute = <strong>₦1,000</strong>{" "}
              </p>
              <p>
                25 Coins / 5 Minutes = <strong>₦5,000</strong>{" "}
              </p>
              <p>
                50 Coins / 1= Minutes = <strong>₦10,000</strong>{" "}
              </p>
              <p>
                150 Coins / 30 Minutes = <strong>₦15,000</strong>{" "}
              </p>
              <p>
                300 Coins / 60 Minutes = <strong>₦20,000</strong>{" "}
              </p>
            </div>

            <div className="space-y-3">
              <p>
                5 Coins / 1 Message = <strong>₦100</strong>{" "}
              </p>
              <p>
                25 Coins / 5 Messages = <strong>₦500</strong>{" "}
              </p>
              <p>
                50 Coins / 10 Messages = <strong>₦1,000</strong>{" "}
              </p>
              <p>
                150 Coins / 30 Messages = <strong>₦1,500</strong>{" "}
              </p>
              <p>
                300 Coins / 60 Messages = <strong>₦2,000</strong>{" "}
              </p>
            </div>
          </div>
        </div>
        {/* education */}
        <div className="lg:w-[40vw] mt-10">
          <p className="flex items-center gap-2 md:text-md lg-text-xl font-semibold">
            <IoIosSchool className="w-6 h-6" />
            Education And Training
          </p>
          <hr className="w-50 h-[2px] bg-black mt-2" />
          <p className="mt-4 font-semibold">Years In Practice</p>
          <p>{therapist?.yearsOfPractice} Years</p>
          <p className="mt-4 font-semibold">Graduating Institute</p>
          <p>{therapist?.institute}</p>
          <p className="mt-4 font-semibold">Graduating Degree</p>
          <p>{therapist?.degree}</p>
        </div>
        {/* additional details */}
        <div className="lg:w-[40vw] mt-10 ">
          <p className="flex items-center gap-1 md:text-md lg-text-xl font-semibold">
            {/* <img
              src="https://t3.ftcdn.net/jpg/01/31/45/90/360_F_131459045_VJAQH4VTAz3Gb1yK9eFtJXKWhmr5XgHt.jpg"
              alt="therapist"
              className="w-10 h-10 bg-[#F5F5DC]"
            /> */}
            <FaMagnifyingGlass className="w-6 h-6" />
            Additional Details
          </p>
          <hr className="w-50 h-[2px] bg-black mt-2" />
          <p className="mt-4 font-semibold">
            Languages Spoken By This Provider
          </p>
          {/* <p>{therapist?.languages.split(/(?=[A-Z])/).join("\n")}</p> 
          this works if the language value is a string. it will display in block form */}
          {/* split the langauges in the array */}
          <p>
            {therapist?.languages?.map((lang, index) => (
              <React.Fragment key={index}>
                {lang}
                <br />
              </React.Fragment>
            ))}
          </p>

          <p
            className="mt-4 font-semibold
            "
          >
            State of Practice
          </p>
          <p className="pb-40">{therapist?.stateOfPractice}</p>
        </div>

        {/* Modal */}
      </div>

      {/* second part */}
      <div
        id="bookings"
        className="hidden lg:flex lg:flex-col rounded-2xl lg:w-[40vw] playfair-display-select items-center justify- mt-8"
      >
        <div className="border-none rounded-3xl pt-[16rem]">
          <p className="bg-blue-500 lg:text-2xl text-white w-full text-center font-bold p-6 fint rounded-t-3xl">
            Book An Appointment
          </p>
          <div className="flex flex-col items-start p-4 bg-white border-none rounded-b-2xl">
            <p className="fint">{therapist?.therapyType?.join(" / ")}</p>
            <p>{therapist?.firstName} Is Available For On-Site Audio Calls</p>
            <div className="mt-8 ">
              <TherapistProfile />
            </div>
            <div className="flex items-center justify-center m-auto mt-12">
              <a href="#bookings" className="lg:text-lg">
                <button className="mt-4 border py-2 px-6 bg-gradient-to-r from-pink-400 via-blue-600 to-pink-600 rounded-3xl md:text-sm mb-4 w-fit text-white lg:text-lg ">
                  <a onClick={handleScheduling}>Book Appointment</a>
                </button>
              </a>
            </div>
            <hr className="w-[100%] h-[2px] bg-slate-300 mx-0 mt-2" />
            <div className="flex items-center justify-center gap-2 w-full mt-4 mb-8 text-lg">
              <h3>Want Help Booking</h3>
              <h3 className="text-blue-600">
                <a href="tel:+2348093882468">Call Us At (+234) 809 388 2468</a>
              </h3>

              {/* test link to therapist upload */}
              {/* <Link to="/therapy/upload">THERAPIST UPLOAD</Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistDetails;
