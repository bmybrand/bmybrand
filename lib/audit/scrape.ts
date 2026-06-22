import type { Page } from "playwright-core";
import {
  DEFAULT_PAGE_OPTIONS,
  launchAuditBrowser,
  normalizeTargetUrl,
} from "./browser";

const MAX_BODY_TEXT_CHARS = 14000;

export type ScrapedSite = {
  url: string;
  title: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  headings: { level: string; text: string }[];
  navLinks: string[];
  bodyText: string;
  signals: {
    hasContactForm: boolean;
    hasTestimonials: boolean;
    hasFaq: boolean;
    hasGoogleAnalytics: boolean;
    hasLlmsTxt: boolean;
  };
};

function truncateText(value: string, maxChars: number) {
  if (value.length <= maxChars) return value;
  return `${value.slice(0, maxChars)}…`;
}

async function extractPageData(page: Page): Promise<Omit<ScrapedSite, "url">> {
  const html = await page.content();

  const pageData = await page.evaluate(() => {
    const meta = (name: string) =>
      document.querySelector(`meta[name="${name}"]`)?.getAttribute("content") ??
      document.querySelector(`meta[property="${name}"]`)?.getAttribute("content") ??
      "";

    const headings = Array.from(document.querySelectorAll("h1, h2, h3"))
      .map((el) => ({
        level: el.tagName.toLowerCase(),
        text: (el.textContent ?? "").replace(/\s+/g, " ").trim(),
      }))
      .filter((item) => item.text.length > 0)
      .slice(0, 40);

    const navLinks = Array.from(
      document.querySelectorAll("nav a, header a, [role='navigation'] a"),
    )
      .map((el) => (el.textContent ?? "").replace(/\s+/g, " ").trim())
      .filter((text) => text.length > 0 && text.length < 80)
      .slice(0, 30);

    const bodyText = (document.body?.innerText ?? "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 16000);

    return {
      title: document.title ?? "",
      metaDescription: meta("description"),
      ogTitle: meta("og:title"),
      ogDescription: meta("og:description"),
      headings,
      navLinks: [...new Set(navLinks)],
      bodyText,
    };
  });

  const lowerHtml = html.toLowerCase();

  return {
    ...pageData,
    bodyText: truncateText(pageData.bodyText, MAX_BODY_TEXT_CHARS),
    signals: {
      hasContactForm:
        /<form[\s>]/i.test(html) &&
        /contact|email|message|inquiry/i.test(lowerHtml),
      hasTestimonials:
        /testimonial|client review|what (our )?clients say|case stud/i.test(
          lowerHtml,
        ),
      hasFaq: /faq|frequently asked/i.test(lowerHtml),
      hasGoogleAnalytics:
        /googletagmanager|gtag\(|google-analytics|G-[A-Z0-9]+/i.test(html),
      hasLlmsTxt: /llms\.txt/i.test(lowerHtml),
    },
  };
}

export async function scrapeWebsite(site: string): Promise<ScrapedSite> {
  const url = normalizeTargetUrl(site);
  if (!url) {
    throw new Error("Missing site URL.");
  }

  const browser = await launchAuditBrowser();

  try {
    const page = await browser.newPage(DEFAULT_PAGE_OPTIONS);
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(1800);

    const data = await extractPageData(page);
    return { url, ...data };
  } finally {
    await browser.close();
  }
}
