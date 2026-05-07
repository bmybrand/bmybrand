import fs from "node:fs/promises";
import { chromium } from "playwright";
import sharp from "sharp";

const assets = [
  "public/bmyb-services-brand-story-card-2-01.svg",
  "public/bmyb-global-frame6-01.svg",
  "public/bmyb-services-brand-story-card-3-01.svg",
  "public/bmyb-services-servicefaq-01.svg",
  "public/bmyb-logo-group-1597883284-01.svg",
];

const browser = await chromium.launch({ headless: true });

try {
  for (const asset of assets) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } });

    try {
      const svgMarkup = await fs.readFile(asset, "utf8");
      await page.setContent(
        `<html><body style="margin:0;background:transparent;">${svgMarkup}</body></html>`,
        { waitUntil: "domcontentloaded" },
      );

      await page.waitForSelector("svg", { timeout: 120000 });

      const dimensions = await page.evaluate(() => {
        const svg = document.querySelector("svg");
        if (!(svg instanceof SVGSVGElement)) {
          throw new Error("SVG element not found");
        }

        const bounds = svg.getBBox();
        const width =
          svg.viewBox.baseVal.width || svg.width.baseVal.value || bounds.width;
        const height =
          svg.viewBox.baseVal.height || svg.height.baseVal.value || bounds.height;

        return {
          width,
          height,
        };
      });

      await page.setViewportSize({
        width: Math.max(1, Math.ceil(dimensions.width)),
        height: Math.max(1, Math.ceil(dimensions.height)),
      });

      const element = page.locator("svg");
      const pngBuffer = await element.screenshot({ type: "png" });
      const outputPath = asset.replace(/\.svg$/, ".webp");
      const sourceStats = await fs.stat(asset);

      await sharp(pngBuffer).webp({ quality: 82 }).toFile(outputPath);

      const outputStats = await fs.stat(outputPath);
      console.log(
        `OK ${asset} -> ${outputPath} (${(sourceStats.size / 1024 / 1024).toFixed(
          2,
        )} MB -> ${(outputStats.size / 1024 / 1024).toFixed(2)} MB)`,
      );
    } catch (error) {
      console.error(`FAIL ${asset} -> ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
