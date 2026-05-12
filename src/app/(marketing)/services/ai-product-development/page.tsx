import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, BookOpen, FileSearch, BotMessageSquare, BarChart3, Cloud } from "lucide-react";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Life Science AI Development",
  description:
    "Purpose-built AI applications for pharma, biotech, and regulated labs. Document intelligence, knowledge assistants, and workflow tools designed with validation and traceability in mind.",
};

const differences = [
  {
    problem: "Explainability gaps",
    detail: "AI decisions that cannot be traced or explained create audit risk",
  },
  {
    problem: "Data provenance issues",
    detail: "Models trained on undocumented or mixed data sources undermine ALCOA+ compliance",
  },
  {
    problem: "Change control blind spots",
    detail: "Updating an AI model can constitute a change to a validated system generic vendors don't plan for this",
  },
  {
    problem: "Integration mismatch",
    detail: "Consumer-grade AI tools are not designed to connect to LIMS, eQMS, or clinical data platforms securely",
  },
];

const approachSteps = [
  {
    step: "01",
    title: "Workflow First, AI Second",
    desc: "We start by mapping the actual workflow: who does what, what documents and data are involved, where quality or regulatory risk exists. AI is introduced where it adds genuine value.",
  },
  {
    step: "02",
    title: "Validation and Risk Assessment Early",
    desc: "Before writing a line of code, we work with your QA and IT teams to assess the system's category, intended use, and validation scope.",
  },
  {
    step: "03",
    title: "Traceability and Explainability as Architecture Requirements",
    desc: "Every AI-assisted decision or output is designed with traceability in mind. Users can see the source of a recommendation, the documents behind a summary, or the logic behind an alert.",
  },
  {
    step: "04",
    title: "Integration with Your Existing Governance",
    desc: "We don't build islands. Our applications connect with your QMS, document management systems, laboratory informatics platforms, and IT infrastructure.",
  },
];

const solutionPatterns = [
  {
    icon: BookOpen,
    title: "AI Knowledge Assistant over Regulated Documents",
    subtitle: "Find Answers Across SOPs, Protocols, and Validation Records",
    description:
      "A secure, retrieval-augmented generation (RAG) application that allows your teams to ask natural-language questions across your document libraries SOPs, protocols, validation reports, batch records and receive sourced, traceable answers.",
    bullets: [
      "Built on your internal document repository (SharePoint, Veeva, OpenText, or custom)",
      "Every answer is linked to the source document and version",
      "Role-based access controls aligned with your existing permissions",
      "No training on your data; retrieval-only architecture for compliance clarity",
    ],
  },
  {
    icon: FileSearch,
    title: "Smart Document Review and Annotation",
    subtitle: "Accelerate Review Without Bypassing Qualified Personnel",
    description:
      "An AI-assisted review layer that surfaces deviations, flags missing elements, highlights inconsistencies, and pre-populates structured fields while keeping the qualified human reviewer in control of every final decision.",
    bullets: [
      "Applicable to batch records, protocols, CAPA documentation, and regulatory submissions",
      "Configurable rule sets aligned with your SOPs and acceptance criteria",
      "Full audit trail of AI suggestions vs. human decisions",
      "Designed to assist, not replace, your qualified review process",
    ],
  },
  {
    icon: BotMessageSquare,
    title: "Intelligent Lab and Clinical Workflow Assistants",
    subtitle: "Reduce Manual Burden on Scientists and Lab Staff",
    description:
      "Conversational or structured AI tools that guide users through lab procedures, surface relevant reference data, flag anomalies in real time, and reduce the time scientists spend on administrative documentation.",
    bullets: [
      "Integrates with LIMS and instrument data streams",
      "Supports structured data entry with validation logic",
      "Anomaly detection based on historical baselines with thresholds you define",
      "Lightweight deployment options for both desktop and tablet use",
    ],
  },
  {
    icon: BarChart3,
    title: "Decision-Support Tools for Quality and Regulatory Workflows",
    subtitle: "Structured, Evidence-Based Decision Support",
    description:
      "AI-enabled tools that aggregate data from multiple sources QMS events, deviation history, supplier records, analytical results and present structured, contextual summaries to support risk assessments, change evaluations, or regulatory responses.",
    bullets: [
      "Not a decision engine a decision support tool. Final decisions remain with qualified staff",
      "Output formatted for documentation and audit readiness",
      "Configurable for your organization's risk framework and thresholds",
      "Integration with existing CAPA, change control, and QRM processes",
    ],
  },
];

const complianceFoundations = [
  "Intended use definition and risk categorization prior to architecture decisions",
  "Validation planning aligned with your QA team IQ/OQ/PQ or CSA-aligned approaches as appropriate",
  "Audit trail design: system-generated records of user actions, AI suggestions, and data transformations",
  "Data integrity controls: input validation, version tracking, segregation of raw and processed data",
  "Change management design: architecture that supports controlled updates without systemic revalidation where possible",
  "Access and security controls: role-based access, enterprise identity providers, encrypted data handling",
];

const techStack = [
  "Azure OpenAI Service, AWS Bedrock, private/on-premise options for sensitive data",
  "LangChain, LlamaIndex, Semantic Kernel, custom agentic orchestration",
  "REST and FHIR APIs, HL7, LIMS connectors, SharePoint, Veeva Vault, OpenText",
  "React, Vue, Blazor   clean, accessible UI for operational users",
  "Azure ML, AWS SageMaker, GCP Vertex AI   cloud-agnostic deployment",
];

export default function AIProductDevelopmentPage() {
  return (
    <>
      <PageHero
        badge="AI Development"
        h1="AI Applications Built for the Way Life Sciences Actually Works"
        subheadline="We design and build intelligent products and internal applications for R&D, quality, lab, and clinical workflows grounded in compliance, designed for real users, and built to integrate with your existing systems."
        paragraph="Off-the-shelf AI tools are built for general-purpose use. Life sciences organizations operate under a different set of constraints: data integrity obligations, validation requirements, audit trails, and change-control processes. At Hephzibah Technologies, we build AI-enabled applications with these constraints as design requirements not afterthoughts."
        primaryCta={{ label: "Discuss a Use Case", href: "/contact" }}
        secondaryCta={{ label: "See Solution Patterns", href: "#solution-patterns" }}
      />

      {/* Why generic AI falls short */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
                The Difference
              </p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">
                Why Generic AI Solutions Fall Short in Regulated Environments
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                The AI market is full of powerful tools. Most are designed for enterprise settings that do not face the regulatory obligations of life sciences. The gap shows up quickly.
              </p>
              <div className="space-y-4">
                {differences.map((d) => (
                  <div key={d.problem} className="rounded-xl border border-red-100 bg-red-50 p-4">
                    <p className="text-sm font-bold text-red-800 mb-1">{d.problem}</p>
                    <p className="text-sm text-red-700">{d.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-900 p-8 lg:sticky lg:top-24">
              <p className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-4">
                Our Approach
              </p>
              <h3 className="text-xl font-bold text-white mb-6">
                We treat compliance as a design requirement not an afterthought.
              </h3 >
    <div className="space-y-5">
      {approachSteps.map((s) => (
        <div key={s.step} className="flex gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-600 text-white text-xs font-bold shrink-0">
            {s.step}
          </div>
          <div>
            <p className="text-sm font-bold text-white mb-1">{s.title}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
            </div >
          </div >
        </div >
      </section >

    {/* Solution patterns */ }
    < section id = "solution-patterns" className = "bg-slate-50 py-16 lg:py-24" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
            Solution Patterns
          </p>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            What We Build
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
              These are representative patterns not fixed products.Every engagement is shaped to your organization's specific workflows, platforms, and compliance environment.
            </p >
          </div >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {solutionPatterns.map((pattern) => {
        const Icon = pattern.icon;
        return (
          <div key={pattern.title} className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-sky-50 mb-5">
              <Icon className="w-5 h-5 text-sky-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1 leading-snug">
              {pattern.title}
            </h3>
            <p className="text-sm text-sky-600 font-medium mb-3">{pattern.subtitle}</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">{pattern.description}</p>
            <ul className="space-y-2">
              {pattern.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-600 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
        </div >
      </section >

    {/* Compliance foundations */ }
    < section className = "bg-white py-16 lg:py-20" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Compliance Foundations
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-5">
              How We Address Compliance Throughout the Build
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              We do not add compliance at the end. It is embedded in every phase of our development process.
            </p>
            <ul className="space-y-3">
              {complianceFoundations.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-500">
              We work as partners with your QA and IT teams not as external vendors handing over a system at the end.
            </p>
          </div>

          {/* Technology */}
          <div>
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Technology We Work With
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-5">
              Built on Modern, Enterprise-Ready Platforms
            </h2>
            <div className="space-y-3">
              {techStack.map((t) => (
                <div key={t} className="flex items-start gap-3 rounded-lg bg-slate-50 border border-slate-100 px-4 py-3">
                  <Cloud className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 leading-relaxed">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </section >

    <CTABanner
      heading="Have a Workflow Challenge That AI Might Solve?"
      subtext="We start with a conversation, not a pitch. Tell us about the problem, the workflow, and the compliance context. We'll tell you honestly whether AI is the right answer."
      primaryCta={{ label: "Discuss a Use Case", href: "/contact" }}
      secondaryCta={{ label: "See Our Approach", href: "/approach" }}
    />
    </>
  );
}
