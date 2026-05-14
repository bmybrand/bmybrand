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

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-[#11122F]">
      <div className="w-[90%] 2xl:w-[75%] mx-auto">
        {/* Centered Heading */}
        <h2 className="BenzinSemibold text-white text-[1.0rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-[1.9rem] xl:text-[2.3rem] 2xl:text-[2.8rem] mb-10 text-center leading-tight">
          We Get Asked These<br />Questions Often
        </h2>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index}
              className="w-full overflow-hidden rounded-md border border-white/10 bg-[#11122F]/50"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className={`flex w-full items-stretch text-left transition-all duration-300 hover:bg-white/5 ${
                  openIndex === index ? 'border-b border-white/10' : 'border-b-0 border-white/10'
                }`}
              >
                <span className="flex min-w-0 flex-1 items-center gap-3 p-5">
                  <span className="BenzinRegular shrink-0 text-[18px] font-semibold text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="BenzinRegular pr-8 text-[18px] font-semibold text-white">
                    {faq.question}
                  </span>
                </span>
                <motion.span
                  className={`flex w-12 shrink-0 items-center justify-center text-2xl transition-colors duration-300 md:w-16 ${
                    openIndex === index ? 'bg-[#F45B25] text-white' : 'bg-white/10 text-white/80'
                  }`}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 4v16m8-8H4" 
                    />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mt-3 pb-5 pl-10 pr-5 text-[0.85rem] sm:text-sm md:text-base leading-6 text-white/70">
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
