import type { Metadata } from "next";
import { Suspense } from "react";
import ApplyPageContent from "./ApplyPageContent";

export const metadata: Metadata = {
  title: "Apply | Careers at Hephzibah Technologies",
  description:
    "Apply to an open role at Hephzibah Technologies. We build AI and technology solutions for life sciences.",
};

export default function ApplyPage() {
  return (
    <Suspense fallback={null}>
      <ApplyPageContent />
    </Suspense>
  );
}
