import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  heading: string;
  subtext: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function CTABanner({
  heading,
  subtext,
  primaryCta,
  secondaryCta,
}: CTABannerProps) {
  return (
    <section className="bg-slate-900 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-br from-sky-600 to-sky-800 px-8 py-12 text-center overflow-hidden">
          {/* Decorative */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_60%)] pointer-events-none" />

          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 relative">
            {heading}
          </h2>
          <p className="text-sky-100 text-lg max-w-2xl mx-auto mb-8 relative">
            {subtext}
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-sky-700 hover:bg-sky-50 transition-colors shadow-md"
            >
              {primaryCta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
