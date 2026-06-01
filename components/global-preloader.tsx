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
  const [currentHash, setCurrentHash] = useState('');
  const routeKey = `${pathname ?? ""}?${searchParams?.toString() ?? ""}${currentHash}`;
  const previousRouteKeyRef = useRef(routeKey);

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
      setIsLoading(true);
    };

    window.addEventListener(NAVIGATION_PRELOADER_EVENT, handleNavigationPreloader);

    return () => {
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
