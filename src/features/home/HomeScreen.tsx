import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrentWeek } from '../../hooks/useCurrentWeek'
import { useJourneyPreview } from '../../hooks/useJourneyPreview'
import { useUserStore } from '../../store/useUserStore'
import { openGoogleCalendarEvent } from '../../lib/calendar'
import { tasks } from '../../content/tasks'
import BottomSheet from '../../components/BottomSheet'
import PreparationDetail from '../../components/PreparationDetail'
import WeeklyReveal from '../reveal/WeeklyReveal'

const TOTAL_WEEKS = 40
const BONUS_TASK_COUNT = 3

function getTrimester(week: number): 1 | 2 | 3 {
  if (week <= 13) return 1
  if (week <= 27) return 2
  return 3
}

function HomeScreen() {
  const navigate = useNavigate()
  const week = useCurrentWeek()
  const dueDate = useUserStore((state) => state.due_date)
  const manualWeekOverride = useUserStore((state) => state.manual_week_override)
  const setDueDate = useUserStore((state) => state.setDueDate)
  const setManualWeekOverride = useUserStore(
    (state) => state.setManualWeekOverride,
  )
  const completedTasks = useUserStore((state) => state.completedTasks)
  const toggleCompletedTask = useUserStore((state) => state.toggleCompletedTask)
  const currentTaskIndex = useUserStore((state) => state.currentTaskIndex)
  const setCurrentTaskIndex = useUserStore((state) => state.setCurrentTaskIndex)
  const addPlannedEvent = useUserStore((state) => state.addPlannedEvent)
  const showManualWeekNotice = !dueDate && manualWeekOverride !== null
  const { next, upNext } = useJourneyPreview()

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [dueDateInput, setDueDateInput] = useState(dueDate ?? '')
  const [weekSlider, setWeekSlider] = useState(manualWeekOverride ?? week)
  const [prepOpen, setPrepOpen] = useState(false)
  const [showBonusTasks, setShowBonusTasks] = useState(false)

  const trimester = getTrimester(week)
  const percent = Math.round((week / TOTAL_WEEKS) * 100)
  const remainingWeeks = TOTAL_WEEKS - week

  const relevantTasks = useMemo(
    () => tasks.filter((t) => t.week_start <= week && week <= t.week_end),
    [week],
  )
  const bonusTasks = useMemo(
    () => tasks.filter((t) => !(t.week_start <= week && week <= t.week_end)).slice(0, BONUS_TASK_COUNT),
    [week],
  )
  const activeTask = relevantTasks[currentTaskIndex] ?? null
  const isExhausted = relevantTasks.length > 0 && currentTaskIndex >= relevantTasks.length

  useEffect(() => {
    setCurrentTaskIndex(0)
    setShowBonusTasks(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [week])

  const handleSaveWeek = () => {
    if (dueDateInput) {
      setDueDate(dueDateInput)
    } else {
      setManualWeekOverride(weekSlider)
    }
    setSettingsOpen(false)
  }

  const handleAddNextToCalendar = () => {
    if (!next) return
    openGoogleCalendarEvent({
      title: next.title,
      date: next.date,
      description: next.desc || next.title,
    })
    addPlannedEvent(String(next.week))
  }

  const handleWhatToKnow = () => {
    if (next?.preparation) {
      setPrepOpen(true)
    } else {
      navigate('/journey')
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-4 bg-[var(--bg)] pb-24 text-[var(--text)]">
      <header className="flex flex-col gap-2 px-5 pt-4 pb-2">
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center gap-1 justify-self-start">
            <button
              type="button"
              onClick={() => navigate('/sos')}
              aria-label="קרה משהו? SOS"
              style={{ minHeight: 44, minWidth: 44 }}
              className="flex items-center justify-center text-lg"
            >
              <span style={{ color: 'var(--color-danger)' }}>🚨</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setDueDateInput(dueDate ?? '')
                setWeekSlider(manualWeekOverride ?? week)
                setSettingsOpen(true)
              }}
              aria-label="עדכן שבוע"
              style={{ minHeight: 44, minWidth: 44 }}
              className="flex items-center justify-center text-lg text-[var(--text-secondary)]"
            >
              ⚙️
            </button>
          </div>
          <p
            className="justify-self-center text-accent"
            style={{ fontSize: 16, fontWeight: 900 }}
          >
            Aba
          </p>
          <span aria-hidden="true" />
        </div>

        <p className="text-center" style={{ fontSize: 12, color: '#555' }}>
          שבוע {week} מתוך {TOTAL_WEEKS} · טרימסטר {trimester} · נותרו{' '}
          {remainingWeeks} שבועות
        </p>

        <div
          className="h-[3px] w-full overflow-hidden rounded-full"
          style={{ backgroundColor: 'var(--bg-elevated)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${percent}%`,
              backgroundColor: 'var(--color-action)',
            }}
          />
        </div>

        {showManualWeekNotice && (
          <p className="text-center text-xs text-[var(--text-muted)]">
            תוכן מוצג לשבוע {week} — עדכן שבוע בהגדרות
          </p>
        )}
      </header>

      <BottomSheet open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">עדכן שבוע</h2>
          <p className="text-sm text-neutral-400">השבוע הנוכחי: {week}</p>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">תאריך לידה משוער</label>
            <input
              type="date"
              value={dueDateInput}
              onChange={(e) => setDueDateInput(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-neutral-100 focus:border-accent focus:outline-none"
            />
            {dueDateInput && (
              <button
                type="button"
                onClick={() => setDueDateInput('')}
                className="self-start text-xs text-neutral-500"
              >
                נקה תאריך
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">בחר שבוע ידנית</label>
            <div className="text-center text-lg font-semibold text-accent">
              שבוע {weekSlider}
            </div>
            <input
              type="range"
              min={1}
              max={40}
              value={weekSlider}
              onChange={(e) => setWeekSlider(Number(e.target.value))}
              disabled={!!dueDateInput}
              className="w-full accent-accent disabled:opacity-40"
            />
          </div>

          <button
            type="button"
            onClick={handleSaveWeek}
            style={{ minHeight: 44 }}
            className="w-full rounded-xl bg-accent p-3 font-semibold text-neutral-950"
          >
            שמור
          </button>
        </div>
      </BottomSheet>

      {next?.preparation && (
        <BottomSheet open={prepOpen} onClose={() => setPrepOpen(false)}>
          <PreparationDetail
            title={next.title}
            badge={next.badge}
            preparation={next.preparation}
            onAddToCalendar={handleAddNextToCalendar}
            onClose={() => setPrepOpen(false)}
          />
        </BottomSheet>
      )}

      {(next || upNext.length > 0) && (
        <section
          className="mx-5 rounded-2xl p-4"
          style={{ border: '1px solid #3B82F644', backgroundColor: '#0d1117' }}
        >
          {next && (
            <>
              <div className="mb-2 flex items-center justify-between">
                <h2
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-info)' }}
                >
                  📍 באופק
                </h2>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{
                    backgroundColor: 'rgba(59,130,246,0.12)',
                    color: 'var(--color-info)',
                  }}
                >
                  {next.badge}
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#888' }}>
                {next.daysUntil === 0
                  ? 'היום'
                  : next.daysUntil === 1
                    ? 'מחר'
                    : `בעוד ${next.daysUntil} ימים`}
              </p>
              <p className="mt-1" style={{ fontSize: 18, fontWeight: 700 }}>
                {next.title}
              </p>
              {next.desc && (
                <p
                  className="mt-1 truncate"
                  style={{ fontSize: 14, color: '#888' }}
                >
                  {next.desc}
                </p>
              )}
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={handleWhatToKnow}
                  style={{
                    minHeight: 44,
                    backgroundColor: 'var(--color-info)',
                    color: '#0A0A0A',
                  }}
                  className="flex-1 rounded-xl text-sm font-semibold"
                >
                  {next.type === 'task' ? 'פתח הכנה' : 'מה צריך לדעת'}
                </button>
                <button
                  type="button"
                  onClick={handleAddNextToCalendar}
                  style={{ minHeight: 44, borderColor: '#333', color: '#888' }}
                  className="flex-1 rounded-xl border text-sm font-semibold"
                >
                  הוסף ליומן
                </button>
              </div>
            </>
          )}

          {upNext.length > 0 && (
            <div className={`flex flex-col gap-1 ${next ? 'mt-4' : ''}`}>
              {upNext.map((event) => (
                <p key={event.week} style={{ fontSize: 12, color: '#666' }}>
                  שבוע {event.week} · {event.title}
                </p>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => navigate('/journey')}
            className="mt-3 text-xs font-semibold"
            style={{ color: 'var(--color-info)' }}
          >
            פתח את כל המסע →
          </button>
        </section>
      )}

      <section
        className="mx-5 rounded-2xl p-4"
        style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
      >
        <h2 className="mb-2 text-sm font-semibold">המשימה שלך היום 🎯</h2>

        {activeTask && !isExhausted && (
          <>
            <p className="mb-1 font-bold text-accent" style={{ fontSize: 15 }}>
              {activeTask.title}
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.6 }}>
              {activeTask.description}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => toggleCompletedTask(activeTask.id)}
                style={{ minHeight: 44 }}
                className={`flex-1 rounded-xl text-sm font-semibold ${
                  completedTasks.includes(activeTask.id)
                    ? 'bg-accent/20 text-accent'
                    : 'bg-accent text-neutral-950'
                }`}
              >
                {completedTasks.includes(activeTask.id) ? 'בוצע ✓' : 'סיימתי ✅'}
              </button>
              <button
                type="button"
                onClick={() => setCurrentTaskIndex(currentTaskIndex + 1)}
                style={{ minHeight: 44 }}
                className="flex-1 rounded-xl border border-[var(--border)] text-sm font-semibold text-[var(--text-secondary)]"
              >
                משימה אחרת
              </button>
            </div>
          </>
        )}

        {(isExhausted || relevantTasks.length === 0) && (
          <>
            <p className="text-sm text-[var(--text-secondary)]">
              עשית הכל השבוע 💪
            </p>
            {!showBonusTasks ? (
              <button
                type="button"
                onClick={() => setShowBonusTasks(true)}
                style={{ minHeight: 44 }}
                className="mt-3 w-full rounded-xl border border-[var(--border)] text-sm font-semibold text-accent"
              >
                מה עוד אני יכול לעשות?
              </button>
            ) : (
              <div className="mt-3 flex flex-col gap-3">
                {bonusTasks.map((task) => (
                  <div key={task.id} className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-accent" style={{ fontSize: 14 }}>
                        {task.title}
                      </p>
                      <p style={{ fontSize: 14, color: '#888' }}>
                        {task.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleCompletedTask(task.id)}
                      aria-label={`סיימתי: ${task.title}`}
                      style={{ minHeight: 44, minWidth: 44 }}
                      className="shrink-0 text-lg"
                    >
                      {completedTasks.includes(task.id) ? '✓' : '○'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <WeeklyReveal />

      <p style={{ fontSize: 12, color: '#444', textAlign: 'center' }}>
        השבוע הבא: משהו קטן יותר ממה שאתה חושב. נפתח בעוד 7 ימים.
      </p>
    </div>
  )
}

export default HomeScreen
