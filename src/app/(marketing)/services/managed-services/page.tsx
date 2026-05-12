import type { Metadata } from "next";
import { CheckCircle2, FlaskConical, FileText, Server, ShieldCheck, Bot } from "lucide-react";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "LIMS, eQMS & CSA Managed Services for Life Sciences",
  description:
    "Implementation, validation, and managed services for LIMS and eQMS platforms. CSA-aligned, AI-enhanced, and built to keep your systems in a validated, compliant state.",
};

const platforms = [
  {
    icon: FlaskConical,
    title: "LIMS   Laboratory Information Management Systems",
    items: [
      "Vendor-neutral expertise across major LIMS platforms",
      "Instrument and ERP integration",
      "Sample management, stability, analytical results, and CoA workflows",
      "Upgrade management and performance optimization",
    ],
  },
  {
    icon: FileText,
    title: "eQMS   Electronic Quality Management Systems",
    items: [
      "Configuration aligned with your SOPs and quality workflows",
      "Workflow design and validation for CAPA, deviations, change control, document management",
      "Integration with LIMS, ERP, and regulatory submission systems",
      "Ongoing enhancement, user support, and periodic review management",
    ],
  },
  {
    icon: ShieldCheck,
    title: "CSV / CSA   Computer Software Assurance",
    items: [
      "Risk-based approach aligned with FDA guidance on CSA and GAMP 5",
      "IQ/OQ/PQ execution and documentation",
      "Test script development and automation where appropriate",
      "Validation master plans, summary reports, and traceability matrices",
      "Change control documentation and revalidation support",
    ],
  },
];

const serviceTiers = [
  {
    tier: "Tier 1",
    title: "Operational Support",
    items: [
      "User support and incident management",
      "Access management and user provisioning",
      "Scheduled system health checks and reporting",
      "Configuration issue resolution",
    ],
  },
  {
    tier: "Tier 2",
    title: "Enhancement and Change Management",
    items: [
      "Requirement gathering and impact assessment",
      "Configuration changes with full change control documentation",
      "Testing, validation updates, and deployment",
      "Communication to affected users and QA stakeholders",
    ],
  },
  {
    tier: "Tier 3",
    title: "Strategic and Platform Services",
    items: [
      "Periodic system review and validation status assessment",
      "Upgrade and migration planning and execution",
      "Integration enhancement and new module deployment",
      "Roadmap alignment with your IT and quality strategy",
    ],
  },
];

const csaSteps = [
  {
    step: "01",
    title: "Risk Assessment First",
    desc: "We categorize systems by business impact, patient safety relevance, and data criticality. Validation effort scales to risk.",
  },
  {
    step: "02",
    title: "Documentation That Serves a Purpose",
    desc: "We write validation documents that are useful clear, traceable, and directly linked to test execution. We avoid documentation that exists only to satisfy a checkbox.",
  },
  {
    step: "03",
    title: "Test Automation Where It Makes Sense",
    desc: "For high-change systems, automated test scripts reduce the burden of repeat testing. We build automation that can be maintained and re-run reliably under change control.",
  },
  {
    step: "04",
    title: "Change Management as a First-Class Activity",
    desc: "Every change to a validated system is assessed, documented, and approved before implementation.",
  },
  {
    step: "05",
    title: "Ongoing Validation State Maintenance",
    desc: "Our managed services include periodic review of validation status and proactive identification of documentation gaps.",
  },
];

const aiApplications = [
  {
    title: "AI-Assisted Documentation Generation",
    desc: "Draft change control records, test scripts, and validation summaries from structured inputs reviewed and approved by your qualified team before use.",
  },
  {
    title: "Intelligent Search Across Your Systems",
    desc: "Natural language search across validation documents, SOPs, and system configuration records reducing the time your QA team spends finding information.",
  },
  {
    title: "Anomaly and Trend Alerting",
    desc: "Pattern-based monitoring of system logs, data quality metrics, and user activity surfacing anomalies for human review before they become incidents.",
  },
  {
    title: "Smart Support Ticket Triage",
    desc: "Categorize and route support tickets based on content, urgency, and system context ensuring the right resource responds without delay.",
  },
];

const securityItems = [
  "Data handling agreements aligned with your security and legal requirements before engagement",
  "Access controls limited to minimum necessary scope, fully documented and auditable",
  "Data residency awareness   we support on-premise, cloud, and hybrid environments",
  "IP and confidentiality protections as standard across all engagements",
  "No use of client data to train models or improve third-party services",
  "Alignment with your information security policies, including vendor risk assessment support",
];

export default function ManagedServicesPage() {
  return (
    <>
      <PageHero
        badge="IT Managed Services"
        h1="Keep Your LIMS, eQMS, and Quality Systems Compliant, Current, and Fully Supported"
        subheadline="From implementation and validation to day-to-day managed services, we provide experienced, compliance-minded IT support for the platforms your operations depend on."
        paragraph="Your LIMS and eQMS platforms are operational-critical systems in a regulated environment. Keeping them validated, current, and integrated while managing ongoing enhancements, incident response, and system updates demands more than generic IT support. Hephzibah Technologies provides specialist managed services that combine deep platform knowledge, CSA expertise, and carefully applied AI."
        primaryCta={{ label: "Discuss Your Platform Needs", href: "/contact" }}
        secondaryCta={{ label: "Learn About Our CSA Approach", href: "#csa-approach" }}
      />

      {/* Platforms */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Platforms & Scope
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Systems We Implement, Validate, and Manage
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-7">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-sky-100 mb-5">
                    <Icon className="w-5 h-5 text-sky-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-4 leading-snug">{p.title}</h3>
                  <ul className="space-y-2.5">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Managed services model */}
      <section className="bg-slate-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-3">
              Our Managed Services Model
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              What "Managed Services" Means in a Regulated Context
            </h2>
            <p className="text-base text-slate-400 max-w-2xl mx-auto">
              We provide structured, SLA-backed support that goes beyond a break-fix helpdesk.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceTiers.map((tier) => (
              <div key={tier.tier} className="rounded-2xl bg-slate-800 border border-slate-700 p-7">
                <div className="inline-flex items-center rounded-full bg-sky-600/20 border border-sky-600/30 px-3 py-1 mb-4">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    {tier.tier}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-4">{tier.title}</h3>
                <ul className="space-y-2.5">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-8">
            All tiers operate with defined SLAs, documented escalation paths, and regular service review meetings.
          </p>
        </div>
      </section>

      {/* CSA approach */}
      <section id="csa-approach" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
                CSA Approach
              </p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">
                Risk-Based, Practical, and Documented
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-8">
                Computer Software Assurance is not a one-time project it is an ongoing program. We help you design and sustain it.
              </p>
              <div className="space-y-6">
                {csaSteps.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-sky-600 text-white text-xs font-bold shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI in managed services */}
            <div>
              <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
                AI-Enhanced Operations
              </p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">
                Where AI Adds Value Carefully
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                We introduce AI into managed services operations only where it reduces manual burden without introducing compliance risk.
              </p>
              <div className="space-y-4">
                {aiApplications.map((a) => (
                  <div key={a.title} className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-sky-500" />
                      <h3 className="text-sm font-bold text-slate-900">{a.title}</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{a.desc}</p>
                  </div>
                ))}
                <p className="text-xs text-slate-500 italic mt-2">
                  In every case, AI outputs are reviewed by qualified personnel. No AI action modifies a validated system or compliance record without human approval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Governance */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Data Security & Governance
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-5">
              Your Data Stays Secure, Controlled, and Compliant
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              Working with regulated life science data requires more than technical competence. It requires governance discipline.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {securityItems.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white p-4">
                  <ShieldCheck className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-500">
              We operate in environments subject to FDA, EMA, and ISO 17025 expectations. We do not make guarantees about regulatory outcomes, but we work in ways that support your compliance position.
            </p>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Your Platforms Deserve Specialist Support"
        subtext="Whether you are implementing a new LIMS, managing an aging eQMS, or looking to build a more sustainable validation program we are ready to help with the domain knowledge and process rigor your environment requires."
        primaryCta={{ label: "Discuss Your Platform Needs", href: "/contact" }}
      />
    </>
  );
}
