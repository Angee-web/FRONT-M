import React from "react";
import "../../index.css";
import { MdOutlinePhoneInTalk } from "react-icons/md";

const OpeningsList = ({ openings }) => {
  // Helper function to format date to something like "Monday, October 1st"
  const formatDate = (dateString) => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Filter openings to show only current or future dates
  const filteredOpenings = openings.filter((opening) => {
    const openingDate = new Date(opening.day); // Parse the date from opening.day
    const today = new Date(); // Current date
    today.setHours(0, 0, 0, 0); // Ensure comparison is only by date, ignoring time
    return openingDate >= today; // Include if the date is today or in the future
  });

  return (
    <div className="openings-list">
      {filteredOpenings.map((opening, index) => (
        <div key={index} className="opening-day mb-4 playfair-display-select">
          <h2 className="text-lg font-medium mb-2">
            {formatDate(opening.day)}
          </h2>
          <div className="time-slots flex flex-wrap gap-2">
            {opening.times.map((time, idx) => (
              <div key={idx} className="time-slot-container ">
                <span className="time-slot px-3 py-1 rounded bg-gray-200 text-gray-800 text-sm flex items-center gap-2">
                  {time}
                  <MdOutlinePhoneInTalk />
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OpeningsList;
