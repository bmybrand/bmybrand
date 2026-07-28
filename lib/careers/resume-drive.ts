import 'server-only'

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const DRIVE_FILES_URL = 'https://www.googleapis.com/drive/v3/files'
const DRIVE_UPLOAD_URL =
  'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink&supportsAllDrives=true'

type CachedToken = {
  value: string
  expiresAt: number
}

export type ResumeDriveUpload = {
  fileId: string
  viewUrl: string
}

let cachedToken: CachedToken | null = null
let cachedFolderId = ''

function driveConfig() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim()
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim()
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN?.trim()
  const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID?.trim()
  const folderName =
    process.env.GOOGLE_DRIVE_RESUMES_FOLDER?.trim() || 'Job Applications - CVs and Resumes'

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'Google Drive is not configured for career applications. Add GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, and GOOGLE_OAUTH_REFRESH_TOKEN.',
    )
  }

  return { clientId, clientSecret, refreshToken, rootFolderId, folderName }
}

async function accessToken() {
  const now = Date.now()
  if (cachedToken && cachedToken.expiresAt > now + 60_000) return cachedToken.value

  const config = driveConfig()
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: 'refresh_token',
    }),
  })
  const payload = (await response.json().catch(() => null)) as
    | { access_token?: string; expires_in?: number; error?: string; error_description?: string }
    | null

  if (!response.ok || !payload?.access_token) {
    cachedToken = null
    throw new Error(
      payload?.error === 'invalid_grant'
        ? 'Google Drive is disconnected. Reconnect Google Drive and update the refresh token.'
        : payload?.error_description || payload?.error || 'Unable to authenticate with Google Drive.',
    )
  }

  cachedToken = {
    value: payload.access_token,
    expiresAt: now + Math.max(1, Number(payload.expires_in ?? 3600) - 60) * 1000,
  }
  return cachedToken.value
}

function escapeQuery(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

async function resumeFolderId(token: string) {
  if (cachedFolderId) return cachedFolderId

  const { rootFolderId, folderName } = driveConfig()
  const query = [
    `name='${escapeQuery(folderName)}'`,
    "mimeType='application/vnd.google-apps.folder'",
    'trashed=false',
    ...(rootFolderId ? [`'${escapeQuery(rootFolderId)}' in parents`] : []),
  ].join(' and ')

  const listUrl = new URL(DRIVE_FILES_URL)
  listUrl.searchParams.set('q', query)
  listUrl.searchParams.set('fields', 'files(id)')
  listUrl.searchParams.set('pageSize', '1')
  listUrl.searchParams.set('supportsAllDrives', 'true')
  listUrl.searchParams.set('includeItemsFromAllDrives', 'true')

  const listResponse = await fetch(listUrl, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const listPayload = (await listResponse.json().catch(() => null)) as
    | { files?: Array<{ id?: string }>; error?: { message?: string } }
    | null
  if (!listResponse.ok) {
    throw new Error(listPayload?.error?.message || 'Unable to find the résumé folder in Google Drive.')
  }

  const existingId = listPayload?.files?.[0]?.id
  if (existingId) {
    cachedFolderId = existingId
    return existingId
  }

  const createUrl = new URL(DRIVE_FILES_URL)
  createUrl.searchParams.set('supportsAllDrives', 'true')
  const createResponse = await fetch(createUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      ...(rootFolderId ? { parents: [rootFolderId] } : {}),
    }),
  })
  const createPayload = (await createResponse.json().catch(() => null)) as
    | { id?: string; error?: { message?: string } }
    | null
  if (!createResponse.ok || !createPayload?.id) {
    throw new Error(createPayload?.error?.message || 'Unable to create the résumé folder in Google Drive.')
  }

  cachedFolderId = createPayload.id
  return cachedFolderId
}

function safeName(value: string) {
  return value.replace(/[<>:"/\\|?*\u0000-\u001F]/g, '-').trim().slice(0, 180) || 'resume'
}

export async function uploadResumeToDrive(file: File, destinationName: string): Promise<ResumeDriveUpload> {
  const token = await accessToken()
  const folderId = await resumeFolderId(token)
  const name = safeName(destinationName)
  const metadata = { name, parents: [folderId] }
  const uploadBody = new FormData()
  uploadBody.set('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
  uploadBody.set('file', file, name)

  const response = await fetch(DRIVE_UPLOAD_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: uploadBody,
  })
  const payload = (await response.json().catch(() => null)) as
    | { id?: string; webViewLink?: string; error?: { message?: string } }
    | null

  if (!response.ok || !payload?.id) {
    throw new Error(payload?.error?.message || 'Unable to upload the résumé to Google Drive.')
  }

  return {
    fileId: payload.id,
    viewUrl: payload.webViewLink || `https://drive.google.com/file/d/${encodeURIComponent(payload.id)}/view`,
  }
}

export async function deleteResumeFromDrive(fileId: string) {
  if (!/^[a-zA-Z0-9_-]+$/.test(fileId)) return
  const token = await accessToken()
  const url = new URL(`${DRIVE_FILES_URL}/${encodeURIComponent(fileId)}`)
  url.searchParams.set('supportsAllDrives', 'true')
  await fetch(url, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
}
