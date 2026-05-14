"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const H1_WORDS: { word: string; orange: boolean; noSpace?: boolean }[] = [
  { word: "Build", orange: false },
  { word: "a", orange: false },
  { word: "High-", orange: false, noSpace: true },
  { word: "Performing", orange: false },
  { word: "Brand", orange: true },
  { word: "With", orange: true },
  { word: "Creative", orange: true },
  { word: "Power", orange: false },
  { word: "Behind", orange: false },
  { word: "It", orange: false },
];

const Heropage: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;
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
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const x = (clientX - left) / width - 0.5; // -0.5 → 0.5
    const y = (clientY - top) / height - 0.5;

    setMousePos({ x, y });
  };

  return (
    <div className="relative overflow-hidden">
      <Image
        src="/bmyb-global-frame6-01.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="relative flex flex-col lg:flex-row pt-32 sm:pt-36 lg:pt-40 pb-0 lg:min-h-screen h-fit w-[90%] 2xl:w-[85%] mx-auto lg:gap-20 gap-10"
        onMouseMove={handleMouseMove}
      >
        {/* LEFT */}
        <div className="w-full xl:w-1/2 lg:min-h-[calc(100vh-160px)] flex flex-col justify-center gap-4 px-4 lg:px-0 z-10">
          <h1
            ref={headlineRef}
            className="text-white text-[18px] sm:text-[20px] md:text-[24px] lg:text-[30px] xl:text-[40px] 2xl:text-[50px] BenzinBold leading-[25px] sm:leading-8 md:leading-tight lg:leading-tight xl:leading-[50px] 2xl:leading-[60px]"
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
                {!item.noSpace && "\u00A0"}
              </span>
            ))}
          </h1>
          <p
            ref={paragraphRef}
            className="text-white text-[14px] sm:text-[15px] md:text-[16px] leading-[1.75] sm:leading-[1.8] tracking-wide max-w-[540px] opacity-0"
            style={{ transform: "translateY(18px)" }}
          >
            Make unlimited design, website, or marketing requests — and get unlimited revisions. 
            Grow your brand faster with your own dedicated creative team handling everything from logos to full websites.
          </p>
        <div
          ref={buttonsRef}
          className="mt-6 mb-8 flex flex-col sm:flex-row gap-4 BenzinSemibold"
        >
  <a href="/strategy-call" className="bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white px-2 py-2 rounded-lg hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300 flex justify-center items-center gap-2 opacity-0 text-sm sm:text-[14px] md:text-[15px] lg:text-[15px] xl:text-[15px] 2xl:text-base whitespace-nowrap" style={{ transform: "translateY(14px)" }}>
    <div className="bg-white p-4 rounded-lg">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
        <path d="M13.2267 11.7955C13.2622 11.7955 13.5467 11.6178 14.08 11.2622C14.6133 10.9067 14.88 10.7289 14.88 10.7289L14.4 10.0889C14.1511 9.73332 13.9111 9.35999 13.68 8.96887C13.4489 8.57776 13.28 8.22221 13.1733 7.90221C12.8533 6.8711 12.7644 5.85776 12.9067 4.86221C13.0489 3.86665 13.4222 2.95998 14.0267 2.14221L14.3467 1.71554L13.1733 0.542207L12.8 0.808874C11.52 1.69776 10.1511 2.09776 8.69333 2.00887C7.23556 1.91998 5.81333 1.32443 4.42667 0.222207C4.21333 0.0444293 4.09778 -0.0266818 4.08 0.00887375C4.06222 0.0444293 3.89333 0.319985 3.57333 0.83554C3.25333 1.3511 3.09333 1.61776 3.09333 1.63554C3.09333 1.65332 3.21778 1.7511 3.46667 1.92887C4.56889 2.67554 5.70667 3.16443 6.88 3.39554C8.05333 3.62665 9.13778 3.56443 10.1333 3.20887L10.56 3.04887L0 13.6622L1.22667 14.8355L11.7867 4.27554L11.6267 4.86221C11.3422 5.64443 11.2533 6.48887 11.36 7.39554C11.4667 8.30221 11.7511 9.21776 12.2133 10.1422C12.32 10.3911 12.5067 10.72 12.7733 11.1289C13.04 11.5378 13.1911 11.76 13.2267 11.7955Z" fill="#FF7A32"/>
      </svg>
    </div>
    <span className="px-2 whitespace-nowrap">Free strategy call</span>
  </a>

  <button className="border border-white text-white px-2 py-2 rounded-lg hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 flex justify-center items-center gap-2 opacity-0 text-sm sm:text-[14px] md:text-[15px] lg:text-[15px] xl:text-[15px] 2xl:text-base whitespace-nowrap" style={{ transform: "translateY(14px)" }}>

     <div className="bg-white p-4 rounded-lg">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
      <path d="M13.2267 11.7955C13.2622 11.7955 13.5467 11.6178 14.08 11.2622C14.6133 10.9067 14.88 10.7289 14.88 10.7289L14.4 10.0889C14.1511 9.73332 13.9111 9.35999 13.68 8.96887C13.4489 8.57776 13.28 8.22221 13.1733 7.90221C12.8533 6.8711 12.7644 5.85776 12.9067 4.86221C13.0489 3.86665 13.4222 2.95998 14.0267 2.14221L14.3467 1.71554L13.1733 0.542207L12.8 0.808874C11.52 1.69776 10.1511 2.09776 8.69333 2.00887C7.23556 1.91998 5.81333 1.32443 4.42667 0.222207C4.21333 0.0444293 4.09778 -0.0266818 4.08 0.00887375C4.06222 0.0444293 3.89333 0.319985 3.57333 0.83554C3.25333 1.3511 3.09333 1.61776 3.09333 1.63554C3.09333 1.65332 3.21778 1.7511 3.46667 1.92887C4.56889 2.67554 5.70667 3.16443 6.88 3.39554C8.05333 3.62665 9.13778 3.56443 10.1333 3.20887L10.56 3.04887L0 13.6622L1.22667 14.8355L11.7867 4.27554L11.6267 4.86221C11.3422 5.64443 11.2533 6.48887 11.36 7.39554C11.4667 8.30221 11.7511 9.21776 12.2133 10.1422C12.32 10.3911 12.5067 10.72 12.7733 11.1289C13.04 11.5378 13.1911 11.76 13.2267 11.7955Z" fill="#11122F"/>
    </svg>
    </div>
    <span className="px-2 whitespace-nowrap">Explore Our Work</span>
  </button>
</div>

        </div>

        {/* RIGHT */}
        <div className="w-full xl:w-1/2 lg:min-h-[calc(100vh-160px)] relative flex items-end justify-center">
          {/* Tilting background image */}
          <Image
            src="/bmyb-logo-group15-01.webp"
            alt=""
            width={829}
            height={648}
            priority
            fetchPriority="high"
            quality={60}
            sizes="(max-width: 640px) 212px, (max-width: 1024px) 320px, (min-width: 1280px) 506px, 44vw"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-transform duration-700 ease-out"
            style={{
              transform: `
                translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)
                rotateX(${mousePos.y * 20}deg)
                rotateY(${-mousePos.x * 20}deg)
              `,
            }}
          />

          {/* Foreground hero layer with offset, shadow and hover effect */}
          <Image
            src="/bmyb-global-layer-1-1-01.webp"
            alt="Hero Layer"
            width={644}
            height={582}
            priority
            fetchPriority="high"
            quality={60}
            sizes="(max-width: 640px) 212px, (max-width: 1024px) 320px, (min-width: 1280px) 506px, 44vw"
            className="relative z-10 h-auto w-full max-w-[644px] transition-transform duration-700 ease-out"
            style={{
              transform: `
                translateX(${mousePos.x * 10}px)
                translateY(${mousePos.y * 10}px)
              `,
              filter: "drop-shadow(0px 20px 30px rgba(0,0,0,0.5))",
            }}
          />

        </div>
      </div>
      {/* Bottom promo bar inside hero right div */}
          <div className=" relative  w-full bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white py-3 px-6 flex flex-col sm:flex-row items-center justify-center gap-2 z-[1000] shadow-xl">
    <span className="text-center sm:text-left text-sm sm:text-base md:text-lg">
    Get your site reviewed in minutes — request a FREE AI Website Audit from BMYBrand.  
    </span>
    <a
      href="#"
      className="text-sm sm:text-base md:text-lg font-semibold underline hover:text-[#11122F] transition-colors duration-300"
    >
      Get My Audit &rarr;
    </a>
  </div>
    </div>
  );
};

export default Heropage;
