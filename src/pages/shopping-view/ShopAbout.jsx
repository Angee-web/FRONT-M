import React from "react";

const ShopAbout = () => {
  return (
    <div className="px-4 py-6 md:px-[4rem] bg-[#252525]">
      {/* first div */}
      <div className="flex flex-col-reverse md:flex-row gap-7 ">
        <div className="flex-1 flex flex-col justify-center items-center relative">
          <span>
            <img
              className="object-contain h-full"
              src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729782989/Mern-Ecommerce/Rectangle_25_xqygev.png"
              alt="couples-image"
            />
          </span>
          <span className=" w-[13rem] lg:w-[19rem] xl:w-[21rem] bg-white px-1 py-2 flex flex-col justify-center items-center rounded-2xl gap-1 absolute bottom-0 md:bottom-3 lg:bottom-0">
            <p className="text-[#1A79FF] text-sm lg:text-xl text-center">
              We help you fulfill your sexual and dream relationship
            </p>
            <p className="text-sm">Looking for help?</p>
            <button className="px-4 py-2 bg-[#1A79FF] text-white rounded-xl">
              Contact us
            </button>
          </span>
        </div>

        <span className="flex-1 flex flex-col items-center justify-center gap-2">
          <h2 className="text-[#C42571] text-xl xl:text-3xl">~ Who We Are </h2>
          <p className=" text-white text-center lg:text-lg xl:text-2xl">
            Sextoys.online is a subsidiary of date deals limited whose aim is to
            help people live happier and more satisfied with their sexual
            partners. We provide solutions and guidance needed in relationships
            regarding all aspects of their sex life's challenges. With our
            experienced and professional counselors, Date Deals offers
            accessible, convenient solutions for those seeking online therapy.
            Take an in-depth questionnaire to find the right therapist for you.
          </p>
        </span>

        {/* second div */}
      </div>
      <div className="flex flex-col-reverse md:flex-row mt-10 gap-7 items-center">
        <span className="flex-1 lg:p-10">
          <img
            src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1733493230/Mern-Ecommerce/new_lp0xgr.png"
            alt="couple-image"
          />
        </span>
        <span className="flex-1 flex flex-col justify-center items-center gap-2 text-white lg:text-xl bg-[#1A79FF] p-5 rounded-xl">
          <h2>~ PROS</h2>
          <ul className="flex flex-col gap-2">
            <li className="flex gap-2 ">
              <p>.</p>
              <p>
                Your identity is highly protected by the website so it gives you
                the room to say it as it is without being known in case of the
                future.
              </p>
            </li>
            <li className="flex gap-2">
              <p>.</p> <p>Message your therapist anytime.</p>
            </li>
            <li className="flex gap-2">
              <p>.</p>
              <p>
                Therapists specialize in a wide range of relationship issues.
              </p>
            </li>
            <li className="flex gap-2">
              <p>.</p> <p>24/7 messaging services</p>
            </li>
            <li className="flex gap-2">
              <p>.</p> <p>Affordable compared to other providers</p>
            </li>
            <li className="flex gap-2">
              <p>.</p>
              <p> Choose your own therapist and switch anytime you want</p>
            </li>
            <li className="flex gap-2">
              <p>.</p> <p>Pay by talk time rather than per session</p>
            </li>
            <li className="flex gap-2">
              <p>.</p> <p>Accessible via website or the free app</p>
            </li>
            <li className="flex gap-2">
              <p>.</p>
              <p>Methods of communication (text messaging & voice calls)</p>
            </li>
          </ul>
        </span>
      </div>

      {/* third div */}
      <div className="flex flex-col-reverse md:flex-row-reverse mt-10 gap-7 items-center xl:gap-[4rem]">
        <span className="flex-1">
          <img
            className=" xl:h-[50rem]"
            src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1733493467/Mern-Ecommerce/El_vxewzq.png"
            alt=""
          />
        </span>
        <span className="flex-1 bg-[#D72B7E] text-white p-5 rounded-xl xl:w-[55%] lg:text-xl flex flex-col gap-2">
          <h2 className="text-center">~ CONS</h2>
          <ul className="flex flex-col gap-2 md:gap-4 mt-2">
            <li className="flex gap-2">
              <p>.</p> <p>Therapists can't prescribe medication.</p>
            </li>
            <li className="flex gap-2">
              <p>.</p> <p>Therapists can't diagnose illnesses.</p>
            </li>
            <li className="flex gap-2">
              <p>.</p>
              <p>
                Face-to-face, exchange of contacts or real names by therapist is
                not allowed 🚫
              </p>
            </li>
            <li className="flex gap-2">
              <p>.</p> <p>No live chat for assistance on the site</p>
            </li>
          </ul>
        </span>
      </div>

      {/* fourth section */}
      <section className="mt-10 text-white flex flex-col gap-3">
        <h3 className="text-2xl font-bold xl:text-3xl">Contact Information</h3>
        <p className="md:text-lg xl:text-2xl xl:w-[50%]">
          You may have questions, but we've got you covered. Our team of
          customer service professionals can communicate with you in English.
        </p>
        <p className="text-[#D72B7E] md:text-lg xl:text-xl">
          E-mail:
          <a href="mailto:service@Allsextoy.com">service@Allsextoy.com</a>
        </p>
      </section>

      {/* FAQ */}

      {/* Terms and conditions */}
      <section className="mt-10 text-white flex flex-col gap-3">
        <h3 className="text-xl font-bold xl:text-3xl">Terms and Conditions</h3>
        <p className="text-lg font-bold md:text-xl xl:text-2xl xl:w-[50%]  mt-3">
          Introduction
        </p>
        <ul>
          <li className="flex gap-2">
            <p>-</p>
            <p className="md:text-lg xl:text-2xl">
              These terms and conditions outline the rules and regulations for
              the use of AllSexToys, located at www.allsextoys.online.
              Intellectual Property Rights
            </p>
          </li>
          <li className="flex gap-2">
            <p>-</p>
            <p className="md:text-lg xl:text-2xl">
              Other than the content you own, under these terms, AllSexToys
              and/or its licensors own all the intellectual property rights and
              materials contained in this Website.
            </p>
          </li>
          <p className="text-lg font-bold md:text-xl xl:text-2xl xl:w-[50%]  mt-3">
            Disclaimer
          </p>
          <div className="flex gap-2">
            <p>-</p>
            <p className="md:text-lg xl:text-2xl">
              To the maximum extent permitted by applicable law, we exclude all
              representations, warranties, and conditions relating to AllSexToys
            </p>
          </div>
        </ul>
      </section>
    </div>
  );
};

export default ShopAbout;
