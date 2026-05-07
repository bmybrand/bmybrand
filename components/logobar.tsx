"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Logos = [
  {
    normal: "/bmyb-logo-abboott-01.svg",
    hover: "/bmyb-logo-abboott-svg-01.svg",
  },
  {
    normal: "/bmyb-logo-mask-group-03.svg",
    hover: "/bmyb-logo-mask-group-02.svg",
  },
  {
    normal: "/bmyb-logo-client-logo3-01.svg",
    hover: "/bmyb-logo-client-logo3-svg-01.svg",
  },
  {
    normal: "/bmyb-logo-vector-14.svg",
    hover: "/bmyb-logo-vector-06.webp",
  },
  {
    normal: "/bmyb-logo-client-logo5-01.svg",
    hover: "/bmyb-logo-client-logo5-svg-01.webp",
  },
  {
    normal: "/bmyb-logo-client-logo6-01.svg",
    hover: "/bmyb-logo-client-logo6-svg-01.webp",
  },
  {
    normal: "/bmyb-logo-vector-03.svg",
    hover: "/bmyb-logo-vector-07.webp",
  },
  {
    normal: "/bmyb-logo-universal-02.svg",
    hover: "/bmyb-logo-universal-01.webp",
  },
  {
    normal: "/bmyb-logo-client-logo9-svg-fill-02.svg",
    hover: "/bmyb-logo-client-logo9-svg-fill-01.webp",
  },
  {
    normal: "/bmyb-logo-mask-group-01.svg",
    hover: "/bmyb-logo-mask-group-04.svg",
  },
];

const Logobar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const logoIcons = gridRef.current?.querySelectorAll(":scope > div .logo-icon") ?? [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 68%",
          toggleActions: "play none none none",
        },
      });

      tl.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.15,
        ease: "sine.out",
      }).to(logoIcons, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "sine.out",
      }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center opacity-0"
      style={{ transform: "translateY(24px)" }}
    >
      {/* Heading */}
      <div className="w-full flex justify-center">
        <h1 className="mb-10 w-[90%] xl:w-[60%] text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl BenzinSemibold text-center leading-[28px] sm:leading-10 md:leading-tight lg:leading-snug xl:leading-[42px] 2xl:leading-[50px]">
          Every day, <span className="text-[#F45B25]">BMYBrand</span> is trusted by
          businesses, startups, and creators worldwide.
        </h1>
      </div>

      {/* Logo Grid */}
      <div className="bg-[#191A35] w-[90%] xl:w-[75%] p-5 rounded-xl">
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[#2A2B47] rounded-lg overflow-hidden"
        >
          {Logos.map((logo, index) => (
            <div
              key={index}
              className="group flex justify-center items-center p-6 bg-[#191A35]"
            >
              {/* Normal */}
              <img
                src={logo.normal}
                alt="brand logo"
                className="logo-icon w-40 h-20 object-contain block group-hover:hidden transition-all duration-300 opacity-0"
              style={{ transform: "translateY(12px) scale(0.92)" }}
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

export default Logobar;
