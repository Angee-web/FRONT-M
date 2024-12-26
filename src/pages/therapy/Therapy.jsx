import React from "react";
import Selecton from "./Category";
import PaginationButtons from "@/components/ui/pagnationButton";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Therapists from "./Therapists";
import Calendar from "./Calender";


const Therapy = () => {
  const navigate = useNavigate();

 const goBack = () => {
   window.history.back();
   setTimeout(() => {
     window.scrollTo(0, 0);
   }, 100); // Delay to ensure navigation completes
 };


  return (
    <div style={{ backgroundColor: "#F5F5DC" }}>
      {" "}
      <div className="pt-6">
        {/* arrow to go back */}
        <div className=" pl-6">
          <button onClick={goBack}>
            <FaArrowLeftLong className="mt-10 w-[40px] h-[20px] text-pink-500" />
          </button>
        </div>

        {/* drop downs */}
        <div>
          <Selecton />
        </div>

        {/* after dropdown */}
        <div>
          <Calendar />
        </div>

        {/* therapy cards */}
        <div>
          <Therapists />
        </div>

        {/* next buttons */}
        <div className="flex items-center justify-between p-4 pb-24">
          <div className=" mb-24">
            <PaginationButtons />
          </div>

          {/* dropdown */}
          <div className="flex items-center justify-center gap-2 font-semibold text-md mb-20">
            <select className="py-2 px-4 border-2 border-blue-400 rounded-md">
              <option>4</option>
            </select>
            <p>Providers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Therapy;
