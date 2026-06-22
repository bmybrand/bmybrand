import chromium from "@sparticuz/chromium";
import { chromium as playwrightChromium, type Browser } from "playwright-core";

export function normalizeTargetUrl(site: string) {
  if (!site) return "";
  if (/^https?:\/\//i.test(site)) return site;
  return `https://${site}`;
}

export async function launchAuditBrowser(): Promise<Browser> {
  if (process.env.VERCEL) {
    return playwrightChromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
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
