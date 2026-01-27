'use client';
import { ReactLenis } from 'lenis/react';
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { JSX, useRef } from 'react';
import Image from 'next/image';

const projects = [
  {
    title: (
      <>
        Strengthening <span className="text-[#B91E2C]">Healthcare Brands With Precision</span>, Trust, And Innovation
      </>
    ),
    description:
      "A compassionate, women-centered website designed to support and uplift those affected by breast cancer, making it easy to find resources, access programs, and connect with a caring community.",
    buttonText: "View Full Case Study",
    src: "water.jpg",
    link: "/fountainhills.svg",
    logo: "/FH-EmergencyRoom-Logo-ERClinic-1 2.svg",
    gradient: "linear-gradient(180deg, #270508 0%, #110204 100%)",
    buttonColor: "#B91E2C",
    buttonIcon: "/arrowred.svg", // unique icon for this card
  },
  {
    title: (
      <>
        Strengthening <span className="text-[#ED349D]">Healthcare Brands With Precision</span>, Trust, And Innovation
      </>
    ),
    description:
      "A modern, patient-first medical website built to strengthen trust, simplify browsing, and help visitors quickly access the information and care they need.",
    buttonText: "View Full Case Study",
    src: "water.jpg",
    link: "/pinkme.svg",
    logo: "/PM-Logo.svg",
    gradient: "linear-gradient(180deg, #661041 0%, #250617 100%)",
    buttonColor: "#ED349D",
    buttonIcon: "/arrowpink.svg", // unique icon for this card
  },
];

export default function Index(): JSX.Element {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <main className="mt-30 lg:mt-0" ref={container}>
        <section className="text-white w-full ">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                title={project.title}
                description={project.description}
                buttonText={project.buttonText}
                url={project.link}
                logo={project.logo}
                gradient={project.gradient}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                buttonColor={project.buttonColor}
                buttonIcon={project.buttonIcon} // pass icon
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}

interface CardProps {
  i: number;
  title: React.ReactNode;
  description: string;
  buttonText: string;
  url: string;
  logo: string;
  gradient: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  buttonColor: string;
  buttonIcon: string; // new prop
}

export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  buttonText,
  url,
  logo,
  gradient,
  progress,
  range,
  targetScale,
  buttonColor,
  buttonIcon,
}) => {
  const container = useRef(null);

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-fit lg:h-[80vh]  flex items-center justify-center sticky top-25"
    >
      <motion.div
        style={{
          background: gradient,
          scale,
          top: `calc(0vh + ${i * 25}px)`,
        }}
        className="overflow-hidden flex flex-col relative top-[25%] h-fit lg:h-[70vh] w-[96vw] max-w-none rounded-3xl origin-top"
      >
        <div className="flex flex-col-reverse lg:flex-row h-full">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-[50%] relative flex flex-col justify-center p-8 h-90% ">

            {/* LOGO */}
            {logo && (
              <div className="mb-6">
                <img
                  src={logo}
                  alt={`${title} logo`}
                  className="object-contain"
                />
              </div>
            )}

            {/* TITLE */}
            <h2 className=" lg:leading-10 BenzinSemibold text-base sm:text-xl md:text-2xl lg:text-4xl font-bold mb-3 ">
              {title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-xs md:text-sm lg:text-base  leading-6 text-[#B5BED6] ">
              {description}
            </p>

            {/* BUTTON */}
            <button
              style={{ backgroundColor: buttonColor }}
              className="mt-4 text-white px-2 py-2 BenzinSemibold rounded-lg hover:brightness-90 transition duration-300 flex justify-center items-center gap-2 w-fit"
            >
              <div className="bg-white p-4 rounded-lg">
                <img src={buttonIcon} alt="button icon" className="w-4 h-4" />
              </div>
              <span className="px-2">{buttonText}</span>
            </button>
          </div>

          {/* IMAGE RIGHT */}
          <div className="flex-1 relative rounded-lg overflow-visible">
            <motion.div className="w-full h-full">
              <Image
                src={url}
                alt="Project image"
                fill
                className="object-cover "
                priority
              />
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
