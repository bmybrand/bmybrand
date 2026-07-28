import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { CareerOpening } from '@/data/careers'

type CareerOpeningRow = {
  slug: string
  title: string
  summary: string
  description: string
  responsibilities: unknown
  requirements: unknown
  benefits: unknown
  apply_url: string
  department: CareerOpening['department']
  location: string
  workplace: CareerOpening['workplace']
  employment_type: CareerOpening['employmentType']
}

let careersDatabase: SupabaseClient | null = null
let careersDatabaseKey = ''

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
      .select('slug, title, summary, description, responsibilities, requirements, benefits, apply_url, department, location, workplace, employment_type')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data ?? []).map((row) => {
      const job = row as CareerOpeningRow
      return {
        slug: job.slug,
        title: job.title,
        summary: job.summary,
        description: job.description,
        responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.map(String) : [],
        requirements: Array.isArray(job.requirements) ? job.requirements.map(String) : [],
        benefits: Array.isArray(job.benefits) ? job.benefits.map(String) : [],
        applyUrl: job.apply_url,
        department: job.department,
        location: job.location,
        workplace: job.workplace,
        employmentType: job.employment_type,
      }
    })
  } catch (error) {
    console.error('Unable to load career openings:', error instanceof Error ? error.message : error)
    return []
  }
}

export async function getCareerOpening(slug: string): Promise<CareerOpening | null> {
  try {
    const { data, error } = await getCareersDatabase()
      .from('job_openings')
      .select('slug, title, summary, description, responsibilities, requirements, benefits, apply_url, department, location, workplace, employment_type')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle()

    if (error) throw error
    if (!data) return null

    const job = data as CareerOpeningRow
    return {
      slug: job.slug,
      title: job.title,
      summary: job.summary,
      description: job.description,
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.map(String) : [],
      requirements: Array.isArray(job.requirements) ? job.requirements.map(String) : [],
      benefits: Array.isArray(job.benefits) ? job.benefits.map(String) : [],
      applyUrl: job.apply_url,
      department: job.department,
      location: job.location,
      workplace: job.workplace,
      employmentType: job.employment_type,
    }
  } catch (error) {
    console.error('Unable to load career opening:', error instanceof Error ? error.message : error)
    return null
  }
}
