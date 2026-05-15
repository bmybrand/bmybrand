'use client'

import React from 'react'
import Image from 'next/image'

const AddBlock = () => {
  return (
    <section className='bg-[#11122F] pt-30'>
      <div className='mx-auto w-[90%] 2xl:w-[75%] h-fit rounded-xl relative '>
        <Image
          src="/bmyb-cta-bear-rocket-01.webp"
          alt="Rocket"
          width={2134}
          height={1556}
          sizes="(min-width: 1536px) 30vw, (min-width: 1024px) 40vw, 0px"
          className='absolute bottom-0 right-0 w-40 max-w-40 md:w-48 md:max-w-48 lg:block hidden h-auto max-h-[420px] lg:w-[40%] lg:max-w-[520px] z-20 object-contain lg:scale-105 xl:scale-110 2xl:scale-120 animate-bounceRocket -rotate-5'
        />
        <div className='w-full lg:w-[90%] h-full bg-[#191A35] rounded-xl px-6 md:px-8 py-8 lg:py-20 flex flex-col justify-center gap-4'>
          <h2 className=' text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl BenzinSemibold w-full lg:w-[62%] leading-tight text-center lg:text-left'>
            Boost Your Brand Beyond the Competition
          </h2>

          <button className="w-fit BenzinSemibold bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white px-2 py-2 rounded-lg flex justify-center items-center gap-2 mx-auto lg:mx-0 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300">
            <div className="bg-white p-4 rounded-lg">
              <img src="/bmyb-logo-group1190-01.svg" alt="" className="w-4 h-4" />
            </div>
            <span className="px-2">Try BMYBrand FREE for 14 Days</span>
          </button>

          <p className='text-white/70 text-sm md:text-base w-full lg:w-3/5 text-center lg:text-left'>
            Get started instantly. No credit card needed.
          </p>
        </div>
      </div>
      <div className="mx-auto w-[90%] 2xl:w-[75%] h-[2px] bg-white/15 mt-36" />
    </section>
  );
};

export default AddBlock;
