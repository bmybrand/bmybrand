export type AuditSectionId =
  | "brand-positioning"
  | "competitive-differentiation"
  | "target-audience-alignment"
  | "website-structure-navigation"
  | "trust-credibility-signals"
  | "brand-consistency"
  | "conversion-growth-strategy"
  | "seo-aeo-optimization"
  | "technical-metadata-health"
  | "analytics-tracking-setup";

export const AUDIT_SECTION_IDS: AuditSectionId[] = [
  "brand-positioning",
  "competitive-differentiation",
  "target-audience-alignment",
  "website-structure-navigation",
  "trust-credibility-signals",
  "brand-consistency",
  "conversion-growth-strategy",
  "seo-aeo-optimization",
  "technical-metadata-health",
  "analytics-tracking-setup",
];

export const AUDIT_SECTION_TITLES: Record<AuditSectionId, string> = {
  "brand-positioning": "Brand Positioning",
  "competitive-differentiation": "Competitive Differentiation",
  "target-audience-alignment": "Target Audience Alignment",
  "website-structure-navigation": "Website Structure & Navigation",
  "trust-credibility-signals": "Trust & Credibility Signals",
  "brand-consistency": "Brand Consistency",
  "conversion-growth-strategy": "Conversion & Growth Strategy",
  "seo-aeo-optimization": "SEO & AEO Optimization",
  "technical-metadata-health": "Technical & Metadata Health",
  "analytics-tracking-setup": "Analytics & Tracking Setup",
};

export type AuditSection = {
  id: AuditSectionId;
  title: string;
  score: number;
  effectivePractices: string[];
  improvementOpportunities: string[];
  aiInterpretation?: string;
};

export type AuditReport = {
  overallScore: number;
  issueCount: number;
  summary: string;
  sections: AuditSection[];
};

export type AuditReportRow = {
  id: string;
  site_url: string;
  industry: string | null;
  website_goal: string | null;
  overall_score: number;
  issue_count: number;
  summary: string | null;
  report: AuditReport;
  unlocked: boolean;
  lead_name: string | null;
  lead_email: string | null;
  lead_company: string | null;
  created_at: string;
};

export type AuditApiResponse = {
  auditId: string;
  siteUrl: string;
  industry: string | null;
  websiteGoal: string | null;
  overallScore: number;
  issueCount: number;
  summary: string;
  unlocked: boolean;
  report: AuditReport;
};
