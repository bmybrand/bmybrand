'use client'
import React, { useEffect, useState, RefObject } from 'react'

interface BottomCTAProps {
  targetRef: RefObject<HTMLElement | null>
  footerRef?: RefObject<HTMLElement | null>
}

const BottomCTA: React.FC<BottomCTAProps> = ({ targetRef, footerRef }) => {
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return

      const designedGrowTop = targetRef.current.getBoundingClientRect().top
      const windowHeight = window.innerHeight
      const footerTop = footerRef?.current?.getBoundingClientRect().top ?? Infinity

      if (footerTop - windowHeight < 0) {
        setVisible(false)
      } else if (designedGrowTop < 0) {
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
  }, [targetRef, footerRef])

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50
                  transition-all duration-500 ease-out 
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none '}`}
    >
        <div className=' '>
        <div className='w-full flex justify-end '>
      {/* Badge / Tag */}
      <span className=" relative z-0 inline-flex 
                       pl-12 pr-4 py-2 -mb-3 pb-5 text-right rounded-tr-sm
                       bg-[url('/parallelogram.svg')] text-white text-sm   shadow-lg  ">
        Trusted by 300+ Businesses
      </span>
</div>
      {/* CTA Card */}
        
      <div
  className="
    relative z-10
    bg-[url('/noice.svg'),linear-gradient(to_left,#202141,#BE673F)]
    bg-cover bg-center
    text-white rounded-2xl shadow-2xl
    px-2 py-2 lg:px-6 lg:py-6
    w-[90vw] 2xl:w-[60vw]
  "
>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 ">
            <div className='md:ml-30 ml-0'>
          {/* image */}
<img 
  src="/popupbear.svg" 
  alt="" 
  className='absolute bottom-0 left-0 hidden md:block ' 
/>

          </div>
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl  BenzinSemibold">
        Start Your Creative Journey With Us
      </h3>
      <p className="text-gray-200 text-xs mt-1">
        Let’s build something modern and meaningful together.
      </p>
    </div>

    {/* Buttons */}
    <div className="flex flex-warp gap-3 BenzinSemibold">
      <a
        href="tel:+123456789"
        className="px-4 py-2 sm:px-5 sm:py-3 rounded-xl bg-[#F45B25]
                   text-white font-medium hover:opacity-90 transition text-xs sm:text-sm "
      >
        Call Now
      </a>
      <button
        className="px-4 py-2 sm:px-5 sm:py-3 rounded-xl border border-white
                   font-medium hover:bg-white hover:text-black transition text-xs sm:text-sm"
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
