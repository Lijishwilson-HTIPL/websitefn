"use client";

import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/config";

export interface JobRole {
  id: string; // Job Opening name in HRMS (e.g. HR-OPP-2026-00001)
  title: string;
  type: string;
  location: string;
  description: string;       // plain text — for excerpts / meta
  descriptionHtml: string;   // raw HTML from HRMS editor — render with dangerouslySetInnerHTML
  tags: string[];
  lower_range: number | null;
  upper_range: number | null;
  currency: string | null;
}

export function useJobRoles() {
  const [roles, setRoles] = useState<JobRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/job-roles`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setRoles(data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { roles, loading };
}
