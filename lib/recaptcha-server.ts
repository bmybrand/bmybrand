const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'
const RECAPTCHA_MIN_SCORE = 0.5

type RecaptchaResponse = {
  success: boolean
  score?: number
  action?: string
}

export type RecaptchaVerification =
  | { ok: true; score: number }
  | { ok: false; status: number; error: string }

export async function verifyRecaptcha(
  token: unknown,
  expectedAction: string,
): Promise<RecaptchaVerification> {
  if (typeof token !== 'string' || !token.trim()) {
    return { ok: false, status: 400, error: 'Security verification is required.' }
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY

  if (!secret) {
    return { ok: false, status: 500, error: 'Security verification is not configured.' }
  }

  let response: Response

  try {
    response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret,
        response: token.trim(),
      }),
      cache: 'no-store',
    })
  } catch {
    return { ok: false, status: 502, error: 'Security verification is temporarily unavailable.' }
  }

  if (!response.ok) {
    return { ok: false, status: 502, error: 'Security verification is temporarily unavailable.' }
  }

  let result: RecaptchaResponse

  try {
    result = await response.json() as RecaptchaResponse
  } catch {
    return { ok: false, status: 502, error: 'Security verification is temporarily unavailable.' }
  }

  if (
    !result.success ||
    result.action !== expectedAction ||
    typeof result.score !== 'number' ||
    result.score < RECAPTCHA_MIN_SCORE
  ) {
    return { ok: false, status: 403, error: 'Security verification failed. Please try again.' }
  }

  return { ok: true, score: result.score }
}
