import { botanDailyMessages } from '../../content/botanDailyMessages'
import { getBotanDay } from '../../lib/botanDay'
import { useUserStore } from '../../store/useUserStore'

function BotanDailyCard() {
  const dueDate = useUserStore((state) => state.due_date)
  const manualWeekOverride = useUserStore((state) => state.manual_week_override)

  const day = getBotanDay(dueDate, manualWeekOverride)
  if (day === null) return null

  const entry = botanDailyMessages.find((m) => m.day === day)
  if (!entry) return null

  return (
    <section
      className="mx-5 rounded-2xl p-4"
      style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🫀</span>
          <span className="text-sm font-semibold text-[var(--text)]">הבוטן מדבר</span>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' }}
        >
          יום {day} · שבוע {entry.week}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-[var(--text)]" dir="rtl">
        "{entry.text}"
      </p>

      <p className="mt-2 text-xs text-[var(--text-muted)]">
        🔓 הודעת היום — מחר תגיע הודעה חדשה
      </p>
    </section>
  )
}

export default BotanDailyCard
