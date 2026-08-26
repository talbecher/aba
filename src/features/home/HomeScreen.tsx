import { useRef, useState } from 'react'
import html2canvas from 'html2canvas-pro'
import { useCurrentWeek } from '../../hooks/useCurrentWeek'
import { useWeekContent } from '../../hooks/useWeekContent'
import { useUserStore } from '../../store/useUserStore'
import { trackEvent } from '../../lib/analytics'
import ToneSwitcher from '../../components/ToneSwitcher'
import BottomSheet from '../../components/BottomSheet'
import ShareCard from '../../components/ShareCard'
import BellyReveal from './BellyReveal'
import { sosItems } from '../../content/sos'
import type { Tone } from '../../types/user'
import type { WeekData } from '../../types/content'

type Tab = 'baby' | 'she' | 'dad' | 'wow'
type WeekSectionKey = 'whats_happening' | 'she_feels' | 'dad_tip' | 'wtf_fact'

const TABS: { id: Tab; label: string; field: WeekSectionKey }[] = [
  { id: 'baby', label: 'בוטן', field: 'whats_happening' },
  { id: 'she', label: 'היא', field: 'she_feels' },
  { id: 'dad', label: 'אתה', field: 'dad_tip' },
  { id: 'wow', label: 'WOW', field: 'wtf_fact' },
]

const SAFETY_NOTE =
  'אם מופיע דימום, כאב בטן חד שאינו חולף, או ירידת נוזלים — לא מחכים ולא מנחשים. פונים לצוות המטפל.'

function tabText(data: WeekData, field: WeekSectionKey, tone: Tone): string {
  return data[field][tone]
}

function HomeScreen() {
  const week = useCurrentWeek()
  const tone = useUserStore((state) => state.tone)
  const dueDate = useUserStore((state) => state.due_date)
  const manualWeekOverride = useUserStore((state) => state.manual_week_override)
  const setDueDate = useUserStore((state) => state.setDueDate)
  const setManualWeekOverride = useUserStore(
    (state) => state.setManualWeekOverride,
  )
  const showManualWeekNotice = !dueDate && manualWeekOverride !== null
  const content = useWeekContent(week)

  const [tab, setTab] = useState<Tab>('baby')
  const [openSosId, setOpenSosId] = useState<string | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [dueDateInput, setDueDateInput] = useState(dueDate ?? '')
  const [weekSlider, setWeekSlider] = useState(manualWeekOverride ?? week)

  const activeTab = TABS.find((t) => t.id === tab)!
  const activeTabText = tabText(content.data, activeTab.field, tone)

  const shareCardRef = useRef<HTMLDivElement>(null)
  const [sharePreview, setSharePreview] = useState<{
    dataUrl: string
    blob: Blob
  } | null>(null)

  const handleOpenSharePreview = async () => {
    if (!shareCardRef.current) return

    try {
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: '#1A1A1A',
      })

      canvas.toBlob((blob) => {
        if (!blob) return
        setSharePreview({ dataUrl: canvas.toDataURL('image/png'), blob })
      }, 'image/png')
    } catch (err) {
      console.error('[handleShare] capture failed', err)
    }
  }

  const handleConfirmShare = async () => {
    if (!sharePreview) return
    const file = new File([sharePreview.blob], 'aba-share.png', {
      type: 'image/png',
    })

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'Aba' })
        trackEvent('share_card_shared')
      } catch {
        // user cancelled the share sheet
      }
      setSharePreview(null)
      return
    }

    const url = URL.createObjectURL(sharePreview.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'aba-share.png'
    a.click()
    URL.revokeObjectURL(url)
    trackEvent('share_card_downloaded')
    setSharePreview(null)
  }

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
    <div className="relative mx-auto min-h-dvh w-full max-w-[390px] bg-[var(--bg-base)] pb-24 text-[var(--text-primary)]">
      <header className="flex flex-col gap-3 border-b border-[var(--border)] px-5 pb-4 pt-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[14px] font-bold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
              שבוע {week}
            </p>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">Aba</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setDueDateInput(dueDate ?? '')
              setWeekSlider(manualWeekOverride ?? week)
              setSettingsOpen(true)
            }}
            aria-label="עדכן שבוע"
            className="text-xl text-[var(--text-secondary)]"
          >
            ⚙️
          </button>
        </div>
        <ToneSwitcher />
        {showManualWeekNotice && (
          <p className="text-xs text-[var(--text-muted)]">
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

      <BellyReveal
        week={week}
        sizeItem={content.overview.size_item}
        sizeDisplay={content.overview.size_display}
        sizePunchline={content.overview.size_punchline}
        sizeValue={content.overview.size_value}
        onShare={handleOpenSharePreview}
      />

      <BottomSheet
        open={sharePreview !== null}
        onClose={() => setSharePreview(null)}
      >
        {sharePreview && (
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-lg font-bold">תצוגה מקדימה</h2>
            <img
              src={sharePreview.dataUrl}
              alt="תצוגה מקדימה של הכרטיס לשיתוף"
              className="w-full rounded-2xl"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSharePreview(null)}
                className="flex-1 rounded-xl border border-neutral-700 p-3 font-semibold text-neutral-300"
              >
                סגור
              </button>
              <button
                type="button"
                onClick={handleConfirmShare}
                className="flex-1 rounded-xl bg-accent p-3 font-semibold text-neutral-950"
              >
                שתף
              </button>
            </div>
          </div>
        )}
      </BottomSheet>

      <div
        aria-hidden="true"
        style={{ position: 'fixed', top: -9999, left: -9999, pointerEvents: 'none' }}
      >
        <ShareCard
          ref={shareCardRef}
          week={week}
          emoji={content.overview.emoji}
          sizeItem={content.overview.size_item}
          sizePunchline={content.overview.size_punchline}
          sizeDisplay={content.overview.size_display}
        />
      </div>

      <nav className="mx-5 mt-6 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t.id
                ? 'bg-accent text-neutral-950'
                : 'border border-[var(--border)] text-[var(--text-secondary)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <section className="mx-5 mt-4 whitespace-pre-line rounded-2xl bg-[var(--bg-card)] p-6 text-sm leading-relaxed text-[var(--text-primary)]">
        {activeTabText}
      </section>

      <section
        className="mx-5 mt-6 rounded-2xl border-r-[3px] border-accent p-5"
        style={{ backgroundColor: 'var(--accent-dim)' }}
      >
        <h2 className="mb-2 text-sm font-semibold text-accent">
          🔮 מה בהמשך
        </h2>
        <p className="text-base italic leading-relaxed text-[var(--text-primary)]">
          {content.data.coming_next}
        </p>
      </section>

      <section
        className="mx-5 mt-6 flex items-start gap-3 rounded-2xl p-4"
        style={{ border: '1px solid #F59E0B44' }}
      >
        <span className="text-lg">⚠️</span>
        <div>
          <h2 className="mb-1 text-sm font-semibold text-accent">
            כדאי לדעת
          </h2>
          <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
            {SAFETY_NOTE}
          </p>
        </div>
      </section>

      <section className="mx-5 mt-6">
        <h2 className="mb-2 text-sm font-semibold text-[var(--text-secondary)]">
          🔍 קרה משהו?
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {sosItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSosToggle(item.id)}
              className={`flex flex-col items-center gap-1 rounded-2xl p-3 text-center ${
                openSosId === item.id
                  ? 'bg-accent/10 ring-1 ring-accent'
                  : 'bg-[var(--bg-card-elevated)]'
              }`}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-[11px] text-[var(--text-secondary)]">
                {item.label}
              </span>
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
              className={`mt-3 rounded-2xl p-4 text-sm leading-relaxed ${
                item.class === 'medical'
                  ? 'text-[var(--text-secondary)]'
                  : 'bg-[var(--bg-card)] text-[var(--text-primary)]'
              }`}
              style={
                item.class === 'medical'
                  ? { border: '1px solid #F59E0B44' }
                  : undefined
              }
            >
              <p>{answer}</p>
              {item.class === 'medical' && (
                <p className="mt-2 font-semibold text-accent">
                  פנה לצוות המטפל
                </p>
              )}
              {item.actions && (
                <ul className="mt-3 flex flex-col gap-1 text-[var(--text-secondary)]">
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
