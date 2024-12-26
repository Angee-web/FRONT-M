 import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import teenImage from "../../../assets/images/teen.svg";
import teenImageTwo from "../../../assets/images/teenTwo.svg";
 
 const TeenPage = () => {

    const goBack = () => {
      window.history.back();
    };

   return (
     <div className="bg-[#F5F5DC]">
       <div className="pt-6">
         {/* arrow to go back */}
         <div className="lg:hidden block pl-6">
           <button onClick={goBack}>
             <FaArrowLeftLong className="mt-10 w-[40px] h-[20px] text-pink-500" />
           </button>
         </div>

         {/* body */}
         <div className="flex flex-col  justify-end pt-10 pl-4 pb-24">
           {/* header */}
           <div className="lg:flex lg:items-center lg:justify-center lg:mx-12">
             <div>
               <div className=" lg:w-[40vw]">
                 <p className="text-[50px] font-bold">
                   "Your Teen{" "}
                   <span className="list-item-text-2 text-pink-600">
                     Deserves
                   </span>{" "}
                   To Be Heard"
                 </p>
                 <p className="text-md text-lg pt-6 pr-10 ">
                   Welcome to Teen Counseling! Get started today and get 20% off
                   your first session. Discount code "healthline-Ast" will be
                   automatically applied.
                 </p>
               </div>
               {/* consult button */}
               <div className="pt-6 pl-0">
                 <Link
                   to="/therapy/teenAppointment"
                   className=" bg-gradient-to-r from-blue-600 via-pink-700 to-purple-600 text-white py-4 px-8 font-semibold text-lg rounded-lg"
                 >
                   Consult with a Therapist
                 </Link>
               </div>
             </div>

             {/* image */}
             <img
               src={teenImage}
               //  srcSet={`${teenImageMedium} 768w, ${teenImageHighRes} 1200w`}
               sizes="(max-width: 768px) 70vw, (min-width: 769px) 50vw"
               alt="teen"
               className="pt-10 mx-auto lg:w-[40vw]"
               loading="lazy"
             />
           </div>

           <div className="lg:flex lg:items-center lg:justify-center lg:mx-12 lg:flex-row-reverse gap-14">
             <div className="lg:w-[40vw]">
               <p className="font-bold pt-4 pb-10">Teens</p>

               <p className="font-semibold text-4xl pr-1  pt-3">
                 Guiding your child to their brighter side
               </p>
               <p className="pt-3 text-lg font-semibold">
                 Help your child thrive with professional help.
               </p>

               <div className="pt-6 pl-0 w-full lg:pt-10">
                 <Link
                   to="/therapy/teenAppointment"
                   className=" bg-gradient-to-r from-blue-600 via-pink-700 to-purple-600 text-white py-4 px-24 lg:px-28 font-semibold text-lg rounded-lg text-center "
                 >
                   Book Now
                 </Link>
               </div>
             </div>

             {/* second image */}
             <img
               src={teenImageTwo}
               alt="teen"
               className="pt-20 md:w-[70vw] mx- lg:w-[40vw]"
             />
           </div>
         </div>
         {/* body */}
       </div>
     </div>
   );
 }
 
 export default TeenPage