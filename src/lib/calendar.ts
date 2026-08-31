export const DISCLAIMER = 'המועדים משוערים. אשרו מול הצוות המטפל.'

interface CalendarEventInput {
  title: string
  date: Date
  description: string
}

function formatGCalDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}${m}${d}`
}

function nextDay(date: Date): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + 1)
  return next
}

// פותח Google Calendar ישירות דרך deep link — בלי OAuth, בלי התחברות.
export function openGoogleCalendarEvent({
  title,
  date,
  description,
}: CalendarEventInput) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${title} — Aba`,
    dates: `${formatGCalDate(date)}/${formatGCalDate(nextDay(date))}`,
    details: `${description}\n\n${DISCLAIMER}`,
    sf: 'true',
    output: 'xml',
  })
  window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank')
}
