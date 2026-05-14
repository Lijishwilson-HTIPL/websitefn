import type { Metadata } from "next";
import { ShieldCheck, AlertTriangle, Lock } from "lucide-react";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Compliance & Quality Commitment",
  description:
    "How Hephzibah Technologies approaches GxP, data integrity, ALCOA+, and CSA in every engagement building trust through disciplined, documented delivery.",
};

const compliancePrinciples = [
  {
    title: "ALCOA+ as a Design Lens",
    body: "Data that our systems generate or process should be Attributable, Legible, Contemporaneous, Original, and Accurate with the additional ALCOA+ properties of Complete, Consistent, Enduring, and Available. We design data flows and audit trails with these principles as requirements.",
  },
  {
    title: "GxP Awareness Across Our Team",
    body: "Our engineers, consultants, and delivery managers are familiar with the meaning and implications of GxP environments GMP, GLP, GCP. They understand what a validated system means in practice, and they work accordingly.",
  },
  {
    title: "Risk-Based Thinking",
    body: "Not every system requires the same level of validation rigor. We apply a risk-based approach directing validation effort where it matters most, based on patient safety impact, data criticality, and system complexity.",
  },
  {
    title: "Documentation as a Deliverable",
    body: "In our engagements, documentation is not a cleanup task at the end of a project. Requirements, design records, test scripts, and validation summaries are produced as the work progresses not assembled retrospectively.",
  },
];

const notClaims = [
  {
    claim: "Not a regulatory consultancy",
    detail: "We do not provide guidance on regulatory strategy or submission content.",
  },
  {
    claim: "Cannot guarantee regulatory outcomes",
    detail: "We do not guarantee regulatory approvals or inspection outcomes.",
  },
  {
    claim: "Not auditors",
    detail: "We can prepare documentation that supports your audits, but we do not conduct third-party audits.",
  },
  {
    claim: "Do not replace qualified personnel",
    detail: "Our AI tools assist and support. Qualified decisions remain with your team always.",
  },
];

const securityItems = [
  "Mutual NDAs and data protection agreements as standard before engagement",
  "Minimum-necessary data access with full access logging",
  "No use of client data for model training or third-party service improvement",
  "Support for on-premise, private cloud, and hybrid deployments where data cannot leave your environment",
  "Alignment with your information security policies and vendor risk assessment processes",
  "IP ownership remains with the client for all custom-developed deliverables",
];

export default function CompliancePage() {
  return (
    <>
      <PageHero
        badge="Compliance & Quality"
        h1="Compliance Is Not a Service Line. It Is How We Operate."
        subheadline="Every engagement at Hephzibah Technologies is shaped by the regulatory and quality expectations of the life science environments we serve."
        paragraph="We are a technology company, not a regulatory consultancy. We do not provide regulatory advice or guarantee compliance outcomes. What we do provide is a delivery model, a documentation culture, and a technical approach designed to support your quality and compliance position at every stage of every engagement."
        primaryCta={{ label: "Talk to Us About Your Compliance Environment", href: "/contact" }}
        variant="light"
      />

      {/* Principles */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Our Compliance Principles
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              The Principles That Shape Our Work
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {compliancePrinciples.map((p) => (
              <div key={p.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-7">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-sky-100 mb-5">
                  <ShieldCheck className="w-5 h-5 text-sky-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-3">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we are not */}
      <section className="bg-amber-50 py-16 lg:py-20 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              <p className="text-sm font-semibold text-amber-700 uppercase tracking-wider">
                Honest About What We Do and Do Not Do
              </p>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Clarity Builds More Trust Than Broad Claims
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              We believe clarity here builds more trust than broad claims.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notClaims.map((item) => (
                <div key={item.claim} className="rounded-xl border border-amber-200 bg-white p-5">
                  <p className="text-sm font-bold text-amber-800 mb-1">{item.claim}</p>
                  <p className="text-sm text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base text-slate-700 leading-relaxed">
              What we are: a technology partner who takes compliance seriously, works transparently alongside your quality function, and builds systems that your QA team can stand behind.
            </p>
          </div>
        </div>
      </section>

      {/* Security & Governance */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
                Security & Data Governance
              </p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">
                How We Protect Your Data and Your Intellectual Property
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Working with regulated life science data requires more than technical competence. It requires governance discipline.
              </p>
              <div className="space-y-3">
                {securityItems.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
                    <Lock className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 p-8 lg:sticky lg:top-24">
              <ShieldCheck className="w-10 h-10 text-sky-400 mb-5" />
              <h3 className="text-xl font-bold text-white mb-4">
                Our Regulatory Alignment Statement
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                We operate in environments subject to FDA, EMA, and ISO 17025 expectations. Our teams are familiar with the practical implications of these frameworks for software development and IT operations.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                We do not make guarantees about regulatory approval outcomes.No technology partner can and those who claim otherwise should be viewed with caution.
              </p >
    <p className="text-sm text-slate-300 leading-relaxed font-medium">
      What we guarantee: that we will work transparently, document thoroughly, and support your quality function from the first day to the last.
    </p>
            </div >
          </div >
        </div >
      </section >

    <CTABanner
      heading="Want to Discuss Your Compliance Requirements Before Engaging?"
      subtext="We welcome compliance-first conversations. Tell us about your regulatory context, your current systems, and your key constraints. We'll tell you plainly whether and how we can help."
      primaryCta={{ label: "Book a Compliance-Focused Call", href: "/contact" }}
      secondaryCta={{ label: "Read About Our Approach", href: "/approach" }}
    />
    </>
  );
}
