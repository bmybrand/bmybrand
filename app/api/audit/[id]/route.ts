import { NextRequest, NextResponse } from "next/server";
import { getAuditReport } from "@/lib/audit/store";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Missing audit ID." }, { status: 400 });
  }

  try {
    const report = await getAuditReport(id);

    if (!report) {
      return NextResponse.json({ error: "Audit report not found." }, { status: 404 });
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("Failed to fetch audit report", {
      id,
      detail: error instanceof Error ? error.message : "Unknown error",
    });

    return NextResponse.json(
      { error: "Failed to load audit report." },
      { status: 500 },
    );
  }
}
