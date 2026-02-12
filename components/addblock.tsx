"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AddBlock = () => {
  const blockRef = useRef<HTMLDivElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blockRef.current || !textSectionRef.current || !imageWrapRef.current) return;

    const ctx = gsap.context(() => {
      if (!textSectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: blockRef.current,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      tl.to(blockRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: "sine.out",
        })
        .fromTo(
          textSectionRef.current,
          { opacity: 0, x: -32 },
          {
            opacity: 1,
            x: 0,
            duration: 1.0,
            ease: "sine.out",
            clearProps: "transform",
          },
          "-=0.3"
        )
        .fromTo(
          imageWrapRef.current,
          { opacity: 0, scale: 0.82, rotation: -18 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "sine.out",
            clearProps: "transform",
          },
          "-=0.75"
        );
    }, blockRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div
        ref={blockRef}
        className="relative flex flex-col lg:flex-row bg-[#191a35] w-[90%] 2xl:w-[75%] mt-10 lg:mt-50 rounded-lg overflow-visible opacity-0
                   lg:items-start text-center lg:text-left mb-10 "
      >
        {/* TEXT SECTION */}
        <div
          ref={textSectionRef}
          className="flex flex-col justify-center gap-5 p-6 md:p-10 lg:p-14 xl:p-16 w-full lg:w-2/3 z-20"
        >
          <h2 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl BenzinSemibold">
            Boost Your Brand <br /> Beyond the Competition
          </h2>

          <button className="w-fit BenzinSemibold bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white px-2 py-2 rounded-lg flex justify-center items-center gap-2 mx-auto lg:mx-0 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300">
            <div className="bg-white p-4 rounded-lg">
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
          <div ref={imageWrapRef} className="hidden lg:block">
            <img
              src="/ChatGPT.svg"
              alt="Rocket"
              className="object-contain scale-150 animate-bounceRocket -rotate-5 w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* HR */}
      <hr className="w-[90%] 2xl:w-[75%] h-1.25 bg-[#2A2B47] rounded-full  my-10 lg:my-30 border-none" />
    </div>
  );
};

export default AddBlock;
