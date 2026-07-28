import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { CareerOpening } from '@/data/careers'

type CareerOpeningRow = {
  slug: string
  title: string
  summary: string
  description?: string
  about_company?: string
  posted_on?: string
  job_code?: string
  responsibilities?: unknown
  requirements?: unknown
  benefits?: unknown
  disclaimer?: string
  apply_url?: string
  department: CareerOpening['department']
  location: string
  workplace: CareerOpening['workplace']
  employment_type: CareerOpening['employmentType']
}

let careersDatabase: SupabaseClient | null = null
let careersDatabaseKey = ''

const listingColumns = 'slug, title, summary, department, location, workplace, employment_type'
const legacyDetailColumns = `${listingColumns}, description, responsibilities, requirements, benefits, apply_url`
const detailColumns = `${listingColumns}, description, about_company, posted_on, job_code, responsibilities, requirements, benefits, disclaimer, apply_url`

function getCareersDatabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  if (!url || !key) {
    throw new Error('The opportunities database is not configured.')
  }

  const cacheKey = `${url}:${key}`
  if (!careersDatabase || careersDatabaseKey !== cacheKey) {
    careersDatabase = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
    careersDatabaseKey = cacheKey
  }

  return careersDatabase
}

export async function getCareerOpenings(): Promise<CareerOpening[]> {
  try {
    const { data, error } = await getCareersDatabase()
      .from('job_openings')
      .select(listingColumns)
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data ?? []).map((row) => mapCareerOpening(row as CareerOpeningRow))
  } catch (error) {
    console.error('Unable to load career openings:', getErrorMessage(error))
    return []
  }
}

export async function getCareerOpening(slug: string): Promise<CareerOpening | null> {
  try {
    const database = getCareersDatabase()
    const { data, error } = await database
      .from('job_openings')
      .select(detailColumns)
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle()

    if (!error) {
      return data ? mapCareerOpening(data as CareerOpeningRow) : null
    }

    // Preserve the previously available detail content while the database is
    // waiting for the latest role-structure migration.
    const legacy = await database
      .from('job_openings')
      .select(legacyDetailColumns)
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle()

    if (!legacy.error) {
      return legacy.data ? mapCareerOpening(legacy.data as CareerOpeningRow) : null
    }

    const fallback = await database
      .from('job_openings')
      .select(listingColumns)
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle()

    if (fallback.error) throw fallback.error
    return fallback.data ? mapCareerOpening(fallback.data as CareerOpeningRow) : null
  } catch (error) {
    console.error('Unable to load career opening:', getErrorMessage(error))
    return null
  }
}

function mapCareerOpening(job: CareerOpeningRow): CareerOpening {
  return {
    slug: job.slug,
    title: job.title,
    summary: job.summary,
    description: job.description || job.summary,
    aboutCompany: job.about_company || '',
    postedOn: job.posted_on || '',
    jobCode: job.job_code || '',
    responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.map(String) : [],
    requirements: Array.isArray(job.requirements) ? job.requirements.map(String) : [],
    benefits: Array.isArray(job.benefits) ? job.benefits.map(String) : [],
    disclaimer: job.disclaimer || '',
    applyUrl: job.apply_url || '/contact?interest=careers',
    department: job.department,
    location: job.location,
    workplace: job.workplace,
    employmentType: job.employment_type,
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  if (error && typeof error === 'object') {
    const value = error as { message?: unknown; details?: unknown; hint?: unknown; code?: unknown }
    return [value.message, value.details, value.hint, value.code].filter(Boolean).join(' | ') || 'Unknown database error'
  }
  return String(error)
}
