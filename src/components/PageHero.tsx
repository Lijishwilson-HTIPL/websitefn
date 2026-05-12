import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

interface PageHeroProps {
  badge?: string;
  h1: string;
  subheadline: string;
  paragraph: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: "dark" | "light";
}

export default function PageHero({
  badge,
  h1,
  subheadline,
  paragraph,
  primaryCta,
  secondaryCta,
  variant = "dark",
}: PageHeroProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={clsx(
        "relative overflow-hidden",
        isDark ? "bg-slate-900" : "bg-slate-50 border-b border-slate-200"
      )}
    >
      {/* Background Image Overlay */}
      <div 
        className={clsx(
          "absolute inset-0 pointer-events-none bg-no-repeat bg-cover bg-center transition-opacity duration-700",
          isDark ? "opacity-40 mix-blend-luminosity" : "opacity-[0.05] grayscale"
        )}
        style={{ backgroundImage: "url('/4.png')" }}
      />

      {/* Decorative background elements for dark variant */}
      {isDark && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(14,165,233,0.12)_0%,_transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(99,102,241,0.08)_0%,_transparent_60%)] pointer-events-none" />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          {badge && (
            <div className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 mb-6">
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                {badge}
              </span>
            </div>
          )}

          <h1
            className={clsx(
              "text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-5",
              isDark ? "text-white" : "text-slate-900"
            )}
          >
            {h1}
          </h1>

          <p
            className={clsx(
              "text-xl font-medium mb-4",
              isDark ? "text-sky-300" : "text-sky-700"
            )}
          >
            {subheadline}
          </p>

          <p
            className={clsx(
              "text-base leading-relaxed mb-8 max-w-2xl",
              isDark ? "text-slate-400" : "text-slate-600"
            )}
          >
            {paragraph}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-md bg-sky-500 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-400 transition-colors shadow-md shadow-sky-900/30"
            >
              {primaryCta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>

            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className={clsx(
                  "inline-flex items-center gap-2 rounded-md border px-6 py-3 text-sm font-semibold transition-colors",
                  isDark
                    ? "border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white"
                    : "border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900"
                )}
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
