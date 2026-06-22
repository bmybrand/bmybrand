import { NextRequest, NextResponse } from "next/server";
import {
  getAuditReport,
  saveAuditLeadToLeadsTable,
  unlockAuditReport,
} from "@/lib/audit/store";
import { isValidEmail } from "@/lib/audit/validate";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type UnlockBody = {
  name?: string;
  email?: string;
  company?: string;
};

export async function POST(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Missing audit ID." }, { status: 400 });
  }

  let body: UnlockBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();

  if (!name || !email || !company) {
    return NextResponse.json(
      { error: "Name, email, and company are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  try {
    const existing = await getAuditReport(id);

    if (!existing) {
      return NextResponse.json({ error: "Audit report not found." }, { status: 404 });
    }

    if (existing.unlocked) {
      return NextResponse.json(existing);
    }

    const unlocked = await unlockAuditReport(id, { name, email, company });

    if (!unlocked) {
      return NextResponse.json({ error: "Audit report not found." }, { status: 404 });
    }

    await saveAuditLeadToLeadsTable({
      name,
      email,
      company,
      siteUrl: existing.siteUrl,
      auditId: id,
    });

    return NextResponse.json(unlocked);
  } catch (error) {
    console.error("Failed to unlock audit report", {
      id,
      detail: error instanceof Error ? error.message : "Unknown error",
    });

    return NextResponse.json(
      { error: "Failed to unlock audit report." },
      { status: 500 },
    );
  }
}
