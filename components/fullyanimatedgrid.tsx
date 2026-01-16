"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const FullyAnimatedGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(gridRef, {
    margin: "-40% 0px -60% 0px",
    once: true,
  });

  const controls = useAnimation();

  const isDesktop =
    typeof window !== "undefined" && window.innerWidth >= 1024;

  useEffect(() => {
    if (isInView && isDesktop) {
      controls.start("expanded");
    }
  }, [isInView, controls, isDesktop]);

  const sideVariants = isDesktop
    ? {
        collapsed: { width: "0%" },
        expanded: { width: "33.333%" },
      }
    : {
        collapsed: { width: "100%" },
        expanded: { width: "100%" },
      };

  const centerVariants = isDesktop
    ? {
        collapsed: { width: "100%" },
        expanded: { width: "33.333%" },
      }
    : {
        collapsed: { width: "100%" },
        expanded: { width: "100%" },
      };

  return (
    <div className="flex flex-col items-center">
      {/* Heading */}
      <div className="w-full flex justify-center mt-30">
        <h1 className="mb-10 w-[90%] 2xl:w-[60%] text-white  text-base text-[#ADAECC] sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl BenzinSemibold text-center">
          Every day, <span className="text-[#F45B25]">BMYBrand</span> is trusted by
          businesses, startups, and creators worldwide.
        </h1>
      </div>

      {/* GRID */}
      <div
        ref={gridRef}
        className="w-[90%] 2xl:w-[70%]  2xl:h-screen h-200 rounded-xl  flex lg:flex-row flex-col mb-30 gap-5 relative"
      >
        {/* Left */}
        <motion.div
          variants={sideVariants}
          initial="collapsed"
          animate={controls}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex flex-col justify-around text-white gap-5 w-full lg:w-auto lg:overflow-hidden"
        >
          <div className="bg-[#191A35] rounded-lg lg:h-full p-4 lg:p-8">
            
            <img src="/Group (24).svg" alt="" className="py-3"/>
            <h3 className="font-semibold text-xl mb-2 BenzinSemibold">Brand Experience</h3>
            <p className="text-base text-[#ADAECC]">
              We create logos, visual styles, and brand guides that help your business stand out and communicate clearly.
            </p>
          </div>
          <div className="bg-[#191A35] rounded-lg lg:h-full p-4 lg:p-8">
            <img src="/Group (24).svg" alt="" className="py-3"/>
            <h3 className="font-semibold text-lg mb-2 BenzinSemibold">Software Development</h3>
            <p className="text-base text-[#ADAECC]">
              Get responsive, user-friendly websites built to convert visitors into customers and represent your brand professionally.
            </p>
          </div>
          <div className="bg-[#191A35] rounded-lg lg:h-full p-4 lg:p-8">
            <img src="/Group (24).svg" alt=""  className="py-3" />
            <h3 className="font-semibold text-lg mb-2 BenzinSemibold">Commerce Solutions</h3>
            <p className="text-base text-[#ADAECC]">
              We build secure online stores with easy product management, smooth payments, and a seamless shopping experience.
            </p>
          </div>
        </motion.div>

        {/* Center */}
<motion.div
  variants={centerVariants}
  initial="collapsed"
  animate={controls}
  transition={{ duration: 0.8, ease: "easeInOut" }}
  className="bg-[url('/FullImage.svg')] bg-center bg-cover rounded-lg
             w-full lg:w-auto
             p-4 lg:p-8
             min-h-[200px] lg:min-h-0
             flex flex-col justify-end items-center text-white gap-6
             flex-grow "
>
  <motion.img
    src="/Character-2 1.svg"
    alt=""
    initial={{ x: -200, opacity: 0 }}
    animate={isInView ? { x: 0, opacity: 1 } : {}}
    transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.8 }}
    className="absolute -top-10 "
  />
  <h1 className="text-base md:text-xl lg:text-2xl 2xl:text-3xl BenzinSemibold text-center">
    One Agency For All Your Branding, Design & Digital Needs
  </h1>
  <button className="w-full text-lg BenzinSemibold bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white px-2 py-2 rounded-lg hover:bg-[#d94a1a] transition-colors duration-300 flex justify-center items-center gap-5">
    <span className="p-3">Get Started Now</span>
  </button>
</motion.div>



        {/* Right */}
        <motion.div
          variants={sideVariants}
          initial="collapsed"
          animate={controls}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex flex-col justify-around text-white gap-5 w-full lg:w-auto lg:overflow-hidden"
        >
          <div className="bg-[#191A35] rounded-lg lg:h-full p-4 lg:p-8 ">
            <img src="/Group (24).svg" alt="" className="py-3" />
            <h3 className="font-semibold text-lg mb-2 BenzinSemibold">Digital Marketing</h3>
            <p className="text-base text-[#ADAECC]">From SEO to social media, we boost visibility, attract the right audience, and drive business growth.
            </p>
          </div>
          <div className="bg-[#191A35] rounded-lg lg:h-full p-4 lg:p-8">
            <img src="/Group (24).svg" alt=""  className="py-3"/>
            <h3 className="font-semibold text-lg mb-2 BenzinSemibold">Creative Production</h3>
            <p className="text-base text-[#ADAECC]">Engage your audience with custom graphics, illustrations, and animations that bring your ideas to life.
            </p>
          </div>
          <div className="bg-[#191A35] rounded-lg lg:h-full p-4 lg:p-8">
            <img src="/Group (24).svg" alt=""  className="py-3"/>
            <h3 className="font-semibold text-lg mb-2 BenzinSemibold">Business Operations</h3>
            <p className="text-base text-[#ADAECC]">We offer reliable bookkeeping and admin support so you stay organized, save time, and focus on running your business.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FullyAnimatedGrid;
