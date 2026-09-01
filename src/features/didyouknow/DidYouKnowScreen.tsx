import { useEffect, useRef, useState } from 'react'
import { wtfFacts, type WtfCategory } from '../../content/wtf-facts'

const WHEEL_SIZE = 280
const MIN_EXTRA_SPINS = 4
const MAX_EXTRA_SPINS = 6
const MIN_DURATION_S = 3
const MAX_DURATION_S = 4

const CATEGORY_COLOR: Record<WtfCategory, string> = {
  growth: '#F59E0B', // כתום — התפתחות עוברית
  dad: '#3B82F6', // כחול — תכל'ס
  wow: '#8B5CF6', // סגול — רגע, באמת?
  bond: '#10B981', // ירוק — זוגיות/תמיכה
}

function drawWheel(canvas: HTMLCanvasElement, total: number) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const radius = WHEEL_SIZE / 2
  const segmentAngle = (2 * Math.PI) / total

  ctx.clearRect(0, 0, WHEEL_SIZE, WHEEL_SIZE)

  for (let i = 0; i < total; i++) {
    const startAngle = -Math.PI / 2 + i * segmentAngle
    const endAngle = startAngle + segmentAngle

    ctx.beginPath()
    ctx.moveTo(radius, radius)
    ctx.arc(radius, radius, radius, startAngle, endAngle)
    ctx.closePath()
    ctx.fillStyle = CATEGORY_COLOR[wtfFacts[i].category]
    ctx.fill()
  }

  ctx.strokeStyle = '#0A0A0A'
  ctx.lineWidth = 1
  for (let i = 0; i < total; i++) {
    const angle = -Math.PI / 2 + i * segmentAngle
    ctx.beginPath()
    ctx.moveTo(radius, radius)
    ctx.lineTo(radius + radius * Math.cos(angle), radius + radius * Math.sin(angle))
    ctx.stroke()
  }
}

function DidYouKnowScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pendingWinnerRef = useRef<number | null>(null)

  const [rotation, setRotation] = useState(0)
  const [duration, setDuration] = useState(MIN_DURATION_S)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  const total = wtfFacts.length
  const wheelVisible = result === null

  // הקנבס יוצא מה-DOM לגמרי כשיש תוצאה (ר' render למטה) וחוזר עם "עוד אחת" —
  // בלי זה, הרישום היה קורה פעם אחת בלבד ואז נעלם ריק (שחור) בכל חזרה.
  useEffect(() => {
    if (wheelVisible && canvasRef.current) drawWheel(canvasRef.current, total)
  }, [wheelVisible, total])

  const handleSpin = () => {
    if (spinning) return

    const winner = Math.floor(Math.random() * total)
    const segmentAngle = 360 / total
    const winnerCenter = (winner + 0.5) * segmentAngle
    const requiredAlignment = (360 - winnerCenter + 360) % 360
    const extraSpins =
      MIN_EXTRA_SPINS +
      Math.floor(Math.random() * (MAX_EXTRA_SPINS - MIN_EXTRA_SPINS + 1))

    setRotation((prev) => {
      const catchUp = (requiredAlignment - (prev % 360) + 360) % 360
      return prev + extraSpins * 360 + catchUp
    })
    setDuration(
      MIN_DURATION_S + Math.random() * (MAX_DURATION_S - MIN_DURATION_S),
    )
    pendingWinnerRef.current = winner
    setResult(null)
    setSpinning(true)
  }

  const handleTransitionEnd = () => {
    if (!spinning) return
    setSpinning(false)
    setResult(pendingWinnerRef.current)
  }

  const handleShare = async () => {
    if (result === null) return
    const fact = wtfFacts[result]
    const shareText = `${fact.aba_line}\n\n${fact.factual_text}`
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText, title: 'Aba' })
      } catch {
        // user cancelled
      }
      return
    }
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareText)
      } catch {
        // clipboard unavailable
      }
    }
  }

  const resultFact = result !== null ? wtfFacts[result] : null

  return (
    <div
      className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col items-center gap-5 px-5 pb-24 pt-5 text-[var(--text)]"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {!resultFact && (
        <>
          <div className="relative" style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}>
            <div
              className="absolute left-1/2 top-[-10px] z-10 -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: '16px solid var(--accent)',
              }}
            />
            <canvas
              ref={canvasRef}
              width={WHEEL_SIZE}
              height={WHEEL_SIZE}
              onTransitionEnd={handleTransitionEnd}
              className="rounded-full"
              style={{
                border: '2px solid var(--accent)',
                boxShadow: '0 0 30px rgba(245,158,11,0.15)',
                transform: `rotate(${rotation}deg)`,
                transition: `transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1)`,
              }}
            />
          </div>

          <div className="flex flex-1 flex-col items-center gap-5">
            <header className="text-center">
              <h1 className="text-lg font-bold">הידעת? 🎯</h1>
              <p className="mt-2 text-sm" style={{ color: '#888' }}>
                עובדה אחת מהשבוע שלך. לא חובה לדעת. כן אפשר להשוויץ.
              </p>
            </header>

            <button
              type="button"
              onClick={handleSpin}
              disabled={spinning}
              style={{ minHeight: 44 }}
              className="w-full rounded-full bg-accent py-4 text-lg font-black text-black disabled:opacity-50"
            >
              {spinning ? 'מסתובב...' : 'סובב'}
            </button>
          </div>
        </>
      )}

      {resultFact && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <p
            className="font-black leading-tight text-white"
            style={{ fontSize: 24, fontWeight: 900 }}
          >
            {resultFact.aba_line}
          </p>
          <p style={{ fontSize: 15, color: '#888', marginTop: 12 }}>
            {resultFact.factual_text}
          </p>
          <p style={{ fontSize: 12, color: '#555' }}>{resultFact.source}</p>

          <div className="mt-2 flex w-full gap-2">
            <button
              type="button"
              onClick={handleShare}
              style={{ minHeight: 44, borderColor: 'var(--accent)', color: 'var(--accent)' }}
              className="flex-1 rounded-xl border font-semibold"
            >
              שתף
            </button>
            <button
              type="button"
              onClick={() => setResult(null)}
              style={{ minHeight: 44 }}
              className="flex-1 rounded-xl bg-accent font-semibold text-neutral-950"
            >
              עוד אחת 🎯
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DidYouKnowScreen
