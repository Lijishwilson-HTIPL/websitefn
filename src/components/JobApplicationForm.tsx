"use client";

import { useState, useRef } from "react";
import { ArrowRight, Loader2, CheckCircle2, Upload } from "lucide-react";
import { useJobRoles } from "@/hooks/useJobRoles";
import { submitCareerInquiry } from "@/services/careerInquiry";


const referralSources = [
  "LinkedIn",
  "Google Search",
  "Social Media",
  "Referral",
  "Conference / Event",
  "Blog / Article",
  "Other",
];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  role: string;
  experience: string;
  linkedIn: string;
  resumeLink: string;
  portfolioLink: string;
  message: string;
  referral: string;
  referralOther: string;
}

export default function JobApplicationForm({
  defaultRole = "",
  onRoleChange,
}: {
  defaultRole?: string;
  onRoleChange?: (role: string) => void;
}) {
  const { roles, loading: rolesLoading } = useJobRoles();
  const roleTitles = ["Speculative / General Application", ...roles.map((r) => r.title)];
  const noOpenings = !rolesLoading && roles.length === 0;

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    role: defaultRole,
    experience: "",
    linkedIn: "",
    resumeLink: "",
    portfolioLink: "",
    message: "",
    referral: "",
    referralOther: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "role") onRoleChange?.(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!resumeFile) {
      alert("Please upload your Resume / CV file.");
      return;
    }

    setSubmitting(true);

    try {
      await submitCareerInquiry({
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        business_email: form.email,
        mobile_number: form.mobileNumber,
        phone_number: form.mobileNumber,
        role_applied_for: form.role,
        role_applying_for: form.role,
        role_title: form.role,
        organization_name: "Individual Applicant",
        organization_type: "Other",
        primary_interest: "Other",
        challenge_or_initiative: form.message,
        years_of_experience: form.experience,
        linkedin_url: form.linkedIn,
        linkedin_profile_url: form.linkedIn,
        resume_file: resumeFile,
        portfolio_link: form.portfolioLink || undefined,
        portfolio_site: form.portfolioLink || undefined,
        cover_letter: form.message,
        tell_us_about_yourself: form.message,
        how_did_you_hear: form.referral || undefined,
        other_source: form.referral === "Other" ? form.referralOther || undefined : undefined,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again.");
    }

    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-sky-100 bg-sky-50 p-10 text-center">
        <CheckCircle2 className="w-12 h-12 text-sky-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">Application Received</h3>
        <p className="text-base text-slate-600 max-w-sm mx-auto">
          Thank you for applying. A member of our team will review your application and respond within two business days.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors";
  const labelClass = "block text-xs font-semibold text-slate-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={handleChange}
            placeholder="Jane"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={form.lastName}
            onChange={handleChange}
            placeholder="Smith"
            className={inputClass}
          />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jane.smith@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="mobileNumber" className={labelClass}>
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            required
            value={form.mobileNumber}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className={inputClass}
          />
        </div>
      </div>

      {/* Role + Experience */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="role" className={labelClass}>
            Role You Are Applying For <span className="text-red-500">*</span>
          </label>
          {noOpenings ? (
            <>
              <input type="hidden" name="role" value="Speculative / General Application" />
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 font-medium leading-snug">
                No open positions right now. Your application will be filed as a{" "}
                <span className="font-bold">Speculative Application</span> — we'll reach out when a suitable role opens.
              </div>
            </>
          ) : (
            <select
              id="role"
              name="role"
              required
              value={form.role}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="" disabled>Select a role</option>
              {roleTitles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label htmlFor="experience" className={labelClass}>
            Years of Relevant Experience <span className="text-red-500">*</span>
          </label>
          <input
            id="experience"
            name="experience"
            type="number"
            min="0"
            step="0.1"
            required
            value={form.experience}
            onChange={handleChange}
            placeholder="e.g. 1.5"
            className={inputClass}
          />
        </div>
      </div>

      {/* LinkedIn — mandatory */}
      <div>
        <label htmlFor="linkedIn" className={labelClass}>
          LinkedIn Profile URL <span className="text-red-500">*</span>
        </label>
        <input
          id="linkedIn"
          name="linkedIn"
          type="url"
          required
          value={form.linkedIn}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/yourprofile"
          className={inputClass}
        />
      </div>

      {/* Resume / CV — upload only */}
      <div>
        <label className={labelClass}>
          Resume / CV <span className="text-red-500">*</span>
        </label>
        <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-md border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-colors"
          >
            <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1.5" />
            {resumeFile ? (
              <p className="text-sm font-medium text-slate-700">{resumeFile.name}</p>
            ) : (
              <>
                <p className="text-sm text-slate-500">Click to upload your resume</p>
                <p className="text-xs text-slate-400 mt-0.5">PDF, DOC, or DOCX · Max 10 MB</p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
      </div>

      {/* Portfolio — optional */}
      <div>
        <label htmlFor="portfolioLink" className={labelClass}>
          Portfolio / Personal Site{" "}
          <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <input
          id="portfolioLink"
          name="portfolioLink"
          type="url"
          value={form.portfolioLink}
          onChange={handleChange}
          placeholder="https://yourportfolio.com"
          className={inputClass}
        />
      </div>

      {/* Cover letter */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Tell Us About Yourself <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Briefly describe your background, what draws you to this role, and any relevant experience in regulated environments, AI/ML, or life sciences."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Referral */}
      <div>
        <label htmlFor="referral" className={labelClass}>
          How Did You Hear About Us?{" "}
          <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <select
          id="referral"
          name="referral"
          value={form.referral}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select source</option>
          {referralSources.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {form.referral === "Other" && (
          <div className="mt-2 relative">
            <input
              type="text"
              name="referralOther"
              value={form.referralOther}
              onChange={(e) => {
                if (e.target.value.length <= 250)
                  setForm((prev) => ({ ...prev, referralOther: e.target.value }));
              }}
              placeholder="Please specify…"
              maxLength={250}
              className={inputClass}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
              {form.referralOther.length}/250
            </span>
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              Submit Application
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
        <p className="mt-3 text-xs text-slate-400">
          We use the information you provide only to evaluate your application. We do not share it with third parties or use it for unsolicited marketing.
        </p>
      </div>
    </form>
  );
}
