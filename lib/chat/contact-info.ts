// Regional contact details the chatbot offers to visitors, from the CRM's
// Settings page. Client-safe (no secrets): the widget renders these in the
// contact card, and the server uses them in the system prompt and to route
// lead emails.

import { phoneHref, type AppSettings } from '@/lib/settings/schema'

export type ContactRegion = 'US' | 'CA'

export interface RegionContact {
  region: ContactRegion
  label: string
  phone: string
  phoneHref: string
  email: string
}

export function regionContacts(settings: AppSettings): Record<ContactRegion, RegionContact> {
  const make = (region: ContactRegion): RegionContact => {
    const c = settings.contacts[region]
    return { region, label: c.label, phone: c.phone, phoneHref: phoneHref(c.phone), email: c.email }
  }
  return { US: make('US'), CA: make('CA') }
}

// Maps a visitor's ISO country code (Vercel's x-vercel-ip-country header) to a
// contact region. Anything other than the US or Canada is treated as unknown.
export function regionFromCountry(country?: string | null): ContactRegion | null {
  const code = country?.trim().toUpperCase()
  if (code === 'US' || code === 'CA') return code
  return null
}

// Unknown location gets both regions, US first.
export function contactsForRegion(
  region: ContactRegion | null | undefined,
  settings: AppSettings
): RegionContact[] {
  const all = regionContacts(settings)
  return region ? [all[region]] : [all.US, all.CA]
}

export function formatContactsForPrompt(contacts: RegionContact[]): string {
  return contacts
    .map((c) => `- ${c.label}: phone ${c.phone}, email ${c.email}`)
    .join('\n')
}
