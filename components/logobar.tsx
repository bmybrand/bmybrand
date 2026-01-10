import React from "react";

const Logos = [
  "/abboott.svg.svg",
  "/aldi.svg fill.svg",
  "/client_logo3.svg.svg",
  "/Vector (9).svg",
  "/client_logo5.svg.svg",
  "/client_logo6.svg.svg",
  "/Vector (11).svg",
  "/Universal.svg",
  "/client_logo9.svg fill.svg",
  "/Mask group (1).svg",
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
      <div className="bg-[#191A35] w-[90%] xl:w-[70%] p-5 rounded-xl">
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[#2A2B47] rounded-lg overflow-hidden">
    {Logos.map((logo, index) => (
      <div
        key={index}
        className="flex justify-center items-center p-6 bg-[#191A35]"
      >
        <img
          src={logo}
          alt="brand logo"
          className="w-40 h-20 object-contain"
        />
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default logobar;
