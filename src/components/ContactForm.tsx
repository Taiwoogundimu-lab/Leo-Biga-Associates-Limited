import { FormEvent, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';

const SERVICE_OPTIONS = [
  'Architecture and Building Design',
  'Development Planning',
  'Interior Design',
  'Environmental Design',
  'Project Management',
  'Facilities Management',
  'Construction Services',
  'Feasibility Studies and Advisory Services',
  'Other',
];

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  service: string;
  location: string;
  message: string;
  consent: boolean;
  website_url: string; // Honeypot field
}

const INITIAL_FORM: FormState = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  service: 'Architecture and Building Design',
  location: '',
  message: '',
  consent: false,
  website_url: '',
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    referenceId: string;
    message: string;
    mode: string;
  } | null>(null);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};
    if (form.fullName.trim().length < 2) {
      errors.fullName = 'Full name is required.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (form.phone.trim().length < 6) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (form.subject.trim().length < 3) {
      errors.subject = 'Please enter an enquiry subject.';
    }
    if (!form.service) {
      errors.service = 'Please select a service of interest.';
    }
    if (form.message.trim().length < 10) {
      errors.message = 'Please provide project or enquiry details (at least 10 characters).';
    }
    if (!form.consent) {
      errors.consent = 'Please accept the privacy consent to proceed.';
    }
    return errors;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;

    setSubmitError(null);
    setSuccessInfo(null);

    const errors = validateClient();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setSubmitError('Please review the required fields highlighted below.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setSubmitError(data.error || 'Unable to submit your message right now. Please try again.');
        return;
      }

      setSuccessInfo({
        referenceId: data.referenceId,
        message: data.message,
        mode: data.mode,
      });
      setForm(INITIAL_FORM);
      setFieldErrors({});
    } catch {
      setSubmitError(
        'A network error occurred while submitting your enquiry. Please try again or contact +234 8026043299.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="consultation" className="bg-white border border-[#123D35]/15 p-5 sm:p-10">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-[#C5A46D] uppercase">
          Direct Enquiry
        </p>
        <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-[#123D35]">
          Send a Message to the Managing Partner
        </h3>
        <p className="mt-2 text-sm text-[#202522]/75 leading-relaxed">
          Complete the consultation form below. Enquiries are routed to{' '}
          <span className="font-medium text-[#123D35]">leobiga@yahoo.com</span> with copy to{' '}
          <span className="font-medium text-[#123D35]">lbagh@yahoo.com</span>.
        </p>
      </div>

      {successInfo && (
        <div
          role="status"
          className="mb-8 bg-emerald-50 border border-emerald-800/30 p-5 flex items-start gap-3.5"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
          <div className="text-sm text-emerald-950 space-y-1">
            <p className="font-semibold">
              Thank you — your enquiry has been submitted (Ref: {successInfo.referenceId}).
            </p>
            <p className="text-emerald-900/90 leading-relaxed">{successInfo.message}</p>
          </div>
        </div>
      )}

      {submitError && (
        <div
          role="alert"
          className="mb-6 bg-red-50 border border-red-800/30 p-4 flex items-start gap-3 text-sm text-red-900"
        >
          <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Honeypot anti-spam field */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website_url">Website URL</label>
          <input
            id="website_url"
            name="website_url"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website_url}
            onChange={(e) => setForm({ ...form, website_url: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* 1. Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-[#123D35] mb-2">
              Full Name <span className="text-red-700">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full px-4 py-3 text-base sm:text-sm bg-[#F5F2EA]/60 border border-[#123D35]/20 text-[#202522] focus:outline-none focus:border-[#123D35]"
              placeholder="e.g. Dr. Adewale Ogunleye"
            />
            {fieldErrors.fullName && (
              <p className="mt-1.5 text-xs text-red-700">{fieldErrors.fullName}</p>
            )}
          </div>

          {/* 2. Email Address */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#123D35] mb-2">
              Email Address <span className="text-red-700">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 text-base sm:text-sm bg-[#F5F2EA]/60 border border-[#123D35]/20 text-[#202522] focus:outline-none focus:border-[#123D35]"
              placeholder="name@organisation.com"
            />
            {fieldErrors.email && (
              <p className="mt-1.5 text-xs text-red-700">{fieldErrors.email}</p>
            )}
          </div>

          {/* 3. Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-[#123D35] mb-2">
              Phone Number <span className="text-red-700">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 text-base sm:text-sm bg-[#F5F2EA]/60 border border-[#123D35]/20 text-[#202522] focus:outline-none focus:border-[#123D35]"
              placeholder="+234 ..."
            />
            {fieldErrors.phone && (
              <p className="mt-1.5 text-xs text-red-700">{fieldErrors.phone}</p>
            )}
          </div>

          {/* 4. Company / Organisation */}
          <div>
            <label htmlFor="company" className="block text-xs font-semibold uppercase tracking-wider text-[#123D35] mb-2">
              Company / Organisation <span className="text-[#202522]/50 font-normal">(Optional)</span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="w-full px-4 py-3 text-base sm:text-sm bg-[#F5F2EA]/60 border border-[#123D35]/20 text-[#202522] focus:outline-none focus:border-[#123D35]"
              placeholder="Organisation or agency name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* 5. Subject */}
          <div>
            <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-[#123D35] mb-2">
              Subject <span className="text-red-700">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-3 text-base sm:text-sm bg-[#F5F2EA]/60 border border-[#123D35]/20 text-[#202522] focus:outline-none focus:border-[#123D35]"
              placeholder="e.g. Proposed Institutional Complex"
            />
            {fieldErrors.subject && (
              <p className="mt-1.5 text-xs text-red-700">{fieldErrors.subject}</p>
            )}
          </div>

          {/* 6. Service of Interest */}
          <div>
            <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-[#123D35] mb-2">
              Service of Interest <span className="text-red-700">*</span>
            </label>
            <select
              id="service"
              name="service"
              required
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full px-4 py-3 text-base sm:text-sm bg-[#F5F2EA]/60 border border-[#123D35]/20 text-[#202522] focus:outline-none focus:border-[#123D35]"
            >
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {fieldErrors.service && (
              <p className="mt-1.5 text-xs text-red-700">{fieldErrors.service}</p>
            )}
          </div>
        </div>

        {/* 7. Project Location */}
        <div>
          <label htmlFor="location" className="block text-xs font-semibold uppercase tracking-wider text-[#123D35] mb-2">
            Project Location <span className="text-[#202522]/50 font-normal">(Optional)</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full px-4 py-3 text-base sm:text-sm bg-[#F5F2EA]/60 border border-[#123D35]/20 text-[#202522] focus:outline-none focus:border-[#123D35]"
            placeholder="e.g. Ibadan, Lagos, Abuja, or Accra"
          />
        </div>

        {/* 8. Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#123D35] mb-2">
            Message <span className="text-red-700">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 text-base sm:text-sm bg-[#F5F2EA]/60 border border-[#123D35]/20 text-[#202522] focus:outline-none focus:border-[#123D35]"
            placeholder="Describe your project scope, site status, timeline, or consultation requirements..."
          />
          {fieldErrors.message && (
            <p className="mt-1.5 text-xs text-red-700">{fieldErrors.message}</p>
          )}
        </div>

        {/* 9. Privacy Consent Checkbox */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              className="mt-1 w-4 h-4 accent-[#123D35] shrink-0"
            />
            <span className="text-xs text-[#202522]/80 leading-relaxed">
              I consent to Leo Biga Associates Limited processing the information provided in this
              enquiry for the purpose of responding to my consultation request.{' '}
              <span className="text-red-700">*</span>
            </span>
          </label>
          {fieldErrors.consent && (
            <p className="mt-1.5 text-xs text-red-700">{fieldErrors.consent}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#123D35] text-[#F5F2EA] hover:bg-[#0B2822] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#C5A46D]" />
                SEND MESSAGE
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
