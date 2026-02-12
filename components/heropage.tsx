"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const H1_WORDS: { word: string; orange: boolean }[] = [
  { word: "Build", orange: false },
  { word: "a", orange: false },
  { word: "High-Performing", orange: false },
  { word: "Brand", orange: true },
  { word: "With", orange: true },
  { word: "Creative", orange: true },
  { word: "Power", orange: false },
  { word: "Behind", orange: false },
  { word: "It", orange: false },
];

const Heropage: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!headlineRef.current || !loaded) return;
    const chars = headlineRef.current.querySelectorAll(".typing-char");
    if (!chars.length) return;

    const tl = gsap.timeline();
    tl.fromTo(
      chars,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.32,
        stagger: 0.065,
        ease: "sine.out",
      }
    );
    if (paragraphRef.current) {
      tl.to(
        paragraphRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "sine.out",
          clearProps: "transform",
        },
        "-=0.2"
      );
    }
    if (buttonsRef.current?.children.length) {
      tl.to(
        buttonsRef.current.children,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.14,
          ease: "sine.out",
          clearProps: "transform",
        },
        "-=0.4"
      );
    }
  }, [loaded]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const x = (clientX - left) / width - 0.5; // -0.5 → 0.5
    const y = (clientY - top) / height - 0.5;

    setMousePos({ x, y });
  };

  return (
    <div className=" overflow-hidden bg-[url('/Frame6.png')] bg-cover bg-center bg-no-repeat ">
      <div
        className="relative flex flex-col lg:flex-row pt-35  lg:h-screen h-fit w-[90%] 2xl:w-[85%] mx-auto gap-20 lg:pt-10 "
        onMouseMove={handleMouseMove}
      >
        {/* LEFT */}
        <div className="w-full xl:w-1/2 lg:h-screen flex flex-col justify-center gap-4 px-4 lg:px-0 z-10">
          <h1
            ref={headlineRef}
            className="text-white text-[22px] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-[63px] BenzinBold leading-[28px] sm:leading-10 md:leading-tight lg:leading-snug xl:leading-[72px] 2xl:leading-[80px]"
          >
            {H1_WORDS.map((item, i) => (
              <span
                key={i}
                className={`inline-block whitespace-pre ${item.orange ? "text-[#F45B25]" : ""}`}
              >
                {item.word.split("").map((char, j) => (
                  <span key={j} className="typing-char inline-block">
                    {char}
                  </span>
                ))}
                {"\u00A0"}
              </span>
            ))}
          </h1>
          <p
            ref={paragraphRef}
            className="text-white text-sm sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-xl leading-relaxed lg:leading-snug xl:leading-7 2xl:leading-8 opacity-0"
            style={{ transform: "translateY(18px)" }}
          >
            Make unlimited design, website, or marketing requests — and get unlimited revisions. 
            Grow your brand faster with your own dedicated creative team handling everything from logos to full websites.
          </p>
        <div
          ref={buttonsRef}
          className="mt-6 flex flex-col sm:flex-row gap-4 BenzinSemibold"
        >
  <button className="bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white px-2 py-2 rounded-lg hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300 flex justify-center items-center gap-2 opacity-0"
    style={{ transform: "translateY(14px)" }}
  >
    <div className="bg-white p-4 rounded-lg">
    <img src="/Group1190.svg" alt="" className="w-4 h-4" />
    </div>
    <span className="px-2">Get Started Now</span>
  </button>

  <button className="border border-white text-white px-2 py-2 rounded-lg hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 flex justify-center items-center gap-2 opacity-0" style={{ transform: "translateY(14px)" }}>

     <div className="bg-white p-4 rounded-lg">
    <img src="/Group119.svg" alt="" className="w-4 h-4" />
    </div>
    <span className="px-2">Explore Our Work</span>
  </button>
</div>

        </div>

        {/* RIGHT */}
        <div className="w-full xl:w-1/2 lg:h-screen relative flex items-end justify-center">
          {/* Tilting background image */}
          <img
            src="/Group15.svg"
            alt="Hero Illustration"
            className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-all duration-700 ease-out
              ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
            style={{
              transform: `
                translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)
                rotateX(${mousePos.y * 20}deg)
                rotateY(${-mousePos.x * 20}deg)
              `,
            }}
          />

          {/* Foreground hero layer with offset, shadow and hover effect */}
          <img
  src="/Layer 1 1.svg"
  alt="Hero Layer"
  className={`relative z-10 transition-transform duration-1000 ease-out
    ${loaded ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"}`}
  style={{
    transform: `
      translateY(${loaded ? "0" : "6rem"})
      translateX(${mousePos.x * 10}px)
      translateY(${mousePos.y * 10}px)
    `,
    filter: "drop-shadow(0px 20px 30px rgba(0,0,0,0.5))",
  }}
/>

        </div>
      </div>
      {/* Bottom promo bar inside hero right div */}
          <div className=" relative  w-full bg-[#F45B25] text-white py-3 px-6 flex flex-col sm:flex-row items-center justify-center gap-2 z-[1000] shadow-xl">
    <span className="text-center sm:text-left text-sm sm:text-base md:text-lg">
      New to BMYBrand? Enjoy an Exclusive Intro Discount on All Creative & Web Packages.
    </span>
    <a
      href="#"
      className="text-sm sm:text-base md:text-lg font-semibold underline hover:text-[#11122F] transition-colors duration-300"
    >
      Claim Your Offer &rarr;
    </a>
  </div>
    </div>
  );
};

export default Heropage;
