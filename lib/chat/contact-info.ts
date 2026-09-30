// Regional contact details the chatbot offers to visitors. Client-safe (no
// secrets): the widget renders these in the contact card, and the server uses
// them in the system prompt and to route lead emails.

export type ContactRegion = 'US' | 'CA'

export interface RegionContact {
  region: ContactRegion
  label: string
  phone: string
  phoneHref: string
  email: string
}

export const REGION_CONTACTS: Record<ContactRegion, RegionContact> = {
  US: {
    region: 'US',
    label: 'USA',
    phone: '+1 469 501 1401',
    phoneHref: 'tel:+14695011401',
    email: 'jacob.green@bmybrand.com',
  },
  CA: {
    region: 'CA',
    label: 'Canada',
    phone: '+(587) 492-5888',
    phoneHref: 'tel:+15874925888',
    email: 'jacob.green@bmybrand.ca',
  },
}

// Maps a visitor's ISO country code (Vercel's x-vercel-ip-country header) to a
// contact region. Anything other than the US or Canada is treated as unknown.
export function regionFromCountry(country?: string | null): ContactRegion | null {
  const code = country?.trim().toUpperCase()
  if (code === 'US' || code === 'CA') return code
  return null
}

// Unknown location gets both regions, US first.
export function contactsForRegion(region: ContactRegion | null | undefined): RegionContact[] {
  return region ? [REGION_CONTACTS[region]] : [REGION_CONTACTS.US, REGION_CONTACTS.CA]
}

export function formatContactsForPrompt(contacts: RegionContact[]): string {
  return contacts
    .map((c) => `- ${c.label}: phone ${c.phone}, email ${c.email}`)
    .join('\n')
}
