import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Linkedin, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Book a Discovery Call",
  description:
    "Get in touch with Hephzibah Technologies. Book a discovery call, request a proposal, or ask about a specific AI or managed services use case in life sciences.",
};

const nextSteps = [
  {
    step: "1",
    title: "We Read Your Message Carefully",
    desc: "Your message goes to a senior team member not a CRM queue. We will read what you wrote before we respond.",
  },
  {
    step: "2",
    title: "We Respond Within One Business Day",
    desc: "For most inquiries, you will hear from us within 24 hours. We will either answer your question directly or propose a short call.",
  },
  {
    step: "3",
    title: "First Call   No Pressure, No Pitch",
    desc: "Our first conversation is a listening session. We want to understand your environment, your challenge, and whether we are genuinely a good fit. If we're not, we'll tell you.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 mb-6">
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                Contact
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
              Let's Talk About What You're Trying to Build or Fix
            </h1>
            <p className="text-xl text-sky-300 font-medium mb-4">
              Whether you have a specific use case in mind or you are still mapping out the problem, we are ready to have a useful conversation.
            </p>
            <p className="text-base text-slate-400 leading-relaxed">
              We don't have a standard sales pitch. Every conversation we have is shaped by the specific challenge, environment, and constraints of the organization we are talking with.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
                  Get in Touch
                </p>
                <h2 className="text-2xl font-bold text-slate-900">
                  Pick a Time, Then Tell Us About Your Initiative
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  First choose a date and time that works for you. Then share a little about your situation and we will respond with a considered, relevant reply. Not a brochure.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Side info */}
            <div className="lg:col-span-2 space-y-8">
              {/* What happens next */}
              <div>
                <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-4">
                  What Happens Next
                </p>
                <div className="space-y-5">
                  {nextSteps.map((s) => (
                    <div key={s.step} className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-600 text-white text-xs font-bold shrink-0">
                        {s.step}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 mb-1">{s.title}</p>
                        <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct contact */}
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-7">
                <p className="text-sm font-semibold text-slate-900 mb-4">Direct Contact</p>
                <div className="space-y-3">
                  <a
                    href="mailto:contact@hephzibahtech.in"
                    className="flex items-center gap-3 text-sm text-slate-600 hover:text-sky-600 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                    contact@hephzibahtech.in
                  </a>
                  <a
                    href="https://www.linkedin.com/company/hephzibah-technologies-in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-slate-600 hover:text-sky-600 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-sky-500 shrink-0" />
                    LinkedIn   Hephzibah Technologies
                  </a>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Globe className="w-4 h-4 text-sky-500 shrink-0" />
                    New Jersey, USA &amp; Tamil Nadu, India
                  </div>
                </div>
              </div>

              {/* For candidates */}
              <div className="rounded-xl border border-amber-100 bg-amber-50 p-5">
                <p className="text-sm font-bold text-amber-800 mb-2">Looking to Join Our Team?</p>
                <p className="text-xs text-amber-700 leading-relaxed mb-3">
                  If you are interested in a career at Hephzibah Technologies rather than a client engagement, please visit our Careers page for open roles and application instructions.
                </p>
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900"
                >
                  View Careers
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Not ready CTA */}
              <div>
                <p className="text-sm text-slate-500 mb-3">Not ready to fill out a form?</p>
                <div className="flex flex-col gap-2">
                  <Link href="/services" className="flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Browse our services
                  </Link>
                  <Link href="/approach" className="flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Read about our approach
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
