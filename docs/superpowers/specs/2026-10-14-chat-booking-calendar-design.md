# In-chat booking calendar — design

Date: 2026-10-14
Status: approved in chat, awaiting spec review
Scope: sub-project 1 of 3 (calendar → admins-only + invites → settings page)

## Goal

New-business visitors can book a free 30-minute strategy call without leaving
the chat. The booking lands in the same MySQL table as the strategy-call page,
the sales team is notified the same way as for chatbot leads today, and the
visitor gets a confirmation. Existing clients keep getting the team's phone
numbers and the contact form, unchanged.

## Decisions

| Topic | Decision |
|---|---|
| Who sees the calendar | `service_inquiry` turns (inside the sales card) and `booking_request` turns. Not `support_request` / `human_request`. |
| Visitor fields | Name, email, phone, company, budget (chips: `Below $1K`, `$1K-$3K`, `$3K-$5K`, `$5K-$10K`, `$10K-$20K`, `Above $20K`). Notes are generated from the chat; source is `Chatbot`. |
| Hours | Same rules as the strategy-call page (`lib/strategy-call-scheduling.ts`): Mon–Fri, 9 PM–6 AM Karachi (11 AM–8 PM US Central), 30-minute slots. |
| Time zone | Visitor's browser time zone, changeable from a short list. |
| Booked slots | Hidden in the chat calendar and, as part of this work, on the strategy-call page. |
| After booking | Confirmation card in chat, confirmation email to the visitor with an `.ics` attachment, sales lead email with booking details, CRM lead + popup. |
| Meeting link | None. The team calls the visitor on the number given. |
| Approach | Dedicated chat booking endpoints in the website repo, reusing the existing scheduling, bridge and Google Calendar code. |

## Visitor flow

1. **Trigger.**
   - The sales card's primary button changes from a link to the
     strategy-call page to **Pick a time**, which expands the calendar inside
     the card.
   - A `booking_request` turn shows a new `calendar` card, already expanded.
   - If the session already has a booking, both are replaced by a "You're
     booked" card showing the existing booking.
2. **Pick a slot.**
   - A horizontal strip of the next days that have free slots (window: 14
     days).
   - Picking a day lists its free times.
   - A line under the strip reads "Times in Central Time (change)".
3. **Details.**
   - Fields: name, email, phone, company, budget chips.
   - Pre-filled from `chat_sessions` (visitor name/email/phone) when known.
   - Hidden honeypot field, same as the contact form.
   - Validation: the same rules as the contact form, plus company (min 2
     characters) and a budget choice.
4. **Confirm.**
   - The visitor's summary message and the bot's confirmation appear in the
     chat.
   - The card becomes a "You're booked" card: date and time in the visitor's
     time zone, an **Add to calendar** button (downloads the `.ics`), and
     "We'll call you on <phone>".

Errors in the card:
- **Slot just taken (409):** "That time was just taken. Here are the latest
  times." and the slot list reloads.
- **Network limit (429):** the existing 24-hour message.
- **Bridge down or unknown error (5xx):** "We couldn't book that time right
  now." with the contact form shown in the card. The team still gets an email
  with the requested time (see Backend).

## Backend (website repo)

### Config

- `getBridgeConfig()` reads `BMYB_MYSQL_BRIDGE_URL` / `BMYB_MYSQL_BRIDGE_SECRET`,
  falling back to the existing `MYSQL_BRIDGE_URL` / `MYSQL_BRIDGE_SECRET`.
- Add both `BMYB_` vars to the Vercel website project (Production and
  Preview).

### `lib/booking/availability.ts`

- `listTakenSlots(fromDate, toDate)`:
  - calls the bridge `?list=1&from&to`;
  - converts each row's `(appointmentDate, appointmentTime, timezone)` to a UTC
    instant, using `zonedTimeToUtc` and the 12h/24h parser from
    `google-calendar.ts` (moved to a shared helper);
  - returns a `Set` of ISO strings.
- `getOpenSlots(timeZone, days = 14)`:
  - runs `getAvailableSlots` for each day;
  - removes taken instants;
  - returns `{ date, slots: { id, label } [] }[]`, without empty days.

### `GET /api/chat/booking/slots?tz=<IANA>`

- Validates `tz` against `Intl`; falls back to `America/Chicago`.
- Returns `{ timeZone, days }`.
- `Cache-Control: no-store`.
- If the bridge list fails, it returns the rule-based slots anyway and logs a
  warning. The final POST re-checks, so a stale list can't double-book.

### `POST /api/chat/booking`

Body: `{ sessionId, slotId (ISO instant), timeZone, name, email, phone,
company, budget, website (honeypot) }`.

1. Validate fields. Load the session (404 if missing). If
   `metadata.booking` already exists, return it (idempotent).
2. Check that the slot is still in `getOpenSlots(timeZone)`; return 409 if
   not.
3. Save through the bridge:
   - use `saveStrategyCallBooking` with `source: 'Chatbot'`;
   - `callNotes` is the session's `lead_interest` plus the last visitor
     messages (max 600 characters);
   - `appointmentDate` / `appointmentTime` are formatted in the visitor's time
     zone, exactly as the page does;
   - pass `ipAddress`;
   - on bridge 429, return 429;
   - on bridge failure, go to the fallback (step 8).
4. If Google Calendar is configured, create the event and store its id
   (`createStrategyCallCalendarEvent` + `updateStrategyCallCalendarEventId`).
   This step must not block the booking.
5. Update `chat_sessions`:
   - `visitor_name`, `visitor_email`, `visitor_phone`;
   - `metadata.booking = { id, starts_at, time_zone, budget, company,
     calendar_event_id }`;
   - `metadata.lead_interest = 'Strategy call booked – <date, time CT>'`;
   - `lead_submitted_at`.

   The existing trigger then creates or updates the CRM lead. Migration:
   `sync_lead_from_chat` also maps `company` from `metadata.booking.company`.
6. Insert two chat messages, with explicit timestamps as in the contact route:
   - the visitor's summary, with `metadata.type = 'booking'`;
   - the bot's confirmation, with `metadata.type = 'booking_confirmation'`,
     translated if `visitor_language` is not `en`.
7. Send the emails. Both are best-effort; their results are stored in the
   session metadata.
   - **Team:** `notifyTeamOfLead` gets an optional `booking` block. The
     subject becomes `Strategy call booked: <name> – <date time CT>`.
   - **Visitor:** a new `sendBookingConfirmation` (Resend) with the date and
     time in their time zone, the phone number we'll call, and an
     `invite.ics` attachment (`METHOD:PUBLISH`, 30 minutes, organizer is the
     team's region email).
8. **Fallback when the bridge save fails:**
   - mark the session `metadata.booking_failed = { slotId, at }`;
   - save the contact details so the CRM lead still appears;
   - email the team "Booking failed, visitor wanted <time>";
   - return 503 with `{ fallback: 'contact_form' }`.

Response: `{ ok, booking, messages }`, the same shape as the contact route,
so the widget can append the messages.

### State machine and prompts

- `ChatUi` adds:
  - `{ type: 'calendar' }`;
  - `booked?: BookingSummary` on `sales` / `calendar`.
- `booking_request` returns a `calendar` card. If the session has a booking,
  the reply says so and shows the booked card instead.
- The prompts say "the **Pick a time** button below", not a URL. The
  strategy-call page URL stays as a plain fallback link in the card footer
  ("Prefer the full page?").

### Strategy-call page

- `GET /api/strategy-call/slots?tz=&from=&to=` returns taken instants. The
  page filters `baseTimeSlots` with it.
- `POST /api/strategy-call` re-checks the slot and returns 409 when it's
  taken.

## Dashboard (CRM)

- `NewChatNotifier`: a message with `metadata.type === 'booking'` shows a
  **New strategy call booked** popup, with chime and desktop notification.
- Lead detail and the conversation transcript show the booking: date and
  time, budget and company. The transcript renders `booking` messages like
  contact-form messages.
- No schema change in the dashboard beyond the trigger update.

## Testing

- **Unit:** run with `tsx` scripts, since the repo has no test runner.
  - `getOpenSlots` removes taken instants across time zones and DST edges.
  - The appointment time parser handles `02:00 PM` and `14:00`.
  - The `.ics` builder output is correct.
- **E2E (Playwright, local, then live):**
  - Open the chat and ask about a website, then Pick a time, a day, a slot,
    fill the details and confirm.
  - Assert:
    - the booked card;
    - the bridge row exists;
    - the slot disappears from the slots API and from the strategy-call page;
    - the CRM lead has the company and the booking interest;
    - the CRM popup reads "New strategy call booked".
  - Book the same slot from a second session and expect a 409.
- **Cleanup after each run:**
  - bridge `action: delete` for the test booking ids;
  - delete the Google Calendar event if one was created;
  - delete the test chat sessions and CRM leads.
  - Test emails go to a tagged test address. During tests the team email
    goes through `CHAT_LEAD_TO_EMAIL`, set for local only.

## Out of scope

- Reschedule and cancel by the visitor. They reply to the email or call.
- Meeting links (Zoom or Meet).
- Making hours editable. That comes with the settings page (sub-project 3).
