// thanks to oliver: https://www.youtube.com/@olivierlarose1
'use client';
import { ReactLenis } from 'lenis/react';
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { JSX, useRef } from 'react';
import Image from 'next/image';

const projects = [
  {
    title: "Strengthening Healthcare Brands With Precision, Trust, And Innovation",
    description:
      "A modern, patient-first medical website built to strengthen trust, simplify browsing, and help visitors quickly access the information and care they need.",
    list: ["View Full Case Study"],
    src: "water.jpg", // replace with your image path if needed
    link: "/1.svg",   // replace with your relevant image/link
    color: "#0B1633",
  },
  {
    title: "Strengthening Breast Cancer Awareness With Compassion, Clarity, And Empowerment",
    description:
      "A compassionate, women-centered website designed to support and uplift those affected by breast cancer, making it easy to find resources, access programs, and connect with a caring community.",
    list: ["View Full Case Study"],
    src: "water.jpg", // replace with your image path if needed
    link: "/2.svg",   // replace with your relevant image/link
    color: "#0B1633",
  },
];


export default function index(): JSX.Element {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <main className='bg-black' ref={container}>
        <section className='text-white h-[70vh] w-full bg-slate-950 grid place-content-center'>
           <div className="z-10 flex flex-col items-center text-center max-w-5xl space-y-6 mx-auto mb-40  ">
    <p className="text-lg font-bold text-[#2563EA] lg:text-xl md:text-lg sm:text-xs">The Power of Connection</p>
    <h1 className="text-3xl  lg:text-6xl md:text-5xl sm:text-3xl font-bold leading-tight">
      Explore the  {" "}
      <span className="text-[#2563EA]">World</span> of  ReComune
    </h1>
    <p className="text-sm md:text-[16px] text-gray-400 lg:text-xl md:text-xs sm:text-xs">
      Step into a world where you're never truly alone. ReComune brings the warmth of real  <br /> conversation through your very own AI companion
    </p>
  </div>
        </section>

        <section className='text-white w-full bg-slate-950'>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project?.link}
                src={project?.src}
                title={project?.title}
                color={project?.color}
                description={project?.description}
                list={project?.list || []}  // pass list here
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
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
  title: string;
  description: string;
  src: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  list: string[];
}

export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
  list,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
  ref={container}
  className=' h-screen flex items-center justify-center sticky top-0 '
>
  <motion.div
    style={{
      backgroundColor: color,
      scale,
      top: `calc(-5vh + ${i * 25}px)`,
    }}
    className={`flex flex-col relative top-[25%] h-[700px] w-[90%] rounded-3xl border-2 border-[#142759] lg:p-10  p-2 origin-top`}
  >
    <div className="flex flex-col md:flex-col sm:flex-col lg:flex-row h-full gap-10">
      <div className="w-full lg:w-[40%] relative flex flex-col h-90%">
        <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-bold mb-3 mt-10">{title}</h2>
        <p className="lg:text-xl md:text-lg sm:text-sm text-xs leading-8 text-[#B5BED6]">{description}</p>

        {list.length > 0 && (
          <>
            <h3 className=" lg:text-3xl md:text-2xl sm:text-1xl text-xl font-bold mb-3 pt-10 text-[#2563EA]">
              Key Highlights:
            </h3>
            <ul className="list-disc pl-9 marker:text-[#2563EA] marker:text-4xl space-y-1 text-[#B5BED6]">
              {list.map((item, idx) => (
                <li className='lg:text-xl md:text-lg sm:text-sm text-xs' key={idx}>{item}</li>
              ))}
            </ul>
          </>
        )}

        
      </div>

      <div className="relative w-full lg:w-[60%] h-full rounded-lg overflow-hidden">
        <motion.div
          className="w-full h-full"
          style={{ scale: imageScale }}
        >
          <Image fill src={url} alt='image' className='object-cover' />
        </motion.div>
      </div>
    </div>
  </motion.div>
</div>

  );
};
