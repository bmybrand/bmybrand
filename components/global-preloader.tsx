"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const MIN_PRELOADER_MS = 3000;
const ROUTE_TRANSITION_MS = 3000;
const NAVIGATION_PRELOADER_EVENT = "bmy:navigation-preloader-start";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname ?? ""}?${searchParams?.toString() ?? ""}`;
  const previousRouteKeyRef = useRef(routeKey);
  const suppressNextRouteTransitionRef = useRef(false);
  const manualTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, MIN_PRELOADER_MS);

    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  useLayoutEffect(() => {
    if (previousRouteKeyRef.current === routeKey) return;

    previousRouteKeyRef.current = routeKey;

    if (suppressNextRouteTransitionRef.current) {
      suppressNextRouteTransitionRef.current = false;
      return;
    }

    setIsLoading(true);

    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, ROUTE_TRANSITION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [routeKey]);

  useEffect(() => {
    const handleNavigationPreloader = () => {
      if (manualTimerRef.current) {
        window.clearTimeout(manualTimerRef.current);
      }

      suppressNextRouteTransitionRef.current = true;
      setIsLoading(true);

      manualTimerRef.current = window.setTimeout(() => {
        setIsLoading(false);
        manualTimerRef.current = null;
      }, ROUTE_TRANSITION_MS);
    };

    window.addEventListener(NAVIGATION_PRELOADER_EVENT, handleNavigationPreloader);

    return () => {
      if (manualTimerRef.current) {
        window.clearTimeout(manualTimerRef.current);
      }
      window.removeEventListener(NAVIGATION_PRELOADER_EVENT, handleNavigationPreloader);
    };
  }, []);

  return (
    <>
      {children}

      {isLoading ? (
        <div
          aria-label="Page loading"
          className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black"
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
            <source src="/bmyb-global-preloader-01.mp4" type="video/mp4" />
          </video>
        </div>
      ) : null}
    </>
  );
}
