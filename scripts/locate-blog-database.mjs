import { readFile } from 'node:fs/promises'
import { createClient } from '@supabase/supabase-js'

function parseEnv(source) {
  const values = {}
  for (const line of source.split(/\r?\n/)) {
    const match = line.match(/^([^#][^=]*)=(.*)$/)
    if (!match) continue
    let value = match[2].trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    values[match[1].trim()] = value
  }
  return values
}

function projectRef(url) {
  try {
    return new URL(url).hostname.split('.')[0]
  } catch {
    return 'invalid-url'
  }
}

const env = parseEnv(await readFile('.env.local', 'utf8'))
const candidates = [
  {
    label: 'Primary',
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    key: env.SUPABASE_SERVICE_ROLE_KEY,
  },
  {
    label: 'BMYB',
    url: env.NEXT_PUBLIC_BMYB_SUPABASE_URL,
    key: env.BMYB_SUPABASE_SERVICE_ROLE_KEY,
  },
]

for (const candidate of candidates) {
  if (!candidate.url || !candidate.key) {
    console.log(`${candidate.label}: not configured`)
    continue
  }
  const client = createClient(candidate.url, candidate.key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  const { count, error } = await client
    .from('blog_articles')
    .select('slug', { count: 'exact', head: true })
  console.log(
    `${candidate.label} project ${projectRef(candidate.url)}: ${
      error ? `blog_articles unavailable (${error.code || 'query-error'})` : `${count ?? 0} blog article(s)`
    }`,
  )
}
