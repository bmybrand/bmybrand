import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import { chromium as playwrightChromium } from "playwright-core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeTargetUrl(site: string) {
  if (!site) return "";
  if (/^https?:\/\//i.test(site)) return site;
  return `https://${site}`;
}

export async function GET(request: NextRequest) {
  const site = request.nextUrl.searchParams.get("site") ?? "";
  const normalizedSite = normalizeTargetUrl(site);

  if (!normalizedSite) {
    return NextResponse.json({ error: "Missing site parameter." }, { status: 400 });
  }

  let browser: Awaited<ReturnType<typeof playwrightChromium.launch>> | null = null;

  try {
    const isVercel = Boolean(process.env.VERCEL);

    browser = await playwrightChromium.launch(
      isVercel
        ? {
            args: chromium.args,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
          }
        : {
            channel: "chrome",
            headless: true,
          }
    );

    const page = await browser.newPage({
      viewport: { width: 1600, height: 1200 },
      deviceScaleFactor: 1,
      locale: "en-US",
      timezoneId: "America/Denver",
    });

    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    await page.goto(normalizedSite, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    await page.waitForTimeout(1800);

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
    return NextResponse.json(
      {
        error: "Screenshot request failed.",
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
