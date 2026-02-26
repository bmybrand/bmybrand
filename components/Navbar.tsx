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
    desc: "Discover our story, mission, and the team behind your success.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Reviews",
    href: "/review",
    desc: "See what our clients say about working with us.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Careers",
    href: "#",
    desc: "Join our team and build something amazing with us.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const servicesMenuItems = [
  {
    title: "AI & Automation",
    href: "/services/ai-driven",
    desc: "Intelligent solutions that streamline operations and drive growth.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Website Development",
    href: "/services/software-development",
    desc: "Custom websites built for performance and conversion.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9a9 9 0 009 9" />
      </svg>
    ),
  },
  {
    title: "Mobile App Development",
    href: "/services/software-development",
    desc: "Native and cross-platform apps that users love.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "SEO & AEO",
    href: "/services/digital-marketing",
    desc: "Rank higher and get discovered by the right audience.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
];

const industriesMenuItems = [
  {
    title: "Healthcare",
    href: "#",
    desc: "Tailored solutions for clinics, practices, and health organizations.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Non-Profit",
    href: "#",
    desc: "Amplify your cause with technology that connects and inspires.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Sports",
    href: "#",
    desc: "Engage fans and athletes with powerful digital experiences.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    title: "Travel and Tourism",
    href: "#",
    desc: "Bring destinations to life and inspire wanderlust.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9a9 9 0 009 9" />
      </svg>
    ),
  },
  {
    title: "Education",
    href: "#",
    desc: "Transform learning with innovative digital platforms.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
];

const resourcesMenuItems = [
  { title: "Blog", href: "#", desc: "Insights, tips, and industry trends to help you stay ahead." },
  { title: "Case Studies", href: "/case-studies", desc: "Real results from brands we've helped grow." },
  { title: "Contact", href: "/contact", desc: "Let's talk about your next project." },
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
  const isServices = type === "services";
  const isIndustries = type === "industries";
  const hasTwoColumnLayout = isCompany || isServices;

  const menuContent = (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`rounded-2xl bg-[#FFFFFF]/5 border-2 border-white/20 shadow-xl ${isCompany ? "w-[min(90vw,44rem)]" : isServices ? "w-[min(90vw,53rem)]" : hasTwoColumnLayout ? "w-[min(90vw,50rem)]" : isIndustries ? "w-[min(90vw,22rem)]" : "w-[min(90vw,42rem)]"}`}
      style={{ WebkitBackdropFilter: "blur(24px)", backdropFilter: "blur(24px)" }}
      onMouseLeave={onClose}
    >
      <div className={`flex ${hasTwoColumnLayout ? "flex-col lg:flex-row" : ""}`}>
        {/* Company: Left section with image + View Open Positions */}
        {isCompany && (
          <div className="lg:w-1/2 p-5 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col gap-4">
            <div className="rounded-xl overflow-hidden bg-white/5 h-40 lg:h-44">
              <img
                src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=400&fit=crop"
                alt="Quality mockups"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <Link href="#" className="text-white text-lg font-semibold hover:text-[#F45B25] hover:bg-white/10 transition-colors flex items-center gap-2 BenzinSemibold rounded-lg px-3 py-2 -mx-3 -my-2">
                View Open Positions
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
              <p className="text-white/60 text-sm mt-2">Find your place on our team. We're always looking for talented people to help us create exceptional work.</p>
            </div>
          </div>
        )}

        {/* Services: Left section with image + Explore All Services */}
        {isServices && (
          <div className="lg:w-[45%] p-6 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col gap-4 overflow-hidden">
            <div className="rounded-xl overflow-hidden bg-white/5 h-56 lg:h-60 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=400&fit=crop"
                alt="Quality mockups"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-h-0">
              <Link href="/services" className="text-white text-lg font-semibold hover:text-[#F45B25] hover:bg-white/10 transition-colors flex items-center gap-2 BenzinSemibold rounded-lg px-3 py-2 -mx-3 -my-2">
                Explore All Services
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
              <p className="text-white/60 text-sm mt-2">From AI to web apps, discover how we help brands grow with creative and digital solutions.</p>
            </div>
          </div>
        )}

        {/* Right section - Menu items */}
        <div className={`${isCompany ? "p-5" : isIndustries ? "p-4" : "p-6"} ${hasTwoColumnLayout ? `flex flex-col min-h-0 ${isServices ? "lg:w-[55%]" : "lg:w-1/2"}` : ""}`}>
          <div className={hasTwoColumnLayout ? "flex flex-col justify-between flex-1 min-h-0" : isIndustries ? "flex flex-col gap-1" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
            {(type === "company" ? companyMenuItems : type === "services" ? servicesMenuItems : type === "industries" ? industriesMenuItems : resourcesMenuItems).map(
              (item: { title: string; href: string; desc: string; icon?: React.ReactNode }, idx: number
            ) => (
              <Link
                key={idx}
                href={item.href}
                className={`flex rounded-xl transition-colors group hover:bg-white/10 ${hasTwoColumnLayout ? "gap-4 min-w-0 py-1.5 px-3" : isIndustries ? "gap-3 py-2 px-2 min-w-0" : "gap-4 p-4"}`}
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

  const pos = style as { top?: string; left?: string; transform?: string } | undefined;
  return typeof document !== "undefined"
    ? createPortal(
        <div
          className="fixed z-[10000]"
          style={{
            top: pos?.top ?? "5.5rem",
            left: pos?.left ?? "50%",
            transform: pos?.transform ?? "translateX(-50%)",
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
  const [mobileExpanded, setMobileExpanded] = useState<"services" | "industries" | "company" | "resources" | null>(null);
  const [megaMenuOpen, setMegaMenuOpen] = useState<"services" | "industries" | "company" | "resources" | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: "5.5rem", left: "50%", transform: "translateX(-50%)" });
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
      const padding = 16;
      if (type === "services") {
        setDropdownPosition({ top: `${rect.bottom + padding}px`, left: `${rect.left}px`, transform: "none" });
      } else if (type === "industries") {
        setDropdownPosition({ top: `${rect.bottom + padding}px`, left: `${rect.left}px`, transform: "none" });
      } else if (type === "company") {
        setDropdownPosition({ top: `${rect.bottom + padding}px`, left: `${rect.left + rect.width / 2}px`, transform: "translateX(-50%)" });
      } else {
        setDropdownPosition({ top: `${rect.bottom + padding}px`, left: `${rect.right}px`, transform: "translateX(-100%)" });
      }
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
            className={`h-7 sm:h-8 lg:h-8 xl:h-8 2xl:h-10 mt-1 w-auto cursor-pointer ${isFountainHills ? "brightness-0 invert" : ""}`}
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
      <div className={`xl:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-[80vh] opacity-100 py-4 overflow-y-auto" : "max-h-0 opacity-0"}`}>
        <ul className="flex flex-col gap-2 px-6 BenzinSemibold" style={{ fontSize: "clamp(0.75rem, 3.5vw, 1rem)" }}>
          {/* Services - expandable */}
          <li>
            <div className="flex items-center justify-between w-full py-2">
              <Link href="/services" onClick={() => setOpen(false)} className={`flex-1 BenzinSemibold ${pathname.startsWith("/services") ? "text-[#F45B25]" : "text-white/80"}`}>
                Services
              </Link>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); setMobileExpanded(mobileExpanded === "services" ? null : "services"); }}
                className="p-2 -m-2 touch-manipulation"
                aria-label="Toggle Services menu"
              >
                <svg className={`w-4 h-4 transition-transform text-[#F45B25] ${mobileExpanded === "services" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            {mobileExpanded === "services" && (
              <ul className="pl-4 pb-2 flex flex-col gap-1 border-l-2 border-white/20 ml-1">
                <li onClick={() => setOpen(false)}>
                  <Link href="/services" className="block py-1.5 px-2 -mx-2 rounded-lg text-white/70 hover:text-[#F45B25] hover:bg-white/10 transition-colors" style={{ fontSize: "clamp(0.6875rem, 2.5vw, 0.8125rem)" }}>Explore All Services</Link>
                </li>
                {servicesMenuItems.map((item, idx) => (
                  <li key={idx} onClick={() => setOpen(false)}>
                    <Link href={item.href} className="block py-1.5 px-2 -mx-2 rounded-lg text-white/70 hover:text-[#F45B25] hover:bg-white/10 transition-colors" style={{ fontSize: "clamp(0.6875rem, 2.5vw, 0.8125rem)" }}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Industries - expandable */}
          <li>
            <div className="flex items-center justify-between w-full py-2">
              <Link href="#" onClick={() => setOpen(false)} className="flex-1 BenzinSemibold text-white/80">
                Industries
              </Link>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); setMobileExpanded(mobileExpanded === "industries" ? null : "industries"); }}
                className="p-2 -m-2 touch-manipulation"
                aria-label="Toggle Industries menu"
              >
                <svg className={`w-4 h-4 transition-transform text-[#F45B25] ${mobileExpanded === "industries" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            {mobileExpanded === "industries" && (
              <ul className="pl-4 pb-2 flex flex-col gap-1 border-l-2 border-white/20 ml-1">
                {industriesMenuItems.map((item, idx) => (
                  <li key={idx} onClick={() => setOpen(false)}>
                    <Link href={item.href} className="block py-1.5 px-2 -mx-2 rounded-lg text-white/70 hover:text-[#F45B25] hover:bg-white/10 transition-colors" style={{ fontSize: "clamp(0.6875rem, 2.5vw, 0.8125rem)" }}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Case Studies - link */}
          <li onClick={() => setOpen(false)}>
            <Link href="/case-studies" className={linkClasses("/case-studies")}>Case Studies</Link>
          </li>

          {/* Company - expandable */}
          <li>
            <div className="flex items-center justify-between w-full py-2">
              <Link href="/about" onClick={() => setOpen(false)} className={`flex-1 BenzinSemibold ${pathname === "/about" || pathname === "/review" ? "text-[#F45B25]" : "text-white/80"}`}>
                Company
              </Link>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); setMobileExpanded(mobileExpanded === "company" ? null : "company"); }}
                className="p-2 -m-2 touch-manipulation"
                aria-label="Toggle Company menu"
              >
                <svg className={`w-4 h-4 transition-transform text-[#F45B25] ${mobileExpanded === "company" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            {mobileExpanded === "company" && (
              <ul className="pl-4 pb-2 flex flex-col gap-1 border-l-2 border-white/20 ml-1">
                <li onClick={() => setOpen(false)}>
                  <Link href="#" className="block py-1.5 px-2 -mx-2 rounded-lg text-white/70 hover:text-[#F45B25] hover:bg-white/10 transition-colors" style={{ fontSize: "clamp(0.6875rem, 2.5vw, 0.8125rem)" }}>View Open Positions</Link>
                </li>
                {companyMenuItems.map((item, idx) => (
                  <li key={idx} onClick={() => setOpen(false)}>
                    <Link href={item.href} className="block py-1.5 px-2 -mx-2 rounded-lg text-white/70 hover:text-[#F45B25] hover:bg-white/10 transition-colors" style={{ fontSize: "clamp(0.6875rem, 2.5vw, 0.8125rem)" }}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Resources - expandable */}
          <li>
            <div className="flex items-center justify-between w-full py-2">
              <Link href="/contact" onClick={() => setOpen(false)} className={`flex-1 BenzinSemibold ${pathname === "/contact" ? "text-[#F45B25]" : "text-white/80"}`}>
                Resources
              </Link>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); setMobileExpanded(mobileExpanded === "resources" ? null : "resources"); }}
                className="p-2 -m-2 touch-manipulation"
                aria-label="Toggle Resources menu"
              >
                <svg className={`w-4 h-4 transition-transform text-[#F45B25] ${mobileExpanded === "resources" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            {mobileExpanded === "resources" && (
              <ul className="pl-4 pb-2 flex flex-col gap-1 border-l-2 border-white/20 ml-1">
                {resourcesMenuItems.map((item, idx) => (
                  <li key={idx} onClick={() => setOpen(false)}>
                    <Link href={item.href} className="block py-1.5 px-2 -mx-2 rounded-lg text-white/70 hover:text-[#F45B25] hover:bg-white/10 transition-colors" style={{ fontSize: "clamp(0.6875rem, 2.5vw, 0.8125rem)" }}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Mobile CTA - smaller */}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={`mt-3 inline-flex justify-center items-center px-4 py-2.5 rounded-lg text-sm font-medium BenzinSemibold ${
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
