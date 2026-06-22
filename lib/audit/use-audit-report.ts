"use client";

import { useEffect, useState } from "react";
import type { AuditApiResponse } from "@/types/audit";

type UseAuditReportResult = {
  data: AuditApiResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useAuditReport(auditId: string | undefined): UseAuditReportResult {
  const [data, setData] = useState<AuditApiResponse | null>(null);
  const [loading, setLoading] = useState(Boolean(auditId));
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!auditId) {
      setLoading(false);
      setError("Missing audit ID.");
      return;
    }

    let cancelled = false;

    async function fetchReport() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/audit/${auditId}`);
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload.error ?? "Failed to load audit report.");
        }

        if (!cancelled) {
          setData(payload as AuditApiResponse);
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Failed to load audit report.",
          );
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchReport();

    return () => {
      cancelled = true;
    };
  }, [auditId, version]);

  return {
    data,
    loading,
    error,
    refetch: () => setVersion((value) => value + 1),
  };
}
