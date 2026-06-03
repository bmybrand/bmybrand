"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Logos = [
  {
    normal: "/bmyb-logo-abboott-fill-01.svg",
    hover: "/bmyb-logo-abboott-fill-hover-01.svg",
  },
  {
    normal: "/bmyb-logo-abboott-fill-02.svg",
    hover: "/bmyb-logo-abboott-fill-hover-02.svg",
  },
  {
    normal: "/bmyb-logo-abboott-fill-03.svg",
    hover: "/bmyb-logo-abboott-fill-hover-03.svg",
  },
  {
    normal: "/bmyb-logo-abboott-fill-04.svg",
    hover: "/bmyb-logo-abboott-fill-hover-04.svg",
  },
  {
    normal: "/bmyb-logo-abboott-fill-05.svg",
    hover: "/bmyb-logo-abboott-fill-hover-05.svg",
  },
  {
    normal: "/bmyb-logo-abboott-fill-06.svg",
    hover: "/bmyb-logo-abboott-fill-hover-06.svg",
  },
  {
    normal: "/bmyb-logo-abboott-fill-07.svg",
    hover: "/bmyb-logo-abboott-fill-hover-07.svg",
  },
  {
    normal: "/bmyb-logo-abboott-fill-08.svg",
    hover: "/bmyb-logo-abboott-fill-hover-08.svg",
  },
  {
    normal: "/bmyb-logo-abboott-fill-09.svg",
    hover: "/bmyb-logo-abboott-fill-hover-09.svg",
  },
  {
    normal: "/bmyb-logo-abboott-fill-10.svg",
    hover: "/bmyb-logo-abboott-fill-hover-10.svg",
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
        <h1 className="mb-10 w-[90%] xl:w-[60%] text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl BenzinSemibold text-center leading-7 sm:leading-10 md:leading-tight lg:leading-snug xl:leading-10.5 2xl:leading-12.5">
          <span className="text-[#F45B25]">Trusted</span>{" "}
          <span>by Businesses, Startups &amp; Creators</span>
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
