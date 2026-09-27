export const DISCLAIMER = 'המועדים משוערים. אשרו מול הצוות המטפל.'

interface CalendarEventInput {
  title: string
  date: Date
  time?: string
  location?: string
  description: string
}

function formatGCalDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}${m}${d}`
}

function formatGCalDateTime(date: Date): string {
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  return `${formatGCalDate(date)}T${h}${min}00`
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
  time,
  location,
  description,
}: CalendarEventInput) {
  let dates: string
  if (time) {
    const [hours, minutes] = time.split(':').map(Number)
    const start = new Date(date)
    start.setHours(hours, minutes, 0, 0)
    const end = new Date(start)
    end.setHours(end.getHours() + 1)
    dates = `${formatGCalDateTime(start)}/${formatGCalDateTime(end)}`
  } else {
    dates = `${formatGCalDate(date)}/${formatGCalDate(nextDay(date))}`
  }

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${title} — Aba`,
    dates,
    details: `${description}\n\n${DISCLAIMER}`,
    sf: 'true',
    output: 'xml',
  })
  if (location) params.set('location', location)
  window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank')
}
