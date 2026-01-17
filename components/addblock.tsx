"use client";

import React from "react";

const AddBlock = () => {
  return (
    <div className="w-full flex flex-col items-center">
  <div className="relative flex flex-col lg:flex-row bg-[#191a35] w-[90%] 2xl:w-[75%] mt-10 lg:mt-50 rounded-lg overflow-visible
                   lg:items-start text-center lg:text-left mb-10 ">

    {/* TEXT SECTION */}
    <div className="flex flex-col justify-center gap-5 p-6 md:p-10 lg:p-14 xl:p-16 w-full lg:w-2/3 z-20">
      <h2 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl BenzinSemibold">
        Boost Your Brand <br /> Beyond the Competition
      </h2>

      <button className="w-fit BenzinSemibold bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white px-4 py-2 rounded-lg flex gap-2 mx-auto lg:mx-0">
        <div className="bg-white p-2 rounded-lg">
          <img src="/Group1190.svg" alt="" className="w-4 h-4" />
        </div>
        <span className="px-2">Try BMYBrand FREE for 14 Days</span>
      </button>

      <p className="text-white/80 text-sm md:text-base">
        Get started instantly. No credit card needed.
      </p>
    </div>

    {/* IMAGE */}
    <div className="relative w-full lg:w-1/3 flex justify-center lg:justify-end">
      <img
        src="/ChatGPT.svg"
        alt="Rocket"
        className="hidden lg:block object-contain scale-150 animate-bounceRocket -rotate-5"
      />
    </div>
  </div>

  {/* HR */}<hr className="w-[90%] 2xl:w-[75%] h-1.25 bg-[#2A2B47] rounded-full  my-10 lg:my-30 border-none" />

</div>

  );
};

export default AddBlock;
