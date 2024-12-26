import React from "react";
import Selecton from "../Category";
import PaginationButtons from "@/components/ui/pagnationButton";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Therapists from "./TeenTherapists";
// import Therapists from "../TeenTherapists";

const Therapy = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Takes the user one page back in history
  };

  return (
    <div className="bg-[linear-gradient(to_bottom_right,_rgba(249,_168,_212,_0.7)_0%,_rgba(96,_165,_250,_0.7)_50%,_rgba(134,_239,_172,_0.7)_100%)]">
      {" "}
      <div className="pt-6">
        {/* arrow to go back */}
        <div className=" block pl-6">
          <button onClick={goBack}>
            <FaArrowLeftLong className="mt-10 w-[40px] h-[20px] text-pink-500" />
          </button>
        </div>

        {/* drop downs */}
        <div>
          <Selecton />
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
