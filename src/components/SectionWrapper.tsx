import clsx from "clsx";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  bg?: "white" | "slate" | "dark" | "sky";
  id?: string;
}

export default function SectionWrapper({
  children,
  className,
  bg = "white",
  id,
}: SectionWrapperProps) {
  const bgClass = {
    white: "bg-white",
    slate: "bg-slate-50",
    dark: "bg-slate-900",
    sky: "bg-sky-50",
  }[bg];

  return (
    <section id={id} className={clsx(bgClass, "py-16 lg:py-24", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
