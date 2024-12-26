import { useNavigate } from "react-router-dom";
import restrictImage from "../../assets/images/restrict.svg";

const RestrictionModal = ({ onClose }) => {
const navigate = useNavigate()


const handleEnter = () => {
  navigate("/auth/login")
}
 
  return (
    <div className="border-none shadow-lg rounded-2xl w-[95vw]  md:w-[500px]  lg:w-[500px] h-auto bg-black bg-opacity-50">
      <div className="flex flex-col px-2 py-6 justify-center items-center gap-2 lg:gap-4 text-white">
        <img
          src={restrictImage}
          alt="restrict"
          className="lg:w-[150px] lg:h-[150px]"
        />
        <p className="lg:text-4xl text-2xl font-bold">Warning</p>
        <p className="lg:text-2xl font-semibold">
          This site is for adults only!
        </p>
        <p className="lg:text-xl text-sm text-center">
          Content of this website is available only to adults.
        </p>
        <p className="lg:text-lg text-center">
          If you want to continue and have the legal age in your country, please
          click on the confirm button to continue, otherwise click on exit.
        </p>
        <button  onClick={handleEnter} className="lg:text-xl bg-gradient-to-r from-pink-500 via-blue-600 to-pink-600 py-1 px-10 rounded-md">
          I am 18+ years old <br />
          <span className="lg:text-2xl font-semibold text-lg">Enter</span>
        </button>
        {/* Call onClose prop when you want to close the modal */}
        <button
          className="text-red-500 font-semibold lg:text-3xl text-xl"
          onClick={onClose}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default RestrictionModal;
