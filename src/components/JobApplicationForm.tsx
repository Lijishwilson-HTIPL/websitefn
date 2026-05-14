"use client";

import { useState, useRef } from "react";
import { ArrowRight, Loader2, CheckCircle2, Upload } from "lucide-react";
import { useJobRoles } from "@/hooks/useJobRoles";
import { submitCareerInquiry } from "@/services/careerInquiry";
import { submitJobApplicant } from "@/services/jobApplicant";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SPECULATIVE = "__speculative__";

const MAX_RESUME_BYTES = 10 * 1024 * 1024;
const ALLOWED_RESUME_EXT = [".pdf", ".doc", ".docx"];
const NAME_RE = /^[A-Za-z][A-Za-z\s'-]{0,49}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s().-]{7,20}$/;
const LINKEDIN_RE = /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9._-]+\/?$/i;
const URL_RE = /^https?:\/\/[^\s]+\.[^\s]+$/i;

const countDigits = (s: string) => (s.match(/\d/g) ?? []).length;


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
  roleId: string; // either a Job Opening name or SPECULATIVE
  experience: string;
  linkedIn: string;
  resumeLink: string;
  portfolioLink: string;
  message: string;
  referral: string;
  referralOther: string;
}

export default function JobApplicationForm({
  defaultRoleId = "",
  onRoleChange,
}: {
  defaultRoleId?: string;
  onRoleChange?: (roleId: string) => void;
}) {
  const { roles, loading: rolesLoading } = useJobRoles();
  const noOpenings = !rolesLoading && roles.length === 0;

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    roleId: defaultRoleId || (noOpenings ? SPECULATIVE : ""),
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
  const [submittedJobId, setSubmittedJobId] = useState<string | null>(null);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedRole = roles.find((r) => r.id === form.roleId) ?? null;
  const isSpeculative = form.roleId === SPECULATIVE || (!selectedRole && noOpenings);

  const validateField = (name: string, value: string, file: File | null = resumeFile): string => {
    const v = value.trim();
    switch (name) {
      case "firstName":
        if (!v) return "First Name is required.";
        if (v.length < 2) return "First Name must be at least 2 characters.";
        if (!NAME_RE.test(v)) return "First Name can only contain letters, spaces, hyphens, and apostrophes.";
        return "";
      case "lastName":
        if (!v) return "Last Name is required.";
        if (v.length < 2) return "Last Name must be at least 2 characters.";
        if (!NAME_RE.test(v)) return "Last Name can only contain letters, spaces, hyphens, and apostrophes.";
        return "";
      case "email":
        if (!v) return "Email Address is required.";
        if (!EMAIL_RE.test(v)) return "Enter a valid Email Address.";
        return "";
      case "mobileNumber": {
        if (!v) return "Phone Number is required.";
        if (!PHONE_RE.test(v)) return "Enter a valid Phone Number.";
        const d = countDigits(v);
        if (d < 7 || d > 15) return "Phone Number must have 7–15 digits.";
        return "";
      }
      case "roleId":
        if (!v) return "Please select a Role.";
        if (v !== SPECULATIVE && !roles.find((r) => r.id === v)) return "Selected Role is invalid.";
        return "";
      case "experience": {
        if (!v) return "Years of Experience is required.";
        const n = Number(v);
        if (!Number.isFinite(n)) return "Years of Experience must be a number.";
        if (n < 0 || n > 60) return "Years of Experience must be between 0 and 60.";
        if (/\.\d{2,}/.test(v)) return "Years of Experience allows at most 1 decimal place.";
        return "";
      }
      case "linkedIn":
        if (!v) return "LinkedIn Profile URL is required.";
        if (!LINKEDIN_RE.test(v)) return "Enter a valid LinkedIn Profile URL (https://linkedin.com/in/…).";
        return "";
      case "portfolioLink":
        if (!v) return "";
        if (!URL_RE.test(v)) return "Portfolio URL must start with http(s)://";
        return "";
      case "message":
        if (!v) return "Cover Letter is required.";
        if (v.length < 50) return `Cover Letter must be at least 50 characters (currently ${v.length}).`;
        if (v.length > 2000) return "Cover Letter must be under 2000 characters.";
        return "";
      case "referralOther":
        if (form.referral === "Other") {
          if (!v) return "Please specify how you heard about us.";
          if (v.length < 2) return "Please provide more detail.";
        }
        return "";
      case "resume": {
        if (!file) return "Resume is required.";
        if (file.size === 0) return "Resume file is empty.";
        if (file.size > MAX_RESUME_BYTES) return "Resume must be 10 MB or smaller.";
        const lower = file.name.toLowerCase();
        if (!ALLOWED_RESUME_EXT.some((ext) => lower.endsWith(ext))) return "Resume must be a PDF, DOC, or DOCX.";
        return "";
      }
      default:
        return "";
    }
  };

  const validateAll = (): Record<string, string> => {
    const fields = [
      "firstName", "lastName", "email", "mobileNumber", "roleId",
      "experience", "linkedIn", "portfolioLink", "message", "referralOther",
    ] as const;
    const next: Record<string, string> = {};
    for (const f of fields) {
      const err = validateField(f, (form as unknown as Record<string, string>)[f]);
      if (err) next[f] = err;
    }
    const resumeErr = validateField("resume", "", resumeFile);
    if (resumeErr) next.resume = resumeErr;
    return next;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "roleId") onRoleChange?.(value);
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResumeFile(file);
    setTouched((prev) => ({ ...prev, resume: true }));
    setErrors((prev) => ({ ...prev, resume: validateField("resume", "", file) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const allErrors = validateAll();
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setTouched((prev) => ({
        ...prev,
        ...Object.fromEntries(Object.keys(allErrors).map((k) => [k, true])),
      }));
      return;
    }

    setSubmitting(true);
    const resumeFileChecked = resumeFile as File;

    try {
      if (selectedRole && !isSpeculative) {
        // Real Job Opening selected → create Job Applicant in HRMS
        const result = await submitJobApplicant({
          applicant_name: `${form.firstName} ${form.lastName}`.trim(),
          email_id: form.email,
          phone_number: form.mobileNumber,
          cover_letter: form.message,
          job_title: selectedRole.id,
          resume_file: resumeFileChecked,
          source: "Website Listing",
          // Native HRMS fields (updated job_applicant.json — corporaterulers fork)
          role_applying_for: selectedRole.title,
          years_of_experience: form.experience || undefined,
          linkedin_profile_url: form.linkedIn || undefined,
          portfolio_site: form.portfolioLink || undefined,
          how_did_you_hear: form.referral || undefined,
          other_source: form.referral === "Other" ? form.referralOther || undefined : undefined,
        });
        setSubmittedAppId(result.name);
        setSubmittedJobId(result.job_opening_id);
      } else {
        // Speculative / no role selected → keep existing Career Inquiry path
        await submitCareerInquiry({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          business_email: form.email,
          mobile_number: form.mobileNumber,
          phone_number: form.mobileNumber,
          role_applied_for: "Speculative / General Application",
          role_applying_for: "Speculative / General Application",
          role_title: "Speculative / General Application",
          organization_name: "Individual Applicant",
          organization_type: "Other",
          primary_interest: "Other",
          challenge_or_initiative: form.message,
          years_of_experience: form.experience,
          linkedin_url: form.linkedIn,
          linkedin_profile_url: form.linkedIn,
          resume_file: resumeFileChecked,
          portfolio_link: form.portfolioLink || undefined,
          portfolio_site: form.portfolioLink || undefined,
          cover_letter: form.message,
          tell_us_about_yourself: form.message,
          how_did_you_hear: form.referral || undefined,
          other_source: form.referral === "Other" ? form.referralOther || undefined : undefined,
        });
      }
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
        {submittedJobId && (
          <div className="mt-5 inline-flex flex-col items-center gap-1 rounded-xl bg-white border border-sky-200 px-5 py-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Job Application</span>
            <span className="text-sm font-mono font-bold text-sky-700">{submittedJobId}</span>
            {submittedAppId && (
              <span className="text-xs text-slate-500 mt-1">
                Application ref: <span className="font-mono">{submittedAppId}</span>
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  const baseInputClass =
    "w-full rounded-md border bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors";
  const inputClass = `${baseInputClass} border-slate-200 focus:border-sky-500 focus:ring-sky-500`;
  const errorInputClass = `${baseInputClass} border-red-400 focus:border-red-500 focus:ring-red-500`;
  const labelClass = "block text-xs font-semibold text-slate-700 mb-1.5";
  const cls = (name: string) => (errors[name] ? errorInputClass : inputClass);
  const FieldError = ({ name }: { name: string }) =>
    errors[name] ? <p className="mt-1 text-xs text-red-600">{errors[name]}</p> : null;

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
            onBlur={handleBlur}
            placeholder="Jane"
            className={cls("firstName")}
          />
          <FieldError name="firstName" />
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
            onBlur={handleBlur}
            placeholder="Smith"
            className={cls("lastName")}
          />
          <FieldError name="lastName" />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ position: "relative", zIndex: 50 }}>
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
            onBlur={handleBlur}
            placeholder="jane.smith@example.com"
            className={cls("email")}
          />
          <FieldError name="email" />
        </div>
        <div>
          <label htmlFor="mobileNumber" className={labelClass}>
            Phone Number <span className="text-red-500">*</span>
          </label>
          <PhoneInput
            country="us"
            value={form.mobileNumber}
            onChange={(phone) => {
              const val = phone ? "+" + phone : "";
              setForm((prev) => ({ ...prev, mobileNumber: val }));
              if (touched["mobileNumber"]) {
                setErrors((prev) => ({ ...prev, mobileNumber: validateField("mobileNumber", val) }));
              }
            }}
            onBlur={() => {
              setTouched((prev) => ({ ...prev, mobileNumber: true }));
              setErrors((prev) => ({ ...prev, mobileNumber: validateField("mobileNumber", form.mobileNumber) }));
            }}
            inputProps={{ id: "mobileNumber", name: "mobileNumber" }}
            containerStyle={{ width: "100%", position: "relative" }}
            inputStyle={{
              width: "100%",
              height: "auto",
              paddingTop: "0.625rem",
              paddingBottom: "0.625rem",
              fontSize: "0.875rem",
              borderRadius: "0.375rem",
              border: touched["mobileNumber"] && errors["mobileNumber"] ? "1px solid #f87171" : "1px solid #e2e8f0",
              backgroundColor: "white",
              color: "#0f172a",
            }}
            buttonStyle={{
              borderRadius: "0.375rem 0 0 0.375rem",
              borderTop: touched["mobileNumber"] && errors["mobileNumber"] ? "1px solid #f87171" : "1px solid #e2e8f0",
              borderBottom: touched["mobileNumber"] && errors["mobileNumber"] ? "1px solid #f87171" : "1px solid #e2e8f0",
              borderLeft: touched["mobileNumber"] && errors["mobileNumber"] ? "1px solid #f87171" : "1px solid #e2e8f0",
              borderRight: "none",
              backgroundColor: "white",
            }}
            dropdownStyle={{ zIndex: 9999, position: "absolute", width: "280px", minWidth: "280px" }}
            enableSearch
            searchPlaceholder="Search country..."
          />
          <FieldError name="mobileNumber" />
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
              <input type="hidden" name="roleId" value={SPECULATIVE} />
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 font-medium leading-snug">
                No open positions right now. Your application will be filed as a{" "}
                <span className="font-bold">Speculative Application</span> — we'll reach out when a suitable role opens.
              </div>
            </>
          ) : (
            <select
              id="role"
              name="roleId"
              required
              value={form.roleId}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cls("roleId")}
            >
              <option value="" disabled>Select a role</option>
              <option value={SPECULATIVE}>Speculative / General Application</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>{r.title}</option>
              ))}
            </select>
          )}
          <FieldError name="roleId" />
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
            max="60"
            step="0.1"
            required
            value={form.experience}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. 1.5"
            className={cls("experience")}
          />
          <FieldError name="experience" />
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
          onBlur={handleBlur}
          placeholder="https://linkedin.com/in/yourprofile"
          className={cls("linkedIn")}
        />
        <FieldError name="linkedIn" />
      </div>

      {/* Resume / CV — upload only */}
      <div>
        <label className={labelClass}>
          Resume / CV <span className="text-red-500">*</span>
        </label>
        <div
            onClick={() => fileInputRef.current?.click()}
            className={`w-full rounded-md border-2 border-dashed bg-slate-50 px-4 py-5 text-center cursor-pointer transition-colors ${
              errors.resume
                ? "border-red-400 hover:border-red-500"
                : "border-slate-200 hover:border-sky-400 hover:bg-sky-50"
            }`}
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
          <FieldError name="resume" />
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
          onBlur={handleBlur}
          placeholder="https://yourportfolio.com"
          className={cls("portfolioLink")}
        />
        <FieldError name="portfolioLink" />
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
          maxLength={2000}
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Briefly describe your background, what draws you to this role, and any relevant experience in regulated environments, AI/ML, or life sciences."
          className={`${cls("message")} resize-none`}
        />
        <div className="mt-1 flex justify-between">
          <FieldError name="message" />
          <span className="text-xs text-slate-400 ml-auto">{form.message.length}/2000</span>
        </div>
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
                if (touched.referralOther)
                  setErrors((prev) => ({ ...prev, referralOther: validateField("referralOther", e.target.value) }));
              }}
              onBlur={handleBlur}
              placeholder="Please specify…"
              maxLength={250}
              className={cls("referralOther")}
            />
            <FieldError name="referralOther" />
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
