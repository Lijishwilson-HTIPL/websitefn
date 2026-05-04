import type { Metadata } from "next";
import { CheckCircle2, Globe, BookOpen, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import OpenRolesSection from "@/components/OpenRolesSection";

export const metadata: Metadata = {
  title: "Careers at Hephzibah Technologies",
  description:
    "Join a team building AI and technology for life sciences. Open roles in AI/ML engineering, LIMS/eQMS consulting, and regulated software delivery.",
};

const whyItems = [
  {
    icon: CheckCircle2,
    title: "You Will Work on Real Problems",
    body: "Our projects are not proofs of concept that never see production. We deploy systems that real teams use daily in regulated environments and we are accountable for how they perform.",
  },
  {
    icon: BookOpen,
    title: "You Will Learn the Industry",
    body: "Working in life sciences means learning a domain that rewards depth. We invest in helping our engineers and consultants understand regulatory context, quality systems, and industry workflows.",
  },
  {
    icon: Globe,
    title: "You Will Work Globally",
    body: "We have offices in New Jersey, USA and Tamil Nadu, India, and serve clients across the US, Europe, and the Middle East. Our projects are international in scope, and our teams are remote-ready. You will collaborate across time zones and backgrounds.",
  },
  {
    icon: Users,
    title: "You Will Have Autonomy",
    body: "We are a growing company. People who join early have the opportunity to shape how we work, what we build, and how we grow. We value initiative and clear thinking over hierarchy.",
  },
];

const cultureItems = [
  { title: "Remote-first", body: "We hire for capability and fit, not location." },
  { title: "Documentation-positive", body: "We believe in writing things down it makes us better engineers and better partners to our clients." },
  { title: "Honest and direct", body: "We value candid communication, constructive challenge, and accurate status reporting." },
  { title: "Learning-oriented", body: "The AI and life science technology landscape is evolving rapidly. We support continuous development." },
  { title: "Compliance-minded", body: "We take our clients' regulatory obligations seriously and we expect our team to do the same." },
];

const applicationSteps = [
  { step: "1", text: "Review open roles below or send a speculative application with your background and areas of interest." },
  { step: "2", text: "Initial screening call (30 minutes) to discuss fit, background, and mutual expectations." },
  { step: "3", text: "Technical or domain assessment appropriate to the role." },
  { step: "4", text: "Final interview with a senior team member and a discussion of the engagement you would work on." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        badge="Careers"
        h1="Build Technology That Matters In an Industry Where It Truly Does"
        subheadline="At Hephzibah Technologies, you will work on technically challenging problems in an industry where getting things right has real consequences."
        paragraph="Life sciences is one of the most demanding and most meaningful domains in which to apply technology skills. The systems we build support drug development, quality assurance, clinical data management, and laboratory operations. We are looking for people who want that challenge and who want to build it right, not just build it fast."
        primaryCta={{ label: "View Open Roles", href: "#open-roles" }}
        secondaryCta={{ label: "Send a Speculative Application", href: "/careers/apply" }}
      />

      {/* Why Hephzibah */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Why Hephzibah
            </p>
            <h2 className="text-3xl font-bold text-slate-900">What Makes Working Here Different</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl border border-slate-100 bg-slate-50 p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-5 h-5 text-sky-500" />
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic roles from DB */}
      <OpenRolesSection />

      {/* Culture */}
      <section className="bg-slate-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-3">
              Our Culture
            </p>
            <h2 className="text-3xl font-bold text-white">The Environment You Would Be Joining</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {cultureItems.map((item) => (
              <div key={item.title} className="rounded-xl bg-slate-800 border border-slate-700 p-5">
                <p className="text-sm font-bold text-white mb-1">{item.title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application process */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Application Process
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How to Apply</h2>
            <p className="text-base text-slate-600">
              We aim to complete our hiring process within two to three weeks of initial contact.
            </p>
          </div>
          <div className="max-w-xl mx-auto space-y-4">
            {applicationSteps.map((step) => (
              <div key={step.step} className="flex gap-4 items-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-600 text-white text-xs font-bold shrink-0">
                  {step.step}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed pt-1">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
