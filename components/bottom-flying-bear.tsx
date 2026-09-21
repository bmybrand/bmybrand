"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function BottomFlyingBear() {
  const bearRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<number | null>(null);
  const movementTimeoutRef = useRef<number | null>(null);
  const previousScrollYRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateBear = () => {
      frameRef.current = null;

      const scrollableDistance = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const progress =
        scrollableDistance > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollableDistance))
          : 0;
      const visible = window.scrollY > 48 && scrollableDistance > 0;
      const bearHeight = bearRef.current?.offsetHeight ?? 160;
      const chatLauncher = document.querySelector<HTMLButtonElement>(
        'button[aria-label="Open chat"], button[aria-label="Close chat"]',
      );
      const lowerBoundary =
        chatLauncher?.getBoundingClientRect().top ?? window.innerHeight - 20;
      const startTop = 80;
      const endTop = Math.max(
        startTop,
        lowerBoundary - bearHeight - 85,
      );
      const availableTravel = endTop - startTop;
      const scrollDelta = window.scrollY - previousScrollYRef.current;

      if (Math.abs(scrollDelta) > 1) {
        const scrollingDown = scrollDelta > 0;
        setIsScrollingDown((current) =>
          current === scrollingDown ? current : scrollingDown,
        );
      }
      previousScrollYRef.current = window.scrollY;

      bearRef.current?.style.setProperty(
        "--bear-travel",
        `${progress * availableTravel}px`,
      );
      bearRef.current?.style.setProperty(
        "--bear-dull-progress",
        `${progress * 100}%`,
      );
      setScrollProgress(Math.round(progress * 100));
      setIsVisible((current) => (current === visible ? current : visible));
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateBear);
    };

    const handleScroll = () => {
      setIsMoving(true);
      if (movementTimeoutRef.current !== null) {
        window.clearTimeout(movementTimeoutRef.current);
      }
      movementTimeoutRef.current = window.setTimeout(() => {
        setIsMoving(false);
        movementTimeoutRef.current = null;
      }, 160);
      requestUpdate();
    };

    updateBear();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      if (movementTimeoutRef.current !== null) {
        window.clearTimeout(movementTimeoutRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      ref={bearRef}
      type="button"
      aria-label={`Back to top — ${scrollProgress}% scrolled`}
      className="bottom-flying-bear"
      data-direction={isScrollingDown ? "down" : "up"}
      data-moving={isMoving}
      data-visible={isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={scrollToTop}
    >
      <span className="bottom-flying-bear__trail" aria-hidden>
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index} className="bottom-flying-bear__spark" />
        ))}
      </span>
      <span className="bottom-flying-bear__art" aria-hidden>
        <Image
          src="/bmyb-global-superherobearsky-01.svg"
          alt=""
          width={742}
          height={392}
          className="bottom-flying-bear__image bottom-flying-bear__image--bright"
        />
        <span className="bottom-flying-bear__bright-mask">
          <Image
            src="/bmyb-global-superherobearsky-01.svg"
            alt=""
            width={742}
            height={392}
            className="bottom-flying-bear__image bottom-flying-bear__image--dull"
          />
        </span>
      </span>
      <span className="bottom-flying-bear__progress-orbit" aria-hidden>
        <span className="bottom-flying-bear__progress">
          {scrollProgress}%
        </span>
      </span>
    </button>
  );
}
