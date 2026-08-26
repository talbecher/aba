import { useEffect, useRef, useState } from 'react'
import { wtfFacts } from '../../content/wtf-facts'

const WHEEL_SIZE = 280
const MIN_EXTRA_SPINS = 4
const MAX_EXTRA_SPINS = 6
const MIN_DURATION_S = 3
const MAX_DURATION_S = 4

function colorForIndex(index: number, total: number): string {
  const hue = Math.round((index / total) * 360)
  return `hsl(${hue}, 70%, 50%)`
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
    ctx.fillStyle = colorForIndex(i, total)
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

  useEffect(() => {
    if (canvasRef.current) drawWheel(canvasRef.current, total)
  }, [total])

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
      <header>
        <h1 className="text-lg font-bold">🎯 ידעת?</h1>
      </header>

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

      <button
        type="button"
        onClick={handleSpin}
        disabled={spinning}
        className="w-full rounded-full bg-accent py-4 text-lg font-black text-black disabled:opacity-50"
      >
        {spinning ? 'מסתובב...' : '⚡ סובב'}
      </button>

      {resultFact && (
        <div
          className="w-full rounded-2xl p-6 text-center"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '2px solid var(--accent)',
          }}
        >
          <p className="text-[20px] font-black leading-tight text-white">
            {resultFact.aba_line}
          </p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: '#888888' }}>
            {resultFact.factual_text}
          </p>
          <p className="mt-3 text-[12px]" style={{ color: '#555555' }}>
            {resultFact.source}
          </p>
          <button
            type="button"
            onClick={handleShare}
            className="mt-4 rounded-full border border-accent/40 px-4 py-2 text-sm font-semibold text-accent"
          >
            🔗 שתף
          </button>
        </div>
      )}
    </div>
  )
}

export default DidYouKnowScreen
