import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Life Sciences Industries Focus | Pharma, Biotech, Medtech & Labs",
  description:
    "Hephzibah Technologies serves pharma, biotech, medtech, diagnostics, CROs, and regulated labs with AI engineering, AI development, and IT managed services.",
};

const segments = [
  {
    emoji: "💊",
    title: "Pharmaceutical & Biotech",
    anchor: "pharma-biotech",
    challenges: [
      "Scaling digital and AI capabilities during clinical development without compromising data integrity",
      "Managing large, disparate datasets across R&D, clinical, manufacturing, and quality systems",
      "Keeping validated systems current while supporting rapid organizational change",
      "Finding AI engineers who understand GxP without a lengthy onboarding ramp",
    ],
    augmentation: "Embed experienced AI and data engineers into your development, manufacturing IT, or digital teams with GxP literacy from day one.",
    product: "Build intelligent tools for document management, protocol authoring support, deviation analysis, and manufacturing intelligence.",
    managed: "Implement and sustain LIMS and eQMS platforms with CSA-aligned validation and ongoing support.",
  },
  {
    emoji: "🔬",
    title: "Medtech & Diagnostics",
    anchor: "medtech-diagnostics",
    challenges: [
      "Software as a Medical Device (SaMD) development requiring a security- and quality-first approach",
      "Integration of AI into diagnostic workflows with full traceability and post-market obligations in mind",
      "Managing software change control and validation and related standards",
      "Connecting lab instruments, diagnostic platforms, and IT systems without data integrity gaps",
    ],
    augmentation: "Software engineers with device software context, including embedded, connectivity, and cloud-connected diagnostic applications.",
    product: "Decision-support tools, image or signal analysis aids, and AI-assisted quality workflows designed with traceability built in.",
    managed: "Integration and validation support for laboratory informatics and quality platforms in regulated device environments.",
  },
  {
    emoji: "🧪",
    title: "CROs & CDMOs",
    anchor: "cro-cdmo",
    challenges: [
      "Managing client data across multiple sponsor environments with strict segregation requirements",
      "Scaling technical capacity rapidly to meet new contracts without permanent headcount growth",
      "Implementing and operating LIMS and study management platforms across multiple sites or client configurations",
      "Demonstrating data integrity and audit-readiness to current and prospective clients",
    ],
    augmentation: "Flexible, rapid onboarding of AI and data engineers to support study informatics, data pipelines, and platform development.",
    product: "Intelligent study management tools, automated data QC, and client-facing reporting applications.",
    managed: "Multi-client LIMS configuration and management, study archival, and validation documentation services.",
  },
  {
    emoji: "⚗️",
    title: "Regulated & Quality Labs",
    anchor: "regulated-labs",
    challenges: [
      "LIMS implementation or modernization with full data integrity compliance (21 CFR Part 11, ALCOA+)",
      "Instrument integration, sample management, and laboratory workflow optimization",
      "Managing qualification and validation of analytical software",
      "Reducing manual effort in results review, report generation, and specification management",
    ],
    augmentation: "LIMS and data engineering specialists with lab informatics background.",
    product: "AI-assisted results review, anomaly flagging, SOP knowledge assistants, and CoA automation.",
    managed: "Full-service LIMS managed services including configuration, validation, and day-to-day operational support.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        badge="Industries"
        h1="Deep Expertise in Life Sciences Across Every Stage of Development and Operations"
        subheadline="We don't serve every industry. We focus on life sciences because the regulatory, operational, and technology challenges in this sector require genuine depth, not broad generalism."
        paragraph="From early-stage biotech to global pharma, from CRO informatics teams to in-house quality labs we understand the distinct pressures your organization faces. Our focus on a single industry vertical means our engineers, consultants, and delivery teams arrive with context, not just credentials."
        primaryCta={{ label: "Find Your Segment", href: "#pharma-biotech" }}
        secondaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
      />

      {/* Segment cards */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {segments.map((seg, idx) => (
            <div
              key={seg.title}
              id={seg.anchor}
              className="scroll-mt-20 rounded-2xl border border-slate-100 bg-slate-50 p-8 lg:p-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">{seg.emoji}</span>
                <h2 className="text-2xl font-bold text-slate-900">{seg.title}</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Challenges */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                    Typical Challenges
                  </h3>
                  <ul className="space-y-3">
                    {seg.challenges.map((c) => (
                      <li key={c} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 leading-relaxed">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How we help */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                    How We Help
                  </h3>

                  <div className="rounded-xl bg-white border border-sky-100 p-5">
                    <p className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">
                      Staff Augmentation
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">{seg.augmentation}</p>
                  </div>

                  <div className="rounded-xl bg-white border border-indigo-100 p-5">
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
                      AI Development
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">{seg.product}</p>
                  </div>

                  <div className="rounded-xl bg-white border border-emerald-100 p-5">
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
                      IT Managed Services
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">{seg.managed}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why focus section */}
      <section className="bg-slate-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-3">
              Our Commitment to Focus
            </p>
            <h2 className="text-3xl font-bold text-white mb-5">
              Why We Stay Focused on Life Sciences
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              We made a deliberate choice to work exclusively in life sciences and regulated environments. It means we accumulate knowledge that is directly reusable across every client.
            </p>
            <p className="text-base text-slate-500 leading-relaxed mb-8">
              Our engineers understand your terminology. Our consultants anticipate your audit questions. Our delivery leads know what "change control" means in practice not just in theory. That focus is our value proposition. We are not trying to be everything to everyone. We are trying to be the most reliable technology partner you have ever worked with in this industry.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:border-slate-400 hover:text-white transition-colors"
              >
                About Our Company
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-400 transition-colors"
              >
                Talk to Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Don't See Your Exact Segment?"
        subtext="Our work spans the full life science ecosystem including hospital pharmacies, clinical diagnostics networks, and academic research organizations operating under GxP or ISO frameworks. If you operate in a regulated environment, we almost certainly have relevant experience."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "Tell Us About Your Environment", href: "/contact" }}
      />
    </>
  );
}
