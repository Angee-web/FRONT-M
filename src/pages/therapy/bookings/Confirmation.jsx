import React from "react";
import coinImage from "../../../assets/images/coin.webp";

const Confirmation = () => {
  return (
    <div className="flex py-14   items-center justify-center bg-[#F5F5DC]">
      <div className="bg-black lg:w-[65vw]  text-white flex flex-col py-8 px-3 lg:px-14 w-[90vw] rounded-xl">
        <div>
          <p className="text-2xl underline text-center mb-8">Promotions</p>
        </div>

        {/* two cards */}
        <div className="grid grid-cols-2 gap-2 pb-12">
          <div className="bg-white bg-opacity-20 px-4 py-10 lg:py-8 flex items-center rounded-md relative">
            <div className="lg:flex gap-8">
              <p className="text-2xl  flex">
                10{" "}
                <img
                  src={coinImage}
                  alt="Coin"
                  className="w-10 h-10 lg:w-10 lg:h-10 rounded-full p-1"
                />
                <span className="list-item-text-3 text-gray-400 text-xl lg:text-2xl">
                  +5
                </span>
              </p>
              <p className="text-xl lg:text-2xl text-gray-400">₦ 2000</p>
            </div>
            <div className="absolute bg-pink-500 p-1 rounded-bl-md rounded-tr-lg top-0 right-0 text-xs lg:p-2 md:text-md  ">
              <p>Time Limited Offer</p>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 px-4 py-10 lg:py-8 flex items-center rounded-md">
            <div className="lg:flex gap-8">
              <p className="text-2xl  flex">
                50{" "}
                <img
                  src={coinImage}
                  alt="Coin"
                  className="w-10 h-10 lg:w-10 lg:h-10 rounded-full p-1"
                />
                <span className="list-item-text-3 text-gray-400 text-xl lg:text-2xl">
                  +10
                </span>
              </p>
              <p className="text-xl lg:text-2xl text-gray-400">₦ 10000</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-2xl underline text-center mb-8">Packages</p>
        </div>

        {/* packages */}
        <div className="bg-white bg-opacity-20 px-4 py-10 rounded-md">
          <div className="flex items-center text-sm gap-12 flex-col lg:flex-row md:flex-row lg:text-lg md:text-lg lg:gap-32 lg:justify-center md:justify-center md:gap-14 lg:my-6 ">
            <div className="space-y-3">
              <p className="flex items-center">
                5{" "}
                <img
                  src={coinImage}
                  alt="Coin"
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full p-1"
                />{" "}
                / 1 Minute = <strong>₦1,000</strong>{" "}
              </p>
              <p className="flex items-center">
                25{" "}
                <img
                  src={coinImage}
                  alt="Coin"
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full p-1"
                />{" "}
                / 5 Minutes = <strong>₦5,000</strong>{" "}
              </p>
              <p className="flex items-center">
                50{" "}
                <img
                  src={coinImage}
                  alt="Coin"
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full p-1"
                />{" "}
                / 1= Minutes = <strong>₦10,000</strong>{" "}
              </p>
              <p className="flex items-center">
                150{" "}
                <img
                  src={coinImage}
                  alt="Coin"
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full p-1"
                />{" "}
                / 30 Minutes = <strong>₦15,000</strong>{" "}
              </p>
              <p className="flex items-center">
                300{" "}
                <img
                  src={coinImage}
                  alt="Coin"
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full p-1"
                />{" "}
                / 60 Minutes = <strong>₦20,000</strong>{" "}
              </p>
            </div>

            <div className="space-y-3">
              <p className="flex items-center">
                5{" "}
                <img
                  src={coinImage}
                  alt="Coin"
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full p-1"
                />{" "}
                / 1 Message = <strong>₦100</strong>{" "}
              </p>
              <p className="flex items-center">
                25{" "}
                <img
                  src={coinImage}
                  alt="Coin"
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full p-1"
                />{" "}
                / 5 Messages = <strong>₦500</strong>{" "}
              </p>
              <p className="flex items-center">
                50{" "}
                <img
                  src={coinImage}
                  alt="Coin"
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full p-1"
                />{" "}
                / 10 Messages = <strong>₦1,000</strong>{" "}
              </p>
              <p className="flex items-center">
                150{" "}
                <img
                  src={coinImage}
                  alt="Coin"
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full p-1"
                />{" "}
                / 30 Messages = <strong>₦1,500</strong>{" "}
              </p>
              <p className="flex items-center">
                300{" "}
                <img
                  src={coinImage}
                  alt="Coin"
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full p-1"
                />{" "}
                / 60 Messages = <strong>₦2,000</strong>{" "}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-2xl underline text-center my-8">Tips</p>
        </div>

        {/* tips */}
        <div className=" bg-white bg-opacity-20 lg:px-4 py-10 rounded-md mb-10">
          <ol className="list-decimal space-y-3 px-8 lg:px-12">
            <li>
              All calls and messages to our therapists attracts a reasonable fee
            </li>
            <li>Coins will never expire</li>
            <li>
              Make your coin work for you, the more you recharge, the more we
              compensate you with affordable offers
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
