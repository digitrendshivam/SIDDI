import React, { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  ArrowSquareOut,
  CheckCircle,
  MapPin,
  NavigationArrow,
  X,
} from '@phosphor-icons/react';
import { Meta } from '../components/common/Meta';
import { Container } from '../components/layout/Layout';
import { DoorLever } from '../components/common/DoorLever';
import { BouncyAccordion } from '../components/ui/be-ui-bouncy-accordion';
import ScrollExpand from '../components/ui/ScrollExpand';

type EnquiryType = 'door-takeoff' | 'sample-box' | 'contract-supply' | 'custom-milling';
type FormStatus = 'idle' | 'submitting' | 'success' | 'unconfigured' | 'error';
type FormValues = { fullName: string; email: string; phone: string; productFocus: string; notes: string; enquiryType: EnquiryType; consent: boolean };

const enquiryTypes: { id: EnquiryType; label: string }[] = [
  { id: 'door-takeoff', label: 'Door takeoff' },
  { id: 'sample-box', label: 'Sample box' },
  { id: 'contract-supply', label: 'Contract supply' },
  { id: 'custom-milling', label: 'Custom milling' },
];
const acceptedFileTypes = ['pdf', 'dwg', 'xlsx'];
const maxFileSize = 25 * 1024 * 1024;

export const TradeDeskPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type');
  const validInitialType = enquiryTypes.find((item) => item.id === initialType)?.id ?? 'door-takeoff';
  const initialFocus = searchParams.get('product') ?? searchParams.get('finish') ?? searchParams.get('interest') ?? '';
  const [values, setValues] = useState<FormValues>({ fullName: '', email: '', phone: '', productFocus: initialFocus, notes: '', enquiryType: validInitialType, consent: false });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileError, setFileError] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
    if (status !== 'idle') setStatus('idle');
  };

  const addFiles = (incoming: FileList | File[]) => {
    const next = Array.from(incoming);
    const invalid = next.find((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
      return !acceptedFileTypes.includes(extension) || file.size > maxFileSize;
    });
    if (invalid) {
      const extension = invalid.name.split('.').pop()?.toLowerCase() ?? '';
      setFileError(!acceptedFileTypes.includes(extension) ? 'Use a PDF, DWG or XLSX file.' : 'Each file must be 25 MB or smaller.');
      return;
    }
    setFileError('');
    setFiles((current) => [...current, ...next.filter((file) => !current.some((item) => item.name === file.name && item.size === file.size))]);
    setStatus('idle');
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.fullName.trim()) next.fullName = 'Enter your name.';
    if (!values.email.trim()) next.email = 'Enter your work email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.';
    if (!values.phone.trim()) next.phone = 'Enter a phone number.';
    if (!values.notes.trim()) next.notes = 'Add a short note about your project.';
    if (!values.consent) next.consent = 'Consent is required to send this enquiry.';
    setErrors(next);
    return Object.keys(next).length === 0 && !fileError;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const endpoint = import.meta.env.VITE_TRADE_DESK_ENDPOINT as string | undefined;
    if (!endpoint) {
      setStatus('unconfigured');
      return;
    }

    setStatus('submitting');
    try {
      const payload = new FormData();
      Object.entries(values).forEach(([key, value]) => payload.append(key, String(value)));
      files.forEach((file) => payload.append('files', file));
      const response = await fetch(endpoint, { method: 'POST', body: payload });
      if (!response.ok) throw new Error('The enquiry could not be sent. Try again.');
      setStatus('success');
      setValues({ fullName: '', email: '', phone: '', productFocus: '', notes: '', enquiryType: 'door-takeoff', consent: false });
      setFiles([]);
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="trade-desk-page min-h-screen bg-[#FAF8F5] text-[#18181B]" style={{ fontFamily: '"Poppins", sans-serif' }}>
      <Meta
        title="Trade Desk — SIDDI Architectural Hardware"
        description="Send a door schedule, request samples or discuss a trade supply project with SIDDI."
      />

      {/* Minimal Editorial Hero Header matching other pages layout & Poppins typography */}
      <section className="relative w-full bg-[#F6F2EC] border-b border-[#E7E2DA] py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              <Link to="/" className="text-[#64748B] hover:text-[#18181B] transition-colors">
                HOME
              </Link>
              <span className="text-[#94A3B8] text-[10px] font-normal">&gt;</span>
              <span className="text-[#F5B900]" aria-current="page">
                TRADE DESK
              </span>
            </nav>

            {/* Heading in Poppins */}
            <h1
              style={{ fontFamily: '"Poppins", sans-serif' }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-[#18181B] tracking-tight leading-[1.08]"
            >
              Send us your<br />
              door schedule<span className="text-[#AD8143]">.</span>
            </h1>

            {/* Description in Poppins */}
            <p
              style={{ fontFamily: '"Poppins", sans-serif' }}
              className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-[#57534E] font-normal"
            >
              We return a door-by-door hardware takeoff within 48 hours. Share your schedule, drawings, or finish requirements for your project.
            </p>
          </div>
        </Container>
      </section>

      {/* React Bits ScrollExpand Component: Expands frame to reveal Contact Form */}
      <section id="schedule-form" className="relative w-full bg-[#FAF8F5]">
        <ScrollExpand
          src="/Warm Architectural Hardware Studio Still Life.png"
          alt="SIDDI Architectural Hardware Studio"
          title="Send your schedule"
          scrollHint="Scroll to open enquiry form"
          useWindowScroll
          startWidth={50}
          startHeight={62}
          startRadius={32}
          endRadius={0}
          mediaZoom={1.25}
          scrollDistance={0.8}
          holdDistance={0.35}
          overlayScrim={0.55}
          className="bg-[#FAF8F5]"
        >
          <Container className="max-w-6xl text-left py-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: Form Card with exact screenshot sizing & SIDDI brand colors */}
              <div className="lg:col-span-8 bg-white rounded-[32px] sm:rounded-[36px] border border-[#E5E0D8] p-6 sm:p-9 lg:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
                {/* Heading */}
                <h2
                  style={{ fontFamily: '"Poppins", sans-serif' }}
                  className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#18181B] tracking-tight mb-6"
                >
                  Tell us what you need
                </h2>

                <form onSubmit={submit} noValidate>
                  {/* Enquiry Type Pills */}
                  <div className="mb-6">
                    <span className="block text-xs font-semibold text-[#78716C] uppercase tracking-wider mb-2.5">
                      Enquiry type
                    </span>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {enquiryTypes.map((item) => {
                        const isSelected = values.enquiryType === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => update('enquiryType', item.id)}
                            className={`rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? 'bg-[#AD8143] text-white border border-[#AD8143] shadow-xs'
                                : 'bg-[#F5F3EF] text-[#57534E] border border-[#E5E0D8] hover:border-[#AD8143]/60 hover:text-[#18181B]'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form Fields: 2-Column Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-[#18181B] mb-1.5">
                        Name <span className="text-[#AD8143]">*</span>
                      </label>
                      <input
                        autoComplete="name"
                        value={values.fullName}
                        onChange={(e) => update('fullName', e.target.value)}
                        className="w-full rounded-2xl border border-[#E5E0D8] bg-[#F5F3EF] px-4 py-3 text-sm text-[#18181B] placeholder-[#9C968E] focus:outline-none focus:border-[#AD8143] focus:bg-white focus:ring-2 focus:ring-[#AD8143]/20 transition-all"
                      />
                      {errors.fullName && (
                        <small className="text-[#b42318] text-xs mt-1 block">{errors.fullName}</small>
                      )}
                    </div>

                    {/* Work Email */}
                    <div>
                      <label className="block text-xs font-medium text-[#18181B] mb-1.5">
                        Work email <span className="text-[#AD8143]">*</span>
                      </label>
                      <input
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => update('email', e.target.value)}
                        className="w-full rounded-2xl border border-[#E5E0D8] bg-[#F5F3EF] px-4 py-3 text-sm text-[#18181B] placeholder-[#9C968E] focus:outline-none focus:border-[#AD8143] focus:bg-white focus:ring-2 focus:ring-[#AD8143]/20 transition-all"
                      />
                      {errors.email && (
                        <small className="text-[#b42318] text-xs mt-1 block">{errors.email}</small>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-medium text-[#18181B] mb-1.5">
                        Phone <span className="text-[#AD8143]">*</span>
                      </label>
                      <input
                        type="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className="w-full rounded-2xl border border-[#E5E0D8] bg-[#F5F3EF] px-4 py-3 text-sm text-[#18181B] placeholder-[#9C968E] focus:outline-none focus:border-[#AD8143] focus:bg-white focus:ring-2 focus:ring-[#AD8143]/20 transition-all"
                      />
                      {errors.phone && (
                        <small className="text-[#b42318] text-xs mt-1 block">{errors.phone}</small>
                      )}
                    </div>

                    {/* Product Focus */}
                    <div>
                      <label className="block text-xs font-medium text-[#18181B] mb-1.5">
                        Product focus <span className="text-[11px] font-normal text-[#9C968E]">optional</span>
                      </label>
                      <input
                        value={values.productFocus}
                        onChange={(e) => update('productFocus', e.target.value)}
                        className="w-full rounded-2xl border border-[#E5E0D8] bg-[#F5F3EF] px-4 py-3 text-sm text-[#18181B] placeholder-[#9C968E] focus:outline-none focus:border-[#AD8143] focus:bg-white focus:ring-2 focus:ring-[#AD8143]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Project Notes */}
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-[#18181B] mb-1.5">
                      Project notes <span className="text-[#AD8143]">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={values.notes}
                      onChange={(e) => update('notes', e.target.value)}
                      placeholder="Location, door quantities, timing"
                      className="w-full rounded-2xl border border-[#E5E0D8] bg-[#F5F3EF] p-3.5 text-sm text-[#18181B] placeholder-[#9C968E] focus:outline-none focus:border-[#AD8143] focus:bg-white focus:ring-2 focus:ring-[#AD8143]/20 transition-all resize-y min-h-[95px]"
                    />
                    {errors.notes && (
                      <small className="text-[#b42318] text-xs mt-1 block">{errors.notes}</small>
                    )}
                  </div>

                  {/* Project Files Drop Area */}
                  <div className="mb-4 rounded-2xl bg-[#F5F3EF] border border-[#E5E0D8] p-5 text-center transition-colors hover:border-[#AD8143]/50">
                    <input
                      ref={inputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.dwg,.xlsx,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      multiple
                      onChange={(e) => {
                        if (e.target.files) addFiles(e.target.files);
                        e.target.value = '';
                      }}
                    />
                    <div className="text-sm font-semibold text-[#18181B] mb-0.5">Project files</div>
                    <div className="text-xs text-[#57534E]">
                      Drop files here or{' '}
                      <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="text-[#AD8143] underline font-medium cursor-pointer"
                      >
                        browse
                      </button>
                    </div>
                    <div className="text-[11px] text-[#78716C] mt-1 font-mono">
                      PDF, DWG or XLSX, up to 25 MB per file
                    </div>

                    {fileError && <p className="text-[#b42318] text-xs mt-2">{fileError}</p>}

                    {files.length > 0 && (
                      <ul className="mt-3 space-y-2 text-left">
                        {files.map((file, idx) => (
                          <li
                            key={`${file.name}-${file.size}`}
                            className="flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-white border border-[#E2DED7] text-xs"
                          >
                            <span className="truncate max-w-[280px] font-medium text-[#18181B]">
                              {file.name}{' '}
                              <small className="text-[#A8A29E]">
                                ({(file.size / (1024 * 1024)).toFixed(1)} MB)
                              </small>
                            </span>
                            <button
                              type="button"
                              onClick={() => setFiles((curr) => curr.filter((_, i) => i !== idx))}
                              className="text-[#78716C] hover:text-[#b42318] p-1 cursor-pointer"
                            >
                              <X size={15} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <label className="flex items-start gap-3 my-4 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={values.consent}
                      onChange={(e) => update('consent', e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-[#E2DED7] text-[#AD8143] focus:ring-[#AD8143] accent-[#AD8143]"
                    />
                    <span className="text-xs text-[#57534E] leading-relaxed">
                      I agree that SIDDI may use these details to respond to my enquiry.{' '}
                      <Link to="/privacy" className="text-[#AD8143] underline">
                        Privacy policy
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.consent && (
                    <small className="text-[#b42318] text-xs -mt-2 mb-3 block">{errors.consent}</small>
                  )}

                  {/* Status Messages */}
                  {status === 'unconfigured' && (
                    <p className="p-3 mb-4 rounded-xl bg-[#FAF6EE] border border-[#E8E2D5] text-xs text-[#AD8143]">
                      Your details are valid, but online submission is not connected yet. No information has been sent. Please contact SIDDI to continue.
                    </p>
                  )}
                  {status === 'success' && (
                    <p className="p-3 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle size={18} weight="fill" className="text-emerald-600 shrink-0" />
                      <span>Your enquiry has been sent. The trade desk will follow up.</span>
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                      We could not send your enquiry. Please try again.
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="rounded-full px-9 py-3 bg-[#AD8143] hover:bg-[#8F6630] text-white font-semibold text-sm transition-all shadow-[0_4px_16px_rgba(173,129,67,0.25)] flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 group"
                  >
                    <span>{status === 'submitting' ? 'Sending enquiry…' : 'Send enquiry'}</span>
                    <DoorLever size={18} className="shrink-0" />
                  </button>
                </form>
              </div>

              {/* Right Column: Aside Info & Next Steps (2 Cards) */}
              <aside className="lg:col-span-4 flex flex-col space-y-5">
                {/* Card 1: Desk Location, Accepted Schedules, Hours & Dedicated Trade Desk Graphic */}
                <div className="rounded-[28px] bg-white border border-[#E5E0D8] p-5 sm:p-6 space-y-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                  {/* Desk Location */}
                  <div>
                    <div className="text-xs text-[#78716C] mb-1 font-medium">
                      Desk location
                    </div>
                    <div className="text-base font-bold text-[#18181B]">Rajkot, India</div>
                  </div>

                  <div className="border-t border-[#E4DFD6]" />

                  {/* Accepted Schedules */}
                  <div>
                    <div className="text-xs text-[#78716C] mb-1 font-medium">
                      Accepted schedules
                    </div>
                    <div className="text-base font-bold text-[#18181B]">PDF, DWG, XLSX</div>
                  </div>

                  <div className="border-t border-[#E4DFD6]" />

                  {/* Hours and Phone */}
                  <div>
                    <div className="text-xs text-[#78716C] mb-1.5 font-medium">
                      Hours and phone
                    </div>
                    <div className="inline-block px-3 py-1.5 rounded-lg border border-dashed border-[#B8B2A6] text-xs font-mono text-[#57534E] bg-[#FAF8F5]">
                      Office hours to be confirmed
                    </div>
                  </div>

                  {/* Divider & Transparent Graphic in Logo Colors */}
                  <div className="border-t border-[#E4DFD6] pt-1" />

                  <div className="w-full flex flex-col items-center justify-center pt-2">
                    <img
                      src="/trade-desk-support.png"
                      alt="SIDDI trade desk support assistant"
                      className="w-full max-w-[270px] h-auto object-contain mx-auto select-none pointer-events-none drop-shadow-sm"
                    />
                  </div>
                </div>

                {/* Card 2: What happens next */}
                <div className="rounded-[28px] bg-white border border-[#E5E0D8] p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                  <h3
                    style={{ fontFamily: '"Poppins", sans-serif' }}
                    className="text-lg font-bold text-[#18181B] tracking-tight mb-3"
                  >
                    What happens next
                  </h3>
                  <ol className="space-y-2.5 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-[#18181B]">1.</span>
                      <span>We review your enquiry and schedule.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-[#18181B]">2.</span>
                      <span>We confirm product and finish requirements.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-[#18181B]">3.</span>
                      <span>We return the takeoff, or follow up about samples and supply.</span>
                    </li>
                  </ol>

                  {/* WhatsApp Link */}
                  <a
                    href="https://wa.me/919428161116?text=Hello%20SIDDI%2C%20I%20would%20like%20to%20contact%20the%20trade%20desk."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4.5 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#18181B] hover:text-[#AD8143] transition-colors group"
                  >
                    <span>Message the desk on WhatsApp</span>
                    <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-1 text-[#AD8143]" />
                  </a>
                </div>
              </aside>
            </div>
          </Container>
        </ScrollExpand>
      </section>

      <main className="bg-[#FAF8F5]">
        <section className="trade-desk-faq" aria-labelledby="trade-faq-title">
          <Container>
            <div className="trade-desk-faq__inner">
              <div>
                <h2 id="trade-faq-title">Before you send a schedule.</h2>
                <p className="trade-desk-faq__intro">A few details to help you prepare your enquiry.</p>
              </div>
              <BouncyAccordion
                className="trade-desk-faq__list"
                items={[
                  {
                    id: 'file-types',
                    title: 'Which file types can I attach?',
                    description: 'PDF, DWG and XLSX files are accepted, up to 25 MB per file.',
                  },
                  {
                    id: 'samples',
                    title: 'Can I ask for samples without a door schedule?',
                    description: 'Yes. Select “Sample box” and describe the finishes or products you would like to review.',
                  },
                  {
                    id: 'takeoff',
                    title: 'What information helps with a takeoff?',
                    description: 'Include the project location, door quantities, hardware requirements and any relevant timing.',
                  },
                ]}
                defaultValue="takeoff"
              />
            </div>
          </Container>
        </section>

        {/* Studio & Manufacturing Map Section */}
        <section className="w-full bg-[#FAF8F5] py-16 sm:py-24 border-t border-[#EAE6DE]" aria-labelledby="studio-location-title">
          <Container>
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 sm:mb-12">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E0D8] text-[11px] font-mono uppercase tracking-wider text-[#946B00] font-semibold mb-4 shadow-xs">
                  <MapPin size={14} weight="fill" className="text-[#946B00]" />
                  Studio & Foundry Location
                </div>
                <h2
                  id="studio-location-title"
                  style={{ fontFamily: '"Poppins", sans-serif' }}
                  className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#18181B] tracking-tight leading-[1.12]"
                >
                  Visit our Rajkot works<span className="text-[#946B00]">.</span>
                </h2>
                <p
                  style={{ fontFamily: '"Poppins", sans-serif' }}
                  className="mt-3.5 text-base sm:text-lg text-[#57534E] leading-relaxed font-normal"
                >
                  Golden Industries Area, 80 Feet Road, Nr. Sai Baba Circle, Gondal Rd, Kotharia, Rajkot 360022. Visit our studio to inspect physical handle samples, custom knurling textures, and PVD finishes in person.
                </p>
              </div>

              {/* Direction CTA for fast access */}
              <div className="hidden sm:block shrink-0">
                <a
                  href="https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqBggBEEUYOzIGCAAQRRg7MgYIARBFGDsyDQgCEC4YrwEYxwEYgAQyCggDEC4YsQMYgAQyCggEEC4YsQMYgAQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQg0Mzg2ajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KSXnIuKHtVk5McahaoVgWDfr&daddr=GOLDEN+INDUSTRIES+AREA,+80+FEET+ROAD,+NR.+SAI+BABA+CIRCLE,+Gondal+Rd,+Kotharia,+Gujarat+360022"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full py-3.5 px-6 font-semibold text-xs sm:text-sm text-[#0B0B0C] bg-[#FFC400] hover:bg-[#E6B000] active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(255,196,0,0.3)] cursor-pointer group"
                >
                  <NavigationArrow size={16} weight="fill" className="transition-transform group-hover:scale-110" />
                  <span>Get directions</span>
                  <ArrowSquareOut size={15} weight="bold" />
                </a>
              </div>
            </div>

            {/* Panoramic Interactive Map Frame with Floating On-Map Action Button */}
            <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[640px] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-[#E5E0D8] shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-[#F5F3EF]">
              {/* Full Width Google Map iframe with Pin on Location */}
              <iframe
                title="SIDDI Works & Studio Map - Golden Industries Area, Rajkot"
                src="https://maps.google.com/maps?q=Siddhi+Metal+Industries,+GOLDEN+INDUSTRIES+AREA,+80+FEET+ROAD,+NR.+SAI+BABA+CIRCLE,+Gondal+Rd,+Kotharia,+Gujarat&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                className="w-full h-full border-0 absolute inset-0"
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              {/* Floating On-Map Direction Button (Centered cleanly above Google Maps controls) */}
              <div className="absolute bottom-16 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 w-max max-w-[calc(100%-2.5rem)] pointer-events-auto">
                <a
                  href="https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqBggBEEUYOzIGCAAQRRg7MgYIARBFGDsyDQgCEC4YrwEYxwEYgAQyCggDEC4YsQMYgAQyCggEEC4YsQMYgAQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQg0Mzg2ajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KSXnIuKHtVk5McahaoVgWDfr&daddr=GOLDEN+INDUSTRIES+AREA,+80+FEET+ROAD,+NR.+SAI+BABA+CIRCLE,+Gondal+Rd,+Kotharia,+Gujarat+360022"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full py-3 px-5 sm:py-4 sm:px-7 font-bold text-xs sm:text-sm text-[#0B0B0C] bg-[#FFC400] hover:bg-[#E6B000] active:scale-[0.98] transition-all shadow-[0_8px_25px_rgba(0,0,0,0.22),0_4px_14px_rgba(255,196,0,0.45)] cursor-pointer group whitespace-nowrap"
                >
                  <NavigationArrow size={15} weight="fill" className="transition-transform group-hover:scale-110 sm:scale-100" />
                  <span>Get directions</span>
                  <ArrowSquareOut size={15} weight="bold" />
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
};
