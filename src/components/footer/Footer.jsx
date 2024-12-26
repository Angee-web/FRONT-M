import React from "react";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
} from "react-icons/io5";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-gray-200">
      {/* frst part */}
      <div className="px-[15px] py-[30px] mb-[50px] lg:pl-[8rem] ">
        {/* logo */}
        <div className="mb-6">
          <img
            className="h-[6rem] w-[6rem] mb-4"
            src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729737624/Mern-Ecommerce/ALLSEXTOYS_PNG_WHITE_1_meard7.png"
            alt="App-logo"
          />
        </div>

        {/* header */}
        <div id="header" className="lg:flex lg:justify-between mb-4 ">
          {/* newsletter and socials */}
          <div className="lg:w-1/2 lg:pr-8">
            {/* newsletter */}
            <div>
              <h4 className="font-bold text-2xl mb-2">Newsletter</h4>
              <p>
                Subscribe to our newsletter for new products,{" "}
                <br className="hidden lg:block" /> trends and offers.
              </p>
              <div className="my-4 flex">
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="bg-gray-800 p-2 w-full max-w-[16rem] lg:max-w-[20rem] text-white rounded-l-3xl border-2 border-blue-800"
                />
                <Button
                  size="custom" // Custom size prop to bypass the default
                  className="bg-gradient-to-r h-[60px] w-full max-w-[8rem] from-purple-600 via-pink-500 to-blue-600 border-l-blue-800 border-t-purple-800 border-r-purple-800 border-b-purple-800 text-white px-4 py-2 hover:bg-gradient-to-r hover:from-purple-700 hover:via-pink-600 hover:to-blue-700 transition rounded-r-3xl"
                  type="submit"
                >
                  Subscribe
                </Button>
              </div>
            </div>

            {/* socials */}
            <div className="flex space-x-3 mt-4 text-4xl text-white">
              <a href="#" className="">
                <IoLogoInstagram className="bg-blue-500 border p-2 rounded-full" />
              </a>
              <a href="#">
                <IoLogoTwitter className="bg-blue-500 border p-2 rounded-full" />
              </a>
              <a href="#">
                <IoLogoFacebook className="bg-blue-500 border p-2 rounded-full" />
              </a>
              <a href="#">
                <IoLogoYoutube className="bg-blue-500 border p-2 rounded-full" />
              </a>
            </div>
          </div>

          {/* category */}
          <div className="mt-8 flex gap-12  lg:w-1/2 lg:gap-[5rem] md:gap-[5rem]">
            <div className="space-y-2 flex flex-col">
              <h4 className="font-bold text-xl mb-6">Categories</h4>
              <Link to="/shop/all-products">All Products</Link>
              <Link to="/shop/for-couple">For Couples</Link>
              <Link to="/shop/for-men">For Men</Link>
              <Link to="/shop/for-women">For Women</Link>
            </div>

            <div className="lg:flex lg:gap-[4rem] md:flex md:gap-[5rem] ">
              {/* company */}
              <div className="space-y-2">
                <h4 className="font-bold text-xl mb-6">Company</h4>
                <p>About us</p>
                <p>Offers and events</p>
                <p>Reviews</p>
              </div>

              {/* support */}
              <div className="space-y-2 mt-9 lg:mt-0 md:mt-0">
                <h4 className="font-bold text-xl mb-6">Support</h4>
                <p>Contact us</p>
                <p>Live Chat</p>
                <p>FAQs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* second part */}
      <hr className="border-gray-700 hidden lg:block" />

      <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center mt-6 text-sm lg:p-[20px] pb-[30px] font-bold">
        {/* rights */}
        <div className="mt-4 lg:mt-0 text-center sm:text-md md:text-lg lg:text-sm">
          {/* Adjust margin on smaller screens to create spacing between reversed items */}
          Copyright &copy; 2024 Allsextoys
        </div>

        {/* policies */}
        <div className="flex items-center justify-center sm:text-md md:text-lg lg:text-sm">
          <a href="#" className="hover:underline mr-2">
            Terms of Use
          </a>
          <span>|</span>
          <a href="#" className="hover:underline mx-2">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="hover:underline ml-2">
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
