'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const evaluate = () => {
  const router = useRouter()

  return (
    <section className='bg-[#11122F] mt-30 '>
      <div className='mx-auto w-[90%] 2xl:w-[75%] h-fit rounded-xl relative'>
      <img src="/techbear.svg" alt="" className='absolute bottom-0 right-0 w-40 md:w-48 lg:w-[45%] lg:block hidden h-full z-20 animate-bounceRocket' />
      <div className='w-full lg:w-[90%] h-full bg-[#191A35] rounded-xl px-6 md:px-8 py-8   lg:py-20 flex flex-col justify-center gap-4'>
        <h1 className='text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl BenzinSemibold w-full lg:w-3/5 leading-tight'>
          Ready to Elevate Your Brand Beyond the Competition?
        </h1>
        <p className='text-white/70 text-sm md:text-base w-full lg:w-3/5'>
          At BMYBrand, we blend strategy, AI, design, and development to help ambitious businesses scale smarter and faster.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 mt-2'>
          <button 
            onClick={() => router.push('/contact')}
            className='bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white px-6 py-3 rounded-lg BenzinSemibold hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300'
          >
            Contact Now
          </button>
          <button 
            onClick={() => router.push('/case-studies')}
            className='bg-transparent border-2 border-white/20 text-white px-6 py-3 rounded-lg BenzinSemibold hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300'
          >
            Explore Our Work
          </button>
        </div>
      </div>
      </div>
    </section>
  )
}

export default evaluate