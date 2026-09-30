import type { ReactNode } from 'react'
import { REGION_CONTACTS } from '@/lib/chat/contact-info'

// Lightweight message formatting for chat bubbles: paragraphs, "-" and "1."
// lists, **bold**, markdown links, and clickable URLs, emails and phone
// numbers. Nothing is rendered as HTML, so visitor text stays inert.

const INLINE_RE =
  /\*\*([^*]+)\*\*|\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)\s]+)\)|(https?:\/\/[^\s)]+[^\s).,!?])|([\w.+-]+@[\w-]+(?:\.[\w-]+)+)|(\+?\s?\(?\d[\d\s().-]{7,}\d)/g

const KNOWN_PHONES = new Map(
  Object.values(REGION_CONTACTS).map((c) => [c.phone.replace(/\D/g, ''), c.phoneHref])
)

function phoneHref(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 15) return null
  return KNOWN_PHONES.get(digits) ?? `tel:${raw.trim().startsWith('+') ? '+' : ''}${digits}`
}

function inline(text: string, linkClass: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  let n = 0
  for (const m of text.matchAll(INLINE_RE)) {
    const i = m.index ?? 0
    if (i > last) out.push(text.slice(last, i))
    const [whole, bold, mdLabel, mdUrl, url, email, phone] = m
    const key = `${keyBase}-${n++}`
    if (bold) {
      out.push(<strong key={key} className="font-semibold text-white">{bold}</strong>)
    } else if (mdUrl) {
      out.push(
        <a key={key} href={mdUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {mdLabel}
        </a>
      )
    } else if (url) {
      out.push(
        <a key={key} href={url} target="_blank" rel="noopener noreferrer" className={`${linkClass} break-all`}>
          {url.replace(/^https?:\/\//, '')}
        </a>
      )
    } else if (email) {
      out.push(
        <a key={key} href={`mailto:${email}`} className={`${linkClass} break-all`}>
          {email}
        </a>
      )
    } else if (phone && phoneHref(phone)) {
      const lead = phone.match(/^\s*/)?.[0] ?? ''
      if (lead) out.push(lead)
      out.push(
        <a key={key} href={phoneHref(phone)!} className={`${linkClass} whitespace-nowrap`}>
          {phone.trim()}
        </a>
      )
    } else {
      out.push(whole)
    }
    last = i + whole.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export default function RichText({ text, variant }: { text: string; variant: 'bot' | 'user' }) {
  const linkClass =
    variant === 'user'
      ? 'underline underline-offset-2 hover:opacity-80'
      : 'font-medium text-[#FF9A62] underline decoration-[#FF9A62]/40 underline-offset-2 hover:decoration-[#FF9A62]'

  // Group lines into paragraphs and lists.
  const blocks: { kind: 'p' | 'ul' | 'ol'; lines: string[] }[] = []
  for (const raw of text.split('\n')) {
    const line = raw.trimEnd()
    const bullet = /^\s*[-•*]\s+(.*)$/.exec(line)
    const numbered = /^\s*\d+[.)]\s+(.*)$/.exec(line)
    const kind = bullet ? 'ul' : numbered ? 'ol' : 'p'
    const content = bullet?.[1] ?? numbered?.[1] ?? line
    const prev = blocks[blocks.length - 1]
    if (!line.trim()) {
      blocks.push({ kind: 'p', lines: [] })
    } else if (prev && prev.kind === kind && (kind !== 'p' || prev.lines.length > 0)) {
      prev.lines.push(content)
    } else {
      blocks.push({ kind, lines: [content] })
    }
  }

  return (
    <div className="space-y-2">
      {blocks
        .filter((b) => b.lines.length > 0)
        .map((b, bi) => {
          if (b.kind === 'p') {
            return (
              <p key={bi} className="whitespace-pre-wrap">
                {b.lines.map((l, li) => (
                  <span key={li}>
                    {li > 0 && <br />}
                    {inline(l, linkClass, `${bi}-${li}`)}
                  </span>
                ))}
              </p>
            )
          }
          const List = b.kind === 'ul' ? 'ul' : 'ol'
          return (
            <List
              key={bi}
              className={`space-y-1 pl-5 ${b.kind === 'ul' ? 'list-disc' : 'list-decimal'} marker:text-white/50`}
            >
              {b.lines.map((l, li) => (
                <li key={li}>{inline(l, linkClass, `${bi}-${li}`)}</li>
              ))}
            </List>
          )
        })}
    </div>
  )
}
