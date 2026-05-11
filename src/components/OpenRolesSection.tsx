"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, ChevronDown, ChevronUp, IndianRupee } from "lucide-react";
import { useJobRoles, type JobRole } from "@/hooks/useJobRoles";

// ── Salary ──────────────────────────────────────────────────────────────────

function formatSalary(lower: number | null, upper: number | null, currency: string | null) {
  if (!lower && !upper) return null;
  const symbol = !currency || currency === "INR" ? "₹" : `${currency} `;
  const fmt = (n: number) => n.toLocaleString("en-IN");
  if (lower && upper) return `${symbol}${fmt(lower)} – ${symbol}${fmt(upper)} per year`;
  if (lower) return `From ${symbol}${fmt(lower)} per year`;
  return `Up to ${symbol}${fmt(upper!)} per year`;
}

// ── HTML description (content from HRMS editor, trusted internal source) ────

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

  // Fallback to plain text if no HTML
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

// ── Expandable role row in "Open Roles" list ─────────────────────────────────

function RoleRow({ role }: { role: JobRole }) {
  const [open, setOpen] = useState(false);
  const salary = formatSalary(role.lower_range, role.upper_range, role.currency);

  return (
    <div className="rounded-xl bg-slate-50 border border-slate-100 shadow-sm overflow-hidden">
      {/* Header row — always visible */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5">
        <button
          type="button"
          className="text-left flex-1 min-w-0"
          onClick={() => setOpen((v) => !v)}
        >
          <h3 className="text-base font-bold text-slate-900 leading-snug">{role.title}</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="w-3 h-3" />
              {role.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              {role.type}
            </span>
            {salary && (
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-700">
                <IndianRupee className="w-3 h-3" />
                {salary}
              </span>
            )}
          </div>
        </button>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            {open ? (
              <><ChevronUp className="w-3.5 h-3.5" /> Hide details</>
            ) : (
              <><ChevronDown className="w-3.5 h-3.5" /> View details</>
            )}
          </button>
          <Link
            href={`/careers/apply?role=${encodeURIComponent(role.id)}`}
            className="inline-flex items-center gap-2 rounded-md border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-100 transition-colors whitespace-nowrap"
          >
            Apply
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Expanded detail panel */}
      {open && (
        <div className="border-t border-slate-100 bg-white px-6 py-6 space-y-5">
          {/* Tags */}
          {role.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {role.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <JobDescription html={role.descriptionHtml} plain={role.description} />

          {/* Salary */}
          {salary && (
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 inline-flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-sm font-semibold text-emerald-800">{salary}</span>
            </div>
          )}

          {/* Apply CTA */}
          <div className="pt-1">
            <Link
              href={`/careers/apply?role=${encodeURIComponent(role.id)}`}
              className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition-colors"
            >
              Apply for This Role
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function OpenRolesSection() {
  const { roles, loading } = useJobRoles();
  const hasRoles = roles.length > 0;

  return (
    <>
      {/* Roles We Typically Hire For — cards with full HTML description */}
      {(loading || hasRoles) && (
        <section className="bg-slate-50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
                Who We Hire
              </p>
              <h2 className="text-3xl font-bold text-slate-900">Roles We Typically Hire For</h2>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-1/2 mb-3" />
                    <div className="h-3 bg-slate-100 rounded w-full mb-2" />
                    <div className="h-3 bg-slate-100 rounded w-4/5" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                {roles.map((role) => {
                  const salary = formatSalary(role.lower_range, role.upper_range, role.currency);
                  return (
                    <div key={role.id} className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm flex flex-col gap-4">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 mb-1">{role.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <MapPin className="w-3 h-3" />{role.location}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <Clock className="w-3 h-3" />{role.type}
                          </span>
                        </div>
                        <JobDescription html={role.descriptionHtml} plain={role.description} />
                      </div>

                      <div className="mt-auto space-y-3">
                        {salary && (
                          <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                            <IndianRupee className="w-3.5 h-3.5" />{salary}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {role.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Open Roles — expandable rows */}
      <section id="open-roles" className="bg-white py-16 lg:py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Current Openings
            </p>
            <h2 className="text-3xl font-bold text-slate-900">Open Roles</h2>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl bg-slate-50 border border-slate-100 px-6 py-5 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
                  <div className="h-3 bg-slate-100 rounded w-1/4" />
                </div>
              ))}
            </div>
          ) : !hasRoles ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-8 py-10 text-center">
              <p className="text-base font-bold text-amber-800 mb-2">No open positions at the moment</p>
              <p className="text-sm text-amber-700 mb-6 max-w-md mx-auto">
                We don't have any active openings right now, but we're always interested in hearing from talented people. Send us a speculative application and we'll be in touch.
              </p>
              <Link
                href="/careers/apply"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
              >
                Send a Speculative Application <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {roles.map((role) => (
                <RoleRow key={role.id} role={role} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Speculative Application + CTA — only when open roles exist */}
      {!loading && hasRoles && (
        <>
          <section className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-2xl bg-sky-600 px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-sky-200 mb-2">Not Seeing a Fit?</p>
                  <h3 className="text-xl font-extrabold text-white mb-2">Send a Speculative Application</h3>
                  <p className="text-sm text-sky-100 max-w-xl leading-relaxed">
                    If you bring strong AI/ML, LIMS, validation, or life sciences domain expertise, we want to hear from you — even if no open role matches right now.
                  </p>
                </div>
                <Link
                  href="/careers/apply"
                  className="shrink-0 inline-flex items-center gap-2 bg-white text-sky-700 font-bold text-sm px-6 py-3 rounded-xl hover:bg-sky-50 transition-colors shadow-md"
                >
                  Apply Now →
                </Link>
              </div>
            </div>
          </section>

          <section className="bg-slate-900 py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative rounded-2xl bg-gradient-to-br from-sky-600 to-sky-800 px-8 py-12 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_60%)] pointer-events-none" />
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 relative">Don't See the Right Role?</h2>
                <p className="text-sky-100 text-lg max-w-2xl mx-auto mb-8 relative">
                  We are always interested in hearing from strong AI engineers, life science domain experts, and implementation consultants who share our values.
                </p>
                <div className="flex flex-wrap justify-center gap-4 relative">
                  <Link
                    href="/careers/apply"
                    className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-sky-700 hover:bg-sky-50 transition-colors shadow-md"
                  >
                    Send a Speculative Application <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    Learn More About Our Work
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
