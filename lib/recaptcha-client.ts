const RECAPTCHA_READY_TIMEOUT_MS = 10_000
const RECAPTCHA_POLL_INTERVAL_MS = 50
let widgetIdPromise: Promise<number> | null = null

function waitForRecaptcha() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Security verification is unavailable.'))
  }

  if (window.grecaptcha) {
    return Promise.resolve(window.grecaptcha)
  }

  return new Promise<Recaptcha>((resolve, reject) => {
    const startedAt = Date.now()
    const interval = window.setInterval(() => {
      if (window.grecaptcha) {
        window.clearInterval(interval)
        resolve(window.grecaptcha)
        return
      }

      if (Date.now() - startedAt >= RECAPTCHA_READY_TIMEOUT_MS) {
        window.clearInterval(interval)
        reject(new Error('Security verification is not ready. Please try again.'))
      }
    }, RECAPTCHA_POLL_INTERVAL_MS)
  })
}

export function initializeRecaptcha(container: string | HTMLElement) {
  if (widgetIdPromise) {
    return widgetIdPromise
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!siteKey) {
    return Promise.reject(new Error('Security verification is not configured.'))
  }

  widgetIdPromise = waitForRecaptcha().then(
    (recaptcha) => new Promise<number>((resolve, reject) => {
      recaptcha.ready(() => {
        try {
          resolve(recaptcha.render(container, {
            sitekey: siteKey,
            size: 'invisible',
            badge: 'bottomleft',
          }))
        } catch (error) {
          widgetIdPromise = null
          reject(error)
        }
      })
    }),
  )

  return widgetIdPromise
}

export async function executeRecaptcha(action: string) {
  const recaptcha = await waitForRecaptcha()
  const widgetId = await initializeRecaptcha('bmy-recaptcha')

  return new Promise<string>((resolve, reject) => {
    recaptcha.ready(() => {
      recaptcha.execute(widgetId, { action }).then(resolve).catch(reject)
    })
  })
}
