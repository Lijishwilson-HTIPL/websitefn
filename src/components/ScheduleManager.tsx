"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  User,
  Mail,
  FileText,
  ChevronRight as ChevronRightIcon
} from "lucide-react";
import { BACKEND_URL } from "../config";

interface LeadData {
  name?: string;
  fullname?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  organization?: string;
  company?: string;
}

const FIXED_TIMEZONE = "America/New_York";

function getNextBusinessDay(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  return d;
}

export default function ScheduleManager() {
  const searchParams = useSearchParams();
  const token = searchParams.get("t");

  const [loading, setLoading] = useState(!!token);
  const [error, setError] = useState<{ message: string; type?: string } | null>(null);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => getNextBusinessDay());
  const [availableSlots, setAvailableSlots] = useState<{ time: string; booked: boolean }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    duration: "30",
    topic: "Consultation",
    notes: "",
    timezone: FIXED_TIMEZONE,
  });

  // Fetch Token Info
  useEffect(() => {
    if (!token) return;

    const fetchTokenInfo = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/schedule/token-info?token=${token}`);
        const result = await res.json();

        if (result.success) {
          setLeadData(result.data);
          setFormData(prev => ({
            ...prev,
            name: result.data.name || result.data.fullname || (result.data.firstName ? `${result.data.firstName} ${result.data.lastName || ''}`.trim() : ""),
            email: result.data.email || "",
            organization: result.data.organization || result.data.company || ""
          }));
        } else {
          setError({ message: result.error, type: result.type });
        }
      } catch (err) {
        setError({ message: "Unable to connect to the scheduling server. Please try again later.", type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchTokenInfo();
  }, [token]);

  // Fetch Available Slots
  const fetchAvailableSlots = useCallback(async (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    if (dateStr <= todayStr) {
      setAvailableSlots([]);
      return;
    }
    setLoadingSlots(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/schedule/available?date=${dateStr}`);
      const result = await res.json();
      if (result.success) {
        setAvailableSlots(result.slots);
      } else {
        setAvailableSlots([]);
      }
    } catch (err) {
      console.error("Failed to fetch slots", err);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  // On mount: ensure selectedDate is always a future business day
  useEffect(() => {
    setSelectedDate(getNextBusinessDay());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedDate) {
      const sd = selectedDate;
      const dateStr = `${sd.getFullYear()}-${String(sd.getMonth() + 1).padStart(2, '0')}-${String(sd.getDate()).padStart(2, '0')}`;
      const now = new Date();
      const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      if (dateStr <= todayStr) {
        setSelectedDate(getNextBusinessDay());
        setAvailableSlots([]);
        setSelectedTime(null);
        return;
      }
      fetchAvailableSlots(selectedDate);
      setSelectedTime(null);
    }
  }, [selectedDate, fetchAvailableSlots]);

  // Calendar Helpers
  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

  // Formats a Date as YYYY-MM-DD using browser local time (guaranteed format, no locale variance)
  const toLocalDateStr = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const getTodayStr = () => toLocalDateStr(new Date());

  const isFutureDate = (d: Date) => toLocalDateStr(d) > getTodayStr();

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (isFutureDate(newDate) && !isWeekend(newDate)) {
      setSelectedDate(newDate);
    }
  };

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time slot.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        token,
        date: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
        time: selectedTime,
        locationMetadata: { timezone: FIXED_TIMEZONE }
      };

      const res = await fetch(`${BACKEND_URL}/api/schedule/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (result.success) {
        setBooked(true);
      } else {
        alert(result.error || "Failed to book meeting.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <Loader2 className="w-12 h-12 text-sky-500 animate-spin mb-4" />
        <h3 className="text-xl font-bold text-slate-900">Validating Link...</h3>
        <p className="text-slate-500 mt-2">Connecting to our secure scheduling system.</p>
      </div>
    );
  }

  if (!token && !loading) {
    return (
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-slate-200 shadow-xl text-center">
        <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-amber-500" />
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Scheduling Restricted</h3>
        <p className="text-slate-600 mb-8">Scheduling is only available via a unique invite link. Please check your email or contact our team for assistance.</p>
        <button
          onClick={() => window.location.href = '/contact'}
          className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
        >
          Contact Support
        </button>
      </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white p-10 rounded-3xl border border-slate-200 shadow-xl text-center">
        <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{error.type === 'expired' ? 'Link Expired' : 'Invalid Link'}</h3>
        <p className="text-slate-600 mb-8">{error.message}</p>
        <button
          onClick={() => window.location.href = '/contact'}
          className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
        >
          Contact Support
        </button>
      </div>
    );
  }

  if (booked) {
    return (
      <div className="max-w-xl mx-auto bg-white p-12 rounded-3xl border border-sky-100 shadow-2xl text-center">
        <div className="w-24 h-24 bg-sky-50 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-sky-500" />
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-4">Meeting Confirmed!</h3>
        <p className="text-slate-600 text-lg mb-8">
          Your meeting has been scheduled for <span className="font-bold text-sky-600">{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime} ET</span>.
        </p>
        <div className="bg-slate-50 p-6 rounded-2xl mb-8 text-left">
          <p className="text-sm text-slate-500 mb-1 uppercase tracking-wider font-bold">What happens next?</p>
          <ul className="space-y-3 text-slate-700">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-sky-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">1</span>
              A confirmation email has been sent to <span className="font-semibold">{formData.email}</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-sky-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">2</span>
              A calendar invitation with the meeting link is attached to the email.
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-sky-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">3</span>
              Our technical consultant will meet you at the scheduled time.
            </li>
          </ul>
        </div>
        <button
          onClick={() => window.location.href = '/'}
          className="w-full py-4 bg-sky-600 text-white font-bold rounded-2xl hover:bg-sky-700 transition-all transform hover:-translate-y-1 shadow-xl shadow-sky-200"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

      {/* ── Left: Calendar + Slots ── */}
      <div className="border-b lg:border-b-0 lg:border-r border-slate-100">
        {/* Month header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
            <CalendarIcon className="w-4 h-4 text-sky-500" />
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex gap-1">
            <button onClick={prevMonth} className="p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
              <ChevronLeft className="w-4 h-4 text-slate-500" />
            </button>
            <button onClick={nextMonth} className="p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Day grid */}
        <div className="px-5 pt-4 pb-2">
          <div className="grid grid-cols-7 mb-2 text-center">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} className="text-[10px] font-black uppercase text-slate-400 tracking-widest py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth(currentMonth) }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth(currentMonth) }).map((_, i) => {
              const day = i + 1;
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const dateStr = toLocalDateStr(date);
              const isPast = dateStr <= getTodayStr();
              const weekend = isWeekend(date);
              const isDisabled = isPast || weekend;
              const isSelected = !isDisabled && selectedDate ? toLocalDateStr(selectedDate) === dateStr : false;
              if (isDisabled) {
                return (
                  <div key={day} className={`aspect-square rounded-xl flex items-center justify-center text-xs text-slate-300 select-none${weekend ? ' bg-slate-50' : ''}`}>
                    {day}
                  </div>
                );
              }
              return (
                <button key={day} onClick={() => handleDateClick(day)}
                  className={`aspect-square rounded-xl flex items-center justify-center text-xs transition-all
                    ${isSelected
                      ? 'bg-sky-600 text-white hover:bg-sky-700 shadow-md scale-110 z-10'
                      : 'hover:bg-sky-50 hover:text-sky-600 font-semibold text-slate-700'
                    }
                  `}
                >
                  {day}
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
                ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : 'Available Times'}
            </span>
            <span className="text-[10px] text-slate-400 font-medium ml-auto">Eastern Time</span>
          </div>
          <div className="grid grid-cols-4 gap-2 relative">
            {loadingSlots && (
              <div className="absolute inset-0 bg-white/70 rounded-xl flex items-center justify-center z-10">
                <Loader2 className="w-5 h-5 animate-spin text-sky-500" />
              </div>
            )}
            {selectedDate && !loadingSlots && availableSlots.length === 0
              ? (
                <div className="col-span-4 text-center text-xs text-slate-400 py-6">No available slots for this date. Please select another day.</div>
              )
              : (!selectedDate
                  ? ['09:00 AM','10:00 AM','11:00 AM','12:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM'].map(t => ({ time: t, booked: false, placeholder: true }))
                  : availableSlots
                ).map((slot: any) => {
                  const time = typeof slot === 'string' ? slot : slot.time;
                  const isBooked = typeof slot === 'string' ? false : slot.booked;
                  const isPlaceholder = !selectedDate || (typeof slot === 'object' && slot.placeholder);
                  return isPlaceholder ? (
                    <div key={time} className="py-2.5 rounded-xl text-[11px] font-bold border border-slate-100 bg-slate-50 text-slate-300 flex flex-col items-center justify-center gap-0.5">
                      <span>{time}</span>
                      <span className="text-[8px]">—</span>
                    </div>
                  ) : (
                    <button key={time} disabled={isBooked}
                      onClick={() => !isBooked && setSelectedTime(time)}
                      className={`py-2.5 rounded-xl text-[11px] font-bold border transition-all flex flex-col items-center gap-0.5
                        ${isBooked
                          ? 'bg-red-50 border-red-200 text-red-400 cursor-not-allowed'
                          : selectedTime === time
                            ? 'bg-sky-600 border-sky-600 text-white shadow-md'
                            : 'bg-green-50 border-green-200 text-green-700 hover:border-green-400 hover:bg-green-100'}
                      `}
                    >
                      <span className={isBooked ? 'line-through' : ''}>{time}</span>
                      {isBooked
                        ? <span className="text-[8px] text-red-400 font-bold">Booked</span>
                        : <span className="text-[8px] text-green-600 font-bold">Available</span>}
                    </button>
                  );
                })
            }
          </div>
        </div>
      </div>

      {/* ── Right: Form ── */}
      <div className="flex flex-col">
        <div className="px-7 py-5 bg-slate-900 text-white">
          <h3 className="text-base font-black tracking-tight">Meeting Details</h3>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-5 flex flex-col gap-4 flex-1">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
              <User className="w-3 h-3" /> Full Name
            </label>
            <input type="text" required placeholder="Your Name"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-xl py-2.5 px-3 outline-none transition-all text-sm font-semibold"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
              <Mail className="w-3 h-3" /> Email Address
            </label>
            <input type="email" required placeholder="email@example.com"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-xl py-2.5 px-3 outline-none transition-all text-sm font-semibold"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
              <Building2 className="w-3 h-3" /> Organization
            </label>
            <input type="text" placeholder="Company Name"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-xl py-2.5 px-3 outline-none transition-all text-sm font-semibold"
              value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Duration</label>
              <select className="w-full bg-slate-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-xl py-2.5 px-3 outline-none transition-all text-sm font-bold appearance-none"
                value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})}>
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="60">60 min</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Topic</label>
              <select className="w-full bg-slate-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-xl py-2.5 px-3 outline-none transition-all text-sm font-bold appearance-none"
                value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})}>
                <option value="Consultation">Consultation</option>
                <option value="Support">Support</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-sky-50 border border-sky-100 px-3 py-2.5">
            <Clock className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <div>
              <p className="text-[9px] font-black uppercase text-sky-500 tracking-wider">All times in</p>
              <p className="text-xs font-bold text-slate-800">Eastern Time — US &amp; Canada (UTC−05:00)</p>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
              <FileText className="w-3 h-3" /> Notes (Optional)
            </label>
            <textarea rows={2} placeholder="Anything else?"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-xl py-2.5 px-3 outline-none transition-all text-sm font-semibold resize-none"
              value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
          </div>

          {selectedDate && selectedTime && (
            <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sky-600 shadow-sm shrink-0">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-sky-500">Selected</p>
                <p className="font-bold text-slate-900 text-xs">
                  {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {selectedTime} ET
                </p>
              </div>
            </div>
          )}

          <button type="submit" disabled={submitting || !selectedDate || !selectedTime}
            className="w-full py-3.5 bg-sky-600 text-white font-black rounded-2xl hover:bg-sky-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sky-200 flex items-center justify-center gap-2 text-sm mt-auto">
            {submitting
              ? <><Loader2 className="w-4 h-4 animate-spin" />Scheduling...</>
              : <>Confirm Meeting <ChevronRightIcon className="w-4 h-4" /></>}
          </button>
        </form>
      </div>

    </div>
  );
}
