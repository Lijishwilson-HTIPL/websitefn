"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { useJobRoles } from "@/hooks/useJobRoles";

export default function OpenRolesSection() {
  const { roles, loading } = useJobRoles();
  const hasRoles = roles.length > 0;

  return (
    <>
      {/* Roles We Typically Hire For — hidden when no roles */}
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
                {roles.map((role) => (
                  <div key={role.id} className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                    <h3 className="text-base font-bold text-slate-900 mb-3">{role.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{role.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {role.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Open Roles */}
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
                <div
                  key={role.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-slate-50 border border-slate-100 px-6 py-5 shadow-sm"
                >
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{role.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="w-3 h-3" />
                        {role.location}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {role.type}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/careers/apply?role=${encodeURIComponent(role.title)}`}
                    className="inline-flex items-center gap-2 rounded-md border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-100 transition-colors whitespace-nowrap"
                  >
                    View & Apply
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
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
                  We are always interested in hearing from strong AI engineers, life science domain experts, and implementation consultants who share our values. Send us your background and the kind of work you want to do.
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
