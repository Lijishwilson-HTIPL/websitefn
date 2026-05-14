import ScheduleManager from "@/components/ScheduleManager";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Schedule a Meeting | Hephzibah Technologies",
  description: "Book a consultation or technical support session with our team.",
};

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="flex h-[400px] items-center justify-center">
            <div className="text-slate-400">Loading scheduler...</div>
          </div>
        }>
          <ScheduleManager />
        </Suspense>
      </div>
    </main>
  );
}
