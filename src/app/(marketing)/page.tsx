import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  FlaskConical,
  Server,
  ShieldCheck,
  Lightbulb,
  Globe,
  MessageSquare,
  CheckCircle2,
  Activity,
  Target,
} from "lucide-react";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "AI-Powered Staff Augmentation and Managed IT Services for Life Sciences",
  description:
    "Hephzibah Technologies delivers AI staff augmentation, compliance-aware product development, and managed IT services LIMS, eQMS, and CSA built for life sciences.",
};

const services = [
  {
    icon: Users,
    title: "Staff Augmentation with AI Developers",
    href: "/services/staff-augmentation",
    description:
      "Extend your team with vetted AI/ML and software engineers who understand LLMs, RAG, agentic AI, and data pipelines with GxP awareness from day one.",
    bullets: [
      "Full-time, fractional, or project-based",
      "Developers with documentation culture",
      "Fast onboarding into regulated environments",
    ],
  },
  {
    icon: FlaskConical,
    title: "Life Science AI Development",
    href: "/services/ai-product-development",
    description:
      "Purpose-built AI applications for R&D, quality, lab, and clinical workflows designed with traceability, explainability, and validation mindset from the start.",
    bullets: [
      "Document intelligence & knowledge assistants",
      "Built with ALCOA+ and validation mindset",
      "Integrates with your QMS and data governance",
    ],
  },
  {
    icon: Server,
    title: "IT Managed Services: LIMS, eQMS & CSA",
    href: "/services/managed-services",
    description:
      "Implementation, validation, and day-to-day managed services for LIMS and eQMS platforms. CSA-aligned, AI-enhanced, and built to keep your systems compliant.",
    bullets: [
      "Implementation, integration & migration",
      "CSA consulting, test automation & change management",
      "Defined SLAs and proactive monitoring",
    ],
  },
];

const segments = [
  { label: "Pharmaceutical & Biotech", icon: "💊" },
  { label: "Medtech & Diagnostics", icon: "🔬" },
  { label: "CROs & CDMOs", icon: "🧪" },
  { label: "Regulated Labs", icon: "⚗️" },
];

const differentiators = [
  {
    icon: Lightbulb,
    title: "AI Engineering Depth",
    body: "Not a traditional IT firm with an AI label. We are built around modern AI/ML LLMs, RAG, agentic systems, MLOps applied specifically to life science challenges.",
  },
  {
    icon: FlaskConical,
    title: "Life Science Domain Literacy",
    body: "Our team has worked within and alongside pharma, biotech, medtech, and CRO organizations. We understand your workflows without needing to be taught from scratch.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Discipline",
    body: "Compliance is not a phase or a checkbox. It shapes how we architect, test, document, and deliver every time.",
  },
  {
    icon: Globe,
    title: "Global Delivery, Real Accountability",
    body: "Offices in New Jersey, USA and Tamil Nadu, India serving clients across the US, Europe, and the Middle East. Remote-ready, timezone-flexible, and accountable through structured governance.",
  },
];

const engagementSteps = [
  {
    step: "01",
    title: "Discovery & Scoping",
    desc: "A structured call or workshop to understand your environment, priorities, and constraints no generic proposals.",
  },
  {
    step: "02",
    title: "Fit Assessment",
    desc: "We assess whether staff augmentation, a product build, or managed services is the right path and tell you honestly.",
  },
  {
    step: "03",
    title: "Onboarding & Integration",
    desc: "We follow your onboarding, access, and compliance protocols. Our people arrive with documentation habits, not just code skills.",
  },
  {
    step: "04",
    title: "Delivery & Governance",
    desc: "Regular check-ins, transparent reporting, and clear escalation paths. You always know what is being built, why, and what's next.",
  },
  {
    step: "05",
    title: "Long-Term Partnership",
    desc: "Many of our engagements evolve over time. We grow with your needs adding capability and supporting new initiatives.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-900">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none bg-no-repeat bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: "url('/4.png')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(14,165,233,0.15)_0%,_transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(99,102,241,0.08)_0%,_transparent_60%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 mb-6">
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                Life Sciences Technology Partner
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              Strategic AI and Technology Partner for{" "}
              <span className="text-sky-400">Life Sciences</span>
            </h1>
            <p className="text-xl text-sky-300 font-medium mb-4">
              We help pharma, biotech, medtech, and regulated lab organizations build, scale, and sustain technology with AI that respects the rigor your industry demands.
            </p>
            <p className="text-base text-slate-400 leading-relaxed mb-8 max-w-2xl">
              Hephzibah Technologies sits at the intersection of artificial intelligence, software engineering, and life science domain expertise. Whether you need experienced AI developers embedded in your team, purpose-built applications for regulated workflows, or managed services for your LIMS and eQMS platforms we bring the technical depth and compliance mindset to deliver.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-sky-500 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-400 transition-colors shadow-lg shadow-sky-900/40"
              >
                Book a Discovery Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-md border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-slate-400 hover:text-white transition-colors"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Who We Serve
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Built for the Complexity of Life Sciences
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              We understand the pressures your organization faces validation obligations, data integrity requirements, and the constant need to do more with constrained IT resources.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {segments.map((s) => (
              <Link
                key={s.label}
                href="/industries"
                className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-6 py-8 text-center hover:border-sky-200 hover:bg-sky-50 hover:shadow-sm transition-all"
              >
                <span className="text-3xl">{s.icon}</span>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-sky-700 transition-colors">
                  {s.label}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Also serving{" "}
              <Link href="/industries" className="text-sky-600 hover:underline font-medium">
                CROs, CDMOs, hospital pharmacies, and academic research organizations
              </Link>{" "}
              operating under GxP or ISO frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* THREE SERVICES */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Our Services
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 max-w-2xl">
              Three Ways We Help You Move Forward
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.title}
                  className="group bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md hover:border-sky-100 transition-all flex flex-col"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-sky-50 mb-6">
                    <Icon className="w-6 h-6 text-sky-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {svc.description}
                  </p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {svc.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-600">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={svc.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY HEPHZIBAH */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
                Why Hephzibah
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-5">
                AI + Domain + Compliance Together
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Most AI vendors don't understand life sciences. Most IT services firms don't move at the pace AI requires. We are built for both.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-8">
                We made a deliberate choice to work exclusively in life sciences and regulated environments. It means we accumulate knowledge that is directly reusable across every client. Our engineers understand your terminology. Our consultants anticipate your audit questions.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md border border-sky-200 bg-sky-50 px-5 py-2.5 text-sm font-semibold text-sky-700 hover:bg-sky-100 transition-colors"
              >
                About Hephzibah Technologies
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {differentiators.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.title} className="rounded-xl border border-slate-100 bg-slate-50 p-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-slate-200 mb-4">
                      <Icon className="w-5 h-5 text-sky-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">{d.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{d.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE ENGAGE */}
      <section className="bg-slate-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-3">
              How We Engage
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Engagement Models Designed for Regulated Environments
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Our engagement models are designed to reduce friction while maintaining rigor.
            </p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px bg-slate-700" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {engagementSteps.map((step) => (
                <div key={step.step} className="relative flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sky-600 text-white text-lg font-bold z-10 mb-4 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Trusted By
            </p>
            <h2 className="text-2xl font-bold text-slate-900">
              Supporting Compliance and Engineering Across the Ecosystem
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
            {[
              { name: "Nexus Biopharma", icon: Activity },
              { name: "Global Clinical", icon: Globe },
              { name: "Precision Diag", icon: Target },
              { name: "Regulated Labs", icon: FlaskConical },
              { name: "MedTech Innov", icon: ShieldCheck },
            ].map((company) => {
              const Icon = company.icon;
              return (
                <div
                  key={company.name}
                  className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white border border-slate-100 shadow-sm grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"
                >
                  <Icon className="w-5 h-5 text-slate-400" />
                  <span className="text-xs font-bold text-slate-900 tracking-tight whitespace-nowrap">
                    {company.name}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="max-w-3xl mx-auto">
            <blockquote className="relative rounded-2xl bg-white border border-sky-100 shadow-xl shadow-sky-900/5 p-8 lg:p-12">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-sky-500 text-white shadow-lg">
                <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-slate-700 text-lg lg:text-xl font-medium italic leading-relaxed text-center mb-8">
                &ldquo;Hephzibah Technologies delivered our LIMS implementation under a very tight audit timeline. Their understanding of GxP and CSA wasn't just theoretical it was baked into every technical decision they made. They are a rare partner who actually understands our regulatory burden.&rdquo;
              </p>
              <div className="flex flex-col items-center">
                <div className="h-0.5 w-8 bg-sky-500 mb-4" />
                <footer className="text-center">
                  <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                    Head of IT Quality
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Mid-Sized Biopharmaceutical Company, New Jersey
                  </p>
                </footer>
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <CTABanner
        heading="Ready to Talk About Your Next Initiative?"
        subtext="Whether you're evaluating AI for a quality workflow, looking for a development partner for a new lab application, or need expert support for your LIMS platform we're ready to listen first."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "Explore Our Services", href: "/services" }}
      />
    </>
  );
}
