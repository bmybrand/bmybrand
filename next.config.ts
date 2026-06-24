import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  serverExternalPackages: ["@sparticuz/chromium", "playwright-core"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap", "lucide-react", "react-icons"],
  },
  outputFileTracingIncludes: {
    "/api/screenshot": ["node_modules/@sparticuz/chromium/bin/**"],
    "/api/screenshot/route": ["node_modules/@sparticuz/chromium/bin/**"],
    "/api/audit": ["node_modules/@sparticuz/chromium/bin/**"],
    "/api/audit/route": ["node_modules/@sparticuz/chromium/bin/**"],
  },
  async headers() {
    return [
      {
        source: "/:path*.(avif|webp|png|jpg|jpeg|svg|mp4|woff|woff2|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
