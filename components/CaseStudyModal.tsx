'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type CaseStudy = {
  id: string
  number: string
  title: string
  subtitle: string
  client: string
  industry: string
  services: string[]
  challenge: string
  solution: string
  results: string[]
  image: string
  stats: {
    label: string
    value: string
  }[]
  slug: string
}

interface CaseStudyModalProps {
  isOpen: boolean
  onClose: () => void
  caseStudy: CaseStudy | null
}

export default function CaseStudyModal({ isOpen, onClose, caseStudy }: CaseStudyModalProps) {
  const router = useRouter()

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!caseStudy) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[10001] overflow-y-auto">
            <div className="min-h-screen px-4 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-4xl bg-[#1E2044] rounded-2xl overflow-hidden shadow-2xl my-8"
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Hero Image */}
                <div className="relative w-full h-64 md:h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2044] to-transparent z-10"></div>
                  <img
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 md:left-10 z-20">
                    <span className="text-white/60 text-sm md:text-base">{caseStudy.number}</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-white BenzinSemibold mt-2">
                      {caseStudy.title}
                    </h2>
                    <p className="text-[#F45B25] text-lg md:text-xl mt-1">{caseStudy.subtitle}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 max-h-[60vh] overflow-y-auto">
                  {/* Client Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pb-8 border-b border-white/10">
                    <div>
                      <h4 className="text-white/60 text-sm mb-2">Client</h4>
                      <p className="text-white text-base BenzinSemibold">{caseStudy.client}</p>
                    </div>
                    <div>
                      <h4 className="text-white/60 text-sm mb-2">Industry</h4>
                      <p className="text-white text-base BenzinSemibold">{caseStudy.industry}</p>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-8">
                    <h4 className="text-white text-lg BenzinSemibold mb-4">Services Provided</h4>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-[#F45B25]/20 text-[#F45B25] rounded-lg text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Challenge */}
                  <div className="mb-8">
                    <h4 className="text-white text-lg BenzinSemibold mb-3">The Challenge</h4>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed">
                      {caseStudy.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-8">
                    <h4 className="text-white text-lg BenzinSemibold mb-3">Our Solution</h4>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed">
                      {caseStudy.solution}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-white/5 rounded-xl">
                    {caseStudy.stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <p className="text-2xl md:text-3xl lg:text-4xl text-[#F45B25] BenzinSemibold mb-1">
                          {stat.value}
                        </p>
                        <p className="text-white/60 text-xs md:text-sm">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="mb-8">
                    <h4 className="text-white text-lg BenzinSemibold mb-4">Key Results</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {caseStudy.results.map((result, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-[#F45B25] rounded flex items-center justify-center shrink-0 mt-0.5">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="text-white/80 text-sm md:text-base">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      router.push(`/case-studies/${caseStudy.slug}`)
                      onClose()
                    }}
                    className="w-full bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white px-2 py-4 rounded-lg hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300 BenzinSemibold flex items-center justify-center gap-3 text-lg"
                  >
                    <div className="bg-white p-4 rounded-lg">
                      <img src="/Group1190.svg" alt="" className="w-4 h-4" />
                    </div>
                    <span className="px-2">View Full Case Study</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
