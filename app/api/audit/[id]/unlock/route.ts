import { NextRequest, NextResponse } from "next/server";
import {
  getAuditReport,
  saveAuditLeadToLeadsTable,
  unlockAuditReport,
} from "@/lib/audit/store";
import { triggerAuditPdfArchive } from "@/lib/trigger-audit-pdf-upload";
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

    try {
      await saveAuditLeadToLeadsTable({
        name,
        email,
        company,
        siteUrl: existing.siteUrl,
        auditId: id,
      });
    } catch (leadError) {
      console.error("Failed to save audit lead after unlock", {
        id,
        detail: leadError instanceof Error ? leadError.message : "Unknown error",
      });
    }

    void triggerAuditPdfArchive(id).catch((error) => {
      console.error("Failed to archive audit PDF to Google Drive", {
        id,
        detail: error instanceof Error ? error.message : "Unknown error",
      });
    });

    return NextResponse.json(unlocked);
  } catch (error) {
    console.error("Failed to unlock audit report", {
      id,
      detail: error instanceof Error ? error.message : "Unknown error",
    });

    return NextResponse.json(
      {
        error:
          error instanceof Error && error.message
            ? error.message
            : "Failed to unlock audit report.",
      },
      { status: 500 },
    );
  }
}
