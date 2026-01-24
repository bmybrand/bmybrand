'use client';

import React from 'react';

const Footer: React.FC = () => {
  const brandText = 'BMYBRAND';

  return (
    <footer className="bg-[#11122F] text-white py-12 ">
      <div className="flex flex-col  max-w-none mx-auto justify-center items-center bg-[#202141] rounded-2xl py-10 px-6 lg:px-12 w-[90%]">
        <h2
          className="group BenzinSemibold text-center leading-none text-[32px] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[140px] text-[#202141] pb-5"
          style={{
            textShadow:
              '1px 0 rgba(244, 91, 37, 0.45), -1px 0 rgba(244, 91, 37, 0.45), 0 1px rgba(244, 91, 37, 0.45), 0 -1px rgba(244, 91, 37, 0.45), 1px 1px rgba(244, 91, 37, 0.35), -1px -1px rgba(244, 91, 37, 0.35), 1px -1px rgba(244, 91, 37, 0.35), -1px 1px rgba(244, 91, 37, 0.35)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 90%)',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          }}
        >
          {brandText.split('').map((letter, index) => {
            const center = (brandText.length - 1) / 2;
            const delay = Math.abs(index - center) * 35;
            return (
            <span
              key={`${letter}-${index}`}
              className="transition-colors duration-500 ease-out group-hover:text-[#F45B25]"
              style={{ transitionDelay: `${delay}ms` }}
            >
              {letter}
            </span>
            );
          })}
        </h2>

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 w-full">
          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-full">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl BenzinSemibold font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm sm:text-base lg:text-lg xl:text-xl">
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    Services
                  </a>
                </li>
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    Blog
                  </a>
                </li>
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Core Services */}
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl BenzinSemibold font-semibold mb-4">Core Services</h3>
              <ul className="space-y-2 text-sm sm:text-base lg:text-lg xl:text-xl">
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    Branding & Identity
                  </a>
                </li>
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    Website Design
                  </a>
                </li>
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    Ecommerce Development
                  </a>
                </li>
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    UI/UX Design
                  </a>
                </li>
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    Digital Marketing
                  </a>
                </li>
              </ul>
            </div>

            {/* Bear Logo Section */}
            <div className="hidden xl:flex items-start justify-center">
              <div className="flex items-center justify-center ">
                <img
                  src="/bear-logo.svg"
                  alt="Bear Logo"
                  className=" object-contain"
                />
              </div>
            </div>

            {/* Resources */}
            <div className="text-left lg:text-right">
              <h3 className="text-lg sm:text-xl lg:text-2xl BenzinSemibold font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm sm:text-base lg:text-lg xl:text-xl">
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    FAQs
                  </a>
                </li>
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    Client Reviews
                  </a>
                </li>
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    Pricing & Packages
                  </a>
                </li>
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Get Connected */}
            <div className="text-left lg:text-right">
              <h3 className="text-lg sm:text-xl lg:text-2xl BenzinSemibold font-semibold mb-4">Get Connected</h3>
              <ul className="space-y-2 text-sm sm:text-base lg:text-lg xl:text-xl">
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    Instagram
                  </a>
                </li>
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    Facebook
                  </a>
                </li>
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    Twitter
                  </a>
                </li>
                <li>
                  <a className="text-white/70 hover:text-white transition-colors" href="#">
                    Youtube
                  </a>
                </li>
              </ul>
            </div>
          </div>

          
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm sm:text-base lg:text-lg text-white/70">
          <p>
            Copyright © {new Date().getFullYear()} BMYBrand. All rights reserved.{' '}
            <a href="#" className="text-[#F45B25] hover:underline">
              Terms Of Use
            </a>{' '}
            |{' '}
            <a href="#" className="text-[#F45B25] hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
