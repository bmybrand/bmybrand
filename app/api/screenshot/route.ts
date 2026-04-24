import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import { chromium as playwrightChromium, type Browser } from "playwright-core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeTargetUrl(site: string) {
  if (!site) return "";
  if (/^https?:///i.test(site)) return site;
  return `https://${site}`;
}

async function launchScreenshotBrowser() {
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
        }`
      );
    }
  }

  try {
    return await playwrightChromium.launch({
      headless: true,
    });
  } catch (error) {
    launchErrors.push(`bundled Chromium: ${error instanceof Error ? error.message : "Unknown error"}`);
  }

  try {
    return await playwrightChromium.launch({
      channel: "chrome",
      headless: true,
    });
  } catch (error) {
    launchErrors.push(`Chrome channel: ${error instanceof Error ? error.message : "Unknown error"}`);
  }

  throw new Error(`Unable to launch a browser for screenshots. ${launchErrors.join(" | ")}`);
}

export async function GET(request: NextRequest) {
  const site = request.nextUrl.searchParams.get("site") ?? "";
  const normalizedSite = normalizeTargetUrl(site);
  let currentStep = "initializing";

  if (!normalizedSite) {
    return NextResponse.json({ error: "Missing site parameter." }, { status: 400 });
  }

  let browser: Browser | null = null;

  try {
    currentStep = "launching-browser";
    browser = await launchScreenshotBrowser();

    currentStep = "creating-page";
    const page = await browser.newPage({
      viewport: { width: 1600, height: 1200 },
      deviceScaleFactor: 1,
      locale: "en-US",
      timezoneId: "America/Denver",
      ignoreHTTPSErrors: true,
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    });

    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    currentStep = "navigating";
    await page.goto(normalizedSite, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    currentStep = "waiting-for-settle";
    await page.waitForTimeout(1800);

    currentStep = "capturing-screenshot";
    const imageBuffer = await page.screenshot({
      type: "jpeg",
      quality: 82,
      fullPage: true,
      animations: "disabled",
    });

    return new NextResponse(new Uint8Array(imageBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Screenshot request failed", {
      site: normalizedSite,
      step: currentStep,
      detail: error instanceof Error ? error.message : "Unknown error",
    });

    return NextResponse.json(
      {
        error: "Screenshot request failed.",
        step: currentStep,
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
