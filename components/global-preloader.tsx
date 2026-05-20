"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MIN_PRELOADER_MS = 2600;

export default function GlobalPreloader({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/brief-forms")) {
    return <>{children}</>;
  }

  return <PreloaderScreen key={pathname}>{children}</PreloaderScreen>;
}

function PreloaderScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

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
            <source src="/animation3.mp4" type="video/mp4" />
          </video>
        </div>
      ) : null}
    </>
  );
}
