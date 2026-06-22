import { openai } from "@/lib/openai/client";
import {
  AUDIT_SECTION_IDS,
  AUDIT_SECTION_TITLES,
  type AuditReport,
  type AuditSectionId,
} from "@/types/audit";
import type { ScrapedSite } from "./scrape";
import { normalizeAuditSummary } from "./summary";

const AUDIT_MODEL = "gpt-4.1-mini-2025-04-14";

const auditJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["overallScore", "issueCount", "summary", "sections"],
  properties: {
    overallScore: { type: "integer", minimum: 0, maximum: 100 },
    issueCount: { type: "integer", minimum: 0, maximum: 50 },
    summary: { type: "string", description: "Executive summary only: max 5 short sentences, under 350 characters total. No section-by-section recap." },
    sections: {
      type: "array",
      minItems: 10,
      maxItems: 10,
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "id",
          "title",
          "score",
          "effectivePractices",
          "improvementOpportunities",
          "aiInterpretation",
        ],
        properties: {
          id: { type: "string", enum: AUDIT_SECTION_IDS },
          title: { type: "string" },
          score: { type: "integer", minimum: 0, maximum: 10 },
          effectivePractices: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
            maxItems: 5,
          },
          improvementOpportunities: {
            type: "array",
            items: { type: "string" },
            minItems: 0,
            maxItems: 5,
          },
          aiInterpretation: { type: "string" },
        },
      },
    },
  },
} as const;

function buildSystemPrompt() {
  const sectionList = AUDIT_SECTION_IDS.map(
    (id) => `- ${id}: ${AUDIT_SECTION_TITLES[id]}`,
  ).join("\n");

  return `You are Brandsight, an expert B2B website auditor. Analyze the provided website content and produce a structured audit report.

Score each section 0-10 (integer). Overall score is 0-100 reflecting holistic website health.
issueCount should reflect the number of meaningful improvement opportunities across all sections (typically 3-15).

Sections (return all 10 in this order):
${sectionList}

Guidelines:
- Base findings only on the scraped content provided; do not invent specific claims you cannot infer.
- Tailor recommendations to the user's industry and website goal.
- effectivePractices: what the site does well (1-5 bullet points per section).
- improvementOpportunities: actionable fixes (0-5 per section; more for low-scoring sections).
- For brand-positioning, include aiInterpretation: a 1-2 sentence summary of how AI interprets their positioning.
- Use the site's actual business context from the content, not generic placeholder copy.
- Write in clear, professional English suitable for a client-facing report.
- summary: A brief executive overview only (max 5 short sentences, under 350 characters). Highlight overall health and top 1-2 priorities. Do NOT walk through every audit section in the summary.`;
}

function buildUserPrompt(
  scraped: ScrapedSite,
  industry: string,
  websiteGoal: string,
) {
  return `Website URL: ${scraped.url}
Industry: ${industry}
Website goal: ${websiteGoal}

Page title: ${scraped.title}
Meta description: ${scraped.metaDescription}
OG title: ${scraped.ogTitle}
OG description: ${scraped.ogDescription}

Headings:
${scraped.headings.map((h) => `${h.level}: ${h.text}`).join("\n")}

Navigation links:
${scraped.navLinks.join(", ")}

Signals detected:
- Contact form: ${scraped.signals.hasContactForm}
- Testimonials: ${scraped.signals.hasTestimonials}
- FAQ: ${scraped.signals.hasFaq}
- Google Analytics: ${scraped.signals.hasGoogleAnalytics}
- llms.txt reference: ${scraped.signals.hasLlmsTxt}

Visible page text:
${scraped.bodyText}`;
}

function normalizeSection(section: AuditReport["sections"][number]) {
  const id = section.id as AuditSectionId;
  return {
    ...section,
    id,
    title: AUDIT_SECTION_TITLES[id] ?? section.title,
    score: Math.max(0, Math.min(10, Math.round(section.score))),
    effectivePractices: section.effectivePractices.slice(0, 5),
    improvementOpportunities: section.improvementOpportunities.slice(0, 5),
    aiInterpretation: section.aiInterpretation?.trim() || undefined,
  };
}

export async function generateAuditReport(
  scraped: ScrapedSite,
  industry: string,
  websiteGoal: string,
): Promise<AuditReport> {
  const response = await openai.chat.completions.create({
    model: AUDIT_MODEL,
    temperature: 0.4,
    max_tokens: 4096,
    messages: [
      { role: "system", content: buildSystemPrompt() },
      {
        role: "user",
        content: buildUserPrompt(scraped, industry, websiteGoal),
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "audit_report",
        strict: true,
        schema: auditJsonSchema,
      },
    },
  });

  const raw = response.choices[0]?.message?.content;
  if (!raw) {
    throw new Error("OpenAI returned an empty audit response.");
  }

  const parsed = JSON.parse(raw) as AuditReport;

  const sections = AUDIT_SECTION_IDS.map((id) => {
    const found = parsed.sections.find((s) => s.id === id);
    if (!found) {
      return {
        id,
        title: AUDIT_SECTION_TITLES[id],
        score: 0,
        effectivePractices: ["Insufficient data to evaluate this area."],
        improvementOpportunities: [
          "Provide more visible content on the homepage for a thorough assessment.",
        ],
      };
    }
    return normalizeSection(found);
  });

  return {
    overallScore: Math.max(0, Math.min(100, Math.round(parsed.overallScore))),
    issueCount: Math.max(0, Math.round(parsed.issueCount)),
    summary: normalizeAuditSummary(parsed.summary),
    sections,
  };
}
