"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isFountainHills = pathname === "/case-studies/fountain-hills";

  const linkClasses = (path: string) =>
    `block relative py-2 transition
     ${
       pathname === path
         ? "text-[#F45B25]"
         : "text-white/80 hover:text-[#F45B25]"
     }
     after:absolute after:left-0 after:bottom-2 after:h-[2px] after:w-full
     after:bg-[#F45B25] after:scale-x-0 after:origin-left after:transition
     ${
       pathname === path
         ? "after:scale-x-100"
         : "hover:after:scale-x-100"
     }`;

  return (
    <header className="fixed top-7 left-1/2 -translate-x-1/2 w-[90%] 2xl:w-[85%] z-[9999] bg-[#FFFFFF]/5 backdrop-blur border-2 border-white/20 rounded-2xl">
      <nav className="mx-auto flex items-center justify-between px-10 py-4">

        {/* Logo */}
        <Link href="/" className="text-white font-bold text-xl">
          <img 
            src="/bmylogo.svg" 
            alt="Logo" 
            className={`lg:h-6 xl:h-8 2xl:h-10 mt-1 w-auto cursor-pointer ${isFountainHills ? 'brightness-0 invert' : ''}`}
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden xl:flex xl:w-[50%] 2xl:w-[45%] justify-between text-base BenzinSemibold">
          <li><Link href="/about" className={linkClasses("/about")}>About</Link></li>
          <li><Link href="/services" className={linkClasses("/services")}>Services</Link></li>
          <li><Link href="/case-studies" className={linkClasses("/case-studies")}>Case Studies</Link></li>
          <li><Link href="/review" className={linkClasses("/review")}>Review</Link></li>
          <li><Link href="/contact" className={linkClasses("/contact")}>Contact</Link></li>
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className={`hidden xl:inline-flex items-center px-6 py-4 rounded-lg text-lg font-medium hover:opacity-90 transition BenzinSemibold ${
            isFountainHills 
              ? 'bg-white text-[#100203]' 
              : 'bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white'
          }`}
        >
          Grow My Business
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden text-white text-2xl focus:outline-none pl-5"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300
          ${open ? "max-h-125 opacity-100 py-5" : "max-h-0 opacity-0"}
        `}
      >
        <ul className="flex flex-col gap-4 px-10  text-base BenzinSemibold">
          <li onClick={() => setOpen(false)}>
            <Link href="/about" className={linkClasses("/about")}>About</Link>
          </li>
          <li onClick={() => setOpen(false)}>
            <Link href="/services" className={linkClasses("/services")}>Services</Link>
          </li>
          <li onClick={() => setOpen(false)}>
            <Link href="/case-studies" className={linkClasses("/case-studies")}>Case Studies</Link>
          </li>
          <li onClick={() => setOpen(false)}>
            <Link href="/review" className={linkClasses("/review")}>Review</Link>
          </li>
          <li onClick={() => setOpen(false)}>
            <Link href="/contact" className={linkClasses("/contact")}>Contact</Link>
          </li>

          {/* Mobile CTA */}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={`mt-4 inline-flex justify-center items-center px-6 py-4 rounded-lg text-lg font-medium BenzinSemibold ${
              isFountainHills 
                ? 'bg-white text-[#100203]' 
                : 'bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white'
            }`}
          >
            Grow My Business
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
