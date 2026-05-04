"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ServerCog, FileLock2, Bot } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

const services = [
  {
    label: "Staff Augmentation",
    href: "/services/staff-augmentation",
    description: "Scale your team with expert AI developers",
  },
  {
    label: "AI Development",
    href: "/services/ai-product-development",
    description: "Custom AI solutions for life sciences",
  },
  {
    label: "IT Managed Services",
    href: "/services/managed-services",
    description: "Compliance-aware IT infrastructure",
  },
];

const productItems = [
  {
    label: "HT MFT",
    href: "/products#product-ht-mft",
    icon: ServerCog,
    description: "Secure file transfer solution",
  },
  {
    label: "HT Digital Validation Accelerator",
    href: "/products#product-ht-digital-validation-accelerator-for-opentext-alm",
    icon: FileLock2,
    description: "Digital validation for OpenText ALM",
  },
  {
    label: "HTI Chat",
    href: "/products#product-hti-chat-engine",
    icon: Bot,
    description: "Intelligent chat engine",
  },
];

// Nav items — Services and Products have dropdowns
type NavLink =
  | { label: string; href: string; dropdown?: never }
  | { label: string; href: string; dropdown: "services" | "products" };

const navLinks: NavLink[] = [
  { label: "Services", href: "/services", dropdown: "services" },
  { label: "Products", href: "/products", dropdown: "products" },
  { label: "Industries", href: "/industries" },
  { label: "Approach", href: "/approach" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"services" | "products" | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<"services" | "products" | null>(null);

  const pathname = usePathname();
  const servicesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cancel any pending close when opening
  const handleMouseEnter = useCallback((key: "services" | "products") => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenDropdown(key);
  }, []);

  // Delay close so user can move mouse from trigger to dropdown
  const handleMouseLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Reset on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]);

  const toggleMobileExpanded = (key: "services" | "products") =>
    setMobileExpanded((prev) => (prev === key ? null : key));

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/60 shadow-lg shadow-slate-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <Image
              src="/logo.png"
              alt="Hephzibah Technologies"
              width={58}
              height={58}
              className="rounded-sm"
              priority
            />
            <div className="leading-tight">
              <span className="block text-white font-bold text-[24px] tracking-wide">Hephzibah</span>
              <span className="block text-sky-400 text-[19px] font-medium tracking-widest uppercase">
                Technologies
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              // Services dropdown — opens on hover
              if (link.dropdown === "services") {
                return (
                  <div
                    key="services"
                    className="relative"
                    ref={servicesRef}
                    onMouseEnter={() => handleMouseEnter("services")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={link.href}
                      className={clsx(
                        "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive(link.href)
                          ? "text-sky-400"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={clsx(
                          "w-4 h-4 transition-transform duration-300",
                          openDropdown === "services" && "rotate-180"
                        )}
                      />
                    </Link>
                    <div
                      className={clsx(
                        "absolute top-full left-0 pt-2 z-50 transition-all duration-300 ease-out origin-top",
                        openDropdown === "services"
                          ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
                      )}
                    >
                      <div className="w-80 bg-white rounded-xl shadow-xl border border-slate-200/80 overflow-hidden">
                        {/* Header */}
                        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                          <Link
                            href="/services"
                            className="text-[11px] font-bold text-sky-600 uppercase tracking-widest hover:text-sky-700 transition-colors"
                          >
                            All Services
                          </Link>
                        </div>
                        {/* Links */}
                        <div className="py-1">
                          {services.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              className="block px-4 py-2.5 hover:bg-slate-50 group/item transition-colors"
                            >
                              <div className="text-sm font-semibold text-slate-900 group-hover/item:text-sky-600 transition-colors">
                                {s.label}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Products dropdown — opens on hover
              if (link.dropdown === "products") {
                return (
                  <div
                    key="products"
                    className="relative"
                    ref={productsRef}
                    onMouseEnter={() => handleMouseEnter("products")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={link.href}
                      className={clsx(
                        "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive(link.href)
                          ? "text-sky-400"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={clsx(
                          "w-4 h-4 transition-transform duration-300",
                          openDropdown === "products" && "rotate-180"
                        )}
                      />
                    </Link>
                    <div
                      className={clsx(
                        "absolute top-full left-0 pt-2 z-50 transition-all duration-300 ease-out origin-top",
                        openDropdown === "products"
                          ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
                      )}
                    >
                      <div className="w-96 bg-white rounded-xl shadow-xl border border-slate-200/80 overflow-hidden">
                        {/* Header */}
                        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                          <Link
                            href="/products"
                            className="text-[11px] font-bold text-sky-600 uppercase tracking-widest hover:text-sky-700 transition-colors"
                          >
                            All Products
                          </Link>
                        </div>
                        {/* Links */}
                        <div className="py-1">
                          {productItems.map((p) => (
                            <Link
                              key={p.href}
                              href={p.href}
                              className="block px-4 py-2.5 hover:bg-slate-50 group/item transition-colors"
                            >
                              <span className="text-sm font-semibold text-slate-900 group-hover/item:text-sky-600 transition-colors">
                                {p.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Regular link
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={clsx(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "text-sky-400"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400 transition-colors shadow-sm"
            >
              Book a Discovery Call
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              if (link.dropdown === "services") {
                return (
                  <div key="services-mobile">
                    <button
                      type="button"
                      onClick={() => toggleMobileExpanded("services")}
                      className={clsx(
                        "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive(link.href)
                          ? "text-sky-400 bg-slate-800"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={clsx(
                          "w-4 h-4 transition-transform duration-200",
                          mobileExpanded === "services" && "rotate-180"
                        )}
                      />
                    </button>
                    {mobileExpanded === "services" && (
                      <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-slate-700 pl-4">
                        <Link
                          href="/services"
                          className="block px-2 py-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                        >
                          All Services
                        </Link>
                        {services.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className="block px-2 py-1.5 text-sm text-slate-400 hover:text-sky-400 transition-colors"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (link.dropdown === "products") {
                return (
                  <div key="products-mobile">
                    <button
                      type="button"
                      onClick={() => toggleMobileExpanded("products")}
                      className={clsx(
                        "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive(link.href)
                          ? "text-sky-400 bg-slate-800"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={clsx(
                          "w-4 h-4 transition-transform duration-200",
                          mobileExpanded === "products" && "rotate-180"
                        )}
                      />
                    </button>
                    {mobileExpanded === "products" && (
                      <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-slate-700 pl-4">
                        <Link
                          href="/products"
                          className="block px-2 py-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                        >
                          All Products
                        </Link>
                        {productItems.map((p) => (
                          <Link
                            key={p.href}
                            href={p.href}
                            className="block px-2 py-1.5 group/item"
                          >
                            <span className="text-sm text-slate-400 group-hover/item:text-sky-400 transition-colors">
                              {p.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={clsx(
                    "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "text-sky-400 bg-slate-800"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-slate-800">
              <Link
                href="/contact"
                className="block w-full text-center rounded-md bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-400 transition-colors"
              >
                Book a Discovery Call
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
