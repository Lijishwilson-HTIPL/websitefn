import Link from "next/link";
import Image from "next/image";
import { Mail, Linkedin, Globe } from "lucide-react";

const footerNav = {
  services: [
    { label: "Staff Augmentation", href: "/services/staff-augmentation" },
    { label: "AI Development", href: "/services/ai-product-development" },
    { label: "IT Managed Services", href: "/services/managed-services" },
    { label: "All Services", href: "/services" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Approach & Methodology", href: "/approach" },
    { label: "Compliance & Quality", href: "/compliance" },
    { label: "Careers", href: "/careers" },
  ],
  industries: [
    { label: "Pharma & Biotech", href: "/industries" },
    { label: "Medtech & Diagnostics", href: "/industries" },
    { label: "CROs & CDMOs", href: "/industries" },
    { label: "Regulated Labs", href: "/industries" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <Image
                src="/logo.png"
                alt="Hephzibah Technologies"
                width={44}
                height={44}
                className="rounded-sm"
              />
              <div className="leading-tight">
                <span className="block text-white font-bold text-[17px] tracking-wide">
                  Hephzibah
                </span>
                <span className="block text-sky-400 text-[12px] font-medium tracking-widest uppercase">
                  Technologies
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-2">
              AI-powered technology partner for life sciences built at the intersection of AI engineering, domain expertise, and compliance discipline.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Offices in New Jersey, USA and Tamil Nadu, India.<br />
              Serving clients across the US, Europe, and the Middle East.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="mailto:contact@hephzibahtech.in"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="https://www.linkedin.com/company/hephzibah-technologies-in/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="https://www.hephzibahtech.in"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <FooterColumn title="Services" links={footerNav.services} />
          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Industries" links={footerNav.industries} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Hephzibah Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/compliance" className="hover:text-slate-300 transition-colors">
              Compliance & Quality
            </Link>
            <span>·</span>
            <span>New Jersey, USA &amp; Tamil Nadu, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-slate-400 hover:text-sky-400 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
