"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const FullyAnimatedGrid: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const showTimer = useRef<number | null>(null);
  const collapseTimer = useRef<number | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const expansionDelay = 500;
  const fadeDuration = 700;
  const hasTriggered = useRef(false);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: "sine.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
          clearProps: "transform",
        }
      );
    }, headingRef.current);

    return () => ctx.revert();
  }, []);

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

          observer.disconnect();
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [expansionDelay]);

  const leftItems = [
    {
      title: "AI-Driven Solutions",
      text:
        "We build smart AI-powered solutions that automate tasks, improve decision-making, and help businesses work faster and more efficiently.",
      img: "/bmyb-services-brand-brand-experience-01.svg",
      delay: 0.1,
    },
    {
      title: "Software Development",
      text:
        "We create custom software, websites, and applications tailored to your business needs, focusing on performance and user experience.",
      img: "/bmyb-services-software-software-development-01.svg",
      delay: 0.3,
    },
    {
      title: "Digital Marketing",
      text:
        "We help brands grow online through SEO, social media, paid ads, and content strategies that drive traffic, leads, and engagement.",
      img: "/bmyb-services-commerce-commerce-solutions-01.svg",
      delay: 0.5,
    },
  ];

  const rightItems = [
    {
      title: "E-Commerce Solutions",
      text:
        "We develop complete e-commerce solutions that make selling online easy, with smooth checkout experiences and secure payments.",
      img: "/bmyb-services-marketing-digital-marketing-01.svg",
      delay: 0.1,
    },
    {
      title: "Brand Experience",
      text:
        "We design strong brand identities and user experiences that connect with audiences, build trust, and make your business memorable.",
      img: "/bmyb-tech-creative-production-01.svg",
      delay: 0.3,
    },
    {
      title: "Business Operations",
      text:
        "We streamline business operations using smart systems, automation, and workflow improvements that increase efficiency.",
      img: "/bmyb-services-operations-business-operations-01.svg",
      delay: 0.5,
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div
        ref={headingRef}
        className="mt-30 mb-20 flex w-[90%] flex-col items-center justify-center 2xl:w-[75%]"
      >
        <div className="flex w-full flex-col items-center">
          <h2 className="mb-6 text-center text-[#FFFFFF] sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl BenzinSemibold">
            Everything Your <span className="text-[#F45B25]">Business Needs</span> Under One Roof
          </h2>
          <p className="text-center text-base text-[#ADAECC]">
            BMYBrand delivers smart, practical solutions that help businesses grow in the digital world. Our services are built to make your<br /> brand stronger, more visible, and more effective.
          </p>
        </div>
      </div>

      <div
        ref={gridRef}
        className="relative flex w-[90%] flex-col gap-5 rounded-xl 2xl:w-[75%] lg:flex-row"
      >
        <div
          className={`flex w-full flex-col justify-around gap-5 overflow-hidden text-white transition-all duration-700 ${
            isHovered ? "lg:w-1/3" : "lg:w-0"
          }`}
        >
          {leftItems.map((item, idx) => (
            <div
              key={idx}
              className="group flex h-64 cursor-pointer flex-col justify-center rounded-lg bg-[#191A35] p-4 transition-all duration-300 hover:bg-[#F96F31] lg:p-8"
            >
              <div className="flex w-full flex-col lg:hidden">
                <img
                  src={item.img}
                  alt=""
                  className="w-12 py-3 transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                />
                <h3 className="mb-2 text-left text-xl font-semibold BenzinSemibold transition-colors duration-300 group-hover:text-white">
                  {item.title}
                </h3>
                <p className="text-left text-base text-[#ADAECC] transition-colors duration-300 group-hover:text-white">
                  {item.text}
                </p>
              </div>

              <AnimatePresence>
                {showContent && (
                  <motion.div
                    className="hidden w-full flex-col lg:flex"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: item.delay, duration: fadeDuration / 1000 }}
                  >
                    <img
                      src={item.img}
                      alt=""
                      className="w-12 py-3 transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                    />
                    <h3 className="mb-2 text-left text-xl font-semibold BenzinSemibold transition-colors duration-300 group-hover:text-white">
                      {item.title}
                    </h3>
                    <p className="text-left text-base text-[#ADAECC] transition-colors duration-300 group-hover:text-white">
                      {item.text}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div
          className={`bg-[url('/bmyb-global-fullimage-01.webp')] bg-cover bg-center rounded-lg w-full h-145 sm:h-145 md:h-165 lg:h-auto transition-all duration-700 p-2 lg:p-8 flex flex-col justify-end items-center text-white gap-6 ${
            isHovered ? "lg:w-1/3" : "lg:w-full"
          }`}
        >
          <div className="flex w-full flex-col items-center lg:hidden">
            <img
              src="/bmyb-global-character-2-1-01-mobile.png"
              alt=""
              width="260"
              height="242"
              loading="lazy"
              decoding="async"
              className="absolute top-1/2 left-1/2 w-[380px] sm:w-[430px] -translate-x-1/2 -translate-y-2/3 transform lg:-top-10 lg:-translate-y-0"
            />
            <h2 className="mb-4 text-center text-sm md:text-lg lg:text-lg 2xl:text-2xl BenzinSemibold leading-relaxed">
              Our Services Designed for Real Business Growth
            </h2>
            <button className="w-full rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-4 py-4 text-lg text-white transition-all duration-300 hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] BenzinSemibold">
              Get Started Now
            </button>
          </div>

          <AnimatePresence>
            {showContent && (
              <motion.div
                className="z-20 hidden w-full flex-col items-center lg:flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.img
                  src="/bmyb-global-character-2-1-01.png"
                  alt=""
                  width="1669"
                  height="1556"
                  className="absolute -top-10 left-1/2 w-[430px] xl:w-[480px] 2xl:w-[520px] -translate-x-1/2"
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
                <motion.h2 className="mb-4 text-center text-sm md:text-lg lg:text-lg 2xl:text-2xl BenzinSemibold leading-relaxed">
                  Our Services Designed for Real Business Growth
                </motion.h2>

                <motion.button className="w-full rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-4 py-4 text-lg text-white transition-all duration-300 hover:brightness-105 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] BenzinSemibold">
                  Get Started Now
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className={`flex w-full flex-col justify-around gap-5 overflow-hidden text-white transition-all duration-700 ${
            isHovered ? "lg:w-1/3" : "lg:w-0"
          }`}
        >
          {rightItems.map((item, idx) => (
            <div
              key={idx}
              className="group flex h-64 cursor-pointer flex-col justify-center rounded-lg bg-[#191A35] p-4 transition-all duration-300 hover:bg-[#F96F31] lg:p-8"
            >
              <div className="flex w-full flex-col lg:hidden">
                <img
                  src={item.img}
                  alt=""
                  className="w-12 py-3 transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                />
                <h3 className="mb-2 text-left text-xl font-semibold BenzinSemibold transition-colors duration-300 group-hover:text-white">
                  {item.title}
                </h3>
                <p className="text-left text-base text-[#ADAECC] transition-colors duration-300 group-hover:text-white">
                  {item.text}
                </p>
              </div>

              <AnimatePresence>
                {showContent && (
                  <motion.div
                    className="hidden w-full flex-col lg:flex"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: item.delay, duration: fadeDuration / 1000 }}
                  >
                    <img
                      src={item.img}
                      alt=""
                      className="w-12 py-3 transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                    />
                    <h3 className="mb-2 text-left text-xl font-semibold BenzinSemibold transition-colors duration-300 group-hover:text-white">
                      {item.title}
                    </h3>
                    <p className="text-left text-base text-[#ADAECC] transition-colors duration-300 group-hover:text-white">
                      {item.text}
                    </p>
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
