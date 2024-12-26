
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TherapistProfile from "./OpenDisplay";

// Inside your modal component
const ModalComponent = ({ therapist }) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal when the location is '/bookings'
  useEffect(() => {
    if (location.pathname === "/bookings") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [location]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          id="bookings"
        >
          {/* Modal Content */}
          <div
            id="bookings"
            className="relative bg-white rounded-lg shadow-lg max-w-lg w-[90vw] max-h-[90vh] overflow-y-auto"
          >
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
              <p className="fint">{therapist?.therapyType?.join(" / ")}</p>
              <p>
                {therapist?.firstName} is available for on-site audio calls.
              </p>
              <div className="mt-8">
                <TherapistProfile />
              </div>
              <div className="flex items-center justify-center m-auto mt-12">
                <a href="#bookings" className="lg:text-lg">
                  <button className="mt-4 border py-2 px-6 bg-gradient-to-r from-pink-400 via-blue-600 to-pink-600 rounded-3xl md:text-sm mb-4 w-fit text-white lg:text-lg">
                    Book Appointment
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
  );
};

export default ModalComponent;
