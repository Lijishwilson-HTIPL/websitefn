import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ArrowDownCircle,
  ShieldCheck,
  Bot,
  Layers,
  Users,
  Zap,
  Lock,
  BarChart3,
  FileText,
  Database,
  Search,
  MessagesSquare,
  GitBranch,
  ServerCog,
  FileLock2,
  Workflow,
  ScanLine,
} from "lucide-react";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Products | Trusted Digital Platforms for Life Sciences",
  description:
    "HT MFT, HT Digital Validation Accelerator, and HTI Chat Engine purpose-built digital platforms for regulated industries, validated environments, and enterprise AI.",
};

// ─── PRODUCT DATA ────────────────────────────────────────────────────────────

const products = [
  {
    id: "ht-mft",
    badge: "File Transfer",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    Icon: ServerCog,
    name: "HT MFT",
    subtitle: "Managed File Transfer Platform",
    tagline: "Secure, Compliant, and Intelligent File Exchange for Regulated Environments",
    cardDescription:
      "HT MFT automates and governs file exchange across internal systems, partner networks, and cloud environments built for organizations where every data transfer must meet compliance standards. It replaces fragile manual handoffs with a secure, monitored platform that generates defensible audit evidence with every transaction.",
    bullets: [
      { label: "Main use case", text: "Automated exchange of regulated and sensitive files across systems and partners" },
      { label: "Target user", text: "IT operations managers, quality coordinators, and compliance teams in pharma and regulated labs" },
      { label: "Key benefit", text: "Complete audit trail and compliance evidence for every file transfer event" },
    ],
    relevance: "Life Sciences · Regulated Labs · Enterprise",
  },
  {
    id: "ht-digital-validation-accelerator-for-opentext-alm",
    badge: "Validation",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    Icon: FileLock2,
    name: "HT Digital Validation Accelerator",
    subtitle: "for OpenText ALM",
    tagline: "CSA-Aligned, Paperless Validation for Regulated Systems",
    cardDescription:
      "A purpose-built validation acceleration layer for OpenText ALM that digitizes the entire validation lifecycle from requirements through testing, traceability, and approvals. It enables pharma and life science IT teams to meet CSA and 21 CFR Part 11 requirements while dramatically reducing cycle time, manual effort, and paper-based overhead.",
    bullets: [
      { label: "Main use case", text: "End-to-end digital validation lifecycle management within OpenText ALM" },
      { label: "Target user", text: "Validation engineers, QA/RA managers, and system owners in pharma and biotech" },
      { label: "Key benefit", text: "Reduced validation cycle time with full CSA alignment and traceability" },
    ],
    relevance: "Pharma · Biotech · Medtech",
  },
  {
    id: "hti-chat-engine",
    badge: "AI Platform",
    badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    Icon: Bot,
    name: "HTI Chat Engine",
    subtitle: "AI-Powered Knowledge Platform",
    tagline: "Search Less. Solve Faster. Stay Private.",
    cardDescription:
      "An enterprise AI chat platform built on a multi-stage RAG pipeline, designed for organizations that need powerful document intelligence with strict data privacy and tenant isolation. Users interact with their own scoped datasets SOPs, technical documents, knowledge bases receiving accurate, sourced answers without any cross-tenant data exposure.",
    bullets: [
      { label: "Main use case", text: "Secure AI-powered Q&A and search over internal regulated document repositories" },
      { label: "Target user", text: "IT teams, knowledge managers, and compliance leaders in regulated and enterprise organizations" },
      { label: "Key benefit", text: "Enterprise-grade data isolation with no leakage between tenants or user groups" },
    ],
    relevance: "Life Sciences · Enterprise · General",
  },
];

// ─── PRODUCT DETAIL DATA ─────────────────────────────────────────────────────

const mftDetail = {
  description: [
    "HT MFT is a managed file transfer platform purpose-built for regulated industries where secure, traceable, and policy-governed data exchange is non-negotiable. It supports multiple transfer protocols and enforces encryption, access controls, and governance policies from the moment a file enters the pipeline to the moment it reaches its destination.",
    "Unlike general-purpose file transfer tools, HT MFT is designed with compliance evidence as a first-class output every transfer generates audit-ready records that support regulatory inspection readiness. Organizations can automate complex multi-step workflows without sacrificing the traceability their quality and compliance teams require.",
    "The platform provides a centralized monitoring console that gives IT and operations teams real-time visibility into transfer status, failures, and performance reducing the manual investigation burden and enabling proactive incident response.",
  ],
  features: [
    "Secure multi-protocol file transfer (SFTP, FTPS, HTTPS, AS2)",
    "Compliance-ready encryption and data protection controls",
    "Automated workflow orchestration with conditional routing",
    "Centralized monitoring dashboard with real-time transfer status",
    "Comprehensive audit logging and compliance reporting",
    "Role-based access control and multi-tenant user management",
    "Configurable alerting for failures, delays, and anomalies",
  ],
  workflows: [
    "Regulated data exchange between pharma sites and CDMOs/CROs",
    "Automated batch file delivery to and from analytical instruments",
    "Secure partner and vendor file sharing with audit evidence",
    "Cross-system data handoffs between LIMS, ERP, and cloud storage",
  ],
  integrations: [
    "LIMS and laboratory informatics platforms",
    "ERP and enterprise data systems",
    "Cloud storage (Azure Blob, AWS S3, GCP)",
    "Partner and vendor networks via standard protocols",
  ],
  forWhom: [
    "IT operations and infrastructure teams in regulated industries",
    "Quality and compliance managers requiring defensible audit trails",
    "Lab data coordinators managing instrument and system data flows",
    "CDMOs and CROs exchanging sensitive sponsor data",
  ],
  cta: "Talk to Us About HT MFT",
  icons: [Lock, BarChart3, Workflow, ShieldCheck],
};

const dvaDetail = {
  description: [
    "The HT Digital Validation Accelerator transforms how life science organizations approach system validation by bringing the entire lifecycle requirements, test design, execution, traceability, and approvals into a single digital workflow within OpenText ALM. It eliminates the paper trails, disconnected spreadsheets, and manual signature processes that slow validation teams down and introduce documentation risk.",
    "Built in alignment with FDA's Computer Software Assurance (CSA) guidance and GAMP 5 principles, the accelerator applies a risk-based approach to validation effort focusing rigor where it matters most rather than applying uniform documentation overhead to every system. This allows teams to be leaner without becoming less compliant.",
    "With dynamic traceability matrix generation, automated evidence packaging, and role-based governance built in, the accelerator makes regulatory inspection readiness a byproduct of normal workflow not a separate, time-consuming preparation exercise.",
  ],
  features: [
    "End-to-end digital validation lifecycle within OpenText ALM",
    "CSA-aligned, risk-based validation framework and effort categorization",
    "Paperless approvals and digital signatures (21 CFR Part 11 aligned)",
    "Automated requirements-to-test traceability matrix generation",
    "Validation evidence packaging and summary report generation",
    "Role-based governance with segregation of duties enforcement",
    "Test script authoring, execution tracking, and defect management",
  ],
  workflows: [
    "New system validation and go-live qualification (IQ/OQ/PQ or CSA)",
    "Periodic review and validation status maintenance",
    "Change control documentation and impact assessment for validated systems",
    "Regulatory inspection readiness and evidence retrieval",
  ],
  integrations: [
    "OpenText ALM (primary platform)",
    "LIMS and eQMS systems for system context data",
    "Enterprise SSO and identity management platforms",
    "Document management systems (SharePoint, OpenText Content Suite)",
  ],
  forWhom: [
    "Validation engineers and CSV/CSA specialists in pharma and biotech",
    "QA and RA directors overseeing validated system portfolios",
    "System owners responsible for maintaining validated state",
    "IT project managers delivering systems into regulated environments",
  ],
  cta: "Request a Demo of the Validation Accelerator",
  icons: [FileText, GitBranch, ScanLine, ShieldCheck],
};

const chatDetail = {
  description: [
    "HTI Chat Engine is an enterprise AI platform built from the ground up for organizations that need powerful, private document intelligence without the compliance and data governance risks of general-purpose consumer AI tools. It delivers a multi-stage RAG pipeline covering retrieval, query expansion, semantic search, reranking, and context assembly that consistently surfaces accurate, sourced answers from your own internal documents.",
    "The platform's architecture is built around strict tenant isolation: each user group or department interacts only with their own scoped dataset, and no data crosses tenant boundaries. JWT authentication, role-scoped route guards, and a granular admin permission matrix give IT and security teams the control they need to deploy AI safely in regulated and sensitive environments.",
    "Designed for production workloads, HTI Chat Engine handles document ingestion (PDF, DOCX, TXT, Markdown up to 100MB), delivers responses via live token streaming, and provides programmatic API access for integration into existing workflows and internal tooling.",
  ],
  features: [
    "Multi-stage RAG pipeline with query expansion, ChromaDB search, and cross-encoder reranking",
    "Exact token budgeting with binary-search truncation for consistent context quality",
    "Live SSE token streaming with stop-generation control",
    "JWT authentication with auto-refresh and role-scoped route guards",
    "Document ingestion for PDF, DOCX, TXT, and Markdown (up to 100MB)",
    "Enterprise admin console with granular permission matrix",
    "Per-tenant data scope isolation no cross-tenant data exposure",
    "Scheduled maintenance mode with automated traffic routing",
    "Programmatic API access for integration into internal systems",
  ],
  workflows: [
    "AI-powered Q&A and search over SOPs, protocols, and validation documents",
    "Technical knowledge base navigation for lab and operations teams",
    "Internal support automation over product documentation and runbooks",
    "Scoped document intelligence for quality and compliance teams",
  ],
  integrations: [
    "Internal document repositories and SharePoint libraries",
    "Enterprise identity providers via JWT",
    "Internal workflow and operations platforms via REST API",
    "Custom data ingestion from LIMS, eQMS, and knowledge bases",
  ],
  forWhom: [
    "IT and platform teams deploying secure enterprise AI",
    "Knowledge managers and documentation teams in regulated industries",
    "Compliance and quality leaders needing scoped, auditable AI access",
    "Operations and R&D teams seeking faster access to internal knowledge",
  ],
  cta: "Request a Trial of HTI Chat Engine",
  icons: [Search, Database, MessagesSquare, Lock],
};

const allDetails = [
  { product: products[0], detail: mftDetail },
  { product: products[1], detail: dvaDetail },
  { product: products[2], detail: chatDetail },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-900">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none bg-no-repeat bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: "url('/4.png')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(14,165,233,0.12)_0%,_transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.08)_0%,_transparent_60%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 mb-6">
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                Our Products
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-5">
              Trusted Digital Platforms for{" "}
              <span className="text-sky-400">Compliant Life Sciences</span>
            </h1>
            <p className="text-xl text-sky-300 font-medium mb-4">
              Three production-ready platforms each built to meet the security, compliance, and operational requirements of regulated environments.
            </p>
            <p className="text-base text-slate-400 leading-relaxed mb-8 max-w-2xl">
              Our product line covers the operational and compliance challenges that recur across life science IT governed file exchange, digital validation, and secure enterprise AI. Each platform ships with the audit trails, access controls, and compliance alignment your quality and IT teams require.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 rounded-md bg-sky-500 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-400 transition-colors shadow-lg"
              >
                See All Products
                <ArrowDownCircle className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-slate-400 hover:text-white transition-colors"
              >
                Request a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS OVERVIEW GRID ── */}
      <section id="products" className="bg-white py-16 lg:py-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-3">
              Product Portfolio
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Three Platforms. One Focused Partner.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Each product addresses a distinct but related challenge in regulated IT. They can be deployed independently or together as part of a broader digital infrastructure strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products.map((p) => {
              const Icon = p.Icon;
              return (
                <div
                  key={p.id}
                  className="group flex flex-col rounded-2xl border border-slate-100 bg-slate-50 p-8 hover:shadow-lg hover:border-slate-200 transition-all duration-200"
                >
                  {/* Badge + icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${p.iconBg}`}>
                      <Icon className={`w-6 h-6 ${p.iconColor}`} />
                    </div>
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-bold text-slate-900 leading-snug mb-0.5">
                    {p.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mb-3">{p.subtitle}</p>
                  <p className="text-xs font-semibold text-sky-600 italic mb-4">&ldquo;{p.tagline}&rdquo;</p>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">
                    {p.cardDescription}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-2.5 mb-6">
                    {p.bullets.map((b) => (
                      <li key={b.label} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-600 leading-relaxed">
                          <span className="font-semibold text-slate-700">{b.label}:</span>{" "}
                          {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Relevance tag */}
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-4">
                    {p.relevance}
                  </p>

                  {/* CTA */}
                  <Link
                    href={`#product-${p.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors group-hover:gap-2.5 mt-auto"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INDIVIDUAL PRODUCT DETAIL SECTIONS ── */}
      {allDetails.map(({ product: p, detail: d }, idx) => {
        const isEven = idx % 2 === 0;
        const DetailIcon1 = d.icons[0];
        const DetailIcon2 = d.icons[1];
        const DetailIcon3 = d.icons[2];
        const DetailIcon4 = d.icons[3];

        return (
          <section
            key={p.id}
            id={`product-${p.id}`}
            className={`scroll-mt-16 py-16 lg:py-24 ${isEven ? "bg-slate-50" : "bg-white"}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
                <div className={`flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 ${p.iconBg}`}>
                  <p.Icon className={`w-7 h-7 ${p.iconColor}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">{p.relevance}</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
                    {p.name}
                    {p.subtitle && (
                      <span className="text-slate-400 font-normal">   {p.subtitle}</span>
                    )}
                  </h2>
                  <p className="text-sm text-sky-600 font-medium italic mt-1">&ldquo;{p.tagline}&rdquo;</p>
                </div>
              </div>

              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

                {/* Left: description + who is it for + CTA */}
                <div className="lg:col-span-3 space-y-6">
                  {d.description.map((para, i) => (
                    <p key={i} className="text-base text-slate-600 leading-relaxed">{para}</p>
                  ))}

                  {/* Who is it for */}
                  <div className="rounded-xl bg-white border border-slate-100 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-4 h-4 text-sky-500" />
                      <h3 className="text-sm font-bold text-slate-900">Who Is It For?</h3>
                    </div>
                    <ul className="space-y-2">
                      {d.forWhom.map((who) => (
                        <li key={who} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">{who}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 transition-colors shadow-sm"
                    >
                      {d.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="#products"
                      className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-800 transition-colors"
                    >
                      Back to Products
                    </Link>
                  </div>
                </div>

                {/* Right: features, workflows, integrations + icon cluster */}
                <div className="lg:col-span-2 space-y-6">

                  {/* Icon cluster visual */}
                  <div className="rounded-2xl bg-slate-900 p-7">
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {[DetailIcon1, DetailIcon2, DetailIcon3, DetailIcon4].map((Ic, i) => (
                        <div key={i} className="flex items-center gap-2 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2.5">
                          <Ic className="w-4 h-4 text-sky-400 shrink-0" />
                          <span className="text-xs text-slate-300 font-medium leading-tight">
                            {["Security", "Analytics", "Workflow", "Compliance"][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-sky-400" />
                      <span className="text-xs text-slate-400 leading-relaxed">
                        Built for production deployment in regulated environments
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {d.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Zap className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-700 leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Workflows */}
                  <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                      Typical Workflows Supported
                    </h3>
                    <ul className="space-y-2">
                      {d.workflows.map((w) => (
                        <li key={w} className="flex items-start gap-2">
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-700 leading-relaxed">{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Integrations */}
                  <div className="rounded-xl border border-sky-50 bg-sky-50 p-6">
                    <h3 className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-3">
                      Integration Points
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {d.integrations.map((int) => (
                        <span
                          key={int}
                          className="rounded-full bg-white border border-sky-100 px-3 py-1 text-xs text-slate-700 font-medium"
                        >
                          {int}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Divider before CTA */}
      <div className="bg-slate-100 h-px" />

      <CTABanner
        heading="Ready to See Our Products in Action?"
        subtext="Whether you need a file transfer platform, a digital validation solution, or a secure enterprise AI we're ready to walk you through a live demonstration tailored to your environment."
        primaryCta={{ label: "Request a Demo", href: "/contact" }}
        secondaryCta={{ label: "Talk to Our Team", href: "/contact" }}
      />
    </>
  );
}
