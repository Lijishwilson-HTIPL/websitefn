import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Video, Download } from "lucide-react";

import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Resources & Insights | Life Science AI & IT",
  description:
    "Articles, whitepapers, and practical guides on AI in life sciences, LIMS and eQMS management, CSA, and technology for regulated environments.",
};

const resourceTypes = [
  {
    icon: BookOpen,
    title: "Articles & Blog",
    description: "Practical short-form pieces on AI, compliance, and platform management for life sciences teams.",
    cta: "Browse Articles",
    available: true,
  },
  {
    icon: FileText,
    title: "Whitepapers",
    description: "In-depth technical and methodological guides on specific topics relevant to regulated environments.",
    cta: "Coming Soon",
    available: false,
  },
  {
    icon: Download,
    title: "Case Studies",
    description: "Anonymized engagement summaries with challenges, approach, and outcomes.",
    cta: "Coming Soon",
    available: false,
  },
  {
    icon: Video,
    title: "Webinars & Events",
    description: "Live and recorded sessions with our subject-matter experts on AI, validation, and platform management.",
    cta: "Coming Soon",
    available: false,
  },
];


export default function ResourcesPage() {
  return (
    <>
      <PageHero
        badge="Resources & Insights"
        h1="Practical Thinking on AI, Technology, and Compliance for Life Sciences"
        subheadline="We write about what we see in the field honest, technically grounded perspectives on AI adoption, platform management, and compliant delivery."
        paragraph="Our resources are written for practitioners IT leads, quality managers, and digital transformation teams who need substance, not marketing. No generic AI hype. No vendor pitch disguised as insight. Just honest thinking from people who have done this work."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />

      {/* Resource types */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Browse by Format
            </p>
            <h2 className="text-3xl font-bold text-slate-900">What You'll Find Here</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {resourceTypes.map((rt) => {
              const Icon = rt.icon;
              return (
                <div
                  key={rt.title}
                  className={`rounded-xl border p-6 ${rt.available ? "border-sky-100 bg-sky-50" : "border-slate-100 bg-slate-50"}`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg mb-4 ${rt.available ? "bg-sky-100" : "bg-slate-200"}`}>
                    <Icon className={`w-5 h-5 ${rt.available ? "text-sky-600" : "text-slate-400"}`} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{rt.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{rt.description}</p>
                  <span
                    className={`text-xs font-semibold ${rt.available ? "text-sky-600" : "text-slate-400"}`}
                  >
                    {rt.cta}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-slate-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-3">
              Stay Informed
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              New Content Monthly, No Noise
            </h2>
            <p className="text-base text-slate-400 mb-8">
              We publish new content monthly. No promotional emails, no noise. Just relevant thinking for life science technology teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your business email address"
                className="flex-1 rounded-md bg-slate-800 border border-slate-600 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
              <button className="rounded-md bg-sky-500 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-400 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Have a Topic You'd Like Us to Cover?
          </h2>
          <p className="text-base text-slate-600 mb-6 max-w-xl mx-auto">
            If there is a specific challenge, question, or area of practice you would find useful to read about, we welcome suggestions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900 transition-colors"
            >
              Suggest a Topic
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition-colors"
            >
              Book a Call Instead
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
