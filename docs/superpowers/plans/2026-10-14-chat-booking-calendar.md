# In-chat Booking Calendar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Visitors book a 30-minute strategy call inside the chat. The booking
is saved to the MySQL bridge, the CRM lead and team email are updated, and the
visitor gets a confirmation email with an `.ics` file.

**Architecture:**
- New `lib/booking/*` modules in the website repo hold the slot math, the
  bridge list, the `.ics` file and the visitor email.
- Two new routes, `/api/chat/booking/slots` and `/api/chat/booking`, reuse
  the existing bridge save and Google Calendar code.
- The chat gets a `calendar` card.
- The dashboard picks up the new message type for alerts and the transcript.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4, Supabase, Resend
REST API, cPanel PHP MySQL bridge, Playwright-core for end-to-end tests, and
`npx tsx` for unit scripts.

**Spec:** `docs/superpowers/specs/2026-10-14-chat-booking-calendar-design.md`

## Global Constraints

- Slot rules: `isInKarachiOfficeHours`, 30-minute slots, 14-day window.
- Budget options: `Below $1K`, `$1K-$3K`, `$3K-$5K`, `$5K-$10K`, `$10K-$20K`,
  `Above $20K`.
- Bridge source value: `Chatbot`.
- Bridge env: `MYSQL_BRIDGE_URL` / `MYSQL_BRIDGE_SECRET`.
- Commits must not carry a Claude co-author trailer.
- The dashboard deploys through the Vercel API (`create_deployment`). The
  website deploys from a git push.

## Review Focus

- A slot taken between listing and submitting must return 409, and the list
  must refresh.
- A stored time like `02:00 PM` (with a U+202F narrow space) or `14:00` in any
  IANA zone must map to the right UTC instant, including across DST.
- If the bridge list is down, the slots API must still return the rule-based
  slots, and the POST must re-check.
- A double-click on Confirm must create one booking (idempotent on
  `metadata.booking`).
- A non-English session must get the confirmation message translated.

---

### Task 1: Slot math and taken slots (`lib/booking/slots.ts`)

**Files:**
- Create: `lib/booking/slots.ts`
- Create: `scripts/test-booking-slots.ts`

**Interfaces:**
- `toInstant(date: string, time: string, timeZone: string): Date | null`
- `getOpenDays(timeZone: string, taken: Set<string>, now?: Date, days?: number): OpenDay[]`
- `type OpenDay = { date: string; label: string; slots: { id: string; label: string }[] }`
- `listTakenSlots(from: string, to: string): Promise<Set<string>>` (bridge)
- `getOpenSlotsLive(timeZone: string): Promise<{ days: OpenDay[]; takenCheck: boolean }>`
- `isValidZone(tz: string): boolean`

- [ ] Write `scripts/test-booking-slots.ts` with these assertions:
  - `toInstant('2026-10-20','02:00 PM','America/Chicago')` returns
    `2026-10-20T19:00:00Z`.
  - `toInstant('2026-11-02','14:00','America/New_York')` returns
    `19:00Z` (after the DST change).
  - The U+202F variant parses.
  - `getOpenDays` drops a taken instant.
  - It has no weekend days in Karachi terms.
  - It has no past slots.
- [ ] Run `npx --yes tsx scripts/test-booking-slots.ts`. It should fail
  because the module doesn't exist yet.
- [ ] Implement it, reusing `getAvailableSlots`, `zonedTimeToUtc` and
  `getZonedParts`.
- [ ] Run again. It should pass.

### Task 2: Visitor confirmation (`lib/booking/ics.ts`, `lib/booking/confirmation-email.ts`)

- `buildIcs({ uid, start: Date, minutes, summary, description, organizerEmail }): string`
  uses CRLF line endings, UTC `DTSTART`/`DTEND`, and escapes `,` `;` `\n`.
- `sendBookingConfirmation({ to, name, startsAt, timeZone, phone, contactPhone, organizerEmail, bookingId }): Promise<{ sent: boolean; error?: string }>`
  sends through Resend with `attachments: [{ filename: 'strategy-call.ics', content: base64 }]`.
- [ ] Add the `.ics` assertions to the test script: it contains
  `DTSTART:20261020T190000Z`, and the lines are CRLF.

### Task 3: Booking API

- `GET /api/chat/booking/slots?tz=`.
- `POST /api/chat/booking`, following spec steps 1–8.
- `notifyTeamOfLead` takes an optional `booking?: { when: string; company: string; budget: string; failed?: boolean }`.
- `getBridgeConfig` reads the `BMYB_` env vars first.

### Task 4: Strategy-call page hides booked slots

- `GET /api/strategy-call/slots?from&to` returns `{ taken: string[] }`.
- The page filters `baseTimeSlots`. `POST /api/strategy-call` returns 409 when
  the slot is already taken.

### Task 5: Chat UI

- `ChatUi` adds `CalendarUi { type: 'calendar' }` and `booked?` on the
  `sales` and `calendar` cards. The `BookingSummary` type is defined in
  `types/chat.ts`.
- `components/chatbot/BookingCalendar.tsx`: days, then times, then details,
  then confirm, then the booked card.
- `useChatState.submitBooking(values)` and `useChatState.booking`, restored
  from history, where `metadata.type === 'booking'` carries a summary.
- `ChatMessage` renders `kind === 'booking'`.
- The state machine:
  - `booking_request` shows the `calendar` card;
  - `service_inquiry` keeps the `sales` card, whose primary button opens the
    calendar;
  - an existing booking shows the booked state.
- Prompts refer to the **Pick a time** button.

### Task 6: Database and dashboard

- Migration `06_booking_company.sql`: `sync_lead_from_chat` maps `company`
  from `metadata->'booking'->>'company'`.
- `NewChatNotifier`: `metadata.type === 'booking'` shows a "New strategy call
  booked" popup.
- `TranscriptView` and the lead detail show the booking.

### Task 7: Ship

- The website Vercel project already has `MYSQL_BRIDGE_URL` / `MYSQL_BRIDGE_SECRET`.
- Run `npm run build` and lint in both repos.
- Run the local Playwright end-to-end test, then clean up.
- Commit and push the website. Deploy the dashboard through the Vercel API.
- Run the live end-to-end test, then clean up.
- Add a row to the audit report.
