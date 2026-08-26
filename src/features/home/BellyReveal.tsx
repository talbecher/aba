import { useEffect, useState } from 'react'

type Phase = 'closed' | 'opening' | 'revealed'

interface BellyRevealProps {
  week: number
  totalWeeks?: number
  sizeItem: string
  sizeDisplay: string
  sizePunchline: string
  sizeValue: string
  onShare: () => void
}

function embryoScale(week: number, totalWeeks: number): number {
  return 0.3 + Math.min(1, Math.max(0, week / totalWeeks)) * 0.7
}

function EmbryoSvg({ week, totalWeeks }: { week: number; totalWeeks: number }) {
  const scale = embryoScale(week, totalWeeks)

  return (
    <svg viewBox="0 0 120 160" width="110" height="146" aria-hidden="true">
      <ellipse cx="60" cy="90" rx="55" ry="65" fill="var(--bg-card-elevated)" />
      <g transform={`translate(60 80) scale(${scale}) translate(-30 -40)`}>
        <ellipse cx="20" cy="70" rx="7" ry="14" fill="#c4956a" transform="rotate(-10 20 70)" />
        <ellipse cx="40" cy="70" rx="7" ry="14" fill="#c4956a" transform="rotate(10 40 70)" />
        <ellipse cx="12" cy="50" rx="6" ry="12" fill="#c4956a" transform="rotate(-20 12 50)" />
        <ellipse cx="48" cy="50" rx="6" ry="12" fill="#c4956a" transform="rotate(20 48 50)" />
        <ellipse cx="30" cy="45" rx="18" ry="22" fill="#c4956a" />
        <circle cx="30" cy="15" r="15" fill="#c4956a" />
      </g>
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
    if (phase !== 'opening') return
    const timer = setTimeout(() => setPhase('revealed'), 500)
    return () => clearTimeout(timer)
  }, [phase])

  return (
    <section className="mx-5 mt-5 flex flex-col items-center gap-3">
      {phase !== 'revealed' ? (
        <button
          type="button"
          onClick={() => phase === 'closed' && setPhase('opening')}
          aria-label="גלה את גודל הבוטן השבוע"
          className="relative flex h-[220px] w-[220px] items-center justify-center rounded-full"
          style={{ backgroundColor: '#141414', border: '1px solid #222222' }}
        >
          <span
            className="absolute right-0 top-1/2 h-4 w-full bg-accent"
            style={{
              transform: 'translateY(-50%) scaleX(1)',
              transformOrigin: 'center',
              ...(phase === 'opening'
                ? { animation: 'ribbon-slide-h 500ms cubic-bezier(.4,0,.2,1) forwards' }
                : {}),
            }}
          />
          <span
            className="absolute left-1/2 top-0 h-full w-4 bg-accent"
            style={{
              transform: 'translateX(-50%) scaleY(1)',
              transformOrigin: 'center',
              ...(phase === 'opening'
                ? { animation: 'ribbon-slide-v 500ms cubic-bezier(.4,0,.2,1) forwards' }
                : {}),
            }}
          />
          <span
            className="absolute -top-3 left-1/2 -translate-x-1/2 text-4xl"
            style={
              phase === 'opening'
                ? { animation: 'bow-fly 500ms cubic-bezier(.4,0,.2,1) forwards' }
                : undefined
            }
          >
            🎀
          </span>
        </button>
      ) : (
        <div className="flex w-full gap-3" style={{ animation: 'reveal-in 400ms ease-out forwards' }}>
          <div
            className="flex flex-1 flex-col items-center gap-2 rounded-2xl p-4 text-center"
            style={{ backgroundColor: '#141414', border: '1px solid #222222' }}
          >
            <p className="text-xs text-[var(--text-secondary)]">איך הבוטן נראה</p>
            <EmbryoSvg week={week} totalWeeks={totalWeeks} />
            <p className="text-xs text-[var(--text-muted)]">{sizeValue}</p>
          </div>

          <div
            className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl p-4 text-center"
            style={{ backgroundColor: '#141414', border: '1px solid #222222' }}
          >
            <p className="text-xs text-[var(--text-secondary)]">גודל השבוע</p>
            <h2 className="text-[28px] font-black leading-tight text-white">
              {sizeItem}
            </h2>
            <span className="text-lg font-semibold text-accent">
              {sizeDisplay}
            </span>
            <p className="text-sm italic text-[var(--text-secondary)]">
              {sizePunchline}
            </p>
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
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPhase('closed')}
            className="rounded-full border border-accent/40 px-4 py-1.5 text-xs font-semibold text-accent"
          >
            פתח שוב 🎀
          </button>
          <button
            type="button"
            onClick={onShare}
            className="rounded-full border border-accent/40 px-4 py-1.5 text-xs font-semibold text-accent"
          >
            שתף 🥜
          </button>
        </div>
      )}
    </section>
  )
}

export default BellyReveal
