import { useEffect, useState } from 'react'

type Phase = 'closed' | 'ribbon-h' | 'ribbon-v' | 'bow' | 'revealed'

const STAGE_MS = 300

interface BellyRevealProps {
  week: number
  totalWeeks?: number
  sizeItem: string
  sizeDisplay: string
  sizePunchline: string
  sizeValue: string
  onShare: () => void
}

// עוגנים יחסיים: שבוע 4 = 15%, שבוע 20 = 50%, שבוע 40 = 100%.
// אינטרפולציה ליניארית בין העוגנים; לפני שבוע 4 מרחיבים את השיפוע הראשון אחורה.
const SCALE_ANCHORS: [week: number, scale: number][] = [
  [4, 0.15],
  [20, 0.5],
  [40, 1],
]

function embryoScale(week: number): number {
  const w = Math.min(40, Math.max(1, week))

  const [w1, s1] = SCALE_ANCHORS[0]
  if (w <= w1) {
    const [w2, s2] = SCALE_ANCHORS[1]
    const slope = (s2 - s1) / (w2 - w1)
    return Math.max(0.05, s1 + slope * (w - w1))
  }

  for (let i = 0; i < SCALE_ANCHORS.length - 1; i++) {
    const [fromWeek, fromScale] = SCALE_ANCHORS[i]
    const [toWeek, toScale] = SCALE_ANCHORS[i + 1]
    if (w >= fromWeek && w <= toWeek) {
      const t = (w - fromWeek) / (toWeek - fromWeek)
      return fromScale + t * (toScale - fromScale)
    }
  }

  return 1
}

// שלב 1 (1-8): blob קטן עגול. שלב 2 (9-16): צורה עוברית עם ראש גדול.
// שלב 3 (17-28): עובר עם גפיים. שלב 4 (29-40): תינוק מכורבל.
function fetalStage(week: number): 1 | 2 | 3 | 4 {
  if (week <= 8) return 1
  if (week <= 16) return 2
  if (week <= 28) return 3
  return 4
}

function EmbryoSvg({ week }: { week: number }) {
  const scale = embryoScale(week)
  const stage = fetalStage(week)

  return (
    <svg viewBox="0 0 120 160" width="110" height="146" aria-hidden="true">
      <ellipse cx="60" cy="90" rx="55" ry="65" fill="var(--bg-elevated)" />
      <g transform={`translate(60 85) scale(${scale})`}>
        <g
          style={{
            animation: 'float-soft 4s ease-in-out infinite',
            transformBox: 'fill-box',
            transformOrigin: 'center',
          }}
        >
          {stage === 1 && (
            <>
              <ellipse cx="0" cy="0" rx="16" ry="18" fill="#c4956a" />
              <circle
                cx="0"
                cy="-2"
                r="4"
                fill="#EF4444"
                style={{
                  animation: 'heartbeat 1.1s ease-in-out infinite',
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                }}
              />
            </>
          )}

          {stage === 2 && (
            <>
              <ellipse cx="0" cy="14" rx="14" ry="16" fill="#c4956a" />
              <circle cx="0" cy="-14" r="17" fill="#c4956a" />
              <ellipse cx="-13" cy="10" rx="4" ry="6" fill="#c4956a" transform="rotate(-20 -13 10)" />
              <ellipse cx="13" cy="10" rx="4" ry="6" fill="#c4956a" transform="rotate(20 13 10)" />
              <ellipse cx="-9" cy="26" rx="4" ry="7" fill="#c4956a" transform="rotate(-10 -9 26)" />
              <ellipse cx="9" cy="26" rx="4" ry="7" fill="#c4956a" transform="rotate(10 9 26)" />
            </>
          )}

          {stage === 3 && (
            <>
              <ellipse cx="0" cy="5" rx="18" ry="22" fill="#c4956a" />
              <ellipse cx="-18" cy="-5" rx="6" ry="12" fill="#c4956a" transform="rotate(-20 -18 -5)" />
              <ellipse cx="18" cy="-5" rx="6" ry="12" fill="#c4956a" transform="rotate(20 18 -5)" />
              <ellipse cx="-10" cy="25" rx="7" ry="14" fill="#c4956a" transform="rotate(-10 -10 25)" />
              <ellipse cx="10" cy="25" rx="7" ry="14" fill="#c4956a" transform="rotate(10 10 25)" />
              <circle cx="0" cy="-25" r="15" fill="#c4956a" />
            </>
          )}

          {stage === 4 && (
            <>
              <ellipse cx="4" cy="6" rx="22" ry="26" fill="#c4956a" transform="rotate(-8 4 6)" />
              <ellipse cx="10" cy="28" rx="14" ry="12" fill="#c4956a" />
              <circle cx="-6" cy="-24" r="15" fill="#c4956a" />
              <ellipse cx="-8" cy="-4" rx="7" ry="11" fill="#c4956a" transform="rotate(25 -8 -4)" />
            </>
          )}
        </g>
      </g>
    </svg>
  )
}

function BellySvg() {
  return (
    <svg viewBox="0 0 220 220" width="220" height="220" aria-hidden="true">
      <circle cx="110" cy="110" r="105" fill="#c4956a" opacity="0.15" />
      <circle cx="110" cy="110" r="90" fill="#111111" stroke="#1E1E1E" strokeWidth="2" />
      <ellipse cx="110" cy="150" rx="7" ry="5" fill="#000000" opacity="0.4" />
    </svg>
  )
}

function BellyReveal({
  week,
  totalWeeks = 40,
  sizeItem,
  sizeDisplay,
  sizePunchline,
  sizeValue,
  onShare,
}: BellyRevealProps) {
  const [phase, setPhase] = useState<Phase>('closed')
  const progress = Math.min(100, Math.max(0, (week / totalWeeks) * 100))

  useEffect(() => {
    if (phase === 'ribbon-h') {
      const t = setTimeout(() => setPhase('ribbon-v'), STAGE_MS)
      return () => clearTimeout(t)
    }
    if (phase === 'ribbon-v') {
      const t = setTimeout(() => setPhase('bow'), STAGE_MS)
      return () => clearTimeout(t)
    }
    if (phase === 'bow') {
      const t = setTimeout(() => setPhase('revealed'), STAGE_MS)
      return () => clearTimeout(t)
    }
  }, [phase])

  const hRibbonStyle: React.CSSProperties =
    phase === 'ribbon-h'
      ? { animation: `ribbon-h ${STAGE_MS}ms cubic-bezier(.4,0,.2,1) forwards` }
      : phase === 'closed'
        ? { transform: 'translateY(-50%) scaleX(1)' }
        : { transform: 'translateY(-50%) scaleX(0)' }

  const vRibbonStyle: React.CSSProperties =
    phase === 'ribbon-v'
      ? { animation: `ribbon-v ${STAGE_MS}ms cubic-bezier(.4,0,.2,1) forwards` }
      : phase === 'closed' || phase === 'ribbon-h'
        ? { transform: 'translateX(-50%) scaleY(1)' }
        : { transform: 'translateX(-50%) scaleY(0)' }

  const bowStyle: React.CSSProperties | undefined =
    phase === 'bow'
      ? { animation: `bow-fly ${STAGE_MS}ms cubic-bezier(.4,0,.2,1) forwards` }
      : undefined

  return (
    <section className="mx-5 mt-5 flex flex-col items-center gap-3">
      {phase !== 'revealed' ? (
        <button
          type="button"
          onClick={() => phase === 'closed' && setPhase('ribbon-h')}
          aria-label="גלה את גודל הבוטן השבוע"
          className="flex flex-col items-center gap-2"
        >
          <div className="relative flex h-[220px] w-[220px] items-center justify-center">
            <BellySvg />
            <span
              className="absolute right-0 top-1/2 h-4 w-full bg-accent"
              style={{ transformOrigin: 'center', ...hRibbonStyle }}
            />
            <span
              className="absolute left-1/2 top-0 h-full w-4 bg-accent"
              style={{ transformOrigin: 'center', ...vRibbonStyle }}
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl" style={bowStyle}>
              🎀
            </span>
          </div>
          {phase === 'closed' && (
            <p className="text-xs text-[var(--text-secondary)]">
              לחץ לגלות את השבוע שלך
            </p>
          )}
        </button>
      ) : (
        <div
          className="flex w-full gap-3"
          style={{ animation: 'reveal-in 400ms ease-out forwards', direction: 'ltr' }}
        >
          <div
            className="flex flex-col items-center justify-center gap-2 rounded-2xl p-4 text-center"
            style={{
              width: '40%',
              flexShrink: 0,
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <EmbryoSvg week={week} />
            <p className="text-xs text-[var(--text-muted)]">{sizeValue}</p>
          </div>

          <div
            className="flex flex-col items-center gap-1 rounded-2xl p-4 text-center"
            style={{
              width: '60%',
              direction: 'rtl',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <p className="text-[11px] uppercase text-[var(--text-muted)]">
              גודל השבוע
            </p>
            <h2
              className="font-black text-white"
              style={{ fontSize: 28, fontWeight: 900, lineHeight: 1 }}
            >
              {sizeItem}
            </h2>
            <span className="text-[16px] font-bold text-accent">
              {sizeDisplay}
            </span>
            <p className="text-[14px] italic text-[var(--text-secondary)]">
              {sizePunchline}
            </p>
            <button
              type="button"
              onClick={onShare}
              className="mt-2 rounded-full border border-accent/40 px-3 py-1 text-[11px] font-semibold text-accent"
            >
              שתף 🥜
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-[220px]">
        <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--border)]">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1 text-center text-[11px] text-[var(--text-muted)]">
          שבוע {week} מתוך {totalWeeks}
        </p>
      </div>

      {phase === 'revealed' && (
        <button
          type="button"
          onClick={() => setPhase('closed')}
          className="rounded-full border border-accent/40 px-4 py-1.5 text-xs font-semibold text-accent"
        >
          פתח שוב 🎀
        </button>
      )}
    </section>
  )
}

export default BellyReveal
