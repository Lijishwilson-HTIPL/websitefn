"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { BACKEND_URL } from "../config";

const orgTypes = [
  "Pharmaceutical",
  "Biotech",
  "Medtech / Diagnostics",
  "CRO / CDMO",
  "Regulated Lab",
  "Hospital / Health System",
  "Academic / Research",
  "Other",
];

const primaryInterests = [
  "Staff Augmentation",
  "Product Development",
  "Managed Services",
  "CSA / Validation Support",
  "General Inquiry",
  "Career Opportunity",
];

const referralSources = [
  "LinkedIn",
  "Google Search",
  "Word of Mouth / Referral",
  "Industry Event",
  "Other",
];

const FALLBACK_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  role: string;
  orgType: string;
  interest: string;
  message: string;
  contactPreference: string;
  mobileNumber: string;
  referral: string;
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  organization: "",
  role: "",
  orgType: "",
  interest: "",
  message: "",
  contactPreference: "Phone Call",
  mobileNumber: "",
  referral: "",
};

type Slot = { time: string; booked: boolean };

export default function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState<string | null>(null);
  const [joinLink, setJoinLink] = useState<string | null>(null);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const fetchAvailableSlots = useCallback(async (date: Date) => {
    setLoadingSlots(true);
    try {
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const res = await fetch(`${BACKEND_URL}/api/schedule/available?date=${dateStr}`);
      const result = await res.json();
      if (result.success && Array.isArray(result.slots)) {
        setAvailableSlots(result.slots);
      } else {
        setAvailableSlots(FALLBACK_SLOTS.map((t) => ({ time: t, booked: false })));
      }
    } catch {
      setAvailableSlots(FALLBACK_SLOTS.map((t) => ({ time: t, booked: false })));
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
      setSelectedTime(null);
    }
  }, [selectedDate, fetchAvailableSlots]);

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

  const getEasternNow = () => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());
    const get = (t: string) => parseInt(parts.find((p) => p.type === t)?.value || "0", 10);
    return {
      year: get("year"),
      month: get("month"),
      day: get("day"),
      hour: get("hour") % 24,
      minute: get("minute"),
    };
  };

  const isSlotPast = (date: Date | null, time: string) => {
    if (!date) return false;
    const et = getEasternNow();
    const isTodayET =
      date.getFullYear() === et.year &&
      date.getMonth() + 1 === et.month &&
      date.getDate() === et.day;
    if (!isTodayET) return false;
    const m = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!m) return false;
    let hour = parseInt(m[1], 10);
    const minute = parseInt(m[2], 10);
    const period = m[3].toUpperCase();
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    return hour * 60 + minute <= et.hour * 60 + et.minute;
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (newDate > today && !isWeekend(newDate)) {
      setSelectedDate(newDate);
    }
  };

  const nextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStage("Validating your details…");

    try {
      await new Promise((r) => setTimeout(r, 600));
      setSubmitStage("Reserving your time slot…");
      await new Promise((r) => setTimeout(r, 700));
      setSubmitStage("Scheduling your meeting…");

      const payload = {
        ...form,
        preferredDate: selectedDate
          ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
          : null,
        preferredTime: selectedTime,
        preferredTimezone: "America/New_York",
      };

      const res = await fetch(`${BACKEND_URL}/create-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitStage("Sending confirmation…");
        await new Promise((r) => setTimeout(r, 500));
        if (data.booking?.joinLink) setJoinLink(data.booking.joinLink);
        setSubmitted(true);
      } else {
        alert(data.message || "Something went wrong");
        console.error("Backend Error:", data);
        if (res.status === 409) {
          setStep(1);
          setSelectedTime(null);
        }
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Server error. Please try again.");
    }

    setSubmitting(false);
    setSubmitStage(null);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-sky-100 bg-sky-50 p-10 text-center animate-pop-in">
        <CheckCircle2 className="w-12 h-12 text-sky-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {selectedDate && selectedTime ? "Meeting Confirmed" : "Message Received"}
        </h3>
        <p className="text-base text-slate-600 max-w-sm mx-auto mb-3">
          {selectedDate && selectedTime
            ? "Your meeting is booked. We've emailed a calendar invite with the meeting link."
            : "Thank you for reaching out. A senior member of our team will read your message and respond within one business day."}
        </p>
        {selectedDate && selectedTime && (
          <p className="text-sm text-slate-500 mb-3">
            <span className="font-semibold text-slate-700">
              {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime} ET
            </span>
          </p>
        )}
        {joinLink && (
          <a
            href={joinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition-colors shadow-sm"
          >
            Join Meeting
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:scale-[1.01] transition-all duration-200";
  const labelClass = "block text-xs font-semibold text-slate-700 mb-1.5";

  // ── Step 1: Calendar + Time ─────────────────────────────────────────
  if (step === 1) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-slide-in-left">
        {/* Stepper */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center">1</span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Pick a Time</span>
          </div>
          <div className="flex-1 h-px bg-slate-200" />
          <div className="flex items-center gap-2 opacity-50">
            <span className="w-6 h-6 rounded-full bg-slate-300 text-white text-xs font-bold flex items-center justify-center">2</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Details</span>
          </div>
        </div>

        {/* Month header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
            <CalendarIcon className="w-4 h-4 text-sky-500" />
            {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h3>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-200 transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-slate-500" />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-200 transition-all"
            >
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Day grid */}
        <div className="px-5 pt-4 pb-2">
          <div className="grid grid-cols-7 mb-2 text-center">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="text-[10px] font-black uppercase text-slate-400 tracking-widest py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth(currentMonth) }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10" />
            ))}
            {Array.from({ length: daysInMonth(currentMonth) }).map((_, i) => {
              const day = i + 1;
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const isToday = date.getTime() === today.getTime();
              const isPast = date <= today;
              const weekend = isWeekend(date);
              const isDisabled = isPast || weekend;
              const isSelected = selectedDate?.getTime() === date.getTime();
              return (
                <button
                  key={day}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleDateClick(day)}
                  className={`h-10 w-full rounded-lg flex items-center justify-center text-xs transition-all duration-200 relative
                    ${isDisabled ? "text-slate-300 cursor-not-allowed" + (weekend ? " bg-slate-50" : "") : "hover:bg-sky-50 hover:text-sky-600 hover:scale-105 font-semibold"}
                    ${isSelected ? "bg-sky-600 text-white hover:bg-sky-700 hover:text-white shadow-md scale-110 z-10" : "text-slate-700"}
                    ${isToday && !isSelected ? "border-2 border-sky-500 text-sky-600 font-bold" : ""}
                  `}
                >
                  {day}
                  {isToday && !isSelected && <span className="absolute bottom-0.5 w-1 h-1 bg-sky-500 rounded-full" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Slots */}
        <div className="px-5 pb-5 pt-3 border-t border-slate-100 mt-3 min-h-[140px]">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-3.5 h-3.5 text-sky-500" />
            <span className="text-xs font-bold text-slate-700">
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                : "Pick a date to see times"}
            </span>
            <span className="text-[10px] text-slate-400 font-medium ml-auto">Eastern Time</span>
          </div>
          <div key={selectedDate?.toString() || "placeholder"} className="grid grid-cols-4 gap-2 relative stagger">
            {loadingSlots && (
              <div className="absolute inset-0 bg-white/70 rounded-xl flex items-center justify-center z-10">
                <Loader2 className="w-5 h-5 animate-spin text-sky-500" />
              </div>
            )}
            {(selectedDate
              ? availableSlots
              : FALLBACK_SLOTS.map((t) => ({ time: t, booked: false, placeholder: true } as Slot & { placeholder?: boolean }))
            ).map((slot) => {
              const time = slot.time;
              const past = isSlotPast(selectedDate, time);
              const isBooked = slot.booked || past;
              const isPlaceholder = !selectedDate;
              if (isPlaceholder) {
                return (
                  <div
                    key={time}
                    className="py-2.5 rounded-lg text-[11px] font-bold border border-slate-100 bg-slate-50 text-slate-300 flex items-center justify-center"
                  >
                    {time}
                  </div>
                );
              }
              return (
                <button
                  key={time}
                  type="button"
                  disabled={isBooked}
                  onClick={() => !isBooked && setSelectedTime(time)}
                  className={`py-2.5 rounded-lg text-[11px] font-bold border transition-all duration-200 flex flex-col items-center gap-0.5
                    ${isBooked
                      ? "bg-red-50 border-red-200 text-red-400 cursor-not-allowed"
                      : selectedTime === time
                        ? "bg-sky-600 border-sky-600 text-white shadow-md scale-105"
                        : "bg-green-50 border-green-200 text-green-700 hover:border-green-400 hover:bg-green-100 hover:-translate-y-0.5 hover:shadow-sm"}
                  `}
                >
                  <span className={isBooked ? "line-through" : ""}>{time}</span>
                  {isBooked
                    ? <span className="text-[8px] text-red-400 font-bold">{past ? "Passed" : "Booked"}</span>
                    : <span className="text-[8px] text-green-600 font-bold">Available</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Continue */}
        <div className="px-5 pb-5">
          <button
            type="button"
            disabled={!selectedDate || !selectedTime}
            onClick={() => setStep(2)}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Continue to Your Details
            <ArrowRight className="w-4 h-4" />
          </button>
          {(!selectedDate || !selectedTime) && (
            <p className="mt-2 text-xs text-slate-400 text-center">
              Please pick a date and time to continue.
            </p>
          )}
        </div>
      </div>
    );
  }

  // ── Step 2: Form ────────────────────────────────────────────────────
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-slide-in-right">
      {/* Stepper */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Time Selected</span>
        </div>
        <div className="flex-1 h-px bg-slate-200" />
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center">2</span>
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Your Details</span>
        </div>
      </div>

      {/* Selected slot summary */}
      <div className="px-6 py-4 border-b border-slate-100 bg-sky-50/60 flex items-center justify-between animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-sky-600 shadow-sm shrink-0 border border-sky-100">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-sky-600 tracking-wider">Your Preferred Slot</p>
            <p className="font-bold text-slate-900 text-sm">
              {selectedDate?.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} · {selectedTime} ET
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700"
        >
          <ArrowLeft className="w-3 h-3" />
          Change
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-6 stagger">
        {/* Name row */}
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
              Business Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="jane.smith@company.com"
              className={inputClass}
            />
            <p className="mt-1 text-xs text-slate-400">Responses sent to business email only.</p>
          </div>
          <div>
            <label htmlFor="mobileNumber" className={labelClass}>
              Mobile Number <span className="text-red-500">*</span>
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

        {/* Org + Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="organization" className={labelClass}>
              Organization Name <span className="text-red-500">*</span>
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              required
              value={form.organization}
              onChange={handleChange}
              placeholder="Your company"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="role" className={labelClass}>
              Your Role / Title <span className="text-red-500">*</span>
            </label>
            <input
              id="role"
              name="role"
              type="text"
              required
              value={form.role}
              onChange={handleChange}
              placeholder="Head of IT, VP Quality, etc."
              className={inputClass}
            />
          </div>
        </div>

        {/* Org type + Interest */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="orgType" className={labelClass}>
              Organization Type <span className="text-red-500">*</span>
            </label>
            <select
              id="orgType"
              name="orgType"
              required
              value={form.orgType}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="" disabled>Select type</option>
              {orgTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="interest" className={labelClass}>
              Primary Interest <span className="text-red-500">*</span>
            </label>
            <select
              id="interest"
              name="interest"
              required
              value={form.interest}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="" disabled>Select interest</option>
              {primaryInterests.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelClass}>
            Tell Us About Your Challenge or Initiative <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="3–5 sentences is enough to give us useful context. What are you working on, what environment are you in, and what kind of help are you looking for?"
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Contact preference */}
        <div>
          <label className={labelClass}>Preferred Way to Connect</label>
          <div className="flex flex-wrap gap-4">
            {["Phone Call", "Email Exchange"].map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="contactPreference"
                  value={option}
                  checked={form.contactPreference === option}
                  onChange={handleChange}
                  className="accent-sky-600"
                />
                <span className="text-sm text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Referral source */}
        <div>
          <label htmlFor="referral" className={labelClass}>
            How Did You Hear About Us? <span className="text-slate-400 font-normal">(optional)</span>
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
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex flex-col items-center justify-center gap-1 rounded-md bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-200 shadow-sm min-w-[200px]"
          >
            {submitting ? (
              <>
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  <span className="animate-fade-in" key={submitStage}>{submitStage}</span>
                </span>
                <span className="flex gap-1.5 mt-0.5">
                  {["Validating your details…", "Reserving your time slot…", "Scheduling your meeting…", "Sending confirmation…"].map((stage) => (
                    <span
                      key={stage}
                      className={`h-1 w-5 rounded-full transition-all duration-500 ${
                        submitStage === stage ? "bg-white" : "bg-white/30"
                      }`}
                    />
                  ))}
                </span>
              </>
            ) : (
              <span className="flex items-center gap-2">
                Send My Message
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
          <p className="mt-3 text-xs text-slate-400">
            We use the information you provide only to respond to your inquiry. We do not share it with third parties or use it for unsolicited marketing.
          </p>
        </div>
      </form>
    </div>
  );
}
