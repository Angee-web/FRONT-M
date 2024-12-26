import React, { useState } from "react";
import { IoChevronUpOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import "../../index.css";

const questions = [
  {
    id: 1,
    question: "What is therapy?",
    answer:
      "Therapy is a confidential, supportive space where you can talk openly about your feelings, thoughts and challenges with a trained professional. The goal is to help you understand your emotions, develop coping strategies and improve your overall mental and emotional well-being",
  },
  {
    id: 2,
    question: "How do i Know you need a therapy?",
    answer:
      "If you're feeling overwhelmed, anxious, depressed, or stuck, therapy can help. If you find it difficult to manage stress, relationships, or life transitions or if you want to talk to someone who can provide professional insight, therapy could be beneficial",
  },
  {
    id: 3,
    question: "What should i expect from my first session?",
    answer:
      "Your first session is typically a chance to get to know your therapist and discuss the why you are seeking therapy. You can talk about your goals, ask questions, and decide if the therapist is the right fit for you. It’s a relaxed, no-pressure conversation aimed at understanding your needs.",
  },
  {
    id: 4,
    question: "What if i don't feel comfortable with my therapist?",
    answer:
      "It's important to feel comfortable with your therapist. If you don't feel the connection you get a hoping for, you can always request to switch therapist. We want to ensure you find the right fit for your journey.",
  },
];

const LandingQuestion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = (id) => {
    setIsOpen((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 gap-5 p-5">
      <div className="flex flex-col justify-center items-center text-center text-2xl font-bold pacifico-regular montez-regular">
        <h1 className="text-[23px] lg:text-2xl">We’re Here to Answer All your </h1>
        <h2 className="text-blue-700">Questions</h2>
      </div>
      <div className="h-auto max-w-lg ">
        <div>
          {questions.map((question) => (
            <div key={question.id} className="border-b border-gray-200 ">
              <div className="flex justify-between items-center py-4 ">
                <h3 className="text-lg font-semibold">{question.question}</h3>
                <button
                  onClick={() => handleToggle(question.id)}
                  className="text-blue-500"
                >
                  {isOpen === question.id ? (
                    <IoChevronUpOutline className="ml-6" />
                  ) : (
                    <FaChevronDown className="ml-6" />
                  )}
                </button>
              </div>
              {isOpen === question.id && (
                <p className="py-4">{question.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingQuestion;
