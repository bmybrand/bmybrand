import OpenAI from 'openai'

// Server-side only — never import this in client components.
//
// The client is created LAZILY, on first use, not at module-eval time. The
// OpenAI SDK throws on construction when no API key is present, and Next's
// `next build` step evaluates route modules (to collect page data) without
// runtime env vars — so eager construction broke the Vercel build. Deferring
// construction means importing this module is always side-effect-free; the key
// is only required when an OpenAI call actually runs at request time.
let client: OpenAI | null = null

function getClient(): OpenAI {
  if (!client) {
    const apiKey = process.env.OPENAI_API_KEY?.trim()
    if (!apiKey) {
      throw new Error(
        'OPENAI_API_KEY is not set. Add it to the environment (e.g. Vercel Project → Settings → Environment Variables).'
      )
    }
    client = new OpenAI({ apiKey })
  }
  return client
}

// Proxy keeps the `openai.embeddings.create(...)` / `openai.chat.completions...`
// call sites unchanged while deferring construction to first property access.
export const openai = new Proxy({} as OpenAI, {
  get(_target, prop, receiver) {
    const value = Reflect.get(getClient(), prop, receiver)
    return typeof value === 'function' ? value.bind(getClient()) : value
  },
})
