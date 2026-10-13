// Unit checks for the chat booking slot math and the .ics builder.
//   npx --yes tsx scripts/test-booking-slots.ts
import assert from 'node:assert/strict'
import { getOpenDays, isValidZone, toInstant } from '../lib/booking/slots'
import { buildIcs } from '../lib/booking/ics'
import { getZonedParts } from '../lib/strategy-call-scheduling'

let passed = 0
function check(name: string, fn: () => void) {
  fn()
  passed++
  console.log('ok', name)
}

check('12h time in Chicago', () => {
  assert.equal(toInstant('2026-10-20', '02:00 PM', 'America/Chicago')?.toISOString(), '2026-10-20T19:00:00.000Z')
})

check('narrow no-break space before PM', () => {
  assert.equal(toInstant('2026-10-20', '02:00 PM', 'America/Chicago')?.toISOString(), '2026-10-20T19:00:00.000Z')
})

check('24h time after the US DST change', () => {
  assert.equal(toInstant('2026-11-02', '14:00', 'America/New_York')?.toISOString(), '2026-11-02T19:00:00.000Z')
})

check('12 AM and 12 PM', () => {
  assert.equal(toInstant('2026-10-20', '12:00 AM', 'UTC')?.toISOString(), '2026-10-20T00:00:00.000Z')
  assert.equal(toInstant('2026-10-20', '12:30 PM', 'UTC')?.toISOString(), '2026-10-20T12:30:00.000Z')
})

check('bad input gives null', () => {
  assert.equal(toInstant('2026-10-20', 'soon', 'America/Chicago'), null)
  assert.equal(toInstant('20-10-2026', '14:00', 'America/Chicago'), null)
})

check('zone validation', () => {
  assert.equal(isValidZone('America/Chicago'), true)
  assert.equal(isValidZone('Mars/Base'), false)
  assert.equal(isValidZone(''), false)
})

// Monday 2026-10-19, 15:00 UTC (10 AM Chicago).
const now = new Date('2026-10-19T15:00:00Z')

check('open days: future, weekdays in Karachi office hours, 30-minute steps', () => {
  const days = getOpenDays('America/Chicago', new Set(), now, 14)
  assert.ok(days.length >= 9, `expected about 10 weekdays, got ${days.length}`)
  for (const day of days) {
    assert.ok(day.slots.length > 0)
    for (const slot of day.slots) {
      const at = new Date(slot.id)
      assert.ok(at.getTime() > now.getTime(), 'no past slots')
      assert.equal(at.getUTCMinutes() % 30, 0)
      const k = getZonedParts(at, 'Asia/Karachi')
      assert.ok(k.hour >= 21 || k.hour < 6, `slot ${slot.id} outside office hours`)
    }
  }
  // First Chicago slot on Monday is 11:00 AM (9 PM Karachi).
  assert.equal(days[0].date, '2026-10-19')
  assert.equal(days[0].slots[0].id, '2026-10-19T16:00:00.000Z')
  assert.equal(days[0].slots[0].label, '11:00 AM')
})

check('open days: taken slot is removed', () => {
  const taken = new Set(['2026-10-19T16:00:00.000Z'])
  const days = getOpenDays('America/Chicago', taken, now, 14)
  assert.ok(!days[0].slots.some((s) => s.id === '2026-10-19T16:00:00.000Z'))
  assert.equal(days[0].slots[0].id, '2026-10-19T16:30:00.000Z')
})

check('open days: no Saturday or Sunday in Chicago', () => {
  const days = getOpenDays('America/Chicago', new Set(), now, 14)
  for (const day of days) {
    const wd = new Date(`${day.date}T12:00:00Z`).getUTCDay()
    assert.ok(wd !== 0 && wd !== 6, `${day.date} is a weekend`)
  }
})

check('ics: UTC times, CRLF, escaping', () => {
  const ics = buildIcs({
    uid: 'booking-42@bmybrand.com',
    start: new Date('2026-10-20T19:00:00Z'),
    minutes: 30,
    summary: 'BMYBrand strategy call',
    description: 'We will call you on +1 555, ok; thanks\nSee you',
    organizerEmail: 'jacob.green@bmybrand.com',
  })
  assert.ok(ics.includes('DTSTART:20261020T190000Z'))
  assert.ok(ics.includes('DTEND:20261020T193000Z'))
  assert.ok(ics.includes('\\, ok\\; thanks\\nSee you'))
  assert.ok(ics.split('\r\n').length > 8)
  assert.ok(!/[^\r]\n/.test(ics), 'every newline is CRLF')
})

console.log(`\n${passed} checks passed`)
