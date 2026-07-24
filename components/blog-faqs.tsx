'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type BlogFaqsProps = {
  faqs: Array<{ question: string; answer: string }>
}

export default function BlogFaqs({ faqs }: BlogFaqsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="frequently-asked-questions" className="mt-12 w-full scroll-mt-32">
      <h2 className="BenzinSemibold mb-7 text-[clamp(1.8rem,2.4vw,2.5rem)] leading-tight text-white">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          const number = String(index + 1).padStart(2, '0')

          return (
            <div key={faq.question} className="w-full overflow-hidden rounded-md border border-white/10 bg-[#11122F]/50">
              <button
                type="button"
                onClick={() => setOpenIndex((current) => current === index ? null : index)}
                className={`flex w-full items-stretch text-left transition-all duration-300 hover:bg-white/5 ${isOpen ? 'border-b border-white/10' : 'border-b-0 border-white/10'}`}
                aria-expanded={isOpen}
              >
                <span className="flex min-w-0 flex-1 items-center gap-3 p-5">
                  <span className="BenzinRegular shrink-0 text-[18px] font-semibold text-white">{number}</span>
                  <span className="BenzinRegular pr-8 text-[18px] font-semibold text-white">{faq.question}</span>
                </span>

                <span className={`flex w-12 shrink-0 items-center justify-center text-2xl transition-colors duration-300 md:w-16 ${isOpen ? 'bg-[#F45B25] text-white' : 'bg-white/10 text-white/80'}`}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 12h16"
                    />
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16"
                      animate={{ opacity: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.35, ease: 'easeOut', delay: 0.08 },
                      opacity: { duration: 0.22, ease: 'easeOut' },
                    }}
                  >
                    <div className="mt-3 pb-5 pl-10 pr-5 text-[0.85rem] leading-6 text-white/70 sm:text-sm md:text-base">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
