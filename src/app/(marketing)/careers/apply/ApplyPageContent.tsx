"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Linkedin, MapPin, Clock, IndianRupee, ChevronDown, ChevronUp } from "lucide-react";
import JobApplicationForm from "@/components/JobApplicationForm";
import { useJobRoles } from "@/hooks/useJobRoles";

function JobDescription({ html, plain }: { html: string; plain: string }) {
  const [expanded, setExpanded] = useState(false);

  if (html) {
    return (
      <div>
        <div
          className={`prose prose-sm max-w-none text-slate-600 prose-headings:text-slate-800 prose-headings:font-bold prose-li:marker:text-sky-500 prose-strong:text-slate-800 ${
            !expanded ? "line-clamp-6" : ""
          }`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline focus:outline-none"
        >
          {expanded ? (
            <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
          ) : (
            <><ChevronDown className="w-3.5 h-3.5" /> Read full description</>
          )}
        </button>
      </div>
    );
  }

  const words = plain.split(/\s+/);
  const truncated = !expanded && words.length > 50;
  return (
    <p className="text-sm text-slate-600 leading-relaxed">
      {truncated ? words.slice(0, 50).join(" ") + "…" : plain}
      {words.length > 50 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="ml-1.5 text-sky-600 font-semibold hover:underline focus:outline-none"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </p>
  );
}

function formatSalary(lower: number | null, upper: number | null, currency: string | null) {
  if (!lower && !upper) return null;
  const symbol = !currency || currency === "INR" ? "₹" : `${currency} `;
  const fmt = (n: number) => n.toLocaleString("en-IN");
  if (lower && upper) return `${symbol}${fmt(lower)} – ${symbol}${fmt(upper)} per year`;
  if (lower) return `From ${symbol}${fmt(lower)} per year`;
  return `Up to ${symbol}${fmt(upper!)} per year`;
}

const hiringSteps = [
  { step: "1", title: "Application Review", desc: "A senior team member reads every application personally — not a keyword filter." },
  { step: "2", title: "Screening Call (30 min)", desc: "We discuss your background, the role, and mutual fit. No surprise technical questions." },
  { step: "3", title: "Technical / Domain Assessment", desc: "A practical exercise appropriate to the role you are applying for." },
  { step: "4", title: "Final Interview", desc: "A conversation with a senior team member and a look at the kind of work you would do." },
];

export default function ApplyPageContent() {
  const searchParams = useSearchParams();
  const rawRole = searchParams.get("role") ?? "";
  const defaultRoleId = rawRole ? decodeURIComponent(rawRole) : "";

  const { roles } = useJobRoles();
  const [selectedRoleId, setSelectedRoleId] = useState(defaultRoleId);
  const details = roles.find((r) => r.id === selectedRoleId) ?? null;
  const selectedRole = details?.title ?? "";

  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/careers#open-roles"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Open Roles
          </Link>
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 mb-6">
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">Apply</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
              {selectedRole || "Apply to Join Our Team"}
            </h1>
            {details && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm text-slate-400">
                  <MapPin className="w-3.5 h-3.5" />
                  {details.location}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {details.type}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
                  Your Application
                </p>
                <h2 className="text-2xl font-bold text-slate-900">Application Form</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Fill in the fields below. Your LinkedIn and resume are required to complete the application.
                </p>
              </div>
              <JobApplicationForm defaultRoleId={defaultRoleId} onRoleChange={setSelectedRoleId} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* Role description */}
              {details && (
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-7">
                  <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
                    Job Description
                  </p>
                  <div className="mb-4">
                    <JobDescription html={details.descriptionHtml} plain={details.description} />
                  </div>
                  {formatSalary(details.lower_range, details.upper_range, details.currency) && (
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 mb-4">
                      <IndianRupee className="w-3.5 h-3.5 shrink-0" />
                      {formatSalary(details.lower_range, details.upper_range, details.currency)}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {details.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-4">
                  Our Hiring Process
                </p>
                <div className="space-y-5">
                  {hiringSteps.map((s) => (
                    <div key={s.step} className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-600 text-white text-xs font-bold shrink-0">
                        {s.step}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 mb-1">{s.title}</p>
                        <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-7">
                <p className="text-sm font-semibold text-slate-900 mb-4">Questions?</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  If you have questions before applying, reach out directly.
                </p>
                <div className="space-y-3">
                  <a href="mailto:contact@hephzibahtech.in" className="flex items-center gap-3 text-sm text-slate-600 hover:text-sky-600 transition-colors">
                    <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                    contact@hephzibahtech.in
                  </a>
                  <a href="https://www.linkedin.com/company/hephzibah-technologies-in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-600 hover:text-sky-600 transition-colors">
                    <Linkedin className="w-4 h-4 text-sky-500 shrink-0" />
                    LinkedIn — Hephzibah Technologies
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-xs text-slate-500 mb-3">Looking for a different role?</p>
                <Link href="/careers#open-roles" className="text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors">
                  View all open roles →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
