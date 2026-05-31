"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const MIN_PRELOADER_MS = 3000;
const ROUTE_TRANSITION_MS = 3000;

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
  const previousPathnameRef = useRef(pathname);

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
    if (previousPathnameRef.current === pathname) return;

    previousPathnameRef.current = pathname;
    setIsLoading(true);

    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, ROUTE_TRANSITION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <>
      {!isLoading ? children : null}

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
