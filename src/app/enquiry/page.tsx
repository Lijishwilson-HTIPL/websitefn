import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { ShieldCheck, Clock, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Partner Enquiry | Hephzibah Technologies",
  description: "Get in touch with Hephzibah Technologies to discuss AI, Compliance, or Life Science Product Development.",
};

export default function EnquiryPage() {
  return (
    <main className="min-h-[100dvh] w-full flex flex-col lg:flex-row bg-slate-50 font-sans overflow-x-hidden">
        
      {/* Left pane - Brand / Trust */}
      <div className="relative w-full lg:w-5/12 bg-slate-900 text-white p-6 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden shrink-0 min-h-[400px]">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none bg-no-repeat bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: "url('/4.png')" }}
        />
        {/* Subtle glow elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(14,165,233,0.18)_0%,_transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(99,102,241,0.12)_0%,_transparent_60%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-8 sm:gap-12">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo.png"
              alt="Hephzibah Technologies"
              width={58}
              height={58}
              className="rounded-sm shadow-md sm:w-[68px] sm:h-[68px]"
              priority
            />
            <div className="leading-tight">
              <span className="block text-white font-bold text-[22px] sm:text-[24px] tracking-wide">Hephzibah</span>
              <span className="block text-sky-400 text-[11px] sm:text-[12px] font-semibold tracking-widest uppercase">
                Technologies
              </span>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 mb-6 sm:mb-8">
              <span className="text-[10px] sm:text-[11px] font-semibold text-sky-400 uppercase tracking-wider">
                Official Partner Enquiry
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-tight">
              Let's Build or Fix Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Meaningful</span>.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-lg mb-8 sm:mb-12">
              Whether you have a specific use case in mind or you are still mapping out the problem, we are ready to have a useful, no-pressure conversation regarding your life science initiative.
            </p>

            {/* Trust Indicators */}
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-800 border border-slate-700 shrink-0 text-sky-400 group-hover:bg-sky-500/10 group-hover:border-sky-500/30 group-hover:text-sky-300 transition-all duration-300">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1 sm:mb-1.5">Carefully Reviewed</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Your message goes directly to a senior team member, not an automated CRM queue.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-800 border border-slate-700 shrink-0 text-sky-400 group-hover:bg-sky-500/10 group-hover:border-sky-500/30 group-hover:text-sky-300 transition-all duration-300">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1 sm:mb-1.5">Fast Response</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">You will hear from us within one business day addressing your specific query.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-800 border border-slate-700 shrink-0 text-sky-400 group-hover:bg-sky-500/10 group-hover:border-sky-500/30 group-hover:text-sky-300 transition-all duration-300">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1 sm:mb-1.5">Confidential & Secure</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">All information shared is strictly confidential and protected by default.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 mt-10 sm:mt-16 lg:mt-0 pt-6 sm:pt-8 border-t border-slate-800 text-[10px] sm:text-xs text-slate-500 font-medium">
          © {new Date().getFullYear()} Hephzibah Technologies. All rights reserved.
        </div>
      </div>

      {/* Right pane - Interactive Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-4 sm:p-8 lg:p-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(241,245,249,1)_0%,_rgba(248,250,252,1)_100%)] pointer-events-none" />
        
        <div className="relative w-full max-w-2xl bg-white p-5 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] sm:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] border border-slate-100 transition-all duration-500 hover:shadow-[0_20px_60px_-12px_rgba(2,132,199,0.1)]">
          <div className="mb-6 sm:mb-8 border-b border-slate-100 pb-5 sm:pb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5 sm:mb-2">Submit Your Enquiry</h2>
            <p className="text-xs sm:text-sm text-slate-500">Please fill out the details below to help us understand your environment and challenges.</p>
          </div>
          
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
