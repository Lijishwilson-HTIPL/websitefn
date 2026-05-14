import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lightbulb, FlaskConical, ShieldCheck, Target, Eye } from "lucide-react";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "About Hephzibah Technologies | AI + Domain + Compliance",
  description:
    "Hephzibah Technologies is a life sciences technology partner combining AI engineering depth, domain expertise, and compliance discipline to deliver real-world impact.",
};

const differentiators = [
  {
    icon: Lightbulb,
    title: "AI Engineering Depth",
    body: "We are not a traditional IT services firm that has added 'AI' to its portfolio. We have built our capability around modern AI/ML engineering LLMs, RAG, agentic systems, MLOps, and data engineering and we apply this capability specifically to life science challenges.",
  },
  {
    icon: FlaskConical,
    title: "Life Science Domain Literacy",
    body: "Our team has worked within or alongside pharma, biotech, medtech, and contract laboratory organizations. We understand the workflows, the terminology, the regulatory context, and the organizational dynamics.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Discipline",
    body: "We treat compliance as a practice not a project phase, not a documentation exercise, and not someone else's job. It shapes how we architect, how we test, how we document, and how we deliver.",
  },
];

const values = [
  {
    title: "Honesty",
    body: "We tell clients when AI is not the right answer, when a timeline is not realistic, and when a requirement creates compliance risk.",
  },
  {
    title: "Rigor",
    body: "We do not cut corners on documentation, testing, or design especially in regulated environments.",
  },
  {
    title: "Partnership",
    body: "We work alongside your team, not above or around them.",
  },
  {
    title: "Continuous Learning",
    body: "The AI landscape changes rapidly; we invest in keeping our capability current and relevant.",
  },
  {
    title: "Accountability",
    body: "We take ownership of our work and our commitments.",
  },
  {
    title: "Global Mindset",
    body: "Offices in New Jersey, USA and Tamil Nadu, India serving clients across the US, Europe, and the Middle East. Remote-ready and timezone-flexible.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About Us"
        h1="We Built Hephzibah Technologies to Solve a Problem That Kept Coming Up"
        subheadline="Life science organizations needed AI and technology partners who understood their industry not vendors who needed to be taught it from scratch on every engagement."
        paragraph="We saw the same pattern repeatedly: talented engineers who didn't understand why a change needed to go through change control. AI vendors who treated validation as an obstacle. IT firms who delivered technically sound systems that failed qualification. We built Hephzibah Technologies to close that gap."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
      />

      {/* Our Story */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
                Our Story
              </p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">Why We Exist</h2>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Hephzibah Technologies was founded on the belief that the life sciences industry deserves better technology partners ones who show up already knowing the domain, already respecting the regulatory context, and already committed to quality as a practice rather than a formality.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Our founding team brings together experience in life science IT, AI/ML engineering, laboratory informatics, quality systems, and regulated software delivery. We have worked on the client side inside pharma, biotech, and medtech organizations and we have built and delivered technology for them. That dual perspective shapes everything we do.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                We have offices in New Jersey, USA and Tamil Nadu, India, serving clients across the United States, Europe, and the Middle East. We are remote-ready by design, and our teams have proven experience operating effectively across time zones and within client security environments.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-sky-50 border border-sky-100 p-7">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-6 h-6 text-sky-600" />
                  <h3 className="text-base font-bold text-slate-900">Our Mission</h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  To help life science organizations build, deploy, and sustain technology that is technically excellent, practically useful, and compliant by design by providing AI engineering, product development, and managed services grounded in domain expertise.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 p-7">
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="w-6 h-6 text-sky-400" />
                  <h3 className="text-base font-bold text-white">Our Vision</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  A life sciences industry where AI and technology genuinely accelerate the development, manufacturing, and delivery of therapies and diagnostics without creating new compliance risks or displacing the qualified human judgment that regulation rightly demands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The AI + Domain + Compliance Triad */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Our Differentiators
            </p>
            <h2 className="text-3xl font-bold text-slate-900">The AI + Domain + Compliance Triad</h2>
            <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
              Three capabilities that most firms claim, and few actually combine at the depth life sciences requires.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentiators.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.title} className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm text-center">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-50 mx-auto mb-5">
                    <Icon className="w-7 h-7 text-sky-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{d.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{d.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Our Values
            </p>
            <h2 className="text-3xl font-bold text-slate-900">How We Work</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-slate-100 bg-slate-50 p-6">
                <h3 className="text-sm font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="We'd Like to Know About Your Organization Too"
        subtext="The best partnerships start with a conversation. Tell us what you're working on, and let us share how we might be able to help."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "Explore Our Services", href: "/services" }}
      />
    </>
  );
}
