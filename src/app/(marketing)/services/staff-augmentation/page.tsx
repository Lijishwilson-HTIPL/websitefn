import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu, Database, Code2, Shield, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import CheckList from "@/components/CheckList";

export const metadata: Metadata = {
  title: "AI Developer Staff Augmentation for Life Sciences",
  description:
    "Vetted AI and ML engineers with GxP mindset. LLMs, RAG, MLOps, data engineering delivered with fast regulated onboarding for pharma, biotech, and medtech teams.",
};

const skillAreas = [
  {
    icon: Cpu,
    title: "Artificial Intelligence & Machine Learning",
    items: [
      "Large language models (LLMs): fine-tuning, prompt engineering, evaluation",
      "Retrieval-augmented generation (RAG) over regulated document corpora",
      "Agentic AI systems and orchestration frameworks",
      "AI copilots and workflow automation for regulated operations",
    ],
  },
  {
    icon: Database,
    title: "Data Engineering & MLOps",
    items: [
      "Data pipeline design and implementation (batch and streaming)",
      "Feature stores, model registries, and experiment tracking",
      "Model deployment, monitoring, and drift detection in production",
      "Azure ML, AWS SageMaker, GCP Vertex AI   cloud-agnostic capability",
    ],
  },
  {
    icon: Code2,
    title: "Software Engineering",
    items: [
      "Backend APIs and microservices (Python, Node.js, .NET)",
      "Frontend development for internal tools and dashboards (React, Vue)",
      "Integration with LIMS, eQMS, ERP, and enterprise data platforms",
      "Secure, audit-aware application design",
    ],
  },
];

const engagementModels = [
  {
    title: "Full-Time Embedded Developer",
    desc: "A dedicated professional working exclusively on your projects integrated into your sprints, standups, and documentation workflows. Best for ongoing development needs.",
  },
  {
    title: "Fractional or Part-Time",
    desc: "Access senior AI or data engineering expertise at a fraction of the full-time cost. Ideal for architecture reviews, proof-of-concept work, or advisory capacity.",
  },
  {
    title: "Dedicated Pod / Team",
    desc: "A self-contained unit typically a tech lead, 2–3 developers, and a QA or documentation resource operating as a focused delivery team.",
  },
  {
    title: "Project-Based",
    desc: "Time-bounded engagement for a specific deliverable: a RAG prototype, a data pipeline, an integration layer. Clear scope, clear exit, complete handover.",
  },
  {
    title: "Hybrid Team",
    desc: "A blend of embedded Hephzibah engineers and your internal team, configured around your existing org structure. We flex as your needs change.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Discovery Call",
    desc: "We understand your project, technology stack, team structure, and compliance constraints. This shapes who we recommend and how we structure the engagement.",
  },
  {
    step: "02",
    title: "Role Definition",
    desc: "Together we define the skills, experience level, and working arrangements needed including any domain-specific context that matters to your search.",
  },
  {
    step: "03",
    title: "Candidate Selection & Review",
    desc: "We present 2–3 matched profiles. You conduct technical and cultural interviews. We don't send bulk lists every candidate is a considered recommendation.",
  },
  {
    step: "04",
    title: "Onboarding & Integration",
    desc: "Our engineers follow your onboarding process. We support knowledge transfer and ensure documentation norms are established from day one.",
  },
  {
    step: "05",
    title: "Ongoing Governance",
    desc: "Regular check-ins between your lead and our engagement manager. Transparent visibility into delivery, challenges, and capacity. Adjustments made proactively.",
  },
];

const complianceItems = [
  "Documentation culture: familiar with change-control documentation and code review expectations",
  "Validation awareness: understand the difference between exploratory code and production systems under a validated state",
  "Data integrity mindset: approach data handling with ALCOA+ principles attributable, legible, contemporaneous, original, accurate",
  "Security and access protocols: comfortable with VPN-only access, locked-down environments, and security onboarding",
  "Communication standards: clear, written-first communication suitable for audit-ready project records",
];

export default function StaffAugmentationPage() {
  return (
    <>
      <PageHero
        badge="Staff Augmentation"
        h1="Developers Who Understand Life Sciences Ready to Join Your Team"
        subheadline="Extend your engineering capacity with experienced AI/ML professionals who bring technical depth, domain literacy, and the documentation culture that regulated environments demand."
        paragraph="Finding AI engineers is hard. Finding AI engineers who understand GxP environments, validation requirements, and regulated data handling is harder. Hephzibah Technologies closes that gap providing carefully vetted professionals who integrate into your team, respect your processes, and deliver from day one."
        primaryCta={{ label: "Request Developer Profiles", href: "/contact" }}
        secondaryCta={{ label: "Learn About Engagement Models", href: "#engagement-models" }}
      />

      {/* The challenge */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              The Challenge
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-5">
              The Talent Gap in Life Science AI Is Real
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Life science organizations are under pressure to adopt AI but building or scaling an in-house AI team in a regulated environment presents unique obstacles.
            </p>
            <ul className="space-y-3">
              {[
                "Traditional hiring cycles are too slow for fast-moving AI projects",
                "Most AI engineers lack familiarity with GxP, ALCOA+, or validation workflows",
                "Onboarding a new developer into a regulated system takes time, process, and oversight",
                "Fractional or short-term needs don't always justify full-time headcount",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                  <span className="text-base text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base text-slate-600 leading-relaxed">
              Hephzibah Technologies provides an alternative: a pre-vetted pool of AI and software engineers with the technical skills your projects need and the domain awareness your environment requires.
            </p>
          </div>
        </div>
      </section>

      {/* Skill areas */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              What We Provide
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              AI Engineering Capability Across the Full Stack
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Our developers are experienced across the modern AI/ML engineering stack, with particular depth in the areas most relevant to life sciences digital transformation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div key={area.title} className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-sky-50 mb-5">
                    <Icon className="w-5 h-5 text-sky-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-4">{area.title}</h3>
                  <ul className="space-y-2.5">
                    {area.items.map((item) => (
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

      {/* Regulated environment readiness */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
                Regulated Environment Readiness
              </p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">
                Engineers Who Respect Your Compliance Environment
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-5">
                Working in a GxP environment is not just a technical constraint it is a cultural one. Our engineers are prepared for it.
              </p>
              <CheckList items={complianceItems} />
              <p className="mt-6 text-sm text-slate-500 italic">
                We do not claim our engineers are regulatory experts but they are literate, disciplined, and fast learners in regulated contexts.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900 p-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-sky-500/20 mb-6">
                <Shield className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-4">
                What Makes Our Model Different for Regulated Teams
              </h3>
              <ul className="space-y-4">
                {[
                  "We understand your environment has approval cycles, access constraints, and audit expectations",
                  "We match to your stack and your domain not just to open keyword slots",
                  "We invest in onboarding to minimize ramp time, not just in sourcing to maximize volume",
                  "Our engineers are accountable through a governance layer you are never managing a black box",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section id="engagement-models" className="bg-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Engagement Models
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Flexible Models to Match Your Needs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engagementModels.map((model) => (
              <div key={model.title} className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-sky-500" />
                  <h3 className="text-sm font-bold text-slate-900">{model.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{model.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-3">
              How It Works
            </p>
            <h2 className="text-3xl font-bold text-white">
              How We Onboard and Integrate Your Extended Team
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {howItWorks.map((step) => (
              <div key={step.step} className="flex gap-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-600 text-white text-sm font-bold shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Let's Find the Right Engineers for Your Team"
        subtext="Tell us about your initiative, your stack, and your constraints. We'll respond with a considered recommendation not a shortlist of unvetted profiles."
        primaryCta={{ label: "Request Developer Profiles", href: "/contact" }}
        secondaryCta={{ label: "Book a 30-Minute Discovery Call", href: "/contact" }}
      />
    </>
  );
}
