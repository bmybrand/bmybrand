"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FullyAnimatedGrid: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const showTimer = useRef<number | null>(null);
  const collapseTimer = useRef<number | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const expansionDelay = 500;
  const fadeDuration = 700;
  const collapseDelay = fadeDuration + 120;
  const hasTriggered = useRef(false);


  useEffect(() => {
    return () => {
      if (showTimer.current) window.clearTimeout(showTimer.current);
      if (collapseTimer.current) window.clearTimeout(collapseTimer.current);
    };
  }, []);

  useEffect(() => {
    const element = gridRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting && !hasTriggered.current) {
      hasTriggered.current = true;

      setIsHovered(true);

      showTimer.current = window.setTimeout(() => {
        setShowContent(true);
      }, expansionDelay);

      observer.disconnect(); // 🔥 trigger once
    }
  },
  { threshold: 0.7 }
);


    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const leftItems = [
    {
      title: "Brand Experience",
      text:
        "We create logos, visual styles, and brand guides that help your business stand out and communicate clearly.",
      img: "/Group (24).svg",
      delay: 0.1,
    },
    {
      title: "Software Development",
      text:
        "Get responsive, user-friendly websites built to convert visitors into customers and represent your brand professionally.",
      img: "/Group (24).svg",
      delay: 0.3,
    },
    {
      title: "Commerce Solutions",
      text:
        "We build secure online stores with easy product management, smooth payments, and a seamless shopping experience.",
      img: "/Group (24).svg",
      delay: 0.5,
    },
  ];

  const rightItems = [
    {
      title: "Digital Marketing",
      text:
        "From SEO to social media, we boost visibility, attract the right audience, and drive business growth.",
      img: "/Group (24).svg",
      delay: 0.1,
    },
    {
      title: "Creative Production",
      text:
        "Engage your audience with custom graphics, illustrations, and animations that bring your ideas to life.",
      img: "/Group (24).svg",
      delay: 0.3,
    },
    {
      title: "Business Operations",
      text:
        "We offer reliable bookkeeping and admin support so you stay organized, save time, and focus on running your business.",
      img: "/Group (24).svg",
      delay: 0.5,
    },
  ];

  return (
    <div className="flex flex-col items-center ">
      <div className="w-full flex justify-center  mt-30">
        <h2 className="mb-20 w-[90%] 2xl:w-[60%] text-[#FFFFFF] sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl BenzinSemibold text-center">
          Every day, <span className="text-[#F45B25]">BMYBrand</span> is trusted by
          businesses, startups, and creators worldwide.
        </h2>
      </div>

      <div
        ref={gridRef}
        className="flex flex-col lg:flex-row w-[90%] 2xl:w-[70%] gap-5 rounded-xl relative"
      >
        {/* LEFT */}
        <div
          className={`flex flex-col justify-around text-white gap-5 w-full lg:w-0 transition-all duration-700 overflow-hidden ${
            isHovered ? "lg:w-1/3" : "lg:w-0"
          }`}
        >
          {leftItems.map((item, idx) => (
            <div key={idx} className="bg-[#191A35] rounded-lg p-4 lg:p-8 h-64 flex flex-col justify-center items-center">
              <div className="flex flex-col items-center lg:hidden">
                <img src={item.img} alt="" className="py-3" />
                <h3 className="font-semibold text-xl mb-2 BenzinSemibold text-center">
                  {item.title}
                </h3>
                <p className="text-base text-[#ADAECC] text-center">{item.text}</p>
              </div>

              <AnimatePresence>
                {showContent && (
                  <motion.div
                    className="hidden lg:flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: item.delay, duration: fadeDuration / 1000 }}
                  >
                    <img src={item.img} alt="" className="py-3" />
                    <h3 className="font-semibold text-xl mb-2 BenzinSemibold text-center">
                      {item.title}
                    </h3>
                    <p className="text-base text-[#ADAECC] text-center">{item.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CENTER */}
        <div
          className={`bg-[url('/FullImage.svg')] bg-center bg-cover rounded-lg w-full 
h-145 sm:h-145 md:h-165 lg:h-auto
transition-all duration-700 p-4 lg:p-8 flex flex-col justify-end items-center text-white gap-6 ${
  isHovered ? "lg:w-1/3" : "lg:w-full"
}`}
        >
          <div className="flex flex-col items-center lg:hidden w-full">
            <img
              src="/Character-2 1.svg"
              alt=""
              className="absolute lg:-top-10 left-1/2 lg:-translate-y-0 -translate-y-2/3 transform -translate-x-1/2 top-1/2"
            />
            <h2 className="text-base md:text-xl lg:text-2xl 2xl:text-3xl BenzinSemibold mb-4 text-center">
              One Agency For All Your Branding, Design & Digital Needs
            </h2>
            <button className="w-full text-lg BenzinSemibold bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white px-2 py-2 rounded-lg">
              <span className="p-3">Get Started Now</span>
            </button>
          </div>

          <AnimatePresence>
  {showContent && (
    <motion.div
      className="hidden lg:flex flex-col items-center w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.img
        src="/Character-2 1.svg"
        alt=""
        className="absolute -top-10 left-1/2 -translate-x-1/2"
        initial={{
          opacity: 0,
          y: 80,
          x: -40,
          rotate: -8,
        }}
        animate={{
          opacity: 1,
          y: 0,
          x: 0,
          rotate: 0,
        }}
        exit={{
          opacity: 0,
          y: -80,
          x: 40,
          rotate: 8,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      />

      <motion.h2 className="text-base md:text-xl lg:text-2xl 2xl:text-3xl mb-4 BenzinSemibold text-center">
        One Agency For All Your Branding, Design & Digital Needs
      </motion.h2>

      <motion.button className="w-full text-lg BenzinSemibold bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white px-2 py-2 rounded-lg">
        <span className="p-3">Get Started Now</span>
      </motion.button>
    </motion.div>
  )}
</AnimatePresence>

        </div>

        {/* RIGHT */}
        <div
          className={`flex flex-col justify-around text-white gap-5 w-full lg:w-0 transition-all duration-700 overflow-hidden ${
            isHovered ? "lg:w-1/3" : "lg:w-0"
          }`}
        >
          {rightItems.map((item, idx) => (
            <div key={idx} className="bg-[#191A35] rounded-lg p-4 lg:p-8 h-64 flex flex-col justify-center items-center">
              <div className="flex flex-col items-center lg:hidden">
                <img src={item.img} alt="" className="py-3" />
                <h3 className="font-semibold text-xl mb-2 BenzinSemibold text-center">
                  {item.title}
                </h3>
                <p className="text-base text-[#ADAECC] text-center">{item.text}</p>
              </div>

              <AnimatePresence>
                {showContent && (
                  <motion.div
                    className="hidden lg:flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: item.delay, duration: fadeDuration / 1000 }}
                  >
                    <img src={item.img} alt="" className="py-3" />
                    <h3 className="font-semibold text-xl mb-2 BenzinSemibold text-center">
                      {item.title}
                    </h3>
                    <p className="text-base text-[#ADAECC] text-center">{item.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullyAnimatedGrid;
