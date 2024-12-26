import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RiErrorWarningLine } from "react-icons/ri";
import {
  postSchedule,
  resetScheduleState,
} from "@/store/therapy/schedule-slice";

const Scheduling = ({ onComplete, onDataChange }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.schedule);

  const [formValues, setFormValues] = useState({
    accountName: "",
    phone: "",
    email: "",
    dob: "",
    appointmentDate: "",
    appointmentTime: "",
    state: "",
    city: "",
  });

  // Use a ref to track the last submitted data to prevent loops
  const previousValues = useRef();

  // Pass form data upwards whenever it changes
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Parse the user object
    const therapist = JSON.parse(localStorage.getItem("therapist")); // Parse the therapist object

    const userId = user?.id; // Access user ID
    const therapistId = therapist?._id; // Access therapist ID

    // console.log("Therapist ID:", therapistId); // Debug log
    // console.log("User ID:", userId); // Debug log

    // Check if therapistId and userId are available
    if (therapistId && userId) {
      const updatedValues = {
        ...formValues,
        therapistId,
        userId,
      };

      // Only call onDataChange if data has changed
      if (
        JSON.stringify(previousValues.current) !== JSON.stringify(updatedValues)
      ) {
        previousValues.current = updatedValues; // Update ref to current values
        onDataChange(updatedValues); // Trigger the parent callback
      }
    } else {
      console.error("Therapist or User ID missing from localStorage");
    }
  }, [formValues, onDataChange]);

  // Check if the form is complete
  useEffect(() => {
    const isComplete = Object.values(formValues).every(
      (value) => value.trim() !== ""
    );
    onComplete(isComplete);
  }, [formValues, onComplete]);

  // Reset form on success
  useEffect(() => {
    if (success) {
      setFormValues({
        accountName: "",
        phone: "",
        email: "",
        dob: "",
        appointmentDate: "",
        appointmentTime: "",
        state: "",
        city: "",
      });
      dispatch(resetScheduleState()); // Reset success state
    }
  }, [success, dispatch]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get therapistId and userId from localStorage
    const therapistId = localStorage.getItem("therapistId");
    const userId = localStorage.getItem("userId");

    // Ensure both therapistId and userId exist in localStorage
    if (!therapistId || !userId) {
      console.error("Could not submit schedule. Missing therapistId or userId");
      return;
    }

    // Include therapistId and userId in the form data
    const scheduleData = {
      ...formValues,
      therapistId, // Add therapist ID from localStorage
      userId, // Add user ID from localStorage
    };

    // Pass data to parent component (onDataChange)
    if (onDataChange) {
      onDataChange(scheduleData); // Send all relevant data to parent
    }

    // console.log(scheduleData); // Debugging: log form data with IDs

    // Dispatch the action to post the schedule
    dispatch(postSchedule(scheduleData));
  };
  return (
    <div className="flex flex-col items-center justify-center bg-[#F5F5DC]">
      {/* body */}
      <div>
        {/* header2 */}
        <div className="flex flex-col items-center justify-center pt-8 px-6 gap-2 ">
          <div className="flex flex-col items-center justify-center lg:block lg:w-[60vw]">
            <p className="text-2xl font-semibold">Responsible Party</p>
            <p className="text-lg text-center lg:text-start pt-2 font-semibold">
              This person will be paying for services
            </p>
            <p className="text-center lg:hidden">
              <strong>Just a heads up:</strong> If you are creating an account,
              you must be 18 years or older. For minors, you must have a parent
              or legal guardian listed as the responsible party.
            </p>
          </div>
        </div>

        {/* form */}
        <div className="flex flex-col items-center justify-center pt-8 px-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 items-center justify-center lg:block lg:w-[60vw]"
          >
            {/* Input fields go here, e.g., accountName, phone, email, etc. */}
            <div className="space-y-2 w-full">
              <label className="font-semibold" htmlFor="accountName">
                Account Name
              </label>
              <input
                id="accountName"
                type="text"
                placeholder="Name used in creating the account"
                value={formValues.accountName}
                onChange={handleChange}
                className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                required
              />
            </div>

            <div className="space-y-2 w-full">
              <label className="font-semibold" htmlFor="phone">
                Phone Number
              </label>
              <div className="flex gap-2">
                <input
                  id="phone"
                  type="tel"
                  placeholder="+234 1234567890"
                  value={formValues.phone}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                  pattern="^\+\d{1,4}\s\d{7,12}$"
                  required
                />
              </div>
              <small className="text-xs text-gray-500">
                Format: +CountryCode PhoneNumber (e.g., +234 1234567890)
              </small>
            </div>

            <div className="space-y-2 w-full">
              <label className="font-semibold" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Email used in creating account"
                className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                required
              />
            </div>

            <div className="space-y-2 w-full">
              <label className="font-semibold" htmlFor="dob">
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                value={formValues.dob}
                onChange={handleChange}
                className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-x-2 gap-y-6 w-full">
              <div className="space-y-2 w-full">
                <label className="font-semibold" htmlFor="appointmentDate">
                  Date
                </label>
                <input
                  id="appointmentDate"
                  type="date"
                  value={formValues.appointmentDate}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                  required
                />
              </div>

              <div className="space-y-2 w-full">
                <label className="font-semibold" htmlFor="appointmentTime">
                  Time
                </label>
                <input
                  id="appointmentTime"
                  type="time"
                  value={formValues.appointmentTime}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                  required
                />
              </div>

              <div className="space-y-2 w-full">
                <label className="font-semibold" htmlFor="state">
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  value={formValues.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                  required
                />
              </div>

              <div className="space-y-2 w-full">
                <label className="font-semibold" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  value={formValues.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                  required
                />
              </div>
            </div>
          </form>
        </div>

        {/* condition */}
        <div className="flex  items-center justify-center pt-8 px-4 h-full mt-8 mb-10">
          <div className="flex  gap-6 items-center justify-center lg:w-[60vw] border rounded-3xl p-4 lg:p-6 bg-gray-300">
            <div className="mb-[12rem] lg:mb-20">
              <RiErrorWarningLine className="w-8 h-8 bg-blue-600 text-white rounded-full" />
            </div>
            <div>
              <p>
                By providing your phone number, you agree to receive text
                messages from Allsextoys for administrative and commercial
                purposes. Message and data rates may apply. <br />
                Message frequency varies. <br /> Opt-out of text notifications
                anytime by replying STOP.
              </p>
              <p className="hidden lg:flex">Mobile Terms and Conditions.</p>
            </div>
          </div>
        </div>
      </div>
      {/* body */}
    </div>
  );
};

export default Scheduling;
