"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type Card = {
  title: string;
  desc: string;
  icon: string;
};

const cards: Card[] = [
  {
    title: "Deep Understanding",
    desc: "We learn your goals, audience, and challenges first",
    icon: "/bmyb-global-creative-consistency-01.svg",
  },
  {
    title: "Tailored Strategies",
    desc: "Every solution is customized to fit your business needs",
    icon: "/bmyb-global-detail-driven-quality-01.svg",
  },
  {
    title: "Creativity + Technology",
    desc: "We combine design thinking with modern technical solutions",
    icon: "/bmyb-global-reliable-workflow-01.svg",
  },
  {
    title: "Real Results Focus",
    desc: "Our work is driven by measurable growth and impact",
    icon: "/bmyb-global-smart-optimization-01.svg",
  },
  {
    title: "Simple Process",
    desc: "We keep everything clear, structured, and easy to follow",
    icon: "/bmyb-global-clear-communication-01.svg",
  },
  {
    title: "User Experience First",
    desc: "We design smooth, intuitive, and engaging digital experiences",
    icon: "/bmyb-global-flexible-creativity-01.svg",
  },
  {
    title: "Built to Scale",
    desc: "Every solution is designed to grow with your business",
    icon: "/bmyb-global-long-term-stability-01.svg",
  },
  {
    title: "Close Collaboration",
    desc: "We work closely with you at every stage together",
    icon: "/bmyb-global-built-for-growth-01.svg",
  },
];

const positions: React.CSSProperties[] = [
  { top: "5%", left: "10%" },
  { top: "5%", right: "10%" },
  { top: "30%", left: "5%" },
  { top: "30%", right: "5%" },
  { bottom: "30%", left: "5%" },
  { bottom: "30%", right: "5%" },
  { bottom: "5%", left: "10%" },
  { bottom: "5%", right: "10%" },
];

/* Animation Variants */
const cardVariants: Variants = {
  hidden: (direction: "left" | "right") => ({
    opacity: 0,
    x: direction === "left" ? -80 : 80,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1], // easeOut
    },
  },
};

const OurBranding: React.FC = () => {
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

  return (
    <section className="w-full pt-30 pb-30 flex flex-col items-center">
      {/* HEADING */}
      <div ref={headingRef} className="w-full flex flex-col items-center">
        <h2 className="mb-6 w-[90%] 2xl:w-[60%] text-white sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl BenzinSemibold text-center">
          A Closer Look at the <span className="text-[#F45B25]">BmyBrand</span> Approach
        </h2>
        <p className="w-[90%] 2xl:w-[60%] text-base text-[#ADAECC] text-center">
          At BmyBrand, we focus on understanding your business first, then building the right mix of strategy, design, and technology to support real growth. Our approach is simple, practical, and tailored to help your brand move forward with clarity and confidence.
        </p>
      </div>

      {/* CONTENT */}
      <div className="w-[90%] 2xl:w-[75%]  mt-12 relative flex justify-center items-center">
        {/* LG+ absolute layout */}
        <div className="hidden lg:block relative w-full h-150">
          <Image
            src="/bmyb-logo-group-1597883284-01.png"
            alt=""
            width={460}
            height={416}
            className="relative top-1/2 left-1/2 w-[420px] xl:w-[460px] -translate-x-1/2 -translate-y-1/2 z-10 h-auto"
          />
          {cards.map((card, index) => {
            const isLeft = "left" in positions[index];
            return (
              <motion.div
                key={index}
                custom={isLeft ? "left" : "right"}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="absolute z-30 w-90 bg-[#191A35] border border-[#2A2B47] rounded-xl py-4 px-6
                           lg:border-white/18 lg:bg-white/[0.06] lg:backdrop-blur-xl lg:backdrop-saturate-125
                           xl:bg-[#191A35] xl:border-[#2A2B47] xl:backdrop-blur-none xl:backdrop-saturate-100 xl:shadow-none
                           transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                style={positions[index]}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={card.icon}
                    alt=""
                    className=" h-full object-contain shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="text-white BenzinSemibold mb-2 text-sm">
                      {card.title}
                    </h4>
                    <p className="text-[#ADAECC] text-xs leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BELOW LG - vertical stack */}
        <div className="flex flex-col lg:hidden w-full gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-sm bg-[#191A35] border border-[#2A2B47] rounded-xl py-4 px-6 mx-auto"
            >
              <div className="flex items-start gap-4">
                <img
                  src={card.icon}
                  alt=""
                  className="h-full object-contain shrink-0"
                />
                <div>
                  <h4 className="text-white BenzinSemibold mb-2 text-sm">
                    {card.title}
                  </h4>
                  <p className="text-[#ADAECC] text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurBranding;
