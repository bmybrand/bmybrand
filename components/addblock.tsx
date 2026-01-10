"use client";

import React from "react";

const AddBlock = () => {
  return (
    <div className="w-full flex justify-center ">
      <div className="relative flex flex-col lg:flex-row bg-[#191A35] w-[90%] 2xl:w-[70%] mt-10 lg:mt-30 rounded-lg overflow-visible
                       lg:items-start text-center lg:text-left">

        {/* TEXT SECTION */}
        <div className="flex flex-col justify-center gap-5 p-6 md:p-10 lg:p-14 xl:p-16 w-full lg:w-2/3 z-20">
          <h2 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl BenzinSemibold">
            Boost Your Brand <br /> Beyond the Competition
          </h2>

          <button className="w-fit BenzinSemibold bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white px-4 py-2 rounded-lg hover:bg-[#d94a1a] transition-colors duration-300 flex justify-center items-center gap-2 mx-auto lg:mx-0">
            <div className="bg-white p-2 rounded-lg">
              <img src="/Group1190.svg" alt="" className="w-4 h-4" />
            </div>
            <span className="px-2">Try BMYBrand FREE for 14 Days</span>
          </button>

          <p className="text-white/80 text-sm md:text-base">
            Get started instantly. No credit card needed.
          </p>
        </div>

        {/* IMAGE SECTION */}
        <div className="relative w-full lg:w-1/3 flex justify-center lg:justify-end mt-6 lg:mt-0 overflow-visible">
          <img
            src="/ChatGPT.svg" // Replace with your rocket image
            alt="Rocket"
            className="hidden lg:block object-contain scale-125 lg:scale-150 relative animate-bounceRocket"
          />
        </div>

      </div>
    </div>
  );
};

export default AddBlock;
