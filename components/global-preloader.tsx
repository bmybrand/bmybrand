"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const MIN_PRELOADER_MS = 1200;
const ROUTE_TRANSITION_MS = 1200;
const NAVIGATION_PRELOADER_EVENT = "bmy:navigation-preloader-start";
const PRELOADER_FADE_MS = 220;

export default function GlobalPreloader({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/brief-forms")) {
    return <>{children}</>;
  }

  return <PreloaderScreen>{children}</PreloaderScreen>;
}

function PreloaderScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentHash, setCurrentHash] = useState('');
  const routeKey = `${pathname ?? ""}?${searchParams?.toString() ?? ""}${currentHash}`;
  const previousRouteKeyRef = useRef(routeKey);
  const fadeTimerRef = useRef<number | null>(null);

  const finishLoading = () => {
    setIsLoading(false);

    if (fadeTimerRef.current) {
      window.clearTimeout(fadeTimerRef.current);
    }

    fadeTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      fadeTimerRef.current = null;
    }, PRELOADER_FADE_MS);
  };

  const startLoading = () => {
    if (fadeTimerRef.current) {
      window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }

    setIsVisible(true);
    setIsLoading(true);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      finishLoading();
    }, MIN_PRELOADER_MS);

    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      if (fadeTimerRef.current) {
        window.clearTimeout(fadeTimerRef.current);
      }
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    const syncHash = () => {
      setCurrentHash(window.location.hash || '');
    };

    syncHash();
    window.addEventListener('hashchange', syncHash);

    return () => {
      window.removeEventListener('hashchange', syncHash);
    };
  }, []);

  useEffect(() => {
    setCurrentHash(window.location.hash || '');
  }, [pathname, searchParams]);

  useLayoutEffect(() => {
    if (previousRouteKeyRef.current === routeKey) return;

    previousRouteKeyRef.current = routeKey;

    startLoading();

    const timer = window.setTimeout(() => {
      finishLoading();
    }, ROUTE_TRANSITION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [routeKey]);

  useEffect(() => {
    const handleNavigationPreloader = () => {
      startLoading();
    };

    window.addEventListener(NAVIGATION_PRELOADER_EVENT, handleNavigationPreloader);

    return () => {
      window.removeEventListener(NAVIGATION_PRELOADER_EVENT, handleNavigationPreloader);
    };
  }, []);

  return (
    <>
      {children}

      {isVisible ? (
        <div
          aria-label="Page loading"
          className={`fixed inset-0 z-[2147483647] flex items-center justify-center bg-black transition-opacity duration-300 ${
            isLoading ? "opacity-100" : "opacity-0"
          }`}
          role="status"
        >
          <video
            autoPlay
            className="h-full w-full object-cover"
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/bmyb-global-preloader-01.webm" type="video/webm" />
          </video>
        </div>
      ) : null}
    </>
  );
}
