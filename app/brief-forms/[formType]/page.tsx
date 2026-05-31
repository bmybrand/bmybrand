import { notFound } from "next/navigation";
import {
  getInvoicePortalOrigin,
  isBriefFormSlug,
} from "@/lib/invoice-portal-origin";

type PageProps = {
  params: Promise<{ formType: string }>;
};

export default async function BriefFormEmbedPage({ params }: PageProps) {
  const { formType } = await params;

  if (!isBriefFormSlug(formType)) {
    notFound();
  }

  const origin = getInvoicePortalOrigin();

  if (!origin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold text-neutral-900">
            Brief form is not configured
          </h1>
          <p className="mt-3 text-sm text-neutral-600">
            On the <strong>bmybrand</strong> Vercel project, set{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">
              INVOICE_PORTAL_ORIGIN
            </code>{" "}
            to your invoice CRM URL (for example{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">
            https://invoice-887q.vercel.app
            </code>
            ), then redeploy.
          </p>
        </div>
      </main>
    );
  }

  const src = `${origin}/brief-forms/${formType}`;

  return (
    <iframe
      src={src}
      title="Client brief form"
      className="h-[100dvh] w-full border-0 bg-white"
      allow="clipboard-write"
    />
  );
}
