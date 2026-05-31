import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@sparticuz/chromium", "playwright-core"],
  outputFileTracingIncludes: {
    "/api/screenshot": ["./node_modules/@sparticuz/chromium/bin/**"],
    "/api/screenshot/route": ["./node_modules/@sparticuz/chromium/bin/**"],
  },
};

export default nextConfig;
