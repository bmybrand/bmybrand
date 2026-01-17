"use client";
import React from "react";

const Logos = [
  {
    normal: "/abboott.svg.svg",
    hover: "/abboott.svg (1).svg",
  },
  {
    normal: "/Mask group (3).svg",
    hover: "/Mask group (2).svg",
  },
  {
    normal: "/client_logo3.svg.svg",
    hover: "/client_logo3.svg (1).svg",
  },
  {
    normal: "/Vector (9).svg",
    hover: "/Vector (15).svg",
  },
  {
    normal: "/client_logo5.svg.svg",
    hover: "client_logo5.svg (1).svg",
  },
  {
    normal: "/client_logo6.svg.svg",
    hover: "/client_logo6.svg (1).svg",
  },
  {
    normal: "/Vector (11).svg",
    hover: "/Vector (16).svg",
  },
  {
    normal: "/Universal.svg",
    hover: "/Universal (1).svg",
  },
  {
    normal: "/client_logo9.svg fill.svg",
    hover: "/client_logo9.svg fill (1).svg",
  },
  {
    normal: "/Mask group (1).svg",
    hover: "/Mask group (4).svg",
  },
];

const logobar = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Heading */}
      <div className="w-full flex justify-center mt-30">
        <h1 className="mb-10 w-[90%] xl:w-[60%] text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl BenzinSemibold text-center leading-[28px] sm:leading-10 md:leading-tight lg:leading-snug xl:leading-[42px] 2xl:leading-[50px]">
          Every day, <span className="text-[#F45B25]">BMYBrand</span> is trusted by
          businesses, startups, and creators worldwide.
        </h1>
      </div>

      {/* Logo Grid */}
      <div className="bg-[#191A35] w-[90%] xl:w-[75%] p-5 rounded-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[#2A2B47] rounded-lg overflow-hidden">
          {Logos.map((logo, index) => (
            <div
              key={index}
              className="group flex justify-center items-center p-6 bg-[#191A35]"
            >
              {/* Normal */}
              <img
                src={logo.normal}
                alt="brand logo"
                className="w-40 h-20 object-contain block group-hover:hidden transition-all duration-300"
              />

              {/* Hover */}
              <img
                src={logo.hover}
                alt="brand logo hover"
                className="w-40 h-20 object-contain hidden group-hover:block transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default logobar;
