'use client'

import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  Loader2,
  MapPin,
  UploadCloud,
  X,
} from 'lucide-react'
import type { CareerOpening } from '@/data/careers'

const steps = ['Resume', 'My information', 'Experience', 'Review']
const acceptedFileTypes = '.pdf,.doc,.docx,.txt'
const maxResumeSize = 5 * 1024 * 1024

type Fields = {
  source: string
  workedBefore: string
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  city: string
  linkedIn: string
  portfolio: string
  currentTitle: string
  yearsExperience: string
  coverLetter: string
  consent: boolean
}

const initialFields: Fields = {
  source: '',
  workedBefore: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  linkedIn: '',
  portfolio: '',
  currentTitle: '',
  yearsExperience: '',
  coverLetter: '',
  consent: false,
}

export default function JobApplicationForm({ job }: { job: CareerOpening }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState(0)
  const [resume, setResume] = useState<File | null>(null)
  const [fields, setFields] = useState<Fields>(initialFields)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const candidateName = useMemo(
    () => `${fields.firstName} ${fields.lastName}`.trim(),
    [fields.firstName, fields.lastName],
  )

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }))
    setError('')
  }

  function chooseResume(file?: File) {
    if (!file) return
    const extension = file.name.split('.').pop()?.toLowerCase()
    if (!extension || !['pdf', 'doc', 'docx', 'txt'].includes(extension)) {
      setError('Upload a PDF, DOC, DOCX, or TXT resume.')
      return
    }
    if (file.size > maxResumeSize) {
      setError('Your resume must be 5 MB or smaller.')
      return
    }
    setResume(file)
    setError('')
  }

  function validateCurrentStep() {
    if (step === 0 && !resume) return 'Add your resume before continuing.'
    if (step === 1) {
      if (!fields.source || !fields.workedBefore || !fields.firstName || !fields.lastName || !fields.email || !fields.phone || !fields.country) {
        return 'Complete all required personal information.'
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return 'Enter a valid email address.'
    }
    if (step === 2 && !fields.yearsExperience) return 'Select your years of relevant experience.'
    if (step === 3 && !fields.consent) return 'Confirm that the information provided is accurate.'
    return ''
  }

  function goNext() {
    const message = validateCurrentStep()
    if (message) {
      setError(message)
      return
    }
    setError('')
    setStep((current) => Math.min(current + 1, steps.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function submitApplication() {
    const message = validateCurrentStep()
    if (message || !resume) {
      setError(message || 'Add your resume before submitting.')
      return
    }

    setSubmitting(true)
    setError('')
    const formData = new FormData()
    formData.set('resume', resume)
    formData.set('jobSlug', job.slug)
    formData.set('jobTitle', job.title)
    Object.entries(fields).forEach(([key, value]) => formData.set(key, String(value)))

    try {
      const response = await fetch('/api/job-applications', { method: 'POST', body: formData })
      const result = (await response.json().catch(() => null)) as { error?: string } | null
      if (!response.ok) {
        setError(result?.error || 'We could not submit your application. Please try again.')
        return
      }
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setError('We could not reach the application service. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto w-[90%] py-20 2xl:w-[75%]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-emerald-400/25 bg-[linear-gradient(145deg,rgba(52,211,153,.12),rgba(255,255,255,.025))] px-7 py-16 text-center sm:px-14">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-400 text-[#11122F]">
            <CheckCircle2 className="h-10 w-10" />
          </span>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Application received</p>
          <h1 className="BenzinSemibold mt-4 text-3xl leading-tight sm:text-5xl">Thank you, {fields.firstName}.</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/60">
            Your application for {job.title} is with our team. If your experience matches what we need, we’ll contact you using {fields.email}.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/opportunities" className="rounded-xl border border-white/15 px-6 py-4 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/[0.05]">
              Browse more roles
            </Link>
            <Link href="/" className="rounded-xl bg-[#F45B25] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#FF7544]">
              Return home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-[90%] py-12 lg:py-20 2xl:w-[75%]">
      <Link href={`/opportunities/${job.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition hover:text-[#F45B25]">
        <ArrowLeft className="h-4 w-4" />
        Back to job posting
      </Link>

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
        <section className="overflow-hidden rounded-[2rem] border border-white/12 bg-[#171835]">
          <header className="border-b border-white/10 px-6 py-7 sm:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F45B25]">Apply to BmyBrand</p>
            <h1 className="BenzinSemibold mt-3 text-2xl leading-tight sm:text-4xl">{job.title}</h1>

            <div className="mt-8 grid grid-cols-4">
              {steps.map((label, index) => {
                const complete = index < step
                const active = index === step
                return (
                  <div key={label} className="relative text-center">
                    {index > 0 && <span className={`absolute right-1/2 top-4 h-px w-full ${index <= step ? 'bg-[#F45B25]' : 'bg-white/15'}`} />}
                    <span className={`relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${
                      complete
                        ? 'border-[#F45B25] bg-[#F45B25] text-white'
                        : active
                          ? 'border-[#F45B25] bg-[#11122F] text-[#F45B25]'
                          : 'border-white/15 bg-[#171835] text-white/35'
                    }`}>
                      {complete ? <Check className="h-4 w-4" /> : index + 1}
                    </span>
                    <span className={`mt-2 block text-[10px] font-semibold sm:text-xs ${active ? 'text-white' : 'text-white/40'}`}>{label}</span>
                  </div>
                )
              })}
            </div>
          </header>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            {step === 0 && (
              <div>
                <StepHeading title="Start with your resume" text="Upload your resume or CV. We’ll attach it securely to this application." />
                <input
                  ref={inputRef}
                  type="file"
                  accept={acceptedFileTypes}
                  className="sr-only"
                  onChange={(event) => chooseResume(event.target.files?.[0])}
                />
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  onDragEnter={(event) => { event.preventDefault(); setDragging(true) }}
                  onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
                  onDragLeave={(event) => { event.preventDefault(); setDragging(false) }}
                  onDrop={(event) => {
                    event.preventDefault()
                    setDragging(false)
                    chooseResume(event.dataTransfer.files?.[0])
                  }}
                  className={`mt-8 flex min-h-64 w-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed px-6 text-center transition ${
                    dragging ? 'border-[#F45B25] bg-[#F45B25]/10' : 'border-white/20 bg-[#0D0E29] hover:border-[#F45B25]/65 hover:bg-[#F45B25]/[0.04]'
                  }`}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F45B25]/12 text-[#F45B25]">
                    <UploadCloud className="h-8 w-8" />
                  </span>
                  <span className="BenzinSemibold mt-5 text-lg">{resume ? 'Replace resume' : 'Drop your resume here'}</span>
                  <span className="mt-2 text-sm text-white/45">or click to choose a file</span>
                  <span className="mt-4 text-xs text-white/30">PDF, DOC, DOCX, or TXT · 5 MB maximum</span>
                </button>
                {resume && (
                  <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
                    <FileText className="h-5 w-5 shrink-0 text-emerald-300" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">{resume.name}</p>
                      <p className="mt-1 text-xs text-white/35">{formatBytes(resume.size)}</p>
                    </div>
                    <button type="button" onClick={() => setResume(null)} aria-label="Remove resume" className="rounded-lg p-2 text-white/40 transition hover:bg-white/10 hover:text-white">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {step === 1 && (
              <div>
                <StepHeading title="Tell us about yourself" text="Fields marked with an asterisk are required." />
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field label="How did you hear about us? *">
                    <select required value={fields.source} onChange={(event) => update('source', event.target.value)} className={inputClass}>
                      <option value="">Select one</option>
                      <option>LinkedIn</option>
                      <option>Indeed or another job board</option>
                      <option>Employee referral</option>
                      <option>Social media</option>
                      <option>BmyBrand website</option>
                      <option>Other</option>
                    </select>
                  </Field>
                  <Field label="Worked with BmyBrand before? *">
                    <select required value={fields.workedBefore} onChange={(event) => update('workedBefore', event.target.value)} className={inputClass}>
                      <option value="">Select one</option>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </Field>
                  <Field label="First name *"><input required value={fields.firstName} onChange={(event) => update('firstName', event.target.value)} className={inputClass} /></Field>
                  <Field label="Last name *"><input required value={fields.lastName} onChange={(event) => update('lastName', event.target.value)} className={inputClass} /></Field>
                  <Field label="Email address *"><input required type="email" value={fields.email} onChange={(event) => update('email', event.target.value)} className={inputClass} /></Field>
                  <Field label="Phone number *"><input required type="tel" value={fields.phone} onChange={(event) => update('phone', event.target.value)} placeholder="+1 555 000 0000" className={inputClass} /></Field>
                  <Field label="Country *"><input required value={fields.country} onChange={(event) => update('country', event.target.value)} className={inputClass} /></Field>
                  <Field label="City"><input value={fields.city} onChange={(event) => update('city', event.target.value)} className={inputClass} /></Field>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <StepHeading title="Your experience" text="Share the context that helps us understand your craft and the work you want to do next." />
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field label="Current or most recent title"><input value={fields.currentTitle} onChange={(event) => update('currentTitle', event.target.value)} className={inputClass} /></Field>
                  <Field label="Relevant experience *">
                    <select required value={fields.yearsExperience} onChange={(event) => update('yearsExperience', event.target.value)} className={inputClass}>
                      <option value="">Select one</option>
                      <option>Less than 1 year</option>
                      <option>1–2 years</option>
                      <option>3–5 years</option>
                      <option>6–9 years</option>
                      <option>10+ years</option>
                    </select>
                  </Field>
                  <Field label="LinkedIn profile"><input type="url" value={fields.linkedIn} onChange={(event) => update('linkedIn', event.target.value)} placeholder="https://linkedin.com/in/..." className={inputClass} /></Field>
                  <Field label="Portfolio or website"><input type="url" value={fields.portfolio} onChange={(event) => update('portfolio', event.target.value)} placeholder="https://..." className={inputClass} /></Field>
                  <div className="sm:col-span-2">
                    <Field label="Cover note">
                      <textarea rows={8} value={fields.coverLetter} onChange={(event) => update('coverLetter', event.target.value)} placeholder="Why does this role feel like the right next move for you?" className={`${inputClass} resize-y leading-7`} />
                    </Field>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <StepHeading title="Review your application" text="Make sure everything looks right before sending it to our team." />
                <div className="mt-8 space-y-4">
                  <ReviewCard title="Resume" rows={[[resume?.name || '', resume ? formatBytes(resume.size) : '']]} onEdit={() => setStep(0)} />
                  <ReviewCard title="My information" rows={[
                    ['Name', candidateName],
                    ['Email', fields.email],
                    ['Phone', fields.phone],
                    ['Location', [fields.city, fields.country].filter(Boolean).join(', ')],
                  ]} onEdit={() => setStep(1)} />
                  <ReviewCard title="Experience" rows={[
                    ['Current title', fields.currentTitle || 'Not provided'],
                    ['Relevant experience', fields.yearsExperience],
                    ['LinkedIn', fields.linkedIn || 'Not provided'],
                    ['Portfolio', fields.portfolio || 'Not provided'],
                  ]} onEdit={() => setStep(2)} />
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-[#0D0E29] p-5 text-sm leading-6 text-white/55">
                    <input type="checkbox" checked={fields.consent} onChange={(event) => update('consent', event.target.checked)} className="mt-1 h-4 w-4 accent-[#F45B25]" />
                    <span>I confirm that the information in this application is accurate and I agree that BmyBrand may use it to assess my candidacy. *</span>
                  </label>
                </div>
              </div>
            )}

            {error && <div role="alert" className="mt-6 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</div>}
          </div>

          <footer className="flex items-center justify-between gap-3 border-t border-white/10 bg-[#11122F]/45 px-6 py-5 sm:px-10">
            <button type="button" disabled={step === 0 || submitting} onClick={() => { setStep((current) => Math.max(0, current - 1)); setError('') }} className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/65 transition hover:border-white/30 hover:text-white disabled:invisible">
              Back
            </button>
            {step < steps.length - 1 ? (
              <button type="button" onClick={goNext} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(244,91,37,.3)]">
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button type="button" disabled={submitting} onClick={() => void submitApplication()} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F45B25] to-[#FF843E] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(244,91,37,.3)] disabled:cursor-not-allowed disabled:opacity-60">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <>Submit application <ArrowRight className="h-4 w-4" /></>}
              </button>
            )}
          </footer>
        </section>

        <aside className="space-y-5 xl:sticky xl:top-32">
          <div className="rounded-[1.75rem] border border-white/12 bg-[#171835] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F45B25]">You’re applying for</p>
            <h2 className="BenzinSemibold mt-4 text-xl leading-snug">{job.title}</h2>
            <div className="mt-5 flex items-start gap-2 text-sm leading-6 text-white/48">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#F45B25]" />
              <span>{job.location} · {job.workplace}</span>
            </div>
            <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-6 text-white/45">{job.summary}</p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-7">
            <h2 className="BenzinSemibold text-base">What happens next?</h2>
            <ol className="mt-5 space-y-4 text-sm leading-6 text-white/45">
              <li><span className="mr-2 font-semibold text-[#F45B25]">01</span> We review your experience.</li>
              <li><span className="mr-2 font-semibold text-[#F45B25]">02</span> A recruiter contacts strong matches.</li>
              <li><span className="mr-2 font-semibold text-[#F45B25]">03</span> You meet the team and explore the work.</li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-white/12 bg-[#0D0E29] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#F45B25] focus:ring-2 focus:ring-[#F45B25]/15'

function StepHeading({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="BenzinSemibold text-2xl leading-tight sm:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-white/45">{text}</p>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label>
      <span className="mb-2 block text-xs font-semibold text-white/65">{label}</span>
      {children}
    </label>
  )
}

function ReviewCard({ title, rows, onEdit }: { title: string; rows: string[][]; onEdit: () => void }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0D0E29] p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="BenzinSemibold text-sm">{title}</h3>
        <button type="button" onClick={onEdit} className="text-xs font-semibold text-[#F45B25] transition hover:text-[#FF843E]">Edit</button>
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={`${label}-${value}`} className="min-w-0">
            {value ? <><dt className="text-xs text-white/30">{label}</dt><dd className="mt-1 break-words text-white/65">{value}</dd></> : null}
          </div>
        ))}
      </dl>
    </div>
  )
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
