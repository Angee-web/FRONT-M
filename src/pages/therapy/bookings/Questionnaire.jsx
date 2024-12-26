import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postQuestionnaire,
  resetQuestionnaireState,
} from "@/store/therapy/question-slice";

const Questionnaire = ({ onComplete, onDataChange }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.questionnaire
  );

  const [formValues, setFormValues] = useState({
    accountName: "",
    phone: "",
    email: "",
    brings: "",
    emotion: "",
    achieve: "",
    sought: "",
    other: "",
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
        brings: "",
        emotion: "",
        achieve: "",
        sought: "",
        other: "",
      });
      dispatch(resetQuestionnaireState()); // Reset success state
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
    // console.log(formValues); // Debugging: log form values
    dispatch(postQuestionnaire(formValues));
  };

  return (
    <div className="py-8">
      <div>
        <p className="font-bold text-xl text-center">Therapy Questionnaire</p>
      </div>

      <div className="flex flex-col items-center justify-center pt-8 px-4">
        <form
          className="flex flex-col gap-6 items-center justify-center lg:block space-y-4 lg:w-[60vw]"
          onSubmit={handleSubmit}
        >
          {/* Form fields */}
          <ol className="list-decimal space-y-3 ">
            <li className="space-y-2 w-full">
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
            </li>

            <li className="space-y-2 w-full">
              <label className="font-semibold" htmlFor="phone">
                Phone Number
              </label>
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
              <small className="text-xs text-gray-500">
                Format: +CountryCode PhoneNumber (e.g., +234 1234567890)
              </small>
            </li>

            <li className="space-y-2 w-full">
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
            </li>

            {/* Add other fields here */}
            <li className="space-y-2 w-full">
              <label className="font-semibold" htmlFor="brings">
                What brings you to therapy?
              </label>
              <input
                id="brings"
                type="text"
                value={formValues.brings}
                onChange={handleChange}
                placeholder="Therapy..."
                className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                required
              />
            </li>

            <li className="space-y-2 w-full">
              <label className="font-semibold" htmlFor="emotion">
                How would you describe your current emotional state?
              </label>
              <input
                id="emotion"
                type="text"
                value={formValues.emotion}
                onChange={handleChange}
                placeholder="I am...."
                className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                required
              />
            </li>

            <li className="space-y-2 w-full">
              <label className="font-semibold" htmlFor="achieve">
                What goals do you hope to achieve through therapy?
              </label>
              <input
                id="achieve"
                type="text"
                value={formValues.achieve}
                onChange={handleChange}
                placeholder="I hope to...."
                className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                required
              />
            </li>

            <li className="space-y-2 w-full">
              <label className="font-semibold" htmlFor="sought">
                Have you sought therapy or counseling before?
              </label>
              <input
                id="sought"
                type="text"
                value={formValues.sought}
                onChange={handleChange}
                placeholder="Yes I have/No I haven't...."
                className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                required
              />
            </li>

            <li className="space-y-2 w-full">
              <label className="font-semibold" htmlFor="other">
                Is there anything other you'd like your therapist to know about
                your current situation?
              </label>
              <textarea
                id="other"
                cols={30}
                rows={15}
                value={formValues.other}
                onChange={handleChange}
                placeholder="Yes there is/No there isn't...."
                className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                required
              />
            </li>
          </ol>
        </form>
      </div>
    </div>
  );
};

export default Questionnaire;
