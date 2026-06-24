import chromium from "@sparticuz/chromium";
import { chromium as playwrightChromium, type Browser } from "playwright-core";

// Matches @sparticuz/chromium@147.0.2 — downloaded on serverless instead of bundled bin/.
const DEFAULT_CHROMIUM_PACK_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v147.0.2/chromium-v147.0.2-pack.x64.tar";

function isServerlessRuntime() {
  return Boolean(
    process.env.VERCEL ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.AWS_EXECUTION_ENV,
  );
}

function resolveChromiumPackUrl() {
  const configured = process.env.CHROMIUM_REMOTE_EXEC_PATH?.trim();
  if (configured?.startsWith("https://")) {
    return configured;
  }

  return DEFAULT_CHROMIUM_PACK_URL;
}

export function normalizeTargetUrl(site: string) {
  if (!site) return "";
  if (/^https?:\/\//i.test(site)) return site;
  return `https://${site}`;
}

export async function launchAuditBrowser(): Promise<Browser> {
  if (isServerlessRuntime()) {
    const packUrl = resolveChromiumPackUrl();

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
