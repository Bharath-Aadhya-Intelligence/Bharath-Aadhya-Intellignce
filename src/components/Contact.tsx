"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Mail,
  Phone,
  Briefcase,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  AlertCircle
} from "lucide-react";
import {
  CONTACT_LIMITS,
  PROJECT_TYPES,
  validateContactForm,
  type ContactFieldErrors,
  type ContactFormValues,
} from "@/lib/contact/schema";

const REQUEST_TIMEOUT_MS = 20_000;
const GENERIC_ERROR = "We could not send your inquiry right now. Please try again.";
// Full URL of the deployed inquiry API, for example https://<project>.vercel.app/api/contact.
// It is inlined at build time (see the GitHub Pages workflow). It is public, not a secret.
const CONTACT_API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL?.trim() ?? "";

const EMPTY_VALUES: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  projectType: "",
  details: "",
};

type ApiResponse = {
  ok?: boolean;
  error?: string;
  referenceId?: string;
  fieldErrors?: ContactFieldErrors;
};

const inputClass = (hasError: boolean) =>
  `w-full bg-white/15 border-2 ${hasError ? "border-red-200" : "border-white/30"} rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-white focus:bg-white/25 transition-all font-bold text-white placeholder:text-white/60`;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="ml-1 text-xs font-bold text-red-200">
      {message}
    </p>
  );
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactFormValues>(EMPTY_VALUES);
  // Hidden anti-spam field. Real visitors never see or fill it.
  const [honeypot, setHoneypot] = useState("");
  // Synchronous guard. State updates are async, so a fast double-click could
  // otherwise send two requests before the disabled button re-renders.
  const submittingRef = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const field = name as keyof ContactFormValues;
    setFormData(prev => ({ ...prev, [field]: value }));
    setFieldErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev));
    // A message about a previous attempt no longer applies once the visitor edits.
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const form = e.currentTarget;
    setFormError(null);

    // Frontend validation gives fast feedback. The server validates again.
    const validation = validateContactForm(formData);
    if (!validation.ok) {
      setFieldErrors(validation.errors);
      setFormError("Please correct the highlighted fields and try again.");
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    if (!CONTACT_API_URL) {
      // Build misconfiguration: the site was built without NEXT_PUBLIC_CONTACT_API_URL.
      console.error("NEXT_PUBLIC_CONTACT_API_URL is not set; the inquiry form cannot submit.");
      setFormError("Our inquiry form is temporarily unavailable. Please email us at bharathaadhyaintelligence@gmail.com instead.");
      return;
    }

    setFieldErrors({});
    submittingRef.current = true;
    setIsSubmitting(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validation.data, fax_number: honeypot }),
        signal: controller.signal,
        cache: "no-store",
      });

      const payload = (await response.json().catch(() => null)) as ApiResponse | null;

      // Show success only when the server confirms the email provider accepted the message.
      if (response.ok && payload?.ok === true) {
        setReferenceId(payload.referenceId ?? null);
        setFormData(EMPTY_VALUES);
        setHoneypot("");
        setIsSubmitted(true);
        return;
      }

      if (payload?.fieldErrors) {
        setFieldErrors(payload.fieldErrors);
      }
      // Entered values stay in the form so the visitor can retry.
      setFormError(payload?.error ?? GENERIC_ERROR);
    } catch (err) {
      const timedOut = err instanceof DOMException && err.name === "AbortError";
      setFormError(
        timedOut
          ? "The request took too long. Please check your connection and try again."
          : "We could not reach the server. Please check your connection and try again."
      );
    } finally {
      clearTimeout(timeout);
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setReferenceId(null);
    setFormError(null);
    setFieldErrors({});
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 hero-gradient-vibrant overflow-hidden scroll-mt-24">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-overlay-white opacity-[0.2]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-wider mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Live Availability: Responses in 15m
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-display font-black text-white mb-6 tracking-tight leading-[1.1] uppercase break-words">
                  LET&apos;S BUILD THE <span className="text-white italic">FUTURE</span> TOGETHER
                </h2>
                <p className="text-lg text-white/70 font-medium mb-10 leading-relaxed">
                  Ready to start your next big project? Whether it&apos;s a cutting-edge AI model, a high-performance mobile app, or a scalable web ecosystem, our team is ready to scale with you in real time.
                </p>

                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white/90">
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-white uppercase text-sm tracking-widest">Expert AI Engineering</h4>
                      <p className="text-xs text-white/60 font-medium">Domain-specific Indian LLM research & integration.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white/90">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-white uppercase text-sm tracking-widest">Full-Stack Excellence</h4>
                      <p className="text-xs text-white/60 font-medium">Premium Mobile & Web development services.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Card */}
            <div
              className="relative p-8 md:p-12 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              {/* Card Ambient Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 blur-[80px] rounded-full pointer-events-none" />

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="relative z-10 space-y-6"
                  >
                    {formError && (
                      <motion.div
                        role="alert"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-200 text-sm font-bold"
                      >
                        <AlertCircle size={18} className="shrink-0" />
                        {formError}
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="contact-fullName" className="text-[10px] font-black uppercase tracking-widest text-white/90 ml-1">Full Name</label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 group-focus-within:text-white transition-colors" size={18} />
                          <input
                            id="contact-fullName"
                            required
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            type="text"
                            autoComplete="name"
                            maxLength={CONTACT_LIMITS.fullNameMax}
                            aria-invalid={fieldErrors.fullName ? true : undefined}
                            aria-describedby={fieldErrors.fullName ? "contact-fullName-error" : undefined}
                            placeholder="John Doe"
                            className={inputClass(!!fieldErrors.fullName)}
                          />
                        </div>
                        <FieldError id="contact-fullName-error" message={fieldErrors.fullName} />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-email" className="text-[10px] font-black uppercase tracking-widest text-white/90 ml-1">Business Email</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 group-focus-within:text-white transition-colors" size={18} />
                          <input
                            id="contact-email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            maxLength={CONTACT_LIMITS.emailMax}
                            aria-invalid={fieldErrors.email ? true : undefined}
                            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                            placeholder="john@company.com"
                            className={inputClass(!!fieldErrors.email)}
                          />
                        </div>
                        <FieldError id="contact-email-error" message={fieldErrors.email} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-phone" className="text-[10px] font-black uppercase tracking-widest text-white/90 ml-1">Phone Number</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 group-focus-within:text-white transition-colors" size={18} />
                        <input
                          id="contact-phone"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          maxLength={CONTACT_LIMITS.phoneMax}
                          aria-invalid={fieldErrors.phone ? true : undefined}
                          aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
                          placeholder="+91 98765 43210"
                          className={inputClass(!!fieldErrors.phone)}
                        />
                      </div>
                      <FieldError id="contact-phone-error" message={fieldErrors.phone} />
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="contact-projectType" className="text-[10px] font-black uppercase tracking-widest text-white/90 ml-1">Project Type</label>
                      <div className="relative group">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 group-focus-within:text-white transition-colors" size={18} />
                        <select
                          id="contact-projectType"
                          required
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          aria-invalid={fieldErrors.projectType ? true : undefined}
                          aria-describedby={fieldErrors.projectType ? "contact-projectType-error" : undefined}
                          className={`${inputClass(!!fieldErrors.projectType)} appearance-none cursor-pointer`}
                        >
                          <option value="" disabled className="text-foreground">Select a service</option>
                          {PROJECT_TYPES.map(type => (
                            <option key={type} value={type} className="text-foreground">{type}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/80">
                          ▼
                        </div>
                      </div>
                      <FieldError id="contact-projectType-error" message={fieldErrors.projectType} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-end justify-between gap-4">
                        <label htmlFor="contact-details" className="text-[10px] font-black uppercase tracking-widest text-white/90 ml-1">Project Details</label>
                        <span
                          id="contact-details-count"
                          className={`text-[10px] font-bold tabular-nums ${formData.details.length > CONTACT_LIMITS.detailsMax ? "text-red-200" : "text-white/70"}`}
                        >
                          {formData.details.length}/{CONTACT_LIMITS.detailsMax}
                        </span>
                      </div>
                      <div className="relative group">
                        <MessageSquare className="absolute left-4 top-6 text-white/80 group-focus-within:text-white transition-colors" size={18} />
                        <textarea
                          id="contact-details"
                          required
                          name="details"
                          value={formData.details}
                          onChange={handleChange}
                          rows={4}
                          maxLength={CONTACT_LIMITS.detailsMax}
                          aria-invalid={fieldErrors.details ? true : undefined}
                          aria-describedby={
                            [fieldErrors.details ? "contact-details-error" : null, "contact-details-count"]
                              .filter(Boolean)
                              .join(" ")
                          }
                          placeholder="Tell us about your vision..."
                          className={`${inputClass(!!fieldErrors.details)} resize-none`}
                        ></textarea>
                      </div>
                      <FieldError id="contact-details-error" message={fieldErrors.details} />
                    </div>

                    {/* Honeypot: hidden from people and screen readers, skipped by keyboard. */}
                    <div className="absolute left-[-10000px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
                      <label>
                        Fax number
                        <input
                          type="text"
                          name="fax_number"
                          tabIndex={-1}
                          autoComplete="off"
                          value={honeypot}
                          onChange={e => setHoneypot(e.target.value)}
                        />
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="w-full py-5 bg-white text-accent-indigo rounded-2xl font-black text-lg tracking-tight flex items-center justify-center gap-3 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group shadow-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-4 border-accent-indigo/20 border-t-accent-indigo rounded-full animate-spin" aria-hidden="true" />
                          Sending Inquiry...
                        </>
                      ) : (
                        <>
                          <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Send Inquiry
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 text-center py-12 sm:py-20"
                  >
                    <div className="w-20 h-20 bg-white/10 text-white rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={40} aria-hidden="true" />
                    </div>
                    <h3 className="text-3xl font-display font-black text-white mb-4 uppercase tracking-tight">Request Received!</h3>
                    <p className="text-white/80 font-medium mb-4 max-w-[320px] mx-auto leading-relaxed">
                      Thank you for contacting Bharath Aadhya Intelligence. Your inquiry has been submitted successfully.
                    </p>
                    {referenceId && (
                      <p className="text-white/60 text-xs font-bold mb-6">
                        Reference ID: <span className="font-mono text-white/90">{referenceId}</span>
                      </p>
                    )}
                    <p className="text-white/60 font-medium mb-8 max-w-[280px] mx-auto leading-relaxed">
                      Our team is reviewing your details and will call you back within 15 minutes.
                    </p>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-white font-black uppercase text-sm tracking-widest hover:underline"
                    >
                      Send another request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
