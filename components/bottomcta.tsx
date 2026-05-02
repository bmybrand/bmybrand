'use client'
import React, { useEffect, useState, RefObject } from 'react'

interface BottomCTAProps {
  targetRef: RefObject<HTMLElement | null>
  footerRef?: RefObject<HTMLElement | null>
}

const BottomCTA: React.FC<BottomCTAProps> = ({ targetRef, footerRef }) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [closed, setClosed] = useState<boolean>(false)
  const [wasTriggered, setWasTriggered] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return

      const designedGrowTop = targetRef.current.getBoundingClientRect().top
      const windowHeight = window.innerHeight
      const footerTop = footerRef?.current?.getBoundingClientRect().top ?? Infinity

      const shouldTrigger = designedGrowTop < 0 && footerTop - windowHeight >= 0

      // If trigger condition changes from false to true, reset closed state
      if (shouldTrigger && !wasTriggered) {
        setClosed(false)
        setWasTriggered(true)
      } else if (!shouldTrigger) {
        setWasTriggered(false)
      }

      if (footerTop - windowHeight < 0) {
        setVisible(false)
      } else if (shouldTrigger && !closed) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [targetRef, footerRef, closed, wasTriggered])

  const handleClose = () => {
    setClosed(true)
    setVisible(false)
  }

  return (
    <div
      className={`fixed bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-50
                  transition-all duration-500 ease-out 
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none '}`}
    >
        <div className=' '>
        <div className='w-full flex justify-end'>
      {/* Badge / Tag */}
      <span className="relative z-0 inline-flex items-center justify-between gap-3
                       pl-12 pr-4 py-2 -mb-3 pb-5 text-right rounded-tr-sm
                       bg-[url('/bmyb-global-parallelogram-01.svg')] bg-cover bg-center bg-no-repeat text-white text-sm shadow-lg">
        <span>Trusted by 300+ Businesses</span>
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="w-5 h-5 flex items-center justify-center rounded-sm bg-white/20 hover:bg-white/30 text-white transition-all duration-200"
          aria-label="Close"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </span>
</div>
      {/* CTA Card */}
        
      <div
  className="
    relative z-10
    bg-[url('/bmyb-global-noice-01.svg'),linear-gradient(to_left,#202141,#BE673F)]
    bg-cover bg-center
    text-white rounded-2xl shadow-2xl border-2 border-white/20
    px-2 py-2 lg:px-6 lg:py-6
    w-[90vw] 2xl:w-[60vw]
  "
>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 ">
            <div className='md:ml-30 ml-0'>
          {/* image */}
<img 
  src="/bmyb-global-popupbear-01.svg" 
  alt="" 
  className='absolute bottom-0 left-0 hidden md:block ' 
/>

          </div>
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl  BenzinSemibold">
        Start Your Creative Journey With Us
      </h3>
      <p className="text-gray-200 text-[15px] mt-1">
        Let’s build something modern and meaningful together.
      </p>
    </div>

    {/* Buttons */}
    <div className="flex flex-warp gap-3 BenzinSemibold">
      <a
        href="tel:+123456789"
        className="px-4 py-2 sm:px-5 sm:py-3 rounded-xl border border-white
                   text-white font-medium hover:-translate-y-1 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 text-xs sm:text-sm"
      >
        Call Now
      </a>
      <button
        className="px-4 py-2 sm:px-5 sm:py-3 rounded-xl bg-[#F45B25]
                   text-white font-medium hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300 text-xs sm:text-sm"
      >
        Request a Quote
      </button>
    </div>

        </div>
      </div>
      </div>
    </div>
  )
}

export default BottomCTA
