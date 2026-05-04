"use client";

import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/config";

export interface JobRole {
  id: number;
  title: string;
  type: string;
  location: string;
  description: string;
  tags: string[];
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
