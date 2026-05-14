import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Approach & Methodology",
  description:
    "How Hephzibah Technologies delivers AI engineering and managed services in regulated life science environments from discovery to long-term partnership.",
};

const phases = [
  {
    number: "01",
    title: "Discovery",
    heading: "We Listen Before We Propose",
    description:
      "Every engagement begins with structured discovery. We invest time to understand your current environment, your compliance posture, your team's capability, and the specific challenge you are trying to solve. We do not issue generic proposals or template-based statements of work until we understand what you actually need.",
    activities: [
      "Stakeholder interviews across IT, QA, and operational teams",
      "Current system and data landscape mapping",
      "Regulatory and compliance context review",
      "Definition of success criteria and constraints",
    ],
  },
  {
    number: "02",
    title: "Design & Planning",
    heading: "Architecture and Compliance Planning Before Code",
    description:
      "We invest in upfront design. This includes both technical architecture and compliance planning because retrofitting validation or traceability into an already-built system is expensive, and often insufficient.",
    activities: [
      "System categorization and intended use definition",
      "Validation approach selection (IQ/OQ/PQ, CSA risk-based)",
      "Data flow and integration design with security review",
      "Risk assessment and mitigation planning with your QA team",
    ],
  },
  {
    number: "03",
    title: "Delivery",
    heading: "Agile Delivery with Regulated Discipline",
    description:
      "We work in iterative sprints with regular review points but within a framework that accommodates your change control requirements. Agility and compliance are not opposites. They require careful coordination.",
    activities: [
      "Sprint-based development with defined deliverables per cycle",
      "Documentation maintained throughout not dumped at the end",
      "Quality checkpoints built into sprint cadence",
      "Regular stakeholder reviews with your IT and QA leads",
    ],
  },
  {
    number: "04",
    title: "Validation & Handover",
    heading: "Deployment That Meets Your Validated State Standards",
    description:
      "We do not deploy and disappear. We support full validation execution, user acceptance, and the transition to a validated state including all documentation your quality team requires.",
    activities: [
      "Test script execution and defect management",
      "Summary report and traceability matrix preparation",
      "User training and knowledge transfer",
      "Handover to your operational or managed services team",
    ],
  },
  {
    number: "05",
    title: "Ongoing Partnership",
    heading: "We Stay Accountable After Go-Live",
    description:
      "Many of our engagements continue well beyond initial delivery. We remain a committed partner providing managed services, supporting enhancements, and helping you adapt to new requirements over time.",
    activities: [
      "Managed services with defined SLAs",
      "Change management support for system updates and enhancements",
      "Periodic validation status reviews",
      "Capacity scaling as your needs evolve",
    ],
  },
];

const principles = [
  {
    title: "Documentation as a Deliverable",
    body: "In our engagements, documentation is not a cleanup task at the end of a project. Requirements, design records, test scripts, and validation summaries are produced as the work progresses not assembled retrospectively.",
  },
  {
    title: "Risk-Based Effort Allocation",
    body: "Not every system requires the same level of validation rigor. We apply effort where it matters most, based on patient safety impact, data criticality, and system complexity.",
  },
  {
    title: "Transparency Over Optimism",
    body: "We tell clients when a timeline is not realistic, when a technical approach carries risk, or when a requirement would compromise compliance. Honest early conversations prevent expensive late problems.",
  },
  {
    title: "Partnership, Not Delivery",
    body: "We work alongside your team, not above or around them. Your QA and IT leads are involved from the start not presented with a system at the end.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageHero
        badge="Our Approach"
        h1="We Do the Work Differently Because Your Environment Demands It"
        subheadline="Our methodology is built around one central reality: in life sciences, how you build and deliver technology matters as much as what you deliver."
        paragraph="A missed audit trail, an undocumented change, a poorly scoped validation these are not just technical failures. They can delay approvals, trigger observations, and erode trust in your systems. Our approach is designed to prevent these outcomes at every stage."
        primaryCta={{ label: "Explore Our Services", href: "/services" }}
        secondaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
      />

      {/* Five phases */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Our Process
            </p>
            <h2 className="text-3xl font-bold text-slate-900">Five Phases of Every Engagement</h2>
          </div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-200 hidden lg:block" />

            <div className="space-y-12">
              {phases.map((phase) => (
                <div key={phase.number} className="lg:grid lg:grid-cols-[auto_1fr] lg:gap-10">
                  {/* Step indicator */}
                  <div className="hidden lg:flex flex-col items-center">
                    <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-sky-600 text-white text-sm font-bold shadow-md">
                      {phase.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full bg-sky-600 text-white text-xs font-bold">
                        {phase.number}
                      </span>
                      <p className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                        Phase {phase.number}   {phase.title}
                      </p>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{phase.heading}</h3>
                    <p className="text-base text-slate-600 leading-relaxed mb-5">{phase.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {phase.activities.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-sky-500 mt-1">→</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guiding principles */}
      <section className="bg-slate-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-3">
              Guiding Principles
            </p>
            <h2 className="text-3xl font-bold text-white">
              What Underpins Every Decision We Make
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="rounded-xl bg-slate-800 border border-slate-700 p-7">
                <h3 className="text-base font-bold text-white mb-3">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="See Our Approach in Action"
        subtext="The best way to understand how we work is to talk through a real challenge. Bring your use case we'll walk you through how we'd approach it."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "Review Our Services", href: "/services" }}
      />
    </>
  );
}
