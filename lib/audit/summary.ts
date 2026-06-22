const MAX_SUMMARY_LINES = 5;
const MAX_SUMMARY_CHARS = 380;

export function normalizeAuditSummary(summary: string): string {
  const trimmed = summary.trim().replace(/\s+/g, " ");
  if (!trimmed) return "";

  const explicitLines = trimmed
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  let result =
    explicitLines.length > 1
      ? explicitLines.slice(0, MAX_SUMMARY_LINES).join("\n")
      : (trimmed.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) ?? [trimmed])
          .map((sentence) => sentence.trim())
          .slice(0, MAX_SUMMARY_LINES)
          .join(" ");

  if (result.length > MAX_SUMMARY_CHARS) {
    const shortened = result.slice(0, MAX_SUMMARY_CHARS);
    const lastSpace = shortened.lastIndexOf(" ");
    result = `${shortened.slice(0, lastSpace > 0 ? lastSpace : MAX_SUMMARY_CHARS).trim()}…`;
  }

  return result;
}
