import { NextRequest, NextResponse } from "next/server";
import { generateAuditReport } from "@/lib/audit/generate";
import { scrapeWebsite } from "@/lib/audit/scrape";
import { createAuditReport } from "@/lib/audit/store";
import {
  isAllowedAuditUrl,
  normalizeAuditSiteInput,
} from "@/lib/audit/validate";
import { getClientIp, rateLimit, rateLimitHeaders } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

const AUDIT_RATE_LIMIT = {
  limit: 3,
  windowMs: 60 * 60 * 1000,
};

type AuditRequestBody = {
  site?: string;
  industry?: string;
  websiteGoal?: string;
};

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateResult = await rateLimit({
    key: `audit:${ip}`,
    ...AUDIT_RATE_LIMIT,
  });

  if (!rateResult.success) {
    return NextResponse.json(
      { error: "Too many audit requests. Please try again later." },
      { status: 429, headers: rateLimitHeaders(rateResult) },
    );
  }

  let body: AuditRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const site = normalizeAuditSiteInput(body.site ?? "");
  const industry = (body.industry ?? "").trim();
  const websiteGoal = (body.websiteGoal ?? "").trim();

  if (!site) {
    return NextResponse.json({ error: "Site URL is required." }, { status: 400 });
  }

  if (!isAllowedAuditUrl(site)) {
    return NextResponse.json({ error: "Invalid or disallowed site URL." }, { status: 400 });
  }

  if (!industry || !websiteGoal) {
    return NextResponse.json(
      { error: "Industry and website goal are required." },
      { status: 400 },
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI is not configured." },
      { status: 500 },
    );
  }

  try {
    const scraped = await scrapeWebsite(site);
    const report = await generateAuditReport(scraped, industry, websiteGoal);
    const auditId = await createAuditReport({
      siteUrl: site,
      industry,
      websiteGoal,
      report,
    });

    return NextResponse.json(
      {
        auditId,
        siteUrl: site,
        industry,
        websiteGoal,
        overallScore: report.overallScore,
        issueCount: report.issueCount,
        summary: report.summary,
        previewSections: report.sections.slice(0, 2),
      },
      { headers: rateLimitHeaders(rateResult) },
    );
  } catch (error) {
    console.error("Audit generation failed", {
      site,
      detail: error instanceof Error ? error.message : "Unknown error",
    });

    const message = error instanceof Error ? error.message : "Audit generation failed.";
    const isScrapeError = /launch|navigat|timeout|browser/i.test(message);
    const isAuthError = /401|incorrect api key|invalid api key|authentication/i.test(message);

    if (isAuthError) {
      return NextResponse.json(
        {
          error:
            "OpenAI rejected the API key. Create a new key at platform.openai.com/api-keys, update OPENAI_API_KEY in .env.local, and restart npm run dev.",
        },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { error: isScrapeError ? "Unable to access the website for analysis." : message },
      { status: isScrapeError ? 502 : 500 },
    );
  }
}
