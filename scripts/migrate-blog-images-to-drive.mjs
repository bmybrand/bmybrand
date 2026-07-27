import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const CRM_ENV_PATH = 'C:\\Users\\User\\Desktop\\invoice-crm\\.env.local'
const LEGACY_STORAGE_PATTERN = /https:\/\/[^"'()\s]+\.supabase\.co\/storage\/v1\/object\/[^"'()\s<]+/gi
const DRIVE_FILES_URL = 'https://www.googleapis.com/drive/v3/files'
const DRIVE_UPLOAD_URL =
  'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id&supportsAllDrives=true'

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

function findLegacyUrls(value, urls = new Set()) {
  if (typeof value === 'string') {
    for (const match of value.matchAll(LEGACY_STORAGE_PATTERN)) {
      urls.add(match[0])
    }
    return urls
  }
  if (Array.isArray(value)) {
    for (const item of value) findLegacyUrls(item, urls)
    return urls
  }
  if (value && typeof value === 'object') {
    for (const item of Object.values(value)) findLegacyUrls(item, urls)
  }
  return urls
}

function replaceLegacyUrls(value, replacements) {
  if (typeof value === 'string') {
    let next = value
    for (const [oldUrl, newUrl] of replacements) {
      next = next.split(oldUrl).join(newUrl)
    }
    return next
  }
  if (Array.isArray(value)) {
    return value.map((item) => replaceLegacyUrls(item, replacements))
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, replaceLegacyUrls(item, replacements)]),
    )
  }
  return value
}

async function getDriveAccessToken(env) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: env.GOOGLE_OAUTH_CLIENT_SECRET,
      refresh_token: env.GOOGLE_OAUTH_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  })
  const result = await response.json().catch(() => null)
  if (!response.ok || !result?.access_token) {
    throw new Error(result?.error_description || result?.error || 'Google Drive authentication failed.')
  }
  return result.access_token
}

async function ensureDriveFolder(accessToken, rootFolderId) {
  const folderName = 'Blog Images'
  const query = [
    `name='${folderName}'`,
    "mimeType='application/vnd.google-apps.folder'",
    'trashed=false',
    ...(rootFolderId ? [`'${rootFolderId}' in parents`] : []),
  ].join(' and ')
  const listUrl = new URL(DRIVE_FILES_URL)
  listUrl.searchParams.set('q', query)
  listUrl.searchParams.set('fields', 'files(id)')
  listUrl.searchParams.set('pageSize', '1')
  listUrl.searchParams.set('supportsAllDrives', 'true')
  listUrl.searchParams.set('includeItemsFromAllDrives', 'true')
  const headers = { Authorization: `Bearer ${accessToken}` }
  const listResponse = await fetch(listUrl, { headers })
  const listResult = await listResponse.json().catch(() => null)
  if (!listResponse.ok) throw new Error(listResult?.error?.message || 'Could not inspect Drive folders.')
  if (listResult?.files?.[0]?.id) return listResult.files[0].id

  const createUrl = new URL(DRIVE_FILES_URL)
  createUrl.searchParams.set('supportsAllDrives', 'true')
  const createResponse = await fetch(createUrl, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      ...(rootFolderId ? { parents: [rootFolderId] } : {}),
    }),
  })
  const createResult = await createResponse.json().catch(() => null)
  if (!createResponse.ok || !createResult?.id) {
    throw new Error(createResult?.error?.message || 'Could not create the Blog Images Drive folder.')
  }
  return createResult.id
}

async function uploadLegacyImage(oldUrl, accessToken, folderId) {
  const downloadResponse = await fetch(oldUrl)
  if (!downloadResponse.ok) {
    throw new Error(`Could not download legacy image (${downloadResponse.status}): ${oldUrl}`)
  }
  const contentType = downloadResponse.headers.get('content-type') || 'application/octet-stream'
  const originalName = decodeURIComponent(new URL(oldUrl).pathname.split('/').pop() || 'blog-image')
  const filename = `${crypto.randomUUID()}-${originalName}`.replace(/[<>:"/\\|?*\u0000-\u001F]/g, '-')
  const bytes = await downloadResponse.arrayBuffer()
  const formData = new FormData()
  formData.set(
    'metadata',
    new Blob([JSON.stringify({ name: filename, parents: [folderId] })], {
      type: 'application/json',
    }),
  )
  formData.set('file', new Blob([bytes], { type: contentType }), filename)

  const uploadResponse = await fetch(DRIVE_UPLOAD_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  })
  const uploadResult = await uploadResponse.json().catch(() => null)
  if (!uploadResponse.ok || !uploadResult?.id) {
    throw new Error(uploadResult?.error?.message || `Could not upload ${filename} to Drive.`)
  }

  const permissionUrl = new URL(
    `${DRIVE_FILES_URL}/${encodeURIComponent(uploadResult.id)}/permissions`,
  )
  permissionUrl.searchParams.set('supportsAllDrives', 'true')
  const permissionResponse = await fetch(permissionUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ role: 'reader', type: 'anyone' }),
  })
  if (!permissionResponse.ok) {
    throw new Error(`Uploaded ${filename}, but could not make it publicly readable.`)
  }

  return `https://lh3.googleusercontent.com/d/${encodeURIComponent(uploadResult.id)}`
}

const env = parseEnv(await readFile(CRM_ENV_PATH, 'utf8'))
const databaseUrl = env.NEXT_PUBLIC_BMYB_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL
const databaseKey = env.BMYB_SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY
if (!databaseUrl || !databaseKey) throw new Error('BmyBrand database credentials are missing.')

const database = createClient(databaseUrl, databaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})
const { data: rows, error } = await database.from('blog_articles').select('*')
if (error) throw new Error(error.message)

migration: {
const affectedRows = (rows || []).filter((row) => findLegacyUrls(row).size > 0)
const legacyUrls = findLegacyUrls(affectedRows)
console.log(`Found ${legacyUrls.size} legacy image URL(s) in ${affectedRows.length} blog article(s).`)

if (!process.argv.includes('--apply') || legacyUrls.size === 0) {
  console.log(process.argv.includes('--apply') ? 'Nothing to migrate.' : 'Dry run only; no data was changed.')
  break migration
}

const backupDirectory = path.join(process.cwd(), 'migration-backups')
await mkdir(backupDirectory, { recursive: true })
const backupPath = path.join(
  backupDirectory,
  `blog-images-before-drive-${new Date().toISOString().replace(/[:.]/g, '-')}.json`,
)
await writeFile(backupPath, JSON.stringify(affectedRows, null, 2), 'utf8')

const accessToken = await getDriveAccessToken(env)
const folderId = await ensureDriveFolder(accessToken, env.GOOGLE_DRIVE_ROOT_FOLDER_ID)
const replacements = new Map()
for (const oldUrl of legacyUrls) {
  const newUrl = await uploadLegacyImage(oldUrl, accessToken, folderId)
  replacements.set(oldUrl, newUrl)
  console.log(`Migrated ${replacements.size}/${legacyUrls.size} image(s).`)
}

for (const row of affectedRows) {
  const updated = replaceLegacyUrls(row, replacements)
  const patch = {}
  for (const [key, value] of Object.entries(updated)) {
    if (JSON.stringify(value) !== JSON.stringify(row[key])) patch[key] = value
  }
  const { error: updateError } = await database
    .from('blog_articles')
    .update(patch)
    .eq('slug', row.slug)
  if (updateError) throw new Error(`Failed to update ${row.slug}: ${updateError.message}`)
}

console.log(`Migration complete. Backup: ${backupPath}`)
}
