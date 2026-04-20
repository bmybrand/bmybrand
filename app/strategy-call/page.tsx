"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "@/components/navbar";

const reviews = [
  {
    text: "The strategy call brought immediate clarity and direction. BMYBrand quickly understood the demands of emergency care and helped us shape a clear strategy for improving patient access and digital experience. We walked away confident, aligned, and ready to move forward.",
    name: "Sarah Mitchell",
    title: "Marketing Director",
    img: "https://picsum.photos/120/120?random=31",
  },
  {
    text: "BMYBrand quickly mapped the gaps in our brand and gave us a realistic action plan. The conversation was practical, focused, and immediately useful to our team.",
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
    text: "BMYBrand understood our business fast. They connected brand, UX, and conversion issues in one conversation and gave us a roadmap we could actually use.",
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
    text: "BMYBrand helped us see where our messaging, design, and customer journey were out of sync. The conversation gave us confidence in the direction ahead.",
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
        <img src="/doubleqoma.svg" alt="" className="h-7 w-auto" />
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

export default function StrategyCallPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+92");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [budget, setBudget] = useState("");
  const [callNotes, setCallNotes] = useState("");
  const [source, setSource] = useState("");
  const [step, setStep] = useState<"form" | "time" | "complete">("form");
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 3, 1));
  const [selectedDate, setSelectedDate] = useState(6);
  const [selectedTime, setSelectedTime] = useState("");
  const [timezoneOpen, setTimezoneOpen] = useState(false);
  const [timezoneQuery, setTimezoneQuery] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState("Asia/Pakistan/Karachi");
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h");
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
  const [activeAgenda, setActiveAgenda] = useState(0);
  const [completionVideoPaused, setCompletionVideoPaused] = useState(false);
  const [completionVideoMuted, setCompletionVideoMuted] = useState(true);
  const [reviewCardWidth, setReviewCardWidth] = useState(0);
  const [reviewCardHeight, setReviewCardHeight] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const beltViewportRef = useRef<HTMLDivElement | null>(null);
  const beltTrackRef = useRef<HTMLDivElement | null>(null);
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

  const availableDays = [6, 7, 8, 9, 10, 13, 14, 15, 16];
  const baseTimeSlots = ["01:00", "01:30", "02:00", "02:40", "03:00", "03:30"];
  const timezoneOptions = [
    { label: "Asia/Mongolia/Ulaanbaatar", time: "6:26 AM" },
    { label: "Asia/Israel/Jerusalem", time: "1:26 AM" },
    { label: "Asia/Afghanistan/Kabul", time: "2:56 AM" },
    { label: "Asia/Russia/Kamchatka", time: "10:26 AM" },
    { label: "Asia/Pakistan/Karachi", time: "3:26 AM" },
    { label: "Asia/Uzbekistan/Tashkent", time: "3:26 AM" },
    { label: "Asia/Nepal/Kathmandu", time: "4:11 AM" },
    { label: "Asia/India/Kolkata", time: "3:56 AM" },
    { label: "Asia/Russia/Krasnoyarsk", time: "5:26 AM" },
  ];
  const filteredTimezones = timezoneOptions.filter((option) =>
    option.label.toLowerCase().includes(timezoneQuery.toLowerCase())
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

  const formatTimeSlot = (slot: string) => {
    const [hoursText, minutes] = slot.split(":");
    const hours = Number(hoursText);

    if (timeFormat === "24h") {
      return `${hoursText.padStart(2, "0")}:${minutes}`;
    }

    const suffix = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    return `${String(hour12).padStart(2, "0")}:${minutes} ${suffix}`;
  };

  const changeCalendarMonth = (offset: number) => {
    setCalendarDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    setSelectedDate(availableDays[0]);
    setSelectedTime("");
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
      void video.play().catch(() => {});
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

  return (
    <div className="min-h-screen bg-[#11122F]">
      <div className="mx-auto w-[90%] 2xl:w-[85%] px-2 py-8">
        <header className="mx-auto max-w-7xl">
          <Navbar />
        </header>

        <main className="mx-auto mt-24 max-w-7xl lg:mt-32">
          {step === "complete" ? (
            <section className="px-2 py-2 lg:px-0 lg:py-0">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(540px,1.02fr)] lg:items-start">
                <div>
                  <div className="inline-flex h-[39px] items-center gap-2 rounded-xl border border-[#2A2B47] bg-[#1B1C3A] px-4 text-[0.8rem] text-white/90">
                    <span className="text-white/85">✦</span>
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
                            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#232544] text-white/80">
                              <svg
                                className={`h-4 w-4 transition-transform duration-300 ease-out ${open ? "rotate-180" : "rotate-0"}`}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </span>
                          </div>
                          <div
                            className={`grid transition-all duration-300 ease-out ${
                              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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
                      src="/rickroll.mp4"
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
                      className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[#17183B] bg-white text-[#17183B] opacity-0 shadow-[0_10px_28px_rgba(0,0,0,0.28)] transition-all duration-200 group-hover:opacity-100 hover:scale-[1.03]"
                      aria-label={completionVideoPaused ? "Play video" : "Pause video"}
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-[#2589D0]">
                        {completionVideoPaused ? (
                          <svg className="ml-0.5 h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M8 6.5v11l8-5.5-8-5.5z" />
                          </svg>
                        ) : (
                          <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M8 6h3v12H8zM13 6h3v12h-3z" />
                          </svg>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-14">
          <section className="w-full lg:w-[62%]">
            <div className="inline-flex h-[39px] items-center gap-2 rounded-xl border border-[#2A2B47] bg-[#191A35] px-4 text-[0.8rem] text-white/90">
              <span className="text-white/85">*</span>
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
              <div className="flex items-center rounded-xl border border-[#2A2B47] bg-[#191A35] px-3 py-2">
                {reviews.map((_, idx) => (
                  <span
                    key={idx}
                    className={`mx-[2px] rounded-full transition-all duration-200 ${
                      idx === currentReview ? "h-[5px] w-5 bg-white" : "h-[5px] w-[5px] bg-white/18"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => moveBelt("prev")}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2A2B47] bg-[#191A35] text-white/70 transition-colors duration-200 hover:text-white"
                  aria-label="Move reviews left"
                >
                  <span className="text-lg">←</span>
                </button>
                <button
                  type="button"
                  onClick={() => moveBelt("next")}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2A2B47] bg-[#191A35] text-white/70 transition-colors duration-200 hover:text-white"
                  aria-label="Move reviews right"
                >
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </section>

          <aside className="w-full rounded-[24px] border border-[#2A2B47] bg-[#1B1C3A] lg:sticky lg:top-28 lg:w-[38%] lg:self-stretch">
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
                  className={`flex items-center gap-2 transition-colors ${
                    step === "time"
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
                    <img src="/bmybrand-01.svg" alt="BMYBrand logo" className="h-8 w-auto" />
                  </div>

                  <h2 className="mt-5 text-[1.8rem] leading-tight text-white BenzinSemibold">
                    Book A Strategy Call With BMYBrand
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
                      className={`grid transition-all duration-500 ease-out ${
                        formUnlocked ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-1">
                          <div className="mb-2 text-[0.95rem] text-white BenzinSemibold">Phone Number</div>
                          <div className="flex rounded-xl border border-[#343556] bg-transparent text-white transition-colors focus-within:border-[#F45B25]">
                            <select
                              value={countryCode}
                              onChange={(e) => setCountryCode(e.target.value)}
                              className="border-r border-[#343556] bg-transparent px-4 text-sm text-white/70 outline-none"
                              aria-label="Country calling code"
                            >
                              <option value="+1" className="bg-[#1B1C3A] text-white">US +1</option>
                              <option value="+44" className="bg-[#1B1C3A] text-white">UK +44</option>
                              <option value="+61" className="bg-[#1B1C3A] text-white">AU +61</option>
                              <option value="+91" className="bg-[#1B1C3A] text-white">IN +91</option>
                              <option value="+92" className="bg-[#1B1C3A] text-white">PK +92</option>
                              <option value="+971" className="bg-[#1B1C3A] text-white">AE +971</option>
                            </select>
                            <input
                              type="tel"
                              placeholder={countryCode}
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full bg-transparent px-4 py-3 text-white placeholder:text-white/34 outline-none"
                            />
                          </div>
                        </div>

                        <div className="pt-1">
                          <div className="mb-2 text-[0.95rem] text-white BenzinSemibold">Company Name *</div>
                          <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full rounded-xl border border-[#343556] bg-transparent px-4 py-3 text-white outline-none transition-colors focus:border-[#F45B25]"
                          />
                        </div>

                        <div className="pt-1">
                          <div className="mb-2 text-[0.95rem] text-white BenzinSemibold">Website URL *</div>
                          <input
                            type="url"
                            value={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                            className="w-full rounded-xl border border-[#343556] bg-transparent px-4 py-3 text-white outline-none transition-colors focus:border-[#F45B25]"
                          />
                        </div>

                        <div className="pt-1">
                          <div className="mb-2 text-[0.95rem] text-white/90">Budget *</div>
                          <div className="space-y-2.5">
                            {["$5k-$10k", "$10k-$20k", "$20k-$35k", "$35k-$50k", "$50k+"].map((option, i) => (
                              <label key={option} htmlFor={`budget${i}`} className="flex items-center gap-2.5 text-sm text-white/70">
                                <input
                                  type="radio"
                                  name="budget"
                                  id={`budget${i}`}
                                  checked={budget === option}
                                  onChange={() => setBudget(option)}
                                  className="h-4 w-4 accent-[#F45B25]"
                                />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="pt-1">
                          <div className="mb-2 text-sm leading-6 text-white/70">
                            Please share anything that would help us prepare for your call. *
                          </div>
                          <textarea
                            rows={4}
                            value={callNotes}
                            onChange={(e) => setCallNotes(e.target.value)}
                            className="w-full resize-none rounded-xl border border-[#343556] bg-transparent px-4 py-3 text-white outline-none transition-colors focus:border-[#F45B25]"
                          />
                        </div>

                        <div className="pt-1">
                          <div className="mb-2 text-sm leading-6 text-white/70">
                            Please share anything that would help us prepare for your call. *
                          </div>
                          <div className="mb-2 text-[0.95rem] text-white BenzinSemibold">How did you find BMYBrand? *</div>
                          <div className="space-y-2.5">
                            {["Google Search", "AI Search", "Social Media", "Case Study", "Other"].map((sourceOption, i) => (
                              <label key={sourceOption} htmlFor={`source${i}`} className="flex items-center gap-2.5 text-sm text-white/70">
                                <input
                                  type="radio"
                                  name="source"
                                  id={`source${i}`}
                                  checked={source === sourceOption}
                                  onChange={() => setSource(sourceOption)}
                                  className="h-4 w-4 accent-[#F45B25]"
                                />
                                <span>{sourceOption}</span>
                              </label>
                            ))}
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
                      className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[1.15rem] text-white transition-all duration-200 BenzinSemibold ${
                        canContinue
                          ? "bg-gradient-to-r from-[#FF6A2B] to-[#FF8A3D] hover:brightness-110"
                          : "cursor-not-allowed bg-[#343556] text-white/45"
                      }`}
                    >
                      Continue
                      <span className="text-lg">→</span>
                    </button>
                  </form>

                  <div
                    className={`grid overflow-hidden transition-all duration-500 ease-out ${
                      formUnlocked ? "grid-rows-[0fr] opacity-0" : "mt-8 grid-rows-[1fr] opacity-100"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="text-[1.05rem] text-white BenzinSemibold">{monthLabel}</div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => changeCalendarMonth(-1)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#343556] text-white/28"
                            aria-label="Previous month"
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            onClick={() => changeCalendarMonth(1)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#343556] text-white/28"
                            aria-label="Next month"
                          >
                            →
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
                    <img src="/bmybrand-01.svg" alt="BMYBrand logo" className="h-8 w-auto" />
                  </div>

                  <h2 className="mt-5 text-[1.8rem] leading-tight text-white BenzinSemibold">
                    Schedule Your Strategy Call
                  </h2>

                  <div className="mt-4 space-y-3 text-[0.95rem] text-[#A4A8C9]">
                    <div className="flex items-center gap-2">
                      <span className="text-white/55">◷</span>
                      <span>30-minute strategy call</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTimezoneOpen((prev) => !prev)}
                      className="flex items-center gap-2 text-left"
                    >
                      <span className="text-white/55">◌</span>
                      <span>{selectedTimezone}</span>
                      <span className={`text-white/45 transition-transform ${timezoneOpen ? "rotate-180" : ""}`}>⌄</span>
                    </button>
                  </div>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      timezoneOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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
                          {filteredTimezones.map((option) => {
                            const active = option.label === selectedTimezone;
                            return (
                              <button
                                key={option.label}
                                type="button"
                                onClick={() => {
                                  setSelectedTimezone(option.label);
                                  setTimezoneOpen(false);
                                  setTimezoneQuery("");
                                }}
                                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                                  active ? "bg-[#303258] text-white" : "text-[#B5B9D8] hover:bg-[#262847] hover:text-white"
                                }`}
                              >
                                <span>{option.label}</span>
                                <span>{option.time}</span>
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
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#343556] text-white/28"
                          aria-label="Previous month"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={() => changeCalendarMonth(1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#343556] text-white/28"
                          aria-label="Next month"
                        >
                          →
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
                        const selectable = cell.inMonth && availableDays.includes(dayNumber);

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
                            className={`h-8 rounded-lg text-center transition-colors ${
                              active
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

                    <div className="mt-4 max-h-[15rem] space-y-3 overflow-x-hidden overflow-y-auto pr-2 [scrollbar-color:#B9BBCB_transparent] [scrollbar-width:thin]">
                      {baseTimeSlots.map((slot) => {
                        const slotLabel = formatTimeSlot(slot);
                        return (
                        <div
                          key={slot}
                          onMouseEnter={() => setHoveredSlot(slot)}
                          onMouseLeave={() => setHoveredSlot((current) => (current === slot ? null : current))}
                          className="flex w-full max-w-full items-center gap-3 overflow-hidden"
                        >
                          <button
                            type="button"
                            className={`flex h-12 min-w-0 items-center justify-center rounded-xl border text-sm transition-all duration-200 ${
                              hoveredSlot === slot
                                ? "w-[52%] border-[#343556] bg-transparent text-[#C7CAE2]"
                                : selectedTime === slot
                                  ? "w-full border-[#FF7A36] bg-[#252744] text-white"
                                  : "w-full border-[#343556] bg-transparent text-[#C7CAE2] hover:border-[#4A4D74] hover:text-white"
                            }`}
                            onClick={() => setSelectedTime(slot)}
                          >
                            {slotLabel}
                          </button>
                          {hoveredSlot === slot ? (
                            <button
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className="h-12 w-[48%] rounded-xl bg-gradient-to-r from-[#FF6A2B] to-[#FF8A3D] text-base text-white transition-all duration-200 BenzinSemibold"
                            >
                              Confirm
                            </button>
                          ) : null}
                        </div>
                      )})}
                    </div>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        selectedTime ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setStep("complete")}
                          className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#FF6A2B] to-[#FF8A3D] py-3.5 text-[1.05rem] text-white transition-all duration-200 hover:brightness-110 BenzinSemibold"
                        >
                          Finish
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

    </div>
  );
}
