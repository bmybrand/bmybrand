'use client';
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
    src: "/bmyb-case-fountain-hills-fountainhills-01.webp",
    link: "/case-studies/fountain-hills",
    logo: "/bmyb-case-fountain-hills-fh-emergencyroom-logo-erclinic-1-2-02.svg",
    gradient: "linear-gradient(180deg, #270508 0%, #110204 100%)",
    buttonColor: "#B91E2C",
    buttonIcon: "/bmyb-global-arrowred-01.svg",
    backgroundImage: "/bmyb-case-fountain-hills-fountainhillsbg-01.svg",
  },
  {
    title: (
      <>
        Strengthening <span className="text-[#ED349D]">Breast Cancer Support</span> With Compassion, Clarity, And Empowerment
      </>
    ),
    description:
      "A compassionate, women-centered website designed to support and uplift those affected by breast cancer, making it easy to find resources, access programs, and connect with a caring community.",
    buttonText: "View Full Case Study",
    src: "/bmyb-case-pink-me-pinkme-01.webp",
    link: "/case-studies/pink-me",
    logo: "/bmyb-case-pink-me-pm-logo-01.svg",
    gradient: "linear-gradient(180deg, #661041 0%, #250617 100%)",
    buttonColor: "#ED349D",
    buttonIcon: "/bmyb-global-arrowpink-01.svg",
    backgroundImage: "/bmyb-case-pink-me-pinkmebg-01.svg",
  },

  {
    title: (
      <>
        Delivering <span className="text-[#F59E0B]">Clean-Ingredient, Bold-Flavor Experiences</span> For Jerky Fans
      </>
    ),
    description:
      "Famous About Town, A Classic MTV-Style, Legal Jerky Is Made For Jerky Lovers Who Want Bold Flavors Without The Fuss— Smoky, Savory, And Bold. That's Just Like It.",
    buttonText: "View Full Case Study",
    src: "/bmyb-case-jiggy-jerky-jiggy-01.webp",
    link: "/case-studies/jiggy-jerky",
    logo: "/bmyb-case-jiggy-jerky-jiggylogo-01.svg",
    gradient: "linear-gradient(180deg, #4A3A1A 0%, #1F1808 100%)",
    buttonColor: "#F59E0B",
    buttonIcon: "/bmyb-global-arrowyellow-01.svg",
    backgroundImage: "/bmyb-case-jiggy-jerky-jiggybg-01.svg",
  },

  {
    title: (
      <>
        Creating <span className="text-[#B0BD31]">AI-Powered Labels & Newsletters</span> For Smarter Communication
      </>
    ),
    description:
      "Built to simplify content creation, enhance productivity, and deliver personalized results, the app empowers businesses and individuals to communicate smarter and faster.",
    buttonText: "View Full Case Study",
    src: "/bmyb-case-learnandlabel-learnandlabel-02.webp",
    link: "/case-studies/learnandlabel",
    logo: "/bmyb-case-learnandlabel-learnandlabellogo-01.svg",
    gradient: "linear-gradient(180deg, #4A3A1A 0%, #1F1808 100%)",
    buttonColor: "#B0BD31",
    buttonIcon: "/bmyb-global-arrowgreen-01.svg",
    backgroundImage: "/bmyb-case-learnandlabel-learnandlabelbg-01.svg",
  }, 
];

export default function Index(): JSX.Element {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
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
              imageSrc={project.src}
              logo={project.logo}
              gradient={project.gradient}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              buttonColor={project.buttonColor}
              buttonIcon={project.buttonIcon}
              backgroundImage={project.backgroundImage}
            />
          );
        })}
      </section>
    </main>
  );
}

interface CardProps {
  i: number;
  title: React.ReactNode;
  description: string;
  buttonText: string;
  url: string;
  imageSrc: string;
  logo: string;
  gradient: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  buttonColor: string;
  buttonIcon: string;
  backgroundImage: string;
}

export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  buttonText,
  url,
  imageSrc,
  logo,
  gradient,
  progress,
  range,
  targetScale,
  buttonColor,
  buttonIcon,
  backgroundImage,
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
        className="overflow-hidden flex flex-col relative top-[25%] h-fit lg:h-[70vh] w-[94vw] lg:w-[80%] max-w-none rounded-3xl origin-top overflow-hidden"
      >
        <div
          className="relative bg-cover bg-left w-full h-full"
          style={backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : undefined}
        >
          <div className="flex flex-col-reverse lg:flex-row h-full w-full">

            {/* LEFT CONTENT */}
            <div className="w-full lg:w-[50%] relative flex flex-col justify-center p-8 h-90% ">

            {/* LOGO */}
            {logo && (
              <div className="mb-6">
                <Image
                  src={logo}
                  alt={`${title} logo`}
                  width={
                    logo.includes('learnandlabel') ? 142 :
                    logo.includes('jiggylogo') ? 238 :
                    logo.includes('pink-me') ? 348 :
                    284
                  }
                  height={
                    logo.includes('learnandlabel') ? 102 :
                    logo.includes('jiggylogo') ? 119 :
                    logo.includes('pink-me') ? 91 :
                    64
                  }
                  className="object-contain"
                />
              </div>
            )}

            {/* TITLE */}
            <h2 className="BenzinSemibold text-base sm:text-xl md:text-2xl lg:text-4xl font-bold mb-3 leading-snug lg:leading-[1.3]">
              {title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-xs md:text-sm lg:text-base  leading-6 text-[#B5BED6] ">
              {description}
            </p>

            {/* BUTTON */}
            <a
              href={url}
              style={{ backgroundColor: buttonColor }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 25px ${buttonColor}80`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              className="mt-4 text-white px-2 py-2 BenzinSemibold rounded-lg hover:brightness-105 transition-all duration-300 flex justify-center items-center gap-2 w-fit"
            >
              <div className="bg-white p-4 rounded-lg">
                <img src={buttonIcon} alt="button icon" className="w-4 h-4" />
              </div>
              <span className="px-2">{buttonText}</span>
            </a>
          </div>

          {/* IMAGE RIGHT */}
          <div className="flex-1 relative rounded-lg overflow-visible">
            <motion.div className="w-full h-full">
              <Image
                src={imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`}
                alt="Project image"
                fill
                className="object-cover "
                priority
              />
            </motion.div>
          </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};
