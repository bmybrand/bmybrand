"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const companyMenuItems = [
  {
    title: "About US",
    href: "/about",
    desc: "Your all-in-one creative & digital partner —",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Reviews",
    href: "/review",
    desc: "Your all-in-one creative & digital partner —",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Careers",
    href: "#",
    desc: "Your all-in-one creative & digital partner —",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const servicesMenuItems = [
  { title: "AI-Driven Solutions", href: "/services/ai-driven", desc: "Your all-in-one creative & digital partner —" },
  { title: "Brand Experience", href: "/services/brand-experience", desc: "Your all-in-one creative & digital partner —" },
  { title: "Software Development", href: "/services/software-development", desc: "Your all-in-one creative & digital partner —" },
  { title: "Commerce Solutions", href: "/services/commerce-solutions", desc: "Your all-in-one creative & digital partner —" },
  { title: "Digital Marketing", href: "/services/digital-marketing", desc: "Your all-in-one creative & digital partner —" },
  { title: "Business Operations", href: "/services/business-operations", desc: "Your all-in-one creative & digital partner —" },
];

const industriesMenuItems = [
  { title: "Healthcare", href: "#", desc: "Your all-in-one creative & digital partner —" },
  { title: "Retail", href: "#", desc: "Your all-in-one creative & digital partner —" },
  { title: "Technology", href: "#", desc: "Your all-in-one creative & digital partner —" },
];

const resourcesMenuItems = [
  { title: "Blog", href: "#", desc: "Your all-in-one creative & digital partner —" },
  { title: "Case Studies", href: "/case-studies", desc: "Your all-in-one creative & digital partner —" },
  { title: "Contact", href: "/contact", desc: "Your all-in-one creative & digital partner —" },
];

const MegaMenu = ({
  isOpen,
  onClose,
  type,
  style,
}: {
  isOpen: boolean;
  onClose: () => void;
  type: "services" | "industries" | "company" | "resources";
  style?: React.CSSProperties;
}) => {
  if (!isOpen) return null;

  const isCompany = type === "company";

  const menuContent = (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`rounded-2xl bg-[#FFFFFF]/5 border-2 border-white/20 shadow-xl ${isCompany ? "w-[min(90vw,50rem)]" : "w-[min(90vw,42rem)]"}`}
      style={{ WebkitBackdropFilter: "blur(24px)", backdropFilter: "blur(24px)" }}
      onMouseLeave={onClose}
    >
      <div className={`flex ${isCompany ? "flex-col lg:flex-row" : ""}`}>
        {/* Company: Left section with image + View Open Positions */}
        {isCompany && (
          <div className="lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col gap-4">
            <div className="rounded-xl overflow-hidden bg-white/5 h-52 lg:h-56">
              <img
                src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=400&fit=crop"
                alt="Quality mockups"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <Link href="#" className="text-white text-lg font-semibold hover:text-[#F45B25] transition-colors flex items-center gap-2 BenzinSemibold">
                View Open Positions
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
              <p className="text-white/60 text-sm mt-2">Your all-in-one creative & digital partner —</p>
              <p className="text-white/60 text-sm mt-0.5">Your all-in-one creative & digital.</p>
            </div>
          </div>
        )}

        {/* Right section - Menu items */}
        <div className={`p-6 ${isCompany ? "lg:w-1/2" : ""}`}>
          <div className={isCompany ? "flex flex-col gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
            {(type === "company" ? companyMenuItems : type === "services" ? servicesMenuItems : type === "industries" ? industriesMenuItems : resourcesMenuItems).map(
              (item: { title: string; href: string; desc: string; icon?: React.ReactNode }, idx: number
            ) => (
              <Link
                key={idx}
                href={item.href}
                className={`flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group ${isCompany ? "min-w-0" : ""}`}
              >
                {"icon" in item && item.icon && (
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white shrink-0 group-hover:text-[#F45B25] transition-colors">
                    {item.icon}
                  </div>
                )}
                <div>
                  <span className="text-white font-semibold group-hover:text-[#F45B25] transition-colors BenzinSemibold">{item.title}</span>
                  <p className="text-white/60 text-sm mt-0.5">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return typeof document !== "undefined"
    ? createPortal(
        <div
          className="fixed -translate-x-1/2 z-[10000]"
          style={{
            top: style?.top ?? "5.5rem",
            left: style?.left ?? "50%",
          }}
        >
          {menuContent}
        </div>,
        document.body
      )
    : null;
};

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<"services" | "industries" | "company" | "resources" | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: "5.5rem", left: "50%" });
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabRefs = useRef<Record<string, HTMLLIElement | null>>({
    services: null,
    industries: null,
    company: null,
    resources: null,
  });
  const isFountainHills = pathname === "/case-studies/fountain-hills";

  const updateDropdownPosition = (type: "services" | "industries" | "company" | "resources") => {
    const el = tabRefs.current[type];
    if (el) {
      const rect = el.getBoundingClientRect();
      setDropdownPosition({
        top: `${rect.bottom + 16}px`,
        left: `${rect.left + rect.width / 2}px`,
      });
    }
  };

  useEffect(() => {
    if (!megaMenuOpen) return;
    updateDropdownPosition(megaMenuOpen);
    const handleUpdate = () => updateDropdownPosition(megaMenuOpen);
    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate);
    return () => {
      window.removeEventListener("scroll", handleUpdate, true);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [megaMenuOpen]);

  const handleMegaMenuEnter = (type: "services" | "industries" | "company" | "resources") => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    updateDropdownPosition(type);
    setMegaMenuOpen(type);
  };
  const handleMegaMenuLeave = () => {
    closeTimerRef.current = setTimeout(() => setMegaMenuOpen(null), 120);
  };

  const linkClasses = (path: string) =>
    `block relative py-2 transition
     ${pathname === path ? "text-[#F45B25]" : "text-white/80 hover:text-[#F45B25]"}
     after:absolute after:left-0 after:bottom-2 after:h-[2px] after:w-full
     after:bg-[#F45B25] after:scale-x-0 after:origin-left after:transition
     ${pathname === path ? "after:scale-x-100" : "hover:after:scale-x-100"}`;

  return (
    <header className="fixed top-7 left-1/2 -translate-x-1/2 w-[90%] 2xl:w-[85%] z-[9999] bg-[#FFFFFF]/5 backdrop-blur border-2 border-white/20 rounded-2xl">
      <nav className="mx-auto flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo */}
        <Link href="/" className="text-white font-bold text-xl">
          <img
            src="/bmylogo.svg"
            alt="Logo"
            className={`lg:h-6 xl:h-8 2xl:h-10 mt-1 w-auto cursor-pointer ${isFountainHills ? "brightness-0 invert" : ""}`}
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden xl:flex xl:w-[55%] 2xl:w-[50%] justify-between text-base BenzinSemibold">
          <li
            ref={(el) => { tabRefs.current.services = el; }}
            className="relative"
            onMouseEnter={handleMegaMenuEnter("services")}
            onMouseLeave={handleMegaMenuLeave}
          >
            <span className={`cursor-pointer ${linkClasses("/services")}`}>Services</span>
            <MegaMenu isOpen={megaMenuOpen === "services"} onClose={() => setMegaMenuOpen(null)} type="services" style={dropdownPosition} />
          </li>
          <li
            ref={(el) => { tabRefs.current.industries = el; }}
            className="relative"
            onMouseEnter={handleMegaMenuEnter("industries")}
            onMouseLeave={handleMegaMenuLeave}
          >
            <span className={`cursor-pointer ${linkClasses("#")}`}>Industries</span>
            <MegaMenu isOpen={megaMenuOpen === "industries"} onClose={() => setMegaMenuOpen(null)} type="industries" style={dropdownPosition} />
          </li>
          <li>
            <Link href="/case-studies" className={linkClasses("/case-studies")}>Case Studies</Link>
          </li>
          <li
            ref={(el) => { tabRefs.current.company = el; }}
            className="relative"
            onMouseEnter={handleMegaMenuEnter("company")}
            onMouseLeave={handleMegaMenuLeave}
          >
            <span className={`cursor-pointer ${linkClasses("/about")}`}>Company</span>
            <MegaMenu isOpen={megaMenuOpen === "company"} onClose={() => setMegaMenuOpen(null)} type="company" style={dropdownPosition} />
          </li>
          <li
            ref={(el) => { tabRefs.current.resources = el; }}
            className="relative"
            onMouseEnter={handleMegaMenuEnter("resources")}
            onMouseLeave={handleMegaMenuLeave}
          >
            <span className={`cursor-pointer ${linkClasses("/contact")}`}>Resources</span>
            <MegaMenu isOpen={megaMenuOpen === "resources"} onClose={() => setMegaMenuOpen(null)} type="resources" style={dropdownPosition} />
          </li>
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className={`hidden xl:inline-flex items-center px-6 py-4 rounded-lg text-lg font-medium hover:opacity-90 transition BenzinSemibold ${
            isFountainHills ? "bg-white text-[#100203]" : "bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white"
          }`}
        >
          Grow My Business
        </Link>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} className="xl:hidden text-white text-2xl focus:outline-none pl-5">
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`xl:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-125 opacity-100 py-5" : "max-h-0 opacity-0"}`}>
        <ul className="flex flex-col gap-4 px-10 text-base BenzinSemibold">
          <li onClick={() => setOpen(false)}>
            <Link href="/services" className={linkClasses("/services")}>Services</Link>
          </li>
          <li onClick={() => setOpen(false)}>
            <Link href="#" className={linkClasses("#")}>Industries</Link>
          </li>
          <li onClick={() => setOpen(false)}>
            <Link href="/case-studies" className={linkClasses("/case-studies")}>Case Studies</Link>
          </li>
          <li onClick={() => setOpen(false)}>
            <Link href="/about" className={linkClasses("/about")}>About US</Link>
          </li>
          <li onClick={() => setOpen(false)}>
            <Link href="/review" className={linkClasses("/review")}>Reviews</Link>
          </li>
          <li onClick={() => setOpen(false)}>
            <Link href="/contact" className={linkClasses("/contact")}>Resources</Link>
          </li>

          {/* Mobile CTA */}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={`mt-4 inline-flex justify-center items-center px-6 py-4 rounded-lg text-lg font-medium BenzinSemibold ${
              isFountainHills ? "bg-white text-[#100203]" : "bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white"
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
