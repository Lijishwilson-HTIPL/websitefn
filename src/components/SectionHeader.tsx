import clsx from "clsx";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = "left",
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        "mb-12",
        align === "center" && "text-center"
      )}
    >
      {eyebrow && (
        <p
          className={clsx(
            "text-sm font-semibold uppercase tracking-wider mb-3",
            dark ? "text-sky-400" : "text-sky-600"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={clsx(
          "text-3xl lg:text-4xl font-bold tracking-tight",
          dark ? "text-white" : "text-slate-900",
          align === "center" ? "mx-auto max-w-3xl" : ""
        )}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          className={clsx(
            "mt-4 text-lg leading-relaxed",
            dark ? "text-slate-400" : "text-slate-600",
            align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
