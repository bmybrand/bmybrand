import { NextRequest, NextResponse } from "next/server";
import type { Browser } from "playwright-core";
import { DEFAULT_PAGE_OPTIONS, launchAuditBrowser } from "@/lib/audit/browser";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  let browser: Browser | null = null;
  let currentStep = "initializing";

  if (!id?.trim()) {
    return NextResponse.json({ error: "Missing audit id." }, { status: 400 });
  }

  try {
    currentStep = "launching-browser";
    browser = await launchAuditBrowser();

    currentStep = "creating-page";
    const page = await browser.newPage(DEFAULT_PAGE_OPTIONS);

    currentStep = "building-report-url";
    const requestUrl = new URL(request.url);
    const reportUrl = `${requestUrl.origin}/grow-my-business/report/complete?auditId=${encodeURIComponent(id)}`;

    currentStep = "opening-report";
    await page.goto(reportUrl, {
      waitUntil: "networkidle",
      timeout: 45000,
    });

    currentStep = "rendering-print-layout";
    await page.emulateMedia({ media: "print" });
    await page.waitForTimeout(600);

    currentStep = "generating-pdf";
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "12mm",
        right: "10mm",
        bottom: "12mm",
        left: "10mm",
      },
    });

    const fileName = `audit-report-${id.slice(0, 8)}.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PDF generation failed", {
      auditId: id,
      step: currentStep,
      detail: error instanceof Error ? error.message : "Unknown error",
    });

    return NextResponse.json(
      {
        error: "Failed to generate PDF.",
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
