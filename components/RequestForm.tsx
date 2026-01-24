'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

type FaqItem = {
  number: string;
  question: string;
  answer?: string;
};

const FAQS: FaqItem[] = [
  {
    number: '01',
    question: 'How long does a typical project take?',
    answer:
      'Most branding and website projects are completed within 2-6 weeks, depending on the overall complexity, number of pages, and the level of design detail required. Simple branding or smaller websites generally finish on the shorter end of the timeline, while larger projects with multiple pages, custom features, or ecommerce integrations may take a bit longer.',
  },
  {
    number: '02',
    question: 'What do you need from me to get started?',
    answer:
      'We are Murasaki, a consortium of Japanese and European entrepreneurs that have come together to create a company that builds decentralized, Japanese video games and products, entirely on the blockchain. Utilizing the power of the community, the Murasaki vision is to be the no.1 Japanese video game development company by 2032, where our future game engine is accessible to anyone wanting to build blockchain titles.',
  },
  {
    number: '03',
    question: 'Do you offer revisions during the project?',
    answer:
      'Yes. We include revision rounds at key milestones to make sure the work aligns with your vision. The exact number depends on the scope, and we confirm it upfront before we begin.',
  },
  {
    number: '04',
    question: 'Can you redesign my existing brand or website?',
    answer:
      'Yes, we specialize in redesigning existing brands and websites. Our team ensures that your new design aligns with your business goals while providing a modern and engaging experience for your audience.',
  },
];

export default function RequestForm() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    mode: 'onSubmit',
  });

  const toggleFaq = (number: string) => {
    setOpenFaq((prev) => (prev === number ? null : number));
  };

  const onSubmit = (data: FormValues) => {
    console.log('RequestForm submission:', data);
    reset();
  };
  return (
    <section className="bg-[#11122F] text-white py-20">
      <div className="mx-auto w-[90%] 2xl:w-[75%] ">
        <h2 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-4xl font-semibold mb-4 text-center lg:text-left BenzinSemibold  max-w-2xl">
          <span className="text-[#F45B25]"> Get in Touch</span> With Our Team for a Custom Quote
        </h2>
        <p className="text-[#ADAECC] text-sm sm:text-base mb-12 text-center lg:text-left max-w-2xl">
          Tell us about your project, ask a question, or just say hi. We're here to help bring your ideas to life with
          clarity, creativity, and a seamless experience from start to finish.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section: Form */}
          <div className="">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <input
                  className="h-12 rounded-lg border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25]"
                  placeholder="First Name"
                  type="text"
                  {...register('firstName', { required: 'First name is required' })}
                />
                {errors.firstName ? (
                  <span className="text-xs text-[#F45B25]">{errors.firstName.message}</span>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  className="h-12 rounded-lg  border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25]"
                  placeholder="Last Name"
                  type="text"
                  {...register('lastName', { required: 'Last name is required' })}
                />
                {errors.lastName ? (
                  <span className="text-xs text-[#F45B25]">{errors.lastName.message}</span>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                               <input
                  className="h-12 rounded-lg  border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25]"
                  placeholder="Email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, message: 'Enter a valid email' },
                  })}
                />
                {errors.email ? (
                  <span className="text-xs text-[#F45B25]">{errors.email.message}</span>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                
                <input
                  className="h-12 rounded-lg  border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25]"
                  placeholder="Phone Number"
                  type="tel"
                  {...register('phone', { required: 'Phone number is required' })}
                />
                {errors.phone ? (
                  <span className="text-xs text-[#F45B25]">{errors.phone.message}</span>
                ) : null}
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                
                <textarea
                  className="min-h-[140px] rounded-lg  border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#F45B25]"
                  placeholder="Message"
                  {...register('message', { required: 'Message is required' })}
                />
                {errors.message ? (
                  <span className="text-xs text-[#F45B25]">{errors.message.message}</span>
                ) : null}
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full h-12 rounded-lg bg-[#F45B25] text-white font-semibold hover:opacity-90 transition BenzinSemibold"
                >
                  Request a Quote
                </button>
              </div>
            </form>
          </div>

          {/* Right Section: FAQs */}
          <div>
            <div className="space-y-6">
              {FAQS.map((item) => (
                <div key={item.number} className=" border border-white/10 rounded-md overflow-hidden ">
                  <button
                    type="button"
                    onClick={() => toggleFaq(item.number)}
                    className="flex w-full items-center gap-4 text-left  "
                  ><div className='flex gap-3  p-5'>
                    <span className="text-white text-xs xl:text-sm 2xl:text-md font-semibold BenzinRegular">{item.number}</span>
                    <h3 className=" text-xs xl:text-sm 2xl:text-md font-semibold BenzinRegular">{item.question}</h3></div>
                    <span
                      className={`ml-auto flex  h-22 w-18 md:h-18 xl:w-18 items-center justify-center  text-3xl ${
                        openFaq === item.number
                          ? 'bg-[#F45B25] text-white'
                          : 'bg-white/10 text-white/80'
                      }`}
                    >
                      {openFaq === item.number ? '-' : '+'}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === item.number && item.answer && (
                      <motion.div
                        className="overflow-hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          height: { duration: 0.35, ease: 'easeOut', delay: 0.2 },
                          opacity: { duration: 0.2, ease: 'easeOut' },
                        }}
                      >
                        <p className="mt-3 text-sm sm:text-base text-white/70 leading-6 px-5 pb-5">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
