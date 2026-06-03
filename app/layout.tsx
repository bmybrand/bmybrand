import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Suspense } from "react";
import localFont from "next/font/local";
import GlobalPreloader from "@/components/global-preloader";
import "./globals.css";

const benzinBold = localFont({
  src: "../public/fonts/benzinbold.ttf",
  variable: "--font-benzin-bold",
  display: "swap",
  preload: true,
});

const benzinSemibold = localFont({
  src: "../public/fonts/benzinsemibold.ttf",
  variable: "--font-benzin-semibold",
  display: "swap",
  preload: true,
});

const benzinRegular = localFont({
  src: "../public/fonts/benzinregular.ttf",
  variable: "--font-benzin-regular",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "BMYBrand",
  description: "BMYBrand is a design system and component library built with React and Next.js, providing a collection of reusable UI components and design guidelines for building consistent and visually appealing web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${benzinBold.variable} ${benzinSemibold.variable} ${benzinRegular.variable} antialiased`}
        style={
          {
            "--font-geist-sans": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            "--font-geist-mono": "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
          } as CSSProperties
        }
      >
        <Suspense fallback={children}>
          <GlobalPreloader>{children}</GlobalPreloader>
        </Suspense>
      </body>
    </html>
  );
}
