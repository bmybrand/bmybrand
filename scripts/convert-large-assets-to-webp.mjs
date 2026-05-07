import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const assets = [
  "public/bmyb-services-brand-brand-01.gif",
  "public/bmyb-global-frame6-01.png",
  "public/bmyb-services-brand-story-card-2-01.svg",
  "public/bmyb-global-frame6-01.svg",
  "public/bmyb-services-brand-story-card-3-01.svg",
  "public/bmyb-services-servicefaq-01.svg",
  "public/bmyb-logo-group-1597883284-01.svg",
  "public/bmyb-logo-group15-01.svg",
  "public/bmyb-services-service-banner-01.svg",
  "public/bmyb-global-container-02.svg",
  "public/bmyb-services-servicefaq2-01.svg",
  "public/bmyb-logo-client-logo5-svg-01.svg",
  "public/bmyb-services-ai-aioverview-01.svg",
  "public/bmyb-global-backgroundfh-01.svg",
  "public/404.svg",
  "public/bmyb-global-doc-01.svg",
  "public/bmyb-case-jiggy-jerky-jiggy-01.svg",
  "public/bmyb-global-fullimage-01.svg",
  "public/bmyb-global-technlogicalbear-01.svg",
  "public/bmyb-global-backgroundfh-02.svg",
  "public/bmyb-logo-universal-01.svg",
  "public/bmyb-case-epci-epci-01.svg",
  "public/bmyb-case-fountain-hills-fountainhill-01.svg",
  "public/bmyb-case-fountain-hills-fountainhills-01.svg",
  "public/bmyb-global-about-hero-01.svg",
  "public/bmyb-case-pink-me-pinkme-01.svg",
  "public/bmyb-industries-healthcare-healthcare-compliance-01.svg",
  "public/bmyb-logo-client-logo9-svg-fill-01.svg",
  "public/bmyb-global-container-01.svg",
  "public/bmyb-logo-group-1597883418-01.svg",
  "public/bmyb-global-layer-1-1-01.svg",
  "public/bmyb-logo-vector-07.svg",
  "public/bmyb-logo-client-logo6-svg-01.svg",
  "public/bmyb-global-popupbear-01.svg",
  "public/bmyb-industries-healthcare-healthcareservies2-01.svg",
  "public/bmyb-global-techbear-01.svg",
  "public/bmyb-industries-healthcare-healthcare-brand-system-01.svg",
  "public/bmyb-global-cta-character-1-01.svg",
  "public/bmyb-logo-vector-06.svg",
  "public/bmyb-global-heathcareservices-01.svg",
];

const quality = 82;

async function convertAsset(inputPath) {
  const extension = path.extname(inputPath).toLowerCase();
  const outputPath = inputPath.replace(/\.[^.]+$/, ".webp");
  const sourceStats = await fs.stat(inputPath);

  const transformer =
    extension === ".gif"
      ? sharp(inputPath, { animated: true })
      : sharp(inputPath);

  await transformer.webp({ quality }).toFile(outputPath);

  const outputStats = await fs.stat(outputPath);
  return {
    inputPath,
    outputPath,
    sourceBytes: sourceStats.size,
    outputBytes: outputStats.size,
  };
}

function formatMb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

const results = [];

for (const asset of assets) {
  try {
    results.push(await convertAsset(asset));
  } catch (error) {
    results.push({
      inputPath: asset,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

for (const result of results) {
  if ("error" in result) {
    console.error(`FAIL ${result.inputPath} -> ${result.error}`);
    continue;
  }

  console.log(
    `OK ${result.inputPath} -> ${result.outputPath} (${formatMb(
      result.sourceBytes,
    )} -> ${formatMb(result.outputBytes)})`,
  );
}
