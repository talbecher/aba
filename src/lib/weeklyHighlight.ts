import { botanDailyMessages } from '../content/botanDailyMessages'

const NON_DEVELOPMENTAL_SOURCES = new Set(['YOU THE DADDY', 'Fathercraft', 'Aba Strategy'])

export function getWeeklyHighlight(week: number): string | null {
  const weekMessages = botanDailyMessages.filter(
    (m) => m.week === week && !NON_DEVELOPMENTAL_SOURCES.has(m.source),
  )
  if (!weekMessages.length) return null

  const sorted = [...weekMessages].sort((a, b) => a.day - b.day)
  return sorted[0].text
}
