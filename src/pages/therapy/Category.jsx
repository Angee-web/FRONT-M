import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoChevronUpOutline } from "react-icons/io5";
import "../../index.css";

const selecton = [
  {
    id: 1,
    selecton: "CLINICAL GENDER",
  },
  {
    id: 2,
    selecton: "SERVICE TYPE",
  },
  {
    id: 3,
    selecton: "CLIENT AGE",
  },
  {
    id: 4,
    selecton: "LANGUAGE",
  },
];

const Selecton = () => {
  const [isOpen, setIsOpen] = useState(null);

  const handleToggle = (id) => {
    setIsOpen((prevId) => (prevId === id ? null : id));
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row md:flex-row md:gap-3 lg:px-16 md:mx-4 items-center justify-between px-4 py-2 mx-16">
        {selecton.map((item) => (
          <div
            key={item.id}
            className="playfair-display-select flex items-center justify-between border-2 border-slate-300 rounded-full mb-4 lg:py-4 lg:px-6 lg:mb-0 lg:mr-4 bg-white transition-shadow duration-200 hover:shadow-md whitespace-nowrap py-2 px-4"
          >
            <p className="text-[15px]">{item.selecton}</p>
            <button
              onClick={() => handleToggle(item.id)}
              className="text-lg text-gray-400"
            >
              {isOpen === item.id ? (
                <IoChevronUpOutline className="ml-2 w-4 h-4 text-black" />
              ) : (
                <FaChevronDown className="ml-2 w-4 h-4 text-black" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Selecton;
