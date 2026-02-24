'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { createClient } from '@/lib/supabase';

gsap.registerPlugin(ScrollTrigger);

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
  const pathname = usePathname();
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);
  const faqColRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !formColRef.current || !faqColRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.05, ease: 'sine.out', clearProps: 'transform' }
      )
        .fromTo(
          formColRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 1.0, ease: 'sine.out', clearProps: 'transform' },
          '-=0.5'
        )
        .fromTo(
          faqColRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 1.0, ease: 'sine.out', clearProps: 'transform' },
          '-=0.8'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (number: string) => {
    setOpenFaq((prev) => (prev === number ? null : number));
  };

  const onSubmit = async (data: FormValues) => {
    setSubmitStatus('loading');
    const { error } = await createClient().from('requestform').insert({
      'first name': data.firstName,
      'last name': data.lastName,
      email: data.email,
      phonenumber: data.phone,
      message: data.message,
      accesspage: pathname ?? '',
    });
    if (error) {
      setSubmitStatus('error');
      return;
    }
    setSubmitStatus('success');
    reset();
  };

  return (
    <section ref={sectionRef} className="bg-[#11122F] text-white py-20 overflow-x-hidden">
      <div className="mx-auto w-[90%] 2xl:w-[75%] max-w-full">
        <div ref={headingRef}>
          <h2 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-4xl font-semibold mb-4 text-center lg:text-left BenzinSemibold  max-w-2xl">
            <span className="text-[#F45B25]"> Get in Touch</span> With Our Team for a Custom Quote
          </h2>
          <p className="text-[#ADAECC] text-sm sm:text-base mb-12 text-center lg:text-left max-w-2xl">
            Tell us about your project, ask a question, or just say hi. We're here to help bring your ideas to life with
            clarity, creativity, and a seamless experience from start to finish.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 w-full min-w-0">
          {/* Left Section: Form */}
          <div ref={formColRef} className="flex-1 min-w-0">
            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
              {/* First and Last Name Row */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <input
                    className="h-12 w-full rounded-lg bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25]"
                    placeholder="First Name"
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                  />
                  {errors.firstName ? (
                    <span className="text-xs text-[#F45B25]">{errors.firstName.message}</span>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <input
                    className="h-12 w-full rounded-lg bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25]"
                    placeholder="Last Name"
                    type="text"
                    {...register('lastName', { required: 'Last name is required' })}
                  />
                  {errors.lastName ? (
                    <span className="text-xs text-[#F45B25]">{errors.lastName.message}</span>
                  ) : null}
                </div>
              </div>

              {/* Email and Phone Row */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <input
                    className="h-12 w-full rounded-lg bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25]"
                    placeholder="Email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                    })}
                  />
                  {errors.email ? (
                    <span className="text-xs text-[#F45B25]">{errors.email.message}</span>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <input
                    className="h-12 w-full rounded-lg bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25]"
                    placeholder="Phone Number"
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                  />
                  {errors.phone ? (
                    <span className="text-xs text-[#F45B25]">{errors.phone.message}</span>
                  ) : null}
                </div>
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2 w-full min-w-0">
                <textarea
                  className="min-h-[140px] w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#F45B25]"
                  placeholder="Message"
                  {...register('message', { required: 'Message is required' })}
                />
                {errors.message ? (
                  <span className="text-xs text-[#F45B25]">{errors.message.message}</span>
                ) : null}
              </div>

              {/* Submit Button */}
              <div className="w-full">
                {submitStatus === 'error' && (
                  <p className="text-center text-sm text-[#F45B25] mb-2">Something went wrong. Please try again.</p>
                )}
                {submitStatus === 'success' && (
                  <p className="text-center text-sm text-[#22c55e] mb-2">Request sent! We&apos;ll get back to you soon.</p>
                )}
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full h-12 rounded-lg bg-[#F45B25] text-white font-semibold hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300 BenzinSemibold disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {submitStatus === 'loading' ? 'Sending...' : 'Request a Quote'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Section: FAQs */}
          <div ref={faqColRef} className="flex-1 min-w-0">
            <div className="flex flex-col gap-6 w-full">
              {FAQS.map((item) => (
                <div key={item.number} className="border border-white/10 rounded-md overflow-hidden w-full">
                  <button
                    type="button"
                    onClick={() => toggleFaq(item.number)}
                    className="flex w-full items-center gap-4 text-left hover:bg-white/5 transition-all duration-300"
                  >
                    <div className='flex gap-3 p-5 flex-1 min-w-0'>
                      <span className="text-white text-xs xl:text-sm 2xl:text-md font-semibold BenzinRegular shrink-0">{item.number}</span>
                      <h3 className="text-xs xl:text-sm 2xl:text-md font-semibold BenzinRegular">{item.question}</h3>
                    </div>
                    <span
                      className={`flex shrink-0 h-12 w-12 md:h-14 md:w-14 items-center justify-center text-2xl ${
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
