import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const PaginationButtons = () => {
  // State to track the active page (default to page 1)
  const [activePage, setActivePage] = useState(1);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <div className="mt-4 flex ">
      {/* Button for Page 1 */}
      <button
        onClick={() => handlePageChange(1)}
        className={`text-md border-none rounded-full px-3 py-1 
          ${
            activePage === 1
              ? "bg-blue-400 text-white"
              : "text-blue-600 border-blue-600"
          }`}
      >
        1
      </button>

      {/* Button for Page 2 */}
      <button
        onClick={() => handlePageChange(2)}
        className={`text-md border-none rounded-full px-3 py-1 
          ${
            activePage === 2
              ? "bg-blue-400 text-white"
              : "text-blue-600 border-blue-600"
          }`}
      >
        2
      </button>

      <div className="mt-1 flex items-center justify-center gap-2">
        <p className="font-semibold">Next</p>
        <a href="#">
          <IoIosArrowForward />
        </a>
      </div>
    </div>
  );
};

export default PaginationButtons;
