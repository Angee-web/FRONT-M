import React from "react";
import { FaFacebook, FaInstagram, FaPhoneAlt, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 sm:px-8 pt-16 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/field_blog_entry_teaser_image/2022-10/pexels-anna-shvets-5187255.jpg?itok=bQrnMW8t')",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 justify-between items-center max-w-6xl mx-auto">
        {/* Left Side - Contact Information */}
        <div className="flex flex-col items-start justify-center text-left text-black gap-y-56">
          <div className="mt-10">
            <h1 className="text-5xl font-bold text-black mb-4 list-item-text-3">
              CONTACT US
            </h1>
            <p className="text-lg flex items-center text-black mb-2 font-bold">
              <span className="mr-3 text-2xl">@</span>
              <a href="mailto:Allsextoys@gmail.com" className="hover:underline">
                Allsextoys@gmail.com
              </a>
            </p>
            <p className="text-lg flex items-center text-black font-bold">
              <span className="mr-3">
                <FaPhoneAlt />
              </span>
              <a href="tel:+2348075364999" className="hover:underline">
                +2348075364999
              </a>
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6 mt-10">
            <a href="#" className="hover:scale-110 transition-transform">
              <FaInstagram className="w-12 h-12 bg-blue-600 text-white p-3 rounded-full" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <FaXTwitter className="w-12 h-12 bg-blue-600 text-white p-3 rounded-full" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <FaFacebook className="w-12 h-12 bg-blue-600 text-white p-3 rounded-full" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <FaYoutube className="w-12 h-12 bg-blue-600 text-white p-3 rounded-full" />
            </a>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-black text-white w-[500px] rounded-lg shadow-lg p-2 sm:p-8 flex flex-col h-[90vh] my-20">
          <h2 className="text-2xl font-semibold mb-3 text-start list-item-text-3">
            We would love to hear from you
          </h2>
          <hr className="h-1 rounded-2xl mb-2 w-[19rem] bg-white"/>
          <form className="space-y-2">
            <div>
              <label
                htmlFor="email"
                className="block text-md text-gray-400 font-medium mb-2"
              >
                E-mail address
              </label>
              <input
                type="email"
                id="email"
                className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-white bg-black px-4 py-2"
                placeholder="E-mail address"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-md text-gray-400 font-medium mb-2"
              >
                Phone number
              </label>
              <input
                type="text"
                id="phone"
                className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-white bg-black px-4 py-2"
                placeholder="Phone number"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-md text-gray-400 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="6"
                className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-white bg-black px-4 py-2"
                placeholder="Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg font-bold rounded-md shadow-md hover:from-pink-600 hover:to-purple-600 transition-transform transform hover:scale-105 h-[50px] mt-5"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
