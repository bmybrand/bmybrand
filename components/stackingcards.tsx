'use client';
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { JSX, useRef } from 'react';
import Image from 'next/image';

const projects = [
  {
    title: (
      <>
        Designed A <span className="text-[#B91E2C]">Trusted, Physician-Led</span> Emergency Care System
      </>
    ),
    description:
      "A 24/7 physician-led emergency and medical center providing fast, compassionate care for Fountain Hills and surrounding communities. With on-site diagnostics, board-certified doctors, and patient-first treatment, the facility ensures immediate care when it matters most.",
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
        Built A Compassion-Driven Nonprofit Digital Experience for <span className="text-[#ED349D]">Breast Cancer Support</span>
      </>
    ),
    description:
      "We designed a compassion-led digital platform for PINK “ME” to support women and families affected by breast cancer through financial assistance, wellness programs, awareness resources, and community-driven support. The experience focuses on dignity, clarity, and accessibility, making it easier for users to access help, apply for grants, and connect with vital support services.",
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
        Crafted a <span className="text-[#F59E0B]">Flavor-Led Brand Experience</span> for an Energetic Snack Product
      </>
    ),
    description:
      "We created a fun and flavor-driven ecommerce experience for Jiggy Jerky, a premium Angus beef jerky brand focused on bold taste, clean ingredients, and energetic personality. The platform highlights handcrafted quality, unique flavor profiles, and a playful brand voice that makes snacking feel exciting, while clearly communicating product value, nutrition, and purchase ease for customers and wholesale partners.",
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
        Built a Teacher-Focused App to Save Time and <span className="text-[#B0BD31]">Improve Communication</span>
      </>
    ),
    description:
      "We designed a practical, teacher-friendly digital platform that simplifies classroom organization and parent communication through easy label creation and newsletter tools. Label N Learn helps educators save time with customizable templates, AI-assisted label generation, and quick sharing options, allowing them to stay organized, communicate clearly, and focus more on teaching.",
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
      <style jsx>{`
        @media (min-width: 1024px) and (max-width: 1279px) {
          .stack-card-scale {
            height: 100%;
            width: 100%;
            transform: scale(clamp(0.82, calc(100dvh / 980), 1));
            transform-origin: center top;
          }
        }
      `}</style>
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
        <div className="stack-card-scale h-full w-full">
          <div
            className="relative bg-cover bg-left w-full h-full"
            style={backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : undefined}
          >
            <div className="flex flex-col-reverse lg:flex-row h-full w-full">

              {/* LEFT CONTENT */}
              <div className="w-full lg:w-[50%] relative flex flex-col justify-center p-8 lg:px-6 lg:py-7 xl:p-8 h-90% ">

              {/* LOGO */}
              {logo && (
                <div className="mb-4 lg:mb-3 xl:mb-6">
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
                    className="h-auto w-auto max-w-[180px] lg:max-w-[150px] xl:max-w-[220px] 2xl:max-w-none object-contain"
                  />
                </div>
              )}

              {/* TITLE */}
              <h2 className="BenzinSemibold text-base sm:text-xl md:text-2xl lg:text-[1.55rem] xl:text-[1.68rem] 2xl:text-4xl font-bold mb-3 lg:mb-2 xl:mb-2 2xl:mb-3 leading-snug lg:leading-[1.12] xl:leading-[1.12] 2xl:leading-[1.3]">
                {title}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-xs md:text-sm lg:text-[0.82rem] xl:text-[0.9rem] 2xl:text-base leading-5 lg:leading-[1.32] xl:leading-[1.38] 2xl:leading-6 text-[#B5BED6] ">
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
                className="mt-3 xl:mt-3 text-white px-2 py-2 lg:px-1.5 xl:px-2 2xl:px-2 lg:py-1.5 xl:py-2 2xl:py-2 BenzinSemibold rounded-lg hover:brightness-105 transition-all duration-300 flex justify-center items-center gap-2 w-fit text-sm lg:text-[0.76rem] xl:text-[0.86rem] 2xl:text-base"
              >
                <div className="bg-white p-3 lg:p-2.5 xl:p-3.5 2xl:p-4 rounded-lg">
                  <img src={buttonIcon} alt="button icon" className="w-4 h-4" />
                </div>
                <span className="px-2 lg:px-1.5 xl:px-2 2xl:px-2">{buttonText}</span>
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
        </div>
      </motion.div>
    </div>
  );
};
