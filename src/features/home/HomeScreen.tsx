import { useState } from 'react'
import { useCurrentWeek } from '../../hooks/useCurrentWeek'
import { useWeekContent } from '../../hooks/useWeekContent'
import { useUserStore } from '../../store/useUserStore'
import { trackEvent } from '../../lib/analytics'
import ToneSwitcher from '../../components/ToneSwitcher'
import BottomSheet from '../../components/BottomSheet'
import { sosItems } from '../../content/sos'

type Tab = 'baby' | 'she' | 'dad' | 'wow'

const TABS_COMING_SOON = 'תוכן מלא לשבוע זה מגיע בקרוב 🥜'
const ACTIONS_COMING_SOON = 'משימות לשבוע זה מגיעות בקרוב'
const CHEAT_CODE_COMING_SOON = 'Cheat Code לשבוע זה מגיע בקרוב'

function HomeScreen() {
  const week = useCurrentWeek()
  const tone = useUserStore((state) => state.tone)
  const completedActionIds = useUserStore((state) => state.completed_action_ids)
  const toggleAction = useUserStore((state) => state.toggleAction)
  const dueDate = useUserStore((state) => state.due_date)
  const manualWeekOverride = useUserStore((state) => state.manual_week_override)
  const setDueDate = useUserStore((state) => state.setDueDate)
  const setManualWeekOverride = useUserStore(
    (state) => state.setManualWeekOverride,
  )
  const showManualWeekNotice = !dueDate && manualWeekOverride !== null
  const content = useWeekContent(week, tone)

  const [tab, setTab] = useState<Tab>('baby')
  const [openSosId, setOpenSosId] = useState<string | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [dueDateInput, setDueDateInput] = useState(dueDate ?? '')
  const [weekSlider, setWeekSlider] = useState(manualWeekOverride ?? week)

  const sheFeels = content.experience.tone_variants[tone]
  const dadTip = content.actions
    .map((action) => action.tone_variants[tone])
    .join('\n\n')
  const wtfFact = content.wow.tone_variants[tone]
  const dailyLine = content.dailyLine[tone]

  const tabContent: Record<Tab, string> = {
    baby: '',
    she: sheFeels,
    dad: dadTip,
    wow: wtfFact,
  }

  const hasFullContent = content.banner === null

  const handleSosToggle = (id: string) => {
    const opening = openSosId !== id
    setOpenSosId(opening ? id : null)
    if (opening) trackEvent('sos_opened', { id })
  }

  const handleSaveWeek = () => {
    if (dueDateInput) {
      setDueDate(dueDateInput)
    } else {
      setManualWeekOverride(weekSlider)
    }
    setSettingsOpen(false)
  }

  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-[390px] bg-white pb-24 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <header className="relative flex flex-col gap-1 p-4 pl-12">
        <button
          type="button"
          onClick={() => {
            setDueDateInput(dueDate ?? '')
            setWeekSlider(manualWeekOverride ?? week)
            setSettingsOpen(true)
          }}
          aria-label="עדכן שבוע"
          className="absolute left-4 top-4 text-xl"
        >
          ⚙️
        </button>
        <h1 className="text-lg font-semibold">
          שבוע {week} | Aba
        </h1>
        <ToneSwitcher />
        {showManualWeekNotice && (
          <p className="text-xs text-neutral-500">
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
            className="w-full rounded-xl bg-accent p-3 font-semibold text-neutral-950"
          >
            שמור
          </button>
        </div>
      </BottomSheet>

      {content.banner && (
        <div className="mx-4 mb-2 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-center text-xs text-neutral-400">
          {content.banner}
        </div>
      )}

      <section
        onClick={() => trackEvent('visualization_opened')}
        className="mx-4 flex flex-col items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-center"
      >
        <p className="text-sm text-neutral-400">הבוטן השבוע בגודל של</p>
        <h2 className="text-2xl font-extrabold">{content.overview.size_item}</h2>

        <div className="my-2 text-[64px] leading-none" aria-hidden="true">
          {content.overview.emoji}
        </div>

        <span className="text-lg font-semibold text-accent">
          {content.overview.size_display}
        </span>
        <p className="text-sm italic text-neutral-400">
          {content.overview.size_punchline}
        </p>
        <span className="mt-1 text-[10px] text-neutral-600">המחשה בלבד</span>
      </section>

      <nav className="mx-4 mt-6 grid grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => setTab('baby')}
          className={`rounded-xl p-2 text-sm ${tab === 'baby' ? 'bg-accent text-neutral-950' : 'bg-neutral-900 text-neutral-300'}`}
        >
          🥜 בוטן
        </button>
        <button
          type="button"
          onClick={() => setTab('she')}
          className={`rounded-xl p-2 text-sm ${tab === 'she' ? 'bg-accent text-neutral-950' : 'bg-neutral-900 text-neutral-300'}`}
        >
          👩 היא
        </button>
        <button
          type="button"
          onClick={() => setTab('dad')}
          className={`rounded-xl p-2 text-sm ${tab === 'dad' ? 'bg-accent text-neutral-950' : 'bg-neutral-900 text-neutral-300'}`}
        >
          👨 אתה
        </button>
        <button
          type="button"
          onClick={() => setTab('wow')}
          className={`rounded-xl p-2 text-sm ${tab === 'wow' ? 'bg-accent text-neutral-950' : 'bg-neutral-900 text-neutral-300'}`}
        >
          🤯 WOW
        </button>
      </nav>

      {!hasFullContent ? (
        <section className="mx-4 mt-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-center text-sm text-neutral-400">
          {TABS_COMING_SOON}
        </section>
      ) : tab === 'baby' ? (
        <section className="mx-4 mt-3 flex flex-col gap-2">
          {content.facts.map((fact) => (
            <div
              key={fact.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-sm leading-relaxed"
            >
              {fact.tone_variants[tone]}
            </div>
          ))}
        </section>
      ) : (
        <section className="mx-4 mt-3 whitespace-pre-line rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-sm leading-relaxed">
          {tabContent[tab]}
        </section>
      )}

      <section className="mx-4 mt-6 rounded-2xl border border-accent/40 bg-accent/10 p-4">
        <h2 className="mb-2 text-sm font-semibold">💬 Cheat Code להיום</h2>
        <p className="text-sm leading-relaxed">
          {hasFullContent ? dailyLine : CHEAT_CODE_COMING_SOON}
        </p>
      </section>

      <section className="mx-4 mt-6">
        <h2 className="mb-2 text-sm font-semibold">✅ מה עושים השבוע</h2>
        {hasFullContent ? (
          <div className="flex flex-col gap-2">
            {content.actions.map((action) => {
              const checked = completedActionIds.includes(action.id)
              return (
                <label
                  key={action.id}
                  className="flex items-start gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      toggleAction(action.id)
                      trackEvent('action_checked', { id: action.id })
                    }}
                    className="mt-1 h-4 w-4 accent-accent"
                  />
                  <span
                    className={checked ? 'text-neutral-500 line-through' : ''}
                  >
                    {action.tone_variants[tone]}
                  </span>
                </label>
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-center text-sm text-neutral-400">
            {ACTIONS_COMING_SOON}
          </div>
        )}
      </section>

      <section className="mx-4 mt-6 rounded-2xl border border-orange-400/40 p-4">
        <h2 className="mb-1 text-sm font-semibold text-orange-400">
          ⚠️ כדאי לדעת
        </h2>
        <p className="text-sm leading-relaxed text-neutral-300">
          {content.redFlag.neutral_text}
        </p>
      </section>

      <section className="mx-4 mt-6">
        <h2 className="mb-2 text-sm font-semibold">🔍 קרה משהו?</h2>
        <div className="grid grid-cols-3 gap-2">
          {sosItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSosToggle(item.id)}
              className={`rounded-xl border p-2 text-xs ${
                openSosId === item.id
                  ? 'border-accent bg-accent/10'
                  : 'border-neutral-800 bg-neutral-900'
              }`}
            >
              <div className="text-lg">{item.emoji}</div>
              <div>{item.label}</div>
            </button>
          ))}
        </div>

        {sosItems.map((item) => {
          if (openSosId !== item.id) return null
          const answer =
            item.class === 'medical' ? item.answer : item.answer_variants?.[tone]
          return (
            <div
              key={`${item.id}-answer`}
              className={`mt-3 rounded-2xl border p-4 text-sm leading-relaxed ${
                item.class === 'medical'
                  ? 'border-orange-400/40 text-neutral-300'
                  : 'border-neutral-800 bg-neutral-900'
              }`}
            >
              <p>{answer}</p>
              {item.class === 'medical' && (
                <p className="mt-2 font-semibold text-orange-400">
                  פנה לצוות המטפל
                </p>
              )}
              {item.actions && (
                <ul className="mt-3 flex flex-col gap-1 text-neutral-300">
                  {item.actions.map((step) => (
                    <li key={step}>• {step}</li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default HomeScreen
