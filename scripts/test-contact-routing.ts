// Unit checks for routing visitors to country contacts.
//   npx --yes tsx scripts/test-contact-routing.ts
import assert from 'node:assert/strict'
import { contactsForRegion, regionFromCountry, teamForRegion } from '../lib/chat/contact-info'
import { DEFAULT_SETTINGS, type AppSettings } from '../lib/settings/schema'

const gb = { code: 'GB', label: 'UK', phone: '+44 20 7946 0958', email: 'uk@example.com', leadEmails: ['uk-sales@example.com'] }
const s: AppSettings = { ...DEFAULT_SETTINGS, countries: [...DEFAULT_SETTINGS.countries, gb] }

assert.equal(regionFromCountry('gb', s), 'GB')
assert.equal(regionFromCountry('DE', s), null)
assert.equal(regionFromCountry(null, s), null)
assert.deepEqual(contactsForRegion('GB', s).map((c) => c.label), ['UK'])
assert.equal(contactsForRegion('GB', s)[0].phoneHref, 'tel:+442079460958')
assert.deepEqual(contactsForRegion(null, s).map((c) => c.region), ['US', 'CA', 'GB'])
assert.deepEqual(contactsForRegion(null, { ...s, otherVisitors: 'primary' }).map((c) => c.region), ['US'])
assert.deepEqual(teamForRegion('GB', s).leadEmails, ['uk-sales@example.com'])
assert.equal(teamForRegion(null, s).code, 'US')
assert.equal(teamForRegion('DE', s).code, 'US')
console.log('contact routing: all checks passed')
