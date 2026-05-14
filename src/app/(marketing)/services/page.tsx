import type { Metadata } from "next";
import Link from "next/link";
import { Users, FlaskConical, Server, ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "AI staff augmentation, life science AI product development, and IT managed services for LIMS, eQMS and CSA built for pharma, biotech, and regulated labs.",
};

const services = [
  {
    icon: Users,
    title: "Staff Augmentation with AI Developers",
    href: "/services/staff-augmentation",
    tagline: "Extend your engineering capacity",
    description:
      "Experienced AI/ML professionals who integrate into your team, respect your processes, and deliver from day one. We close the gap between AI capability and regulated environment readiness.",
    highlights: [
      "LLMs, RAG, agentic AI, data engineering & MLOps",
      "GxP awareness and documentation culture from day one",
      "Full-time, fractional, project-based, or dedicated pod",
      "Fast onboarding into validated system environments",
    ],
    accent: "sky",
  },
  {
    icon: FlaskConical,
    title: "Life Science AI Development",
    href: "/services/ai-product-development",
    tagline: "Build with compliance by design",
    description:
      "We design and build intelligent applications for R&D, quality, lab, and clinical workflows grounded in compliance, designed for real users, and built to integrate with your existing systems.",
    highlights: [
      "Document intelligence, knowledge assistants, decision-support",
      "Traceability and explainability as architecture requirements",
      "Validation planning aligned with your QA team",
      "Integrates with LIMS, eQMS, SharePoint, Veeva, and more",
    ],
    accent: "indigo",
  },
  {
    icon: Server,
    title: "IT Managed Services – LIMS, eQMS & CSA",
    href: "/services/managed-services",
    tagline: "Sustain and support with confidence",
    description:
      "Implementation, validation, and managed services for LIMS and eQMS platforms. CSA-aligned, AI-enhanced, and structured to keep your systems in a validated, compliant state.",
    highlights: [
      "LIMS and eQMS implementation, integration & migration",
      "Risk-based CSA: planning, execution, documentation",
      "Managed services with defined SLAs and monitoring",
      "AI-assisted documentation and intelligent search",
    ],
    accent: "emerald",
  },
];

const accentMap: Record<string, string> = {
  sky: "bg-sky-50 border-sky-100",
  indigo: "bg-indigo-50 border-indigo-100",
  emerald: "bg-emerald-50 border-emerald-100",
};

const iconBgMap: Record<string, string> = {
  sky: "bg-sky-100",
  indigo: "bg-indigo-100",
  emerald: "bg-emerald-100",
};

const iconColorMap: Record<string, string> = {
  sky: "text-sky-600",
  indigo: "text-indigo-600",
  emerald: "text-emerald-600",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="Our Services"
        h1="Technology Services Built for Life Sciences"
        subheadline="Three integrated capabilities. One focused partner. Zero compromise on compliance."
        paragraph="We offer three distinct but deeply connected service lines all designed specifically for the operational, regulatory, and technical realities of life science organizations."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "See Our Approach", href: "/approach" }}
      />

      {/* Services detail */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            const isEven = idx % 2 === 0;
            return (
              <div
                key={svc.title}
                className={`rounded-2xl border p-8 lg:p-10 ${accentMap[svc.accent]}`}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start ${!isEven ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${iconBgMap[svc.accent]}`}>
                      <Icon className={`w-6 h-6 ${iconColorMap[svc.accent]}`} />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      {svc.tagline}
                    </p>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 leading-snug">
                      {svc.title}
                    </h2>
                    <p className="text-base text-slate-600 leading-relaxed mb-6">
                      {svc.description}
                    </p>
                    <Link
                      href={svc.href}
                      className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
                      Key Highlights
                    </h3>
                    <ul className="space-y-3">
                      {svc.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700 leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How we work together */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
            Flexible by Design
          </p>
          <h2 className="text-3xl font-bold text-slate-900 mb-5">
            Our Services Work Together or Independently
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
            Some clients come to us for one specific need. Others engage us across all three service lines as their organization matures. We are designed to flex with you not to force a packaged solution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/approach"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900 transition-colors"
            >
              See Our Approach
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition-colors"
            >
              Talk to Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Not Sure Where to Start?"
        subtext="Tell us about your challenge and your environment. We'll recommend the right approach honestly, without a hard sell."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "Learn About Our Industries Focus", href: "/industries" }}
      />
    </>
  );
}
