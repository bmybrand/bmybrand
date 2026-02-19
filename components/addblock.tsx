'use client'

import React from 'react'

const AddBlock = () => {
  return (
    <section className='bg-[#11122F] py-20'>
      <div className='mx-auto w-[90%] 2xl:w-[75%] h-fit rounded-xl relative '>
        <img src="/ChatGPT.svg" alt="Rocket" className='absolute bottom-0 right-0 w-40 md:w-48 lg:w-[40%] lg:block hidden h-full z-20 object-contain lg:scale-110 xl:scale-120 2xl:scale-150 animate-bounceRocket -rotate-5' />
        <div className='w-full lg:w-[90%] h-full bg-[#191A35] rounded-xl px-6 md:px-8 py-8 lg:py-20 flex flex-col justify-center gap-4'>
          <h2 className='text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl BenzinSemibold w-full lg:w-3/5 leading-tight text-center lg:text-left'>
            Boost Your Brand <br /> Beyond the Competition
          </h2>

          <button className="w-fit BenzinSemibold bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white px-2 py-2 rounded-lg flex justify-center items-center gap-2 mx-auto lg:mx-0 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300">
            <div className="bg-white p-4 rounded-lg">
              <img src="/Group1190.svg" alt="" className="w-4 h-4" />
            </div>
            <span className="px-2">Try BMYBrand FREE for 14 Days</span>
          </button>

          <p className='text-white/70 text-sm md:text-base w-full lg:w-3/5 text-center lg:text-left'>
            Get started instantly. No credit card needed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AddBlock;
