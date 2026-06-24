import chromium from "@sparticuz/chromium";
import { chromium as playwrightChromium, type Browser } from "playwright-core";

// Matches @sparticuz/chromium@147.0.2 — used on Vercel where local bin/ is not bundled.
const DEFAULT_CHROMIUM_PACK_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v147.0.2/chromium-v147.0.2-pack.x64.tar";

export function normalizeTargetUrl(site: string) {
  if (!site) return "";
  if (/^https?:\/\//i.test(site)) return site;
  return `https://${site}`;
}

export async function launchAuditBrowser(): Promise<Browser> {
  if (process.env.VERCEL) {
    const packUrl =
      process.env.CHROMIUM_REMOTE_EXEC_PATH ?? DEFAULT_CHROMIUM_PACK_URL;

    return playwrightChromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(packUrl),
      headless: true,
    });
  }

  const launchErrors: string[] = [];
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

  if (executablePath) {
    try {
      return await playwrightChromium.launch({
        executablePath,
        headless: true,
      });
    } catch (error) {
      launchErrors.push(
        `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  }

  try {
    return await playwrightChromium.launch({ headless: true });
  } catch (error) {
    launchErrors.push(
      `bundled Chromium: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }

  try {
    return await playwrightChromium.launch({
      channel: "chrome",
      headless: true,
    });
  } catch (error) {
    launchErrors.push(
      `Chrome channel: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }

  throw new Error(
    `Unable to launch a browser for audit. ${launchErrors.join(" | ")}`,
  );
}

export const DEFAULT_PAGE_OPTIONS = {
  viewport: { width: 1600, height: 1200 },
  deviceScaleFactor: 1,
  locale: "en-US",
  timezoneId: "America/Denver",
  ignoreHTTPSErrors: true,
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
} as const;
