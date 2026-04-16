"use client";

import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "Do you have experience working with healthcare organizations?",
    answer:
      "Yes, we work closely with healthcare providers, clinics, and medical organizations to create secure, patient-focused digital experiences. Our approach is tailored to the unique needs of the healthcare industry, ensuring compliance, usability, and solutions that support both patient engagement and long-term growth.",
  },
  {
    question: "Can you ensure our website is HIPAA-compliant and accessible?",
    answer:
      "Absolutely. We prioritize HIPAA compliance and accessibility in every healthcare project, implementing best practices for data security, privacy, and usability to meet regulatory requirements and serve all users effectively.",
  },
  {
    question: "How long does a typical healthcare website project take?",
    answer:
      "Project timelines vary based on scope and requirements, but most healthcare websites are completed within 8-16 weeks, including discovery, design, development, and launch phases.",
  },
  {
    question: "What’s included in your design and development process?",
    answer:
      "Our process includes discovery, strategy, UX/UI design, content integration, development, testing, and post-launch support. We collaborate closely with your team to ensure every step aligns with your goals.",
  },
  {
    question: "Do you handle copywriting and SEO for healthcare websites?",
    answer:
      "Yes, we offer comprehensive copywriting and SEO services tailored for healthcare, ensuring your content is clear, compliant, and optimized for search engines.",
  },
  {
    question: "Can you migrate our existing website and content?",
    answer:
      "Yes, we provide seamless migration services to move your existing website and content to a new, modern platform with minimal disruption.",
  },
  {
    question: "Can you integrate booking systems and patient tools?",
    answer:
      "We can integrate a variety of booking systems, patient portals, and third-party tools to streamline operations and enhance patient experience.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes, we offer ongoing support, maintenance, and optimization services to ensure your healthcare website remains secure, up-to-date, and effective.",
  },
];

export default function HealthcareFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null);
  const [isLogoBarHovered, setIsLogoBarHovered] = useState(false);

  const logos = [
    { default: '/vector (23).svg', hover: '/vector (24)-orange.svg', alt: 'Abbott' },
    { default: '/vector (24).svg', hover: '/vector (26)-orange.svg', alt: 'London Real' },
    { default: '/vector (25).svg', hover: '/vector (25)-orange.svg', alt: 'Decathlon' },
    { default: '/vector (26).svg', hover: '/vector (28)-orange.svg', alt: 'Targus' },
    { default: '/vector (27).svg', hover: '/vector (23)-orange.svg', alt: 'Single Grain' },
    { default: '/vector (28).svg', hover: '/vector (27)-orange.svg', alt: 'York University' }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-[#11122F]">
      <div className="w-[90%] 2xl:w-[75%] mx-auto">
        {/* Centered Heading */}
        <h2 className="BenzinSemibold text-white text-3xl sm:text-4xl lg:text-5xl mb-10 text-center">
          We Get Asked These<br />Questions Often
        </h2>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <div 
              key={index}
              className="border border-white/10 rounded-xl overflow-hidden bg-[#191A35]"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-all duration-300"
              >
                <span className="flex items-center gap-4">
                  <span className="text-[#F45B25] BenzinSemibold text-lg sm:text-xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-white text-base md:text-lg lg:text-xl BenzinSemibold pr-8">
                    {faq.question}
                  </span>
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <svg 
                    className="w-6 h-6 text-[#F45B25]" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 4v16m8-8H4" 
                    />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-white/70  text-sm md:text-base lg:text-lg leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
