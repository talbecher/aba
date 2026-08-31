export const DISCLAIMER =
  'המועדים משוערים לפי שבוע ההריון. אשרו מול הצוות המטפל.'

interface IcsEventInput {
  title: string
  date: Date
  description: string
}

function formatIcsDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}${m}${d}`
}

function escapeIcsText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,')
}

export function downloadIcsEvent({ title, date, description }: IcsEventInput) {
  const dateString = formatIcsDate(date)
  const fullDescription = `${description}\n${DISCLAIMER}`

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `SUMMARY:${escapeIcsText(`${title} — Aba`)}`,
    `DTSTART;VALUE=DATE:${dateString}`,
    `DESCRIPTION:${escapeIcsText(fullDescription)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  window.open(url)
}
