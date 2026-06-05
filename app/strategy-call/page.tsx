"use client";

import React, { useLayoutEffect, useMemo, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  findCountryByDialCode,
  findCountryByIso,
  detectCountryIsoFromIp,
  getInitialPhoneCountryState,
  getFlagImageUrl,
  isoToFlagEmoji,
  MINIMAL_PHONE_COUNTRIES,
  FALLBACK_DIAL_CODES,
  formatRestCountries,
  replacePhoneDialCode,
  type PhoneCountry,
} from "@/lib/phone-country";
import {
  dateHasAvailableSlots,
  detectUserTimeZone,
  firstSelectableDayInMonthWithSlots,
  formatAppointmentDateFromSlot,
  formatTimezoneLabel,
  getAllTimeZones,
  getAvailableSlots,
  getInitialCalendarStateForTimeZone,
  getMonthStart,
} from "@/lib/strategy-call-scheduling";

const reviews = [
  {
    text: "The strategy call brought immediate clarity and direction. BmyBrand quickly understood the demands of emergency care and helped us shape a clear strategy for improving patient access and digital experience. We walked away confident, aligned, and ready to move forward.",
    name: "Sarah Mitchell",
    title: "Marketing Director",
    img: "https://picsum.photos/120/120?random=31",
  },
  {
    text: "BmyBrand quickly mapped the gaps in our brand and gave us a realistic action plan. The conversation was practical, focused, and immediately useful to our team.",
    name: "John Carter",
    title: "Product Manager",
    img: "https://picsum.photos/120/120?random=32",
  },
  {
    text: "We left the call with more clarity than we had after weeks of internal meetings. The team understood our business fast and translated that into smart next steps.",
    name: "Priya Singh",
    title: "CEO",
    img: "https://picsum.photos/120/120?random=33",
  },
  {
    text: "The session was focused and practical. Instead of general advice, we got a clear breakdown of what was slowing growth and what needed attention first.",
    name: "Michael Torres",
    title: "Founder",
    img: "https://picsum.photos/120/120?random=34",
  },
  {
    text: "BmyBrand understood our business fast. They connected brand, UX, and conversion issues in one conversation and gave us a roadmap we could actually use.",
    name: "Emily Chen",
    title: "Brand Director",
    img: "https://picsum.photos/120/120?random=35",
  },
  {
    text: "What stood out was the clarity. The team simplified a messy set of problems into smart priorities, and that alone made the call worthwhile.",
    name: "David Brooks",
    title: "Operations Lead",
    img: "https://picsum.photos/120/120?random=36",
  },
  {
    text: "We expected a sales call. What we got was a strategic working session with useful direction, honest feedback, and a much clearer next move.",
    name: "Alicia Moore",
    title: "CMO",
    img: "https://picsum.photos/120/120?random=37",
  },
  {
    text: "The team quickly identified friction in our digital experience and explained the impact in a way our internal stakeholders could immediately understand.",
    name: "Kevin Patel",
    title: "Growth Manager",
    img: "https://picsum.photos/120/120?random=38",
  },
  {
    text: "It was one of the few strategy calls that felt tailored from the start. The recommendations were sharp, relevant, and grounded in our actual goals.",
    name: "Natalie Rivera",
    title: "Creative Lead",
    img: "https://picsum.photos/120/120?random=39",
  },
  {
    text: "BmyBrand helped us see where our messaging, design, and customer journey were out of sync. The conversation gave us confidence in the direction ahead.",
    name: "Ryan Foster",
    title: "Managing Partner",
    img: "https://picsum.photos/120/120?random=40",
  },
];

const calendarDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <article className="review-card flex h-full w-full shrink-0 flex-col rounded-[22px] border border-[#2A2B47] bg-[#191A35] px-6 py-6 sm:px-7 sm:py-7">
      <div className="text-[#F45B25]">
        <img src="/bmyb-global-doubleqoma-01.svg" alt="" className="h-7 w-auto" />
      </div>

      <p className="mt-5 text-[1.125rem] leading-8 text-[#8B90B6]">
        {review.text}
      </p>

      <div className="mt-auto flex items-center gap-3 pt-5">
        <img src={review.img} alt={review.name} className="h-11 w-11 rounded-xl object-cover" />
        <div>
          <div className="text-base text-white BenzinSemibold">{review.name}</div>
          <div className="text-sm text-[#A0A4C6]">{review.title}</div>
        </div>
      </div>
    </article>
  );
}

function CountryFlag({
  iso,
  className,
}: {
  iso: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const code = (iso || "US").trim().toUpperCase();

  if (failed || !code) {
    return (
      <span className={`inline-flex items-center justify-center text-base leading-none ${className ?? ""}`}>
        {isoToFlagEmoji(code)}
      </span>
    );
  }

  return (
    <img
      src={getFlagImageUrl(code)}
      alt=""
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

function CustomCountrySelect({
  value,
  countryIso,
  onChange,
  countries,
}: {
  value: string;
  countryIso: string;
  onChange: (dialCode: string, iso: string) => void;
  countries: PhoneCountry[];
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = 240;

      if (spaceBelow >= dropdownHeight || spaceBelow > spaceAbove) {
        setDropdownStyle({
          position: "absolute",
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX,
          width: Math.max(rect.width, 140),
          maxHeight: `${dropdownHeight}px`,
        });
      } else {
        setDropdownStyle({
          position: "absolute",
          bottom: window.innerHeight - rect.top - window.scrollY + 8,
          left: rect.left + window.scrollX,
          width: Math.max(rect.width, 140),
          maxHeight: `${dropdownHeight}px`,
        });
      }
    }
  }, [open]);

  const selectedCountry =
    countries.find((c) => c.code === countryIso && c.dialCode === value) ??
    countries.find((c) => c.code === countryIso) ??
    countries.find((c) => c.dialCode === value);

  const effectiveIso = (selectedCountry?.code || countryIso || "US").toUpperCase();
  const effectiveDial =
    selectedCountry?.dialCode ||
    value ||
    FALLBACK_DIAL_CODES[effectiveIso] ||
    "+1";

  return (
    <div className="relative w-[128px] shrink-0 border-r border-[#343556] bg-transparent" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-full w-full items-center justify-between gap-1 px-2.5 text-sm text-white/70 outline-none"
        aria-label="Country calling code"
      >
        <span className="flex min-w-0 flex-1 items-center gap-1.5">
          <CountryFlag
            iso={effectiveIso}
            className="h-3.5 w-[21px] shrink-0 rounded-[2px] object-cover"
          />
          <span className="truncate">{effectiveDial}</span>
        </span>
        <svg
          className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={dropdownRef}
            style={dropdownStyle}
            className="z-[9999] overflow-y-auto rounded-xl border border-[#343556] bg-[#191A35] shadow-xl [scrollbar-width:thin] [scrollbar-color:#B9BBCB_transparent]"
          >
            {countries.map((c, i) => (
              <button
                key={`${c.code}-${c.dialCode}-${i}`}
                type="button"
                onClick={() => {
                  onChange(c.dialCode, c.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#2A2B47] ${value === c.dialCode ? "bg-[#2A2B47] text-white" : "text-white/70"
                  }`}
              >
                {c.code && (
                  <CountryFlag
                    iso={c.code}
                    className="h-3.5 w-[21px] shrink-0 rounded-[2px] object-cover"
                  />
                )}
                <span className="whitespace-nowrap">{c.code} {c.dialCode}</span>
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}

export default function StrategyCallPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const initialPhoneCountry = getInitialPhoneCountryState();
  const [countryCode, setCountryCode] = useState(initialPhoneCountry.countryCode);
  const [countryIso, setCountryIso] = useState(initialPhoneCountry.countryIso);
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [budget, setBudget] = useState("");
  const [callNotes, setCallNotes] = useState("");
  const [source, setSource] = useState("");
  const [countries, setCountries] = useState<PhoneCountry[]>(MINIMAL_PHONE_COUNTRIES);
  const [step, setStep] = useState<"form" | "time" | "complete">("form");
  const phoneTouchedRef = useRef(false);
  const geoAppliedRef = useRef(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,idd,cca2,flags")
      .then((res) => res.json())
      .then((data) => {
        setCountries(formatRestCountries(data));
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  const applyCountry = (country: PhoneCountry) => {
    setCountryCode(country.dialCode);
    setCountryIso(country.code);
  };

  useEffect(() => {
    if (countries.length === 0 || phoneTouchedRef.current) return;

    const current = findCountryByIso(countryIso, countries);
    if (current && !countryCode) {
      applyCountry(current);
    }
  }, [countries, countryIso, countryCode]);

  useEffect(() => {
    if (countries.length === 0 || geoAppliedRef.current || phoneTouchedRef.current) {
      return;
    }

    detectCountryIsoFromIp()
      .then((iso) => {
        if (phoneTouchedRef.current || !iso) return;

        const country = findCountryByIso(iso, countries);
        if (country) {
          applyCountry(country);
          geoAppliedRef.current = true;
        }
      })
      .catch((err) => console.error("Error detecting country from IP:", err));
  }, [countries]);

  const handlePhoneChange = (value: string) => {
    phoneTouchedRef.current = true;
    setPhone(value);

    if (!value.trim().startsWith("+") || countries.length === 0) return;

    const matched = findCountryByDialCode(value, countries);
    if (matched) {
      setCountryCode(matched.dialCode);
      setCountryIso(matched.code);
    }
  };

  const handleCountryChange = (dialCode: string, iso: string) => {
    phoneTouchedRef.current = true;
    setCountryCode(dialCode);
    setCountryIso(iso);

    const country = countries.find((c) => c.code === iso && c.dialCode === dialCode);
    if (country) {
      setPhone((current) => replacePhoneDialCode(current, countries, country));
    }
  };

  useEffect(() => {
    if (step !== "time" && step !== "complete") return;

    const scrollTarget =
      step === "time"
        ? bookingPanelRef.current
        : completeSectionRef.current;

    requestAnimationFrame(() => {
      scrollTarget?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [step]);

  const initialTimeZone = detectUserTimeZone();
  const [calendarDate, setCalendarDate] = useState(() => {
    const initial = getInitialCalendarStateForTimeZone(initialTimeZone);
    return initial.calendarDate;
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    const initial = getInitialCalendarStateForTimeZone(initialTimeZone);
    return initial.selectedDate;
  });
  const [selectedTime, setSelectedTime] = useState("");
  const [timezoneOpen, setTimezoneOpen] = useState(false);
  const [timezoneQuery, setTimezoneQuery] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState(initialTimeZone);
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h");
  const [activeAgenda, setActiveAgenda] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [completionVideoPaused, setCompletionVideoPaused] = useState(false);
  const [completionVideoMuted, setCompletionVideoMuted] = useState(true);
  const [reviewCardWidth, setReviewCardWidth] = useState(0);
  const [reviewCardHeight, setReviewCardHeight] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const beltViewportRef = useRef<HTMLDivElement | null>(null);
  const beltTrackRef = useRef<HTMLDivElement | null>(null);
  const bookingFlowRef = useRef<HTMLDivElement | null>(null);
  const bookingPanelRef = useRef<HTMLElement | null>(null);
  const completeSectionRef = useRef<HTMLElement | null>(null);
  const completionVideoRef = useRef<HTMLVideoElement | null>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);
  const cardWidthRef = useRef(0);

  useLayoutEffect(() => {
    const viewport = beltViewportRef.current;
    const track = beltTrackRef.current;
    if (!viewport || !track) return;

    const setup = () => {
      animRef.current?.kill();

      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0") || 0;
      const viewportWidth = viewport.offsetWidth * 0.99;
      setReviewCardWidth(viewportWidth);
      cardWidthRef.current = viewportWidth + gap;
      gsap.set(track, { x: -(currentReview * (viewportWidth + gap)) });

      requestAnimationFrame(() => {
        const cards = Array.from(track.querySelectorAll(".review-card")) as HTMLElement[];
        const tallest = cards.reduce((max, card) => Math.max(max, card.offsetHeight), 0);
        if (tallest) setReviewCardHeight(tallest);
      });
    };

    requestAnimationFrame(setup);
    window.addEventListener("resize", setup);

    return () => {
      window.removeEventListener("resize", setup);
    };
  }, [currentReview]);

  const moveBelt = (direction: "prev" | "next") => {
    const track = beltTrackRef.current;
    if (!track || !cardWidthRef.current) return;

    animRef.current?.kill();

    const nextIndex =
      direction === "next"
        ? (currentReview + 1) % reviews.length
        : (currentReview - 1 + reviews.length) % reviews.length;

    setCurrentReview(nextIndex);

    gsap.to(track, {
      x: -(nextIndex * cardWidthRef.current),
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const formUnlocked = email.trim() !== "" && name.trim() !== "";

  const canContinue =
    formUnlocked &&
    phone.trim() !== "" &&
    companyName.trim() !== "" &&
    websiteUrl.trim() !== "" &&
    budget.trim() !== "" &&
    callNotes.trim() !== "" &&
    source.trim() !== "";

  const baseTimeSlots = useMemo(
    () =>
      getAvailableSlots(
        calendarDate.getFullYear(),
        calendarDate.getMonth() + 1,
        selectedDate,
        selectedTimezone
      ),
    [calendarDate, selectedDate, selectedTimezone]
  );

  const canGoToPreviousMonth =
    getMonthStart(calendarDate).getTime() > getMonthStart(new Date()).getTime();

  const timezoneOptions = useMemo(() => {
    const query = timezoneQuery.trim().toLowerCase();
    const all = getAllTimeZones();
    const filtered = query
      ? all.filter(
          (tz) =>
            tz.toLowerCase().includes(query) ||
            tz.replace(/_/g, " ").toLowerCase().includes(query)
        )
      : all;

    return filtered.map((tz) => formatTimezoneLabel(tz));
  }, [timezoneQuery]);

  const selectedTimezoneLabel = useMemo(
    () => formatTimezoneLabel(selectedTimezone),
    [selectedTimezone]
  );

  const agendaItems = [
    {
      title: "Discovery Call",
      body: "We’ll learn about your healthcare organization, goals, and current digital challenges.",
    },
    {
      title: "Strategy Discussion",
      body: "We’ll review the opportunities we identified and discuss the best direction for your brand, site, and growth systems.",
    },
    {
      title: "Scope & Recommendations",
      body: "You’ll leave with clear priorities, recommended actions, and a practical path forward.",
    },
    {
      title: "Meet the Team",
      body: "You’ll get introduced to the specialists who would support design, development, and execution after the call.",
    },
  ];

  const monthLabel = calendarDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate();
  const startDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getDay();
  const previousMonthDays = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 0).getDate();

  const calendarCells = Array.from({ length: 35 }, (_, index) => {
    if (index < startDay) {
      return { day: previousMonthDays - startDay + index + 1, inMonth: false };
    }

    const day = index - startDay + 1;
    if (day <= daysInMonth) {
      return { day, inMonth: true };
    }

    return { day: day - daysInMonth, inMonth: false };
  });

  const selectedWeekdayLabel = new Date(
    calendarDate.getFullYear(),
    calendarDate.getMonth(),
    selectedDate
  ).toLocaleDateString("en-US", { weekday: "short" });

  const formatTimeSlot = (slot: (typeof baseTimeSlots)[number]) =>
    timeFormat === "24h" ? slot.label24h : slot.label12h;

  const changeCalendarMonth = (offset: number) => {
    if (offset < 0 && !canGoToPreviousMonth) return;

    const currentMonthStart = getMonthStart(new Date());
    setCalendarDate((prev) => {
      const next = new Date(prev.getFullYear(), prev.getMonth() + offset, 1);
      if (getMonthStart(next).getTime() < currentMonthStart.getTime()) return prev;

      const firstDay = firstSelectableDayInMonthWithSlots(
        next.getFullYear(),
        next.getMonth(),
        selectedTimezone
      );
      if (firstDay !== null) setSelectedDate(firstDay);
      setSelectedTime("");
      return next;
    });
  };

  const handleContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canContinue) return;
    setStep("time");
  };

  const goToFormStep = () => {
    setStep("form");
  };

  const goToTimeStep = () => {
    if (!canContinue) return;
    setStep("time");
  };

  const toggleCompletionVideo = () => {
    const video = completionVideoRef.current;
    if (!video) return;

    if (completionVideoPaused) {
      void video.play().catch(() => { });
      setCompletionVideoPaused(false);
    } else {
      video.pause();
      setCompletionVideoPaused(true);
    }
  };

  const toggleCompletionVideoMuted = () => {
    const video = completionVideoRef.current;
    if (!video) return;

    const nextMuted = !completionVideoMuted;
    video.muted = nextMuted;
    setCompletionVideoMuted(nextMuted);
  };

  const handleFinishBooking = async () => {
    if (!selectedTime || isSubmitting) return;

    const selectedSlot = baseTimeSlots.find((slot) => slot.id === selectedTime);
    if (!selectedSlot) return;

    setIsSubmitting(true);
    setSubmitError("");

    const appointmentDate = formatAppointmentDateFromSlot(selectedSlot, selectedTimezone);

    try {
      const response = await fetch("/api/strategy-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          countryCode,
          phone,
          companyName,
          websiteUrl,
          budget,
          callNotes,
          source,
          appointmentDate,
          appointmentTime: formatTimeSlot(selectedSlot),
          timezone: selectedTimezone,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const message = [result.error, result.hint, result.details?.message]
          .filter(Boolean)
          .join(" — ");
        throw new Error(message || "Failed to save your booking.");
      }

      setStep("complete");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to save your booking."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#11122F]">
      <div className="mx-auto w-[90%] 2xl:w-[85%] px-2 py-8 pt-24 lg:pt-32">
        <header className="mx-auto max-w-7xl">
          <Navbar />
        </header>

        <main className="mx-auto max-w-7xl pt-24 lg:pt-32">
          {step === "complete" ? (
            <section
              ref={completeSectionRef}
              className="scroll-mt-28 px-2 py-2 lg:scroll-mt-32 lg:px-0 lg:py-0"
            >
              <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(540px,1.02fr)] lg:items-start">
                <div>
                  <div className="inline-flex h-[39px] items-center gap-2.5 rounded-xl border border-[#2A2B47] bg-[#1B1C3A] px-4 text-[0.8rem] text-white/90">
                    <img src="/bmyb-logo-logowhite-01.svg" alt="" className="w-2.5 opacity-85" />
                    <span>Thank you for booking</span>
                  </div>

                  <h2 className="mt-6 max-w-[12ch] text-[45px] leading-[0.98] text-white BenzinSemibold">
                    You&apos;re All Set For Your Strategy Call
                  </h2>

                  <p className="mt-5 max-w-[42rem] text-[1.02rem] leading-9 text-[#9EA2C5]">
                    Your call has been confirmed. Below is a quick overview of what to expect as we
                    discuss your healthcare brand, digital challenges, and growth opportunities.
                  </p>

                  <div className="mt-8 space-y-4">
                    {agendaItems.map((item, index) => {
                      const open = activeAgenda === index;
                      return (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => setActiveAgenda(open ? -1 : index)}
                          className="block w-full rounded-[14px] border border-[#2A2B47] bg-transparent px-5 py-4 text-left transition-colors hover:bg-[#1B1C3A]"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="text-[1.05rem] text-white BenzinRegular sm:text-[1.1rem]">{item.title}</div>
                            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-md bg-[#232544]">
                              <img
                                src="/bmyb-logo-group119-01.svg"
                                alt=""
                                aria-hidden="true"
                                className={`w-[11px] opacity-80 transition-transform duration-300 ease-out ${open ? "-rotate-[45deg]" : "rotate-[135deg]"}`}
                              />
                            </span>
                          </div>
                          <div
                            className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                              }`}
                          >
                            <div className="overflow-hidden">
                              <p className="mt-3 max-w-[39rem] text-base leading-8 text-white/55">
                                {item.body}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="group mx-auto w-full max-w-[32rem]">
                  <div className="relative overflow-hidden rounded-[14px]">
                    <video
                      ref={completionVideoRef}
                      src="/bmyb-global-rickroll-01.mp4"
                      className="h-[40rem] w-full object-cover"
                      autoPlay
                      muted={completionVideoMuted}
                      loop
                      playsInline
                    />
                    <button
                      type="button"
                      onClick={toggleCompletionVideoMuted}
                      className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#17183B]/88 text-white shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition-all duration-200 hover:scale-[1.03] hover:bg-[#202141]"
                      aria-label={completionVideoMuted ? "Unmute video" : "Mute video"}
                    >
                      {completionVideoMuted ? (
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                          <path d="m22 9-6 6" />
                          <path d="m16 9 6 6" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                          <path d="M18.5 6a8.5 8.5 0 0 1 0 12" />
                        </svg>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={toggleCompletionVideo}
                      className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white opacity-0 shadow-[0_10px_28px_rgba(0,0,0,0.28)] transition-all duration-200 group-hover:opacity-100 hover:scale-[1.03]"
                      aria-label={completionVideoPaused ? "Play video" : "Pause video"}
                    >
                      {completionVideoPaused ? (
                        <svg className="h-8 w-8 translate-x-[2px] text-[#17183B]" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" aria-hidden="true">
                          <path d="M6 4l14 8-14 8z" />
                        </svg>
                      ) : (
                        <svg className="h-7 w-7 text-[#17183B]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M7 6h3v12H7zM14 6h3v12h-3z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div
              ref={bookingFlowRef}
              className="flex scroll-mt-28 flex-col gap-12 lg:scroll-mt-32 lg:flex-row lg:items-start lg:gap-14"
            >
              <section
                className={`w-full lg:w-[62%] ${step === "time" ? "max-lg:order-2" : ""}`}
              >
                <div className="inline-flex h-[39px] items-center gap-2 rounded-xl border border-[#2A2B47] bg-[#191A35] px-4 text-[0.8rem] text-white/90">
                  <img src="/bmyb-logo-logowhite-01.svg" alt="BmyBrand logo" className="h-4 w-auto" />
                  <span>Book a strategy call</span>
                </div>

                <h1 className="mt-5 text-[2.45rem] leading-[0.98] text-white sm:text-[3rem] lg:text-5xl BenzinSemibold">
                  Schedule a strategy call that fits your schedule
                </h1>

                <p className="mt-6 max-w-[43rem] text-sm leading-7 text-[#9EA2C5] sm:text-base lg:text-lg">
                  Pick a date and time that suits you, and our team will connect with you to discuss your
                  goals, challenges, and the best path forward for your brand.
                </p>

                <div
                  className="mt-7 w-full overflow-hidden"
                  ref={beltViewportRef}
                  style={reviewCardHeight ? { height: `${reviewCardHeight}px` } : undefined}
                >
                  <div ref={beltTrackRef} className="flex w-max gap-5 pr-5">
                    {reviews.map((review, index) => (
                      <div
                        key={`${review.name}-${index}`}
                        style={
                          reviewCardWidth
                            ? {
                              width: `${reviewCardWidth}px`,
                              height: reviewCardHeight ? `${reviewCardHeight}px` : undefined,
                            }
                            : undefined
                        }
                      >
                        <ReviewCard review={review} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex w-full items-center justify-between gap-6">
                  <div className="flex items-center rounded-md bg-[#191A35] px-8 py-3 h-[48px]">
                    {reviews.map((_, idx) => (
                      <span
                        key={idx}
                        className={`mx-[2px] rounded-full transition-all duration-200 ${idx === currentReview ? "h-2 w-3 bg-white" : "h-2 w-2 bg-white/18"
                          }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 h-12">
                    <button
                      type="button"
                      onClick={() => moveBelt("prev")}
                      className="flex h-full w-12 items-center justify-center rounded-lg bg-[#191A35] text-white/70 transition-colors duration-200 border border-[#191A35] hover:bg-transparent hover:border hover:border-[#2A2B47]"
                      aria-label="Move reviews left "
                    >
                      <span className="text-lg"><img src="/bmyb-logo-group119-01.svg" alt="" className="-rotate-135 brightness-0 invert" /> </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => moveBelt("next")}
                      className="flex h-full w-12 items-center justify-center rounded-lg bg-[#191A35] text-white/70 transition-colors duration-200 border border-[#191A35] hover:bg-transparent hover:border hover:border-[#2A2B47]"
                      aria-label="Move reviews right"
                    >
                      <span className="text-lg"><img src="/bmyb-logo-group119-01.svg" alt="" className="rotate-45 brightness-0 invert" /></span>
                    </button>
                  </div>
                </div>
              </section>

              <aside
                ref={bookingPanelRef}
                className={`w-full scroll-mt-28 rounded-[24px] border border-[#2A2B47] bg-[#1B1C3A] lg:sticky lg:top-28 lg:w-[38%] lg:self-stretch lg:scroll-mt-32 ${step === "time" ? "max-lg:order-1" : ""}`}
              >
                <div className="border-b border-[#2A2B47] px-6 py-5">
                  <div className="flex items-center justify-center gap-3 text-sm">
                    <button
                      type="button"
                      onClick={goToFormStep}
                      className={`flex items-center gap-2 transition-colors ${step === "form" ? "text-white" : "text-white/38 hover:text-white/70"}`}
                    >
                      <span className={`h-2 w-2 rounded-full ${step === "form" ? "bg-[#F45B25]" : "bg-white/28"}`} />
                      <span>Fill out the form</span>
                    </button>
                    <button
                      type="button"
                      onClick={goToTimeStep}
                      disabled={!canContinue}
                      className={`flex items-center gap-2 transition-colors ${step === "time"
                        ? "text-white"
                        : canContinue
                          ? "text-white/38 hover:text-white/70"
                          : "cursor-not-allowed text-white/20"
                        }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${step === "time" ? "bg-[#F45B25]" : "bg-white/28"}`} />
                      <span>Choose your time</span>
                    </button>
                  </div>
                </div>

                <div className="px-6 py-6 pb-8">
                  {step === "form" ? (
                    <>
                      <div className="mt-1 flex items-center gap-2">
                        <img src="/bmyb-services-brand-bmybrand-01-01.svg" alt="BmyBrand logo" className="h-8 w-auto" />
                      </div>

                      <h2 className="mt-5 text-[1.8rem] leading-tight text-white BenzinSemibold">
                        Book A Strategy Call With BmyBrand
                      </h2>

                      <div className="mt-4 space-y-3 text-[0.96rem] leading-8 text-[#A4A8C9]">
                        <p>
                          Book a 30-minute strategy call with our team to discuss your goals, challenges, and
                          the best next steps for your brand.
                        </p>
                        <p>
                          Please make sure your timezone is correct before selecting your preferred date and
                          time.
                        </p>
                      </div>

                      <form className="mt-6 space-y-4" onSubmit={handleContinue}>
                        <input
                          type="email"
                          placeholder="Email *"
                          className="w-full rounded-xl border border-[#343556] bg-transparent px-4 py-3 text-white placeholder:text-white/34 outline-none transition-colors focus:border-[#F45B25]"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Name *"
                          className="w-full rounded-xl border border-[#343556] bg-transparent px-4 py-3 text-white placeholder:text-white/34 outline-none transition-colors focus:border-[#F45B25]"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />

                        <div
                          className={`grid transition-all duration-500 ease-out ${formUnlocked ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            }`}
                        >
                          <div className="overflow-hidden">
                            <div className="space-y-4 pt-4 pb-1">
                              <div>
                                <div className="mb-2 text-[0.95rem] text-white BenzinSemibold">Phone Number</div>
                                <div className="flex rounded-xl border border-[#343556] bg-transparent text-white transition-colors focus-within:border-[#F45B25]">
                                  <CustomCountrySelect
                                    value={countryCode}
                                    countryIso={countryIso}
                                    onChange={handleCountryChange}
                                    countries={countries}
                                  />
                                  <input
                                    type="tel"
                                    placeholder="Phone number"
                                    value={phone}
                                    onChange={(e) => handlePhoneChange(e.target.value)}
                                    className="w-full bg-transparent px-4 py-3 text-white placeholder:text-white/34 outline-none"
                                  />
                                </div>
                              </div>

                              <div>
                                <div className="mb-2 text-[0.95rem] text-white BenzinSemibold">Company Name *</div>
                                <input
                                  type="text"
                                  value={companyName}
                                  onChange={(e) => setCompanyName(e.target.value)}
                                  className="w-full rounded-xl border border-[#343556] bg-transparent px-4 py-3 text-white outline-none transition-colors focus:border-[#F45B25]"
                                />
                              </div>

                              <div>
                                <div className="mb-2 text-[0.95rem] text-white BenzinSemibold">Website URL *</div>
                                <input
                                  type="url"
                                  value={websiteUrl}
                                  onChange={(e) => setWebsiteUrl(e.target.value)}
                                  className="w-full rounded-xl border border-[#343556] bg-transparent px-4 py-3 text-white outline-none transition-colors focus:border-[#F45B25]"
                                />
                              </div>

                              <div>
                                <div className="mb-2 text-[0.95rem] text-[#ADAECC] BenzinSemibold">Budget *</div>
                                <div className="space-y-2.5">
                                  {["$5k-$10k", "$10k-$20k", "$20k-$35k", "$35k-$50k", "$50k+"].map((option, i) => (
                                    <label key={option} htmlFor={`budget${i}`} className="flex cursor-pointer items-center gap-2.5 text-sm text-[#ADAECC]">
                                      <input
                                        type="radio"
                                        name="budget"
                                        id={`budget${i}`}
                                        checked={budget === option}
                                        onChange={() => setBudget(option)}
                                        className="peer sr-only"
                                      />
                                      <div className="h-[18px] w-[18px] shrink-0 rounded-full border border-[#343556] bg-transparent transition-all duration-200 peer-checked:border-[5px] peer-checked:border-[#F45B25]"></div>
                                      <span>{option}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <div className="mb-2 text-[0.95rem] text-[#ADAECC] BenzinSemibold">
                                  Please share anything that would help us prepare for your call. *
                                </div>
                                <textarea
                                  rows={4}
                                  value={callNotes}
                                  onChange={(e) => setCallNotes(e.target.value)}
                                  className="w-full resize-none rounded-xl border border-[#343556] bg-transparent px-4 py-3 text-white outline-none transition-colors focus:border-[#F45B25]"
                                />
                              </div>

                              <div>
                                <div className="mb-2 text-[0.95rem] text-[#ADAECC] BenzinSemibold">How did you find BmyBrand? *</div>
                                <div className="space-y-2.5">
                                  {["Google Search", "AI Search", "Social Media", "Case Study", "Other"].map((sourceOption, i) => (
                                    <label key={sourceOption} htmlFor={`source${i}`} className="flex cursor-pointer items-center gap-2.5 text-sm text-[#ADAECC]">
                                      <input
                                        type="radio"
                                        name="source"
                                        id={`source${i}`}
                                        checked={source === sourceOption}
                                        onChange={() => setSource(sourceOption)}
                                        className="peer sr-only"
                                      />
                                      <div className="h-[18px] w-[18px] shrink-0 rounded-full border border-[#343556] bg-transparent transition-all duration-200 peer-checked:border-[5px] peer-checked:border-[#F45B25]"></div>
                                      <span>{sourceOption}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="pt-2 text-xs leading-6 text-white/44">
                          By submitting your information, you agree to our{" "}
                          <a href="#" className="text-white/78 underline underline-offset-2">Terms of Use</a> and{" "}
                          <a href="#" className="text-white/78 underline underline-offset-2">Privacy Policy</a>.
                        </p>

                        <button
                          type="submit"
                          disabled={!canContinue}
                          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[1.15rem] text-white transition-all duration-200 BenzinSemibold ${canContinue
                            ? "bg-gradient-to-r from-[#FF6A2B] to-[#FF8A3D] hover:brightness-110"
                            : "cursor-not-allowed bg-[#343556] text-white/45"
                            }`}
                        >
                          Continue
                          <span className="text-lg">→</span>
                        </button>
                      </form>

                      <div
                        className={`grid overflow-hidden transition-all duration-500 ease-out ${formUnlocked ? "grid-rows-[0fr] opacity-0" : "mt-8 grid-rows-[1fr] opacity-100"
                          }`}
                      >
                        <div className="overflow-hidden">
                          <div className="flex items-center justify-between">
                            <div className="text-[1.05rem] text-white BenzinSemibold">{monthLabel}</div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => changeCalendarMonth(-1)}
                                disabled={!canGoToPreviousMonth}
                                className={`flex h-8 w-8 items-center justify-center rounded-lg border border-[#343556] p-2.5 ${canGoToPreviousMonth
                                  ? "text-white/28 hover:text-white/60"
                                  : "cursor-not-allowed text-white/10"
                                  }`}
                                aria-label="Previous month"
                              >
                                <img src="/bmyb-logo-group119-01.svg" alt="" className="-rotate-135 brightness-0 invert" />
                              </button>
                              <button
                                type="button"
                                onClick={() => changeCalendarMonth(1)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#343556] text-white/28 p-2.5 hover:text-white/60"
                                aria-label="Next month"
                              >
                                <img src="/bmyb-logo-group119-01.svg" alt="" className="rotate-45 brightness-0 invert" />
                              </button>
                            </div>
                          </div>

                          <div className="mt-5 grid grid-cols-7 gap-y-4 text-[0.68rem] tracking-[0.08em] text-white/22">
                            {calendarDays.map((day) => (
                              <div key={day} className="text-center">{day}</div>
                            ))}
                          </div>

                          <div className="relative mt-4 grid grid-cols-7 gap-y-4 text-base text-white/28">
                            {calendarCells.map((cell, index) => {
                              const faded = !cell.inMonth;
                              return (
                                <div key={`${cell.day}-${index}`} className={`text-center ${faded ? "opacity-22" : ""}`}>
                                  {cell.day}
                                </div>
                              );
                            })}

                            <div className="absolute left-1/2 top-[4.7rem] w-[15.2rem] -translate-x-1/2 rounded-xl border border-[#4A4D74] bg-[#2A2B47] px-5 py-3 text-center text-sm leading-6 text-white/88 shadow-[0_12px_30px_rgba(0,0,0,0.2)]">
                              Please complete the form before selecting a time slot.
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mt-1 flex items-center gap-2">
                        <img src="/bmyb-services-brand-bmybrand-01-01.svg" alt="BmyBrand logo" className="h-8 w-auto" />
                      </div>

                      <h2 className="mt-5 text-[1.8rem] leading-tight text-white BenzinSemibold">
                        Schedule Your Strategy Call
                      </h2>

                      <div className="mt-4 space-y-3 text-[0.95rem] text-[#A4A8C9]">
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] opacity-80">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span>30-minute strategy call</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setTimezoneOpen((prev) => !prev)}
                          className="flex items-center gap-2 text-left"
                        >
                          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-[18px] w-[18px] text-current opacity-80">
                            <g clipPath="url(#a)">
                              <path fillRule="evenodd" clipRule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="currentColor"/>
                            </g>
                            <defs>
                              <clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath>
                            </defs>
                          </svg>
                          <span>{selectedTimezoneLabel.label}</span>
                          <span className="text-white/45">{selectedTimezoneLabel.offset}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 text-white/45 transition-transform ${timezoneOpen ? "rotate-180" : ""}`}>
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                        </button>
                      </div>

                      <div
                        className={`grid transition-all duration-300 ease-out ${timezoneOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                      >
                        <div className="overflow-hidden">
                          <div className="rounded-[18px] border border-[#343556] bg-[#1F2140] p-3">
                            <div className="flex items-center gap-2 rounded-xl border border-[#343556] bg-transparent px-3 py-2.5 text-sm text-white/44">
                              <span>⌕</span>
                              <input
                                type="text"
                                value={timezoneQuery}
                                onChange={(e) => setTimezoneQuery(e.target.value)}
                                placeholder="Search by continent, country or city"
                                className="w-full bg-transparent text-white placeholder:text-white/34 outline-none"
                              />
                            </div>

                            <div className="mt-3 max-h-[13.5rem] space-y-1 overflow-y-auto pr-1 [scrollbar-color:#B9BBCB_transparent] [scrollbar-width:thin]">
                              {timezoneOptions.map((option) => {
                                const active = option.id === selectedTimezone;
                                return (
                                  <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => {
                                      setSelectedTimezone(option.id);
                                      const initial = getInitialCalendarStateForTimeZone(option.id);
                                      setCalendarDate(initial.calendarDate);
                                      setSelectedDate(initial.selectedDate);
                                      setSelectedTime("");
                                      setTimezoneOpen(false);
                                      setTimezoneQuery("");
                                    }}
                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-[#303258] text-white" : "text-[#B5B9D8] hover:bg-[#262847] hover:text-white"
                                      }`}
                                  >
                                    <span className="truncate pr-3 text-left">{option.label}</span>
                                    <span className="shrink-0 text-white/45">{option.currentTime}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-7">
                        <div className="flex items-center justify-between">
                          <div className="text-[1.05rem] text-white BenzinSemibold">{monthLabel}</div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => changeCalendarMonth(-1)}
                              disabled={!canGoToPreviousMonth}
                              className={`flex h-8 w-8 items-center justify-center rounded-lg border border-[#343556] p-2.5 ${canGoToPreviousMonth
                                ? "text-white/28 hover:text-white/60"
                                : "cursor-not-allowed text-white/10"
                                }`}
                              aria-label="Previous month"
                            >
                              <img src="/bmyb-logo-group119-01.svg" alt="" className="-rotate-135 brightness-0 invert" />
                            </button>
                            <button
                              type="button"
                              onClick={() => changeCalendarMonth(1)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#343556] text-white/28 p-2.5 hover:text-white/60"
                              aria-label="Next month"
                            >
                              <img src="/bmyb-logo-group119-01.svg" alt="" className="rotate-45 brightness-0 invert" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-5 grid grid-cols-7 gap-y-4 text-[0.68rem] tracking-[0.08em] text-white/22">
                          {calendarDays.map((day) => (
                            <div key={day} className="text-center">{day}</div>
                          ))}
                        </div>

                        <div className="mt-4 grid grid-cols-7 gap-2 text-center text-base text-white/28">
                          {calendarCells.map((cell, index) => {
                            const dayNumber = cell.day;
                            const faded = !cell.inMonth;
                            const active = cell.inMonth && dayNumber === selectedDate;
                            const selectable =
                              cell.inMonth &&
                              dateHasAvailableSlots(
                                calendarDate.getFullYear(),
                                calendarDate.getMonth() + 1,
                                dayNumber,
                                selectedTimezone
                              );

                            return (
                              <button
                                key={`${dayNumber}-${index}`}
                                type="button"
                                disabled={!selectable}
                                onClick={() => {
                                  if (!selectable) return;
                                  setSelectedDate(dayNumber);
                                  setSelectedTime("");
                                }}
                                className={`h-8 rounded-lg text-center transition-colors ${active
                                  ? "bg-[#FF7A36] text-white"
                                  : selectable
                                    ? "bg-[#252744] text-white hover:bg-[#2e3052]"
                                    : "bg-transparent text-white/28"
                                  }`}
                              >
                                {dayNumber}
                              </button>
                            );
                          })}
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                          <div className="text-[1.05rem] text-white BenzinSemibold">{selectedWeekdayLabel} {selectedDate}</div>
                          <div className="flex items-center overflow-hidden rounded-lg border border-[#343556]">
                            <button
                              type="button"
                              onClick={() => setTimeFormat("12h")}
                              className={`px-3 py-1.5 text-xs ${timeFormat === "12h" ? "bg-[#252744] text-white" : "text-white/32"}`}
                            >
                              12h
                            </button>
                            <button
                              type="button"
                              onClick={() => setTimeFormat("24h")}
                              className={`px-3 py-1.5 text-xs ${timeFormat === "24h" ? "bg-[#252744] text-white" : "text-white/32"}`}
                            >
                              24h
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 flex max-h-[15rem] flex-col gap-3 overflow-y-auto overscroll-contain pr-2 [scrollbar-color:#B9BBCB_transparent] [scrollbar-width:thin]">
                          {baseTimeSlots.length === 0 ? (
                            <p className="rounded-xl border border-[#343556] px-4 py-3 text-sm text-[#A4A8C9]">
                              No slots available for this date. Please choose another day.
                            </p>
                          ) : null}
                          {baseTimeSlots.map((slot) => {
                            const slotLabel = formatTimeSlot(slot);
                            const isSelected = selectedTime === slot.id;
                            return (
                              <div
                                key={slot.id}
                                className="group grid h-12 w-full shrink-0 grid-cols-[1fr_0fr] gap-3 transition-[grid-template-columns] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:grid-cols-[52fr_48fr]"
                              >
                                <button
                                  type="button"
                                  onClick={() => setSelectedTime(slot.id)}
                                  className={`flex h-12 min-w-0 items-center justify-center rounded-xl border text-sm transition-[border-color,background-color,color] duration-300 ease-out ${isSelected
                                    ? "border-[#FF7A36] bg-[#252744] text-white"
                                    : "border-[#343556] bg-transparent text-[#C7CAE2] group-hover:border-[#343556] group-hover:text-[#C7CAE2] hover:border-[#4A4D74] hover:text-white"
                                    }`}
                                >
                                  {slotLabel}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSelectedTime(slot.id)}
                                  className="flex h-12 min-w-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#FF6A2B] to-[#FF8A3D] text-base text-white opacity-0 pointer-events-none transition-[opacity] duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 BenzinSemibold"
                                >
                                  Confirm
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        <div
                          className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${selectedTime ? "mt-5 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                            }`}
                        >
                          <div className="min-h-0 overflow-hidden">
                            {submitError ? (
                              <p className="mb-3 text-sm text-red-400">{submitError}</p>
                            ) : null}
                            <button
                              type="button"
                              onClick={() => void handleFinishBooking()}
                              disabled={isSubmitting}
                              className={`flex w-full items-center justify-center rounded-xl py-3.5 text-[1.05rem] text-white transition-colors duration-300 BenzinSemibold ${isSubmitting
                                ? "cursor-not-allowed bg-[#343556] text-white/45"
                                : "bg-gradient-to-r from-[#FF6A2B] to-[#FF8A3D] hover:brightness-110"
                                }`}
                            >
                              {isSubmitting ? "Saving..." : "Finish"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </aside>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
