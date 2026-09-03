import { useEffect, useState } from 'react'
import { useCurrentWeek } from '../../hooks/useCurrentWeek'
import { useUserStore } from '../../store/useUserStore'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { revealData } from '../../content/reveal-data'
import ARCamera from './ARCamera'

const MIN_WEEK = 3
const MAX_WEEK = 40
const NEXT_COMPARISON_DAYS = 7
const STATS_BUTTONS_DELAY_MS = 500
const RECENT_COUNT = 3
const NEXT_ITEM_HINT = 'עוד השוואה מוזרה מחכה. בלי ספוילרים.'

type Phase = 'teaser' | 'reveal' | 'collection' | 'share'
type CollectionView = 'summary' | 'full'

function fadeUp(delayMs: number, durationMs = 500): React.CSSProperties {
  return {
    animation: `fadeUp ${durationMs}ms ease-out both`,
    animationDelay: `${delayMs}ms`,
  }
}

function shareMessageFor(week: number): string {
  const data = revealData[week]
  return `שבוע ${week}\n${data.emoji}\n${data.name}\n${data.punch}\n${data.size} · ${data.weight}\n\nABA 🥜`
}

function whatsappHrefFor(week: number): string {
  return `https://wa.me/?text=${encodeURIComponent(shareMessageFor(week))}`
}

function WeeklyReveal() {
  const rawWeek = useCurrentWeek()
  const week = Math.min(MAX_WEEK, Math.max(MIN_WEEK, rawWeek))
  const data = revealData[week]

  const revealedWeeks = useUserStore((state) => state.revealedWeeks)
  const addRevealedWeek = useUserStore((state) => state.addRevealedWeek)
  const reducedMotion = usePrefersReducedMotion()

  const [phase, setPhase] = useState<Phase>('teaser')
  const [showStats, setShowStats] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [collectionView, setCollectionView] = useState<CollectionView>('summary')
  const [tileWeek, setTileWeek] = useState<number | null>(null)
  const [showAR, setShowAR] = useState(false)
  const [showTileAR, setShowTileAR] = useState(false)

  useEffect(() => {
    setPhase('teaser')
    setShowStats(false)
    setShowButtons(false)
    setCollectionView('summary')
    setTileWeek(null)
  }, [week])

  // כל שבוע שכבר עבר (לפני השבוע הנוכחי) נחשב "נחשף" — לא רק שבועות שנלחצו בפועל.
  // השבוע הנוכחי עצמו נשאר תלוי בטקס ה-reveal האמיתי (handleStartReveal).
  useEffect(() => {
    for (let w = MIN_WEEK; w < week; w++) {
      addRevealedWeek(w)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [week])

  useEffect(() => {
    if (phase !== 'reveal') return
    const t = setTimeout(() => {
      navigator.vibrate?.([40])
    }, 300)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (!showStats) return
    const t = setTimeout(() => setShowButtons(true), STATS_BUTTONS_DELAY_MS)
    return () => clearTimeout(t)
  }, [showStats])

  const handleStartReveal = () => {
    setShowStats(false)
    setShowButtons(false)
    setPhase('reveal')
    addRevealedWeek(week)
  }

  const handleTapReveal = () => {
    if (!showStats) setShowStats(true)
  }

  return (
    <div
      className="mx-5 flex flex-col overflow-hidden rounded-2xl"
      style={{
        backgroundColor: '#0A0A0A',
        minHeight: 520,
      }}
    >
      {phase === 'teaser' &&
        (revealedWeeks.includes(week) ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-8 py-10 text-center">
            <p style={{ fontSize: 11, color: '#555' }}>שבוע {week} · נחשף ✓</p>
            <p style={{ fontSize: 48, textAlign: 'center' }}>{data.emoji}</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{data.name}</p>
            <p style={{ fontSize: 13, fontStyle: 'italic', color: '#666' }}>{data.punch}</p>
            <p style={{ fontSize: 13, color: 'var(--accent)' }}>
              {data.size} · {data.weight}
            </p>

            <div className="mt-3 flex w-full gap-2" style={{ maxWidth: 320 }}>
              <button
                type="button"
                onClick={() => setShowAR(true)}
                style={{
                  minHeight: 44,
                  border: '1px solid #F59E0B33',
                  color: '#F59E0B',
                }}
                className="flex-1 rounded-xl text-sm font-semibold"
              >
                📷 השווה על המצלמה
              </button>
              <button
                type="button"
                onClick={() => {
                  setCollectionView('summary')
                  setPhase('collection')
                }}
                style={{ minHeight: 44, borderColor: '#222', color: '#666' }}
                className="flex-1 rounded-xl border text-sm font-semibold"
              >
                האוסף שלי ←
              </button>
            </div>

            <p style={{ fontSize: 12, color: '#444', textAlign: 'center', marginTop: 8 }}>
              השבוע הבא: השוואה מוזרה אחרת.
            </p>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-10 text-center">
            <svg viewBox="0 0 120 140" width="120" height="140">
              <path
                d="M60 10 C30 10 8 40 8 75 C8 115 28 132 60 132
                   C92 132 112 115 112 75 C112 40 90 10 60 10 Z"
                fill="#1a1208"
                stroke="#F59E0B"
                strokeWidth="1.5"
              />
              <circle cx="60" cy="78" r="18" fill="#F59E0B" opacity=".08" />
              <circle cx="60" cy="78" r="6" fill="#F59E0B" opacity=".25" />
            </svg>
            <p style={{ fontSize: 24, fontWeight: 900, color: '#fff' }}>
              הבחור גדל.
            </p>
            <p style={{ fontSize: 14, color: '#666' }}>
              נראה למה הוא דומה השבוע.
            </p>
            <button
              type="button"
              onClick={handleStartReveal}
              style={{
                backgroundColor: '#F59E0B',
                color: '#0A0A0A',
                fontWeight: 900,
                padding: '14px 32px',
                borderRadius: 50,
                minHeight: 44,
              }}
            >
              יאללה, תראה 👀
            </button>
            <p style={{ fontSize: 11, color: '#333', marginTop: 20 }}>
              ההשוואה הבאה בעוד {NEXT_COMPARISON_DAYS} ימים.
            </p>
          </div>
        ))}

      {phase === 'reveal' && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ height: '100dvh', backgroundColor: '#0A0A0A' }}
        >
          <button
            type="button"
            onClick={() => setPhase('teaser')}
            aria-label="סגור"
            style={{ minHeight: 44, minWidth: 44, color: '#444' }}
            className="absolute right-2 top-2 z-10 flex items-center justify-center text-xl"
          >
            ✕
          </button>

          <div
            onClick={handleTapReveal}
            className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-10 text-center"
          >
            <p
              style={{
                fontSize: 11,
                color: '#444',
                textTransform: 'uppercase',
                ...fadeUp(0, 150),
              }}
            >
              טוב, בדקנו.
            </p>
            <p
              style={{
                fontSize: 140,
                lineHeight: 1,
                animation: reducedMotion
                  ? 'fadeUp 500ms ease-out both'
                  : 'revealPop 400ms ease-out both',
                animationDelay: '300ms',
              }}
            >
              {data.emoji}
            </p>
            <p
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: '#fff',
                ...fadeUp(700),
              }}
            >
              {data.name}
            </p>
            <p
              className="line-clamp-2"
              style={{
                fontSize: 18,
                color: '#888',
                fontStyle: 'italic',
                ...fadeUp(900),
              }}
            >
              {data.punch}
            </p>

            {!showStats && (
              <p style={{ fontSize: 12, color: '#333', ...fadeUp(1500) }}>
                הקש לראות כמה הוא באמת
              </p>
            )}

            {showStats && (
              <div
                className="mt-4 flex flex-col items-center gap-2"
                style={{ animation: 'slideUp 400ms ease-out both' }}
              >
                <p style={{ fontSize: 22, color: '#F59E0B', fontWeight: 700 }}>
                  {data.size} · {data.weight}
                </p>
                <p style={{ fontSize: 11, color: '#333' }}>
                  הנתונים הם הערכות ממוצעות לשבוע ההיריון.
                </p>
              </div>
            )}

            {showStats && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowAR(true)
                }}
                style={{
                  minHeight: 44,
                  border: '1px solid #F59E0B33',
                  color: '#F59E0B',
                  borderRadius: 50,
                  padding: '10px 20px',
                  fontSize: 13,
                }}
                className="mt-3 font-semibold"
              >
                📷 השווה על המצלמה
              </button>
            )}

            {showButtons && (
              <div
                className="mt-4 flex w-full gap-2"
                style={{ animation: 'fadeUp 400ms ease-out both', maxWidth: 320 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setPhase('share')}
                  style={{ minHeight: 44, borderColor: 'var(--accent)', color: 'var(--accent)' }}
                  className="flex-1 rounded-xl border font-semibold"
                >
                  שתף את זה 🚀
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCollectionView('summary')
                    setPhase('collection')
                  }}
                  style={{ minHeight: 44, borderColor: '#222', color: '#666' }}
                  className="flex-1 rounded-xl border font-semibold"
                >
                  האוסף שלי ←
                </button>
              </div>
            )}

            {showButtons && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setCollectionView('full')
                  setPhase('collection')
                }}
                style={{ fontSize: 12, color: '#444' }}
              >
                האוסף שלך: {revealedWeeks.length} מתוך {MAX_WEEK} → פתח אוסף
              </button>
            )}
          </div>
        </div>
      )}

      {phase === 'collection' && collectionView === 'summary' && (
        <div className="flex flex-1 flex-col gap-5 px-5 py-8">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setPhase('teaser')}
              aria-label="חזרה"
              style={{ fontSize: 12, color: '#555', minHeight: 44 }}
            >
              → חזרה
            </button>
            <p style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>
              האוסף שלך
            </p>
            <span style={{ width: 32 }} aria-hidden="true" />
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <p style={{ fontSize: 14, color: '#F59E0B', fontWeight: 700 }}>
              {revealedWeeks.length} מתוך {MAX_WEEK} נפתחו
            </p>
            <p style={{ fontSize: 12, color: '#555' }}>
              דברים שלא חשבת שתשווה לתינוק.
            </p>
          </div>

          {revealedWeeks.length > 0 && (
            <div className="flex flex-col gap-2">
              <p style={{ fontSize: 11, color: '#444', textTransform: 'uppercase' }}>
                נפתחו לאחרונה
              </p>
              <div className="flex flex-col gap-2">
                {[...revealedWeeks]
                  .slice(-RECENT_COUNT)
                  .reverse()
                  .map((w) => {
                    const wData = revealData[w]
                    return (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setTileWeek(w)}
                        style={{ minHeight: 44, backgroundColor: '#111', border: '1px solid #1E1E1E' }}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-right"
                      >
                        <span style={{ fontSize: 24 }}>{wData.emoji}</span>
                        <span className="flex flex-col">
                          <span style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>
                            {wData.name}
                          </span>
                          <span style={{ fontSize: 10, color: '#555' }}>שבוע {w}</span>
                        </span>
                      </button>
                    )
                  })}
              </div>
            </div>
          )}

          {week < MAX_WEEK && (
            <div className="flex flex-col gap-2">
              <p style={{ fontSize: 11, color: '#444', textTransform: 'uppercase' }}>
                הפריט הבא
              </p>
              <div
                style={{ backgroundColor: '#111', border: '1px solid #1E1E1E' }}
                className="flex flex-col gap-1 rounded-xl px-3 py-3"
              >
                <span style={{ fontSize: 13, color: '#666' }}>
                  שבוע {week + 1} · 🔒 נעול
                </span>
                <span style={{ fontSize: 11, color: '#444' }}>
                  נפתח בעוד {NEXT_COMPARISON_DAYS} ימים.
                </span>
                <span style={{ fontSize: 11, color: '#555', fontStyle: 'italic' }}>
                  {NEXT_ITEM_HINT}
                </span>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setCollectionView('full')}
            style={{ minHeight: 44, borderColor: '#222', color: '#F59E0B' }}
            className="rounded-xl border font-semibold"
          >
            הצג את כל האוסף →
          </button>
        </div>
      )}

      {phase === 'collection' && collectionView === 'full' && (
        <div className="flex flex-1 flex-col gap-5 px-5 py-8">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCollectionView('summary')}
              aria-label="חזרה"
              style={{ fontSize: 12, color: '#555', minHeight: 44 }}
            >
              → חזרה
            </button>
            <div className="flex flex-col items-center gap-1">
              <p style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>
                האוסף שלך
              </p>
              <p dir="ltr" style={{ fontSize: 12, color: '#F59E0B', fontWeight: 700 }}>
                {revealedWeeks.length} / {MAX_WEEK}
              </p>
            </div>
            <span style={{ width: 32 }} aria-hidden="true" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {Array.from(
              { length: MAX_WEEK - MIN_WEEK + 1 },
              (_, i) => i + MIN_WEEK,
            ).map((w) => {
              const weekData = revealData[w]

              if (w === week) {
                return (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setTileWeek(w)}
                    aria-label={`שבוע ${w} — היום`}
                    style={{
                      minHeight: 44,
                      backgroundColor: '#1a1000',
                      border: '1px solid #F59E0B',
                      borderRadius: 14,
                    }}
                    className="flex flex-col items-center gap-1 py-3"
                  >
                    <span style={{ fontSize: 32 }}>{weekData.emoji}</span>
                    <span style={{ fontSize: 9, color: '#F59E0B' }}>היום</span>
                  </button>
                )
              }

              if (w === week + 1) {
                return (
                  <div
                    key={w}
                    style={{ backgroundColor: '#1a1000', border: '1px solid #3a2a10', borderRadius: 14, minHeight: 44 }}
                    className="flex flex-col items-center justify-center gap-1 px-1 py-3 text-center"
                  >
                    <span style={{ fontSize: 16, opacity: 0.5 }}>🔒</span>
                    <span style={{ fontSize: 8, color: '#F59E0B' }}>בקרוב</span>
                  </div>
                )
              }

              if (w > week) {
                return (
                  <div
                    key={w}
                    style={{ backgroundColor: '#111', border: '1px solid #1E1E1E', borderRadius: 14, minHeight: 44 }}
                    className="flex flex-col items-center justify-center gap-1 py-3"
                  >
                    <span style={{ fontSize: 16, opacity: 0.25 }}>🔒</span>
                    <span style={{ fontSize: 9, color: '#222' }}>שבוע {w}</span>
                  </div>
                )
              }

              return (
                <button
                  key={w}
                  type="button"
                  onClick={() => setTileWeek(w)}
                  aria-label={`שבוע ${w} — ${weekData.name}`}
                  style={{ minHeight: 44, backgroundColor: '#111', border: '1px solid #1E1E1E', borderRadius: 14 }}
                  className="flex flex-col items-center gap-1 py-3"
                >
                  <span style={{ fontSize: 32 }}>{weekData.emoji}</span>
                  <span style={{ fontSize: 9, color: '#fff' }}>{weekData.name}</span>
                  <span style={{ fontSize: 9, color: '#444' }}>שבוע {w}</span>
                </button>
              )
            })}
          </div>

          <p style={{ fontSize: 12, color: '#333', textAlign: 'center' }}>
            עוד {Math.max(0, MAX_WEEK - week)} השוואות המיותרות לחלוטין בדרך.
          </p>
        </div>
      )}

      {tileWeek !== null && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={() => setTileWeek(null)}
        >
          <div
            className="absolute inset-0 bg-black/60"
            aria-hidden="true"
          />
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto flex w-full max-w-[390px] flex-col items-center gap-2 rounded-t-2xl p-6 pb-8 text-center"
            style={{ backgroundColor: '#111', border: '1px solid #222' }}
          >
            <p style={{ fontSize: 64, lineHeight: 1.2 }}>
              {revealData[tileWeek].emoji}
            </p>
            <p style={{ fontSize: 24, fontWeight: 900, color: '#fff' }}>
              {revealData[tileWeek].name}
            </p>
            <p style={{ fontSize: 13, fontStyle: 'italic', color: '#777' }}>
              {revealData[tileWeek].punch}
            </p>
            <p style={{ fontSize: 13, color: '#F59E0B', fontWeight: 700 }}>
              {revealData[tileWeek].size} · {revealData[tileWeek].weight}
            </p>
            <button
              type="button"
              onClick={() => setShowTileAR(true)}
              style={{
                minHeight: 44,
                border: '1px solid #F59E0B33',
                color: '#F59E0B',
              }}
              className="mt-3 w-full rounded-xl text-sm font-semibold"
            >
              📷 השווה על המצלמה
            </button>

            <div className="mt-2 flex w-full gap-2">
              <a
                href={whatsappHrefFor(tileWeek)}
                target="_blank"
                rel="noreferrer"
                style={{ minHeight: 44, backgroundColor: '#25D366', color: '#0A0A0A' }}
                className="flex flex-1 items-center justify-center rounded-xl text-sm font-semibold"
              >
                שתף
              </a>
              <button
                type="button"
                onClick={() => setTileWeek(null)}
                style={{ minHeight: 44, borderColor: '#333', color: '#888' }}
                className="flex-1 rounded-xl border text-sm font-semibold"
              >
                סגור
              </button>
            </div>
          </div>
        </div>
      )}

      {showTileAR && tileWeek !== null && (
        <ARCamera
          week={tileWeek}
          name={revealData[tileWeek].name}
          size_cm={revealData[tileWeek].size_cm}
          weight={revealData[tileWeek].weight}
          punch={revealData[tileWeek].punch}
          onClose={() => setShowTileAR(false)}
        />
      )}

      {showAR && (
        <ARCamera
          week={week}
          name={data.name}
          size_cm={data.size_cm}
          weight={data.weight}
          punch={data.punch}
          onClose={() => {
            setShowAR(false)
            setPhase('teaser')
          }}
        />
      )}

      {phase === 'share' && (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 py-10">
          <button
            type="button"
            onClick={() => setPhase('reveal')}
            className="self-start"
            style={{ fontSize: 12, color: '#555', minHeight: 44 }}
          >
            → חזרה
          </button>

          <div
            className="flex w-full flex-col items-center gap-1 rounded-2xl p-6 text-center"
            style={{
              maxWidth: 320,
              backgroundColor: '#111',
              border: '1px solid #222',
            }}
          >
            <p
              style={{
                fontSize: 10,
                color: '#444',
                textTransform: 'uppercase',
              }}
            >
              שבוע {week}
            </p>
            <p style={{ fontSize: 72, lineHeight: 1.2 }}>{data.emoji}</p>
            <p style={{ fontSize: 30, fontWeight: 900, color: '#fff' }}>
              {data.name}
            </p>
            <p
              style={{
                fontSize: 14,
                fontStyle: 'italic',
                color: '#777',
                margin: '12px 0',
              }}
            >
              {data.punch}
            </p>
            <p style={{ fontSize: 13, color: '#F59E0B', fontWeight: 700 }}>
              {data.size} · {data.weight}
            </p>
            <p style={{ fontSize: 11, color: '#333' }}>ABA 🥜</p>
          </div>

          <a
            href={whatsappHrefFor(week)}
            target="_blank"
            rel="noreferrer"
            style={{ backgroundColor: '#25D366', color: '#0A0A0A', maxWidth: 320, minHeight: 44 }}
            className="flex w-full items-center justify-center rounded-xl text-center font-semibold"
          >
            שלח בוואטסאפ 💬
          </a>
        </div>
      )}
    </div>
  )
}

export default WeeklyReveal
