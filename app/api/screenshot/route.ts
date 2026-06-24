import { NextRequest, NextResponse } from "next/server";
import type { Browser } from "playwright-core";
import {
  DEFAULT_PAGE_OPTIONS,
  launchAuditBrowser,
  normalizeTargetUrl,
} from "@/lib/audit/browser";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

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
    browser = await launchAuditBrowser();

    currentStep = "creating-page";
    const page = await browser.newPage(DEFAULT_PAGE_OPTIONS);

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
      { status: 500 },
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
