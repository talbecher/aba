import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrentWeek } from '../../hooks/useCurrentWeek'
import { useWeekContent } from '../../hooks/useWeekContent'
import { useNextEvent } from '../../hooks/useNextEvent'
import { useUserStore } from '../../store/useUserStore'
import BottomSheet from '../../components/BottomSheet'
import type { Tone } from '../../types/user'

const TOTAL_WEEKS = 40
const DEFAULT_TONE: Tone = 'bro'

function NowScreen() {
  const navigate = useNavigate()
  const week = useCurrentWeek()
  const dueDate = useUserStore((state) => state.due_date)
  const setDueDate = useUserStore((state) => state.setDueDate)
  const completedTasks = useUserStore((state) => state.completedTasks)
  const toggleCompletedTask = useUserStore((state) => state.toggleCompletedTask)
  const { csv, data } = useWeekContent(week)
  const nextEvent = useNextEvent()

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [dueDateInput, setDueDateInput] = useState(dueDate ?? '')
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [taskDismissed, setTaskDismissed] = useState(false)

  const remainingWeeks = TOTAL_WEEKS - week
  const percent = Math.round((week / TOTAL_WEEKS) * 100)
  const taskId = `daily-task-week-${week}`
  const isTaskDone = completedTasks.includes(taskId)

  useEffect(() => {
    setDetailsOpen(false)
    setTaskDismissed(false)
  }, [week])

  const handleSaveDueDate = () => {
    if (dueDateInput) setDueDate(dueDateInput)
    setSettingsOpen(false)
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-4 bg-[var(--bg)] px-5 pb-24 pt-5 text-[var(--text)]">
      <header className="flex flex-col gap-2">
        <p className="text-[13px] text-[var(--text-secondary)]">
          שבוע {week} מתוך {TOTAL_WEEKS}
        </p>
        <p style={{ fontSize: 12, color: '#555' }}>נותרו {remainingWeeks} שבועות</p>
        <div
          className="h-[3px] w-full overflow-hidden rounded-full"
          style={{ backgroundColor: 'var(--bg-elevated)' }}
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${percent}%`, backgroundColor: 'var(--color-action)' }}
          />
        </div>
      </header>

      {!dueDate && (
        <button
          type="button"
          onClick={() => {
            setDueDateInput(dueDate ?? '')
            setSettingsOpen(true)
          }}
          style={{ minHeight: 44 }}
          className="rounded-xl bg-[var(--bg-card)] px-3 text-right text-xs text-[var(--text-secondary)]"
        >
          הוסף תאריך לידה להתאמה אישית ⚙️
        </button>
      )}

      <BottomSheet open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">עדכן תאריך לידה</h2>
          <input
            type="date"
            value={dueDateInput}
            onChange={(e) => setDueDateInput(e.target.value)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-neutral-100 focus:border-accent focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSaveDueDate}
            style={{ minHeight: 44 }}
            className="w-full rounded-xl bg-accent p-3 font-semibold text-neutral-950"
          >
            שמור
          </button>
        </div>
      </BottomSheet>

      {/* 1. באופק */}
      {nextEvent && (
        <section
          className="rounded-2xl p-4"
          style={{ border: '1px solid #3B82F644', backgroundColor: '#0d1117' }}
        >
          <h2 className="mb-2 text-sm font-semibold" style={{ color: 'var(--color-info)' }}>
            📍 באופק
          </h2>
          <p style={{ fontSize: 12, color: '#888' }}>
            {nextEvent.daysUntil === 0
              ? 'היום'
              : nextEvent.daysUntil === 1
                ? 'מחר'
                : `בעוד ${nextEvent.daysUntil} ימים`}
          </p>
          <p className="mt-1 text-base font-bold">{nextEvent.title}</p>
          {nextEvent.desc && (
            <p className="mt-1 text-sm" style={{ color: '#888' }}>
              {nextEvent.desc}
            </p>
          )}
        </section>
      )}

      {/* 2. מה קורה השבוע */}
      <section
        className="rounded-2xl p-4"
        style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
      >
        <h2 className="mb-2 text-sm font-semibold">מה קורה השבוע</h2>
        <p className="font-bold" style={{ fontSize: 16 }}>
          {csv.baby_content.title}
        </p>
        <p className="mt-1" style={{ fontSize: 14, color: '#888' }}>
          {csv.baby_content.plain}
        </p>
        <p className="mt-1 italic" style={{ fontSize: 14, color: '#666' }}>
          {csv.baby_content.aba_line}
        </p>

        {detailsOpen && (
          <div className="mt-3 flex flex-col gap-2 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
            <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}>
              {csv.baby_summary}
            </p>
            {csv.baby_milestones.length > 0 && (
              <ul className="flex flex-col gap-1" style={{ color: '#888' }}>
                {csv.baby_milestones.map((milestone) => (
                  <li key={milestone} className="text-sm">
                    • {milestone}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => setDetailsOpen((v) => !v)}
          className="mt-2 text-xs font-semibold text-accent"
        >
          {detailsOpen ? 'הצג פחות ↑' : 'עוד פרטים ↓'}
        </button>
      </section>

      {/* 3. המשימה שלך */}
      <section
        className="rounded-2xl p-4"
        style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
      >
        <h2 className="mb-2 text-sm font-semibold">המשימה שלך 🎯</h2>
        {taskDismissed ? (
          <p className="text-sm text-[var(--text-secondary)]">
            בסדר, נזכיר לך שוב מחר.
          </p>
        ) : (
          <>
            <p style={{ fontSize: 15, lineHeight: 1.6 }}>
              {data.dad_tip[DEFAULT_TONE]}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => toggleCompletedTask(taskId)}
                style={{ minHeight: 44 }}
                className={`flex-1 rounded-xl text-sm font-semibold ${
                  isTaskDone ? 'bg-accent/20 text-accent' : 'bg-accent text-neutral-950'
                }`}
              >
                {isTaskDone ? 'בוצע ✓' : 'סיימתי'}
              </button>
              <button
                type="button"
                onClick={() => setTaskDismissed(true)}
                style={{ minHeight: 44 }}
                className="flex-1 rounded-xl border border-[var(--border)] text-sm font-semibold text-[var(--text-secondary)]"
              >
                משימה אחרת
              </button>
            </div>
          </>
        )}
      </section>

      {/* 4. רוצה עוד? */}
      <p style={{ fontSize: 13, color: '#666', textAlign: 'center' }}>
        רוצה עוד?{' '}
        <button
          type="button"
          onClick={() => navigate('/did-you-know')}
          className="font-semibold"
          style={{ color: 'var(--color-knowledge)' }}
        >
          עוד עובדות →
        </button>
      </p>
    </div>
  )
}

export default NowScreen
