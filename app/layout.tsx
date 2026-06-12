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
  preload: true,
});

const siteUrl = "https://bmybrand.com";
const siteDescription =
  "BmyBrand helps businesses grow with smart digital solutions, from branding and websites to AI, marketing, commerce, and operations built for real-world impact.";
const socialPreviewUrl = `${siteUrl}/social-preview.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BmyBrand",
    template: "%s | BmyBrand",
  },
  description: siteDescription,
  applicationName: "BmyBrand",
  openGraph: {
    type: "website",
    siteName: "BmyBrand",
    title: "BmyBrand",
    description: siteDescription,
    images: [
      {
        url: socialPreviewUrl,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "BmyBrand - Crafting Brands. Building Websites. Powering Automation.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BmyBrand",
    description: siteDescription,
    images: [socialPreviewUrl],
  },
  verification: {
    google: "OOOMkcjhmDlUlRjdJW8tRj0skY1iReSP9ikpae1KIJ0",
    other: {
      "msvalidate.01": "E3EEC0899DE7E782C6CB3434BBEDBB4E",
    },
  },
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
