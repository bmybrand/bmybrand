// Team contact details the chatbot offers to visitors, by visitor country, as
// set on the CRM's Settings page. Client-safe (no secrets): the widget renders
// these in the contact card, and the server uses them in the system prompt
// and to route lead emails.

import { phoneHref, type AppSettings, type CountryContact } from '@/lib/settings/schema'

// ISO 3166-1 alpha-2 code of a country listed in Settings (e.g. "US").
export type ContactRegion = string

export interface RegionContact {
  region: ContactRegion
  label: string
  phone: string
  phoneHref: string
  email: string
}

function toRegionContact(c: CountryContact): RegionContact {
  return { region: c.code, label: c.label, phone: c.phone, phoneHref: phoneHref(c.phone), email: c.email }
}

// Maps a visitor's ISO country code (Vercel's x-vercel-ip-country header) to
// a country listed in Settings, or null when it isn't listed.
export function regionFromCountry(country: string | null | undefined, settings: AppSettings): ContactRegion | null {
  const code = country?.trim().toUpperCase()
  return code && settings.countries.some((c) => c.code === code) ? code : null
}

// The listed country that handles a visitor: their own, or the primary (first)
// one for visitors from anywhere else.
export function teamForRegion(region: ContactRegion | null | undefined, settings: AppSettings): CountryContact {
  return settings.countries.find((c) => c.code === region) ?? settings.countries[0]
}

// Contacts to show a visitor: their country's, or for visitors from other
// countries either every listed country or only the primary one.
export function contactsForRegion(region: ContactRegion | null | undefined, settings: AppSettings): RegionContact[] {
  const own = settings.countries.find((c) => c.code === region)
  if (own) return [toRegionContact(own)]
  return settings.otherVisitors === 'all'
    ? settings.countries.map(toRegionContact)
    : [toRegionContact(settings.countries[0])]
}

export function formatContactsForPrompt(contacts: RegionContact[]): string {
  return contacts
    .map((c) => `- ${c.label}: phone ${c.phone}, email ${c.email}`)
    .join('\n')
}
