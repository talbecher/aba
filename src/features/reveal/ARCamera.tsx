import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const PX_PER_CM = 37.8

interface ARCameraProps {
  week: number
  name: string
  size_cm: number
  weight: string
  punch: string
  onClose: () => void
}

function shapeFor(size_cm: number): { width: number; height: number; rx: number } {
  const px = size_cm * PX_PER_CM

  if (size_cm < 2) {
    // עיגול
    const d = Math.max(px, 24)
    return { width: d, height: d, rx: d / 2 }
  }
  if (size_cm < 6) {
    // מלבן אנכי (גלולה/קפסולה)
    return { width: Math.max(px * 0.45, 28), height: px, rx: px * 0.22 }
  }
  if (size_cm < 12) {
    // מלבן אופקי (כרטיס/קופסה)
    return { width: px, height: px * 0.62, rx: 14 }
  }
  if (size_cm < 25) {
    // מלבן גדול
    return { width: px * 0.72, height: px, rx: 18 }
  }
  // מלבן גדול מאוד
  return { width: px * 0.6, height: px, rx: 22 }
}

function ARCamera({ week, name, size_cm, weight, punch, onClose }: ARCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [cameraFailed, setCameraFailed] = useState(false)
  const [flashing, setFlashing] = useState(false)
  const [captureStatus, setCaptureStatus] = useState<'idle' | 'working' | 'saved' | 'error'>('idle')

  useEffect(() => {
    let cancelled = false

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        })
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch {
        if (!cancelled) setCameraFailed(true)
      }
    }

    startCamera()

    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }, [])

  const handleClose = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    onClose()
  }

  const handleSnap = () => {
    setFlashing(true)
    setTimeout(() => setFlashing(false), 150)
    navigator.vibrate?.(50)
    void capturePhoto()
  }

  const capturePhoto = async () => {
    setCaptureStatus('working')
    try {
      const cw = window.innerWidth
      const ch = window.innerHeight
      const canvas = document.createElement('canvas')
      canvas.width = cw
      canvas.height = ch
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('no 2d context')

      // רקע — פריים נוכחי מהמצלמה (או רקע דמו אם אין הרשאה)
      const video = videoRef.current
      if (!cameraFailed && video && video.videoWidth) {
        const scale = Math.max(cw / video.videoWidth, ch / video.videoHeight)
        const dw = video.videoWidth * scale
        const dh = video.videoHeight * scale
        ctx.drawImage(video, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
      } else {
        ctx.fillStyle = '#2a2a2a'
        ctx.fillRect(0, 0, cw, ch)
      }

      // סילואט — במרכז, כמו שמוצג על המסך (הילה לבנה + קו כתום מלא, לניגודיות)
      const sx = (cw - shape.width) / 2
      const sy = (ch - shape.height) / 2
      const drawSilhouette = () => {
        if (typeof ctx.roundRect === 'function') {
          ctx.beginPath()
          ctx.roundRect(sx, sy, shape.width, shape.height, shape.rx)
        } else {
          ctx.rect(sx, sy, shape.width, shape.height)
        }
      }

      ctx.save()
      ctx.fillStyle = 'rgba(245,158,11,0.22)'
      ctx.strokeStyle = 'rgba(255,255,255,0.9)'
      ctx.lineWidth = 9
      drawSilhouette()
      ctx.fill()
      ctx.stroke()

      ctx.strokeStyle = '#F59E0B'
      ctx.lineWidth = 5
      drawSilhouette()
      ctx.stroke()
      ctx.restore()

      // HUD טקסט — שבוע, שם, גודל
      const sizeDisplay = size_cm < 1 ? `${(size_cm * 10).toFixed(1)} מ"מ` : `${size_cm} ס"מ`
      ctx.textAlign = 'right'
      ctx.textBaseline = 'top'
      ctx.fillStyle = '#F59E0B'
      ctx.font = 'bold 20px sans-serif'
      ctx.fillText(`שבוע ${week}`, cw - 24, 40)
      ctx.fillStyle = '#fff'
      ctx.font = '900 32px sans-serif'
      ctx.fillText(name, cw - 24, 68)
      ctx.fillStyle = '#F59E0B'
      ctx.font = '600 22px sans-serif'
      ctx.fillText(`${sizeDisplay} · ${weight}`, cw - 24, 108)

      ctx.textAlign = 'center'
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 22px sans-serif'
      ctx.fillText('Aba 🥜', cw / 2, ch - 40)

      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/png'),
      )
      if (!blob) throw new Error('canvas.toBlob returned null')

      const file = new File([blob], `aba-week-${week}.png`, { type: 'image/png' })
      const shareText = `שבוע ${week}\n${name}\n${punch}\n${sizeDisplay}\n\nAba 🥜`

      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: shareText })
          setCaptureStatus('saved')
          return
        } catch {
          // המשתמש ביטל את חלון השיתוף — לא שגיאה.
          setCaptureStatus('idle')
          return
        }
      }

      // אין תמיכה בשיתוף קבצים — מורידים את התמונה למכשיר.
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `aba-week-${week}.png`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      setCaptureStatus('saved')
    } catch {
      setCaptureStatus('error')
    } finally {
      setTimeout(() => setCaptureStatus('idle'), 2000)
    }
  }

  const handleShare = async () => {
    const sizeDisplay = size_cm < 1 ? `${(size_cm * 10).toFixed(1)} מ"מ` : `${size_cm} ס"מ`
    const text = `שבוע ${week}\n${name}\n${punch}\n${sizeDisplay}\n\nAba 🥜`

    if (navigator.share) {
      try {
        await navigator.share({ text })
      } catch {
        // המשתמש ביטל את השיתוף — לא עושים כלום.
      }
      return
    }
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // אין תמיכה — לא עושים כלום.
    }
  }

  const shape = shapeFor(size_cm)

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ backgroundColor: '#000', height: '100dvh' }}
    >
      <div
        id="ar-flash"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'white',
          opacity: flashing ? 1 : 0,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: flashing ? 'none' : 'opacity 0.15s',
        }}
      />

      {!cameraFailed ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{ backgroundColor: '#2a2a2a' }}
        >
          <p style={{ fontSize: 13, color: '#888' }}>אין גישה למצלמה</p>
          <p style={{ fontSize: 11, color: '#555' }}>תצוגת דמו</p>
        </div>
      )}

      {/* HUD עליון */}
      <div
        className="absolute inset-x-0 top-0 flex items-start justify-between px-5 pb-8"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)',
          paddingTop: 'max(20px, env(safe-area-inset-top))',
        }}
      >
        <div className="flex flex-col gap-0.5">
          <p style={{ fontSize: 11, color: '#F59E0B', fontWeight: 700 }}>שבוע {week}</p>
          <p style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>{name}</p>
          <p style={{ fontSize: 13, color: '#F59E0B' }}>
            {size_cm < 1 ? `${(size_cm * 10).toFixed(1)} מ"מ` : `${size_cm} ס"מ`} · {weight}
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="סגור"
          style={{ minHeight: 44, minWidth: 44, color: '#fff' }}
          className="flex items-center justify-center text-2xl"
        >
          ✕
        </button>
      </div>

      {/* סילואט מרכזי — קנה מידה אמיתי, עלול לחרוג מגבולות המסך אצל שבועות מאוחרים */}
      <div
        className="relative z-10 flex flex-1 items-center justify-center"
        style={{ pointerEvents: 'none' }}
      >
        <svg width={shape.width} height={shape.height} style={{ overflow: 'visible' }}>
          {/* הילה לבנה לניגודיות מול כל רקע */}
          <rect
            x={0}
            y={0}
            width={shape.width}
            height={shape.height}
            rx={shape.rx}
            ry={shape.rx}
            fill="rgba(245,158,11,0.22)"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth={9}
          />
          {/* קו כתום מלא */}
          <rect
            x={0}
            y={0}
            width={shape.width}
            height={shape.height}
            rx={shape.rx}
            ry={shape.rx}
            fill="none"
            stroke="#F59E0B"
            strokeWidth={5}
          />
        </svg>
      </div>

      {(shape.height > window.innerHeight || shape.width > window.innerWidth) && (
        <p
          className="pointer-events-none absolute inset-x-0 z-10 text-center"
          style={{ top: 130, fontSize: 12, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
        >
          זה בקנה מידה אמיתי — התרחקו כדי לראות את כל הצורה
        </p>
      )}

      {/* HUD תחתון */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-5 pt-10"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
          paddingBottom: 'max(32px, calc(env(safe-area-inset-bottom) + 24px))',
        }}
      >
        <div className="flex flex-col items-center gap-1 text-center" style={{ minHeight: 20 }}>
          {captureStatus === 'idle' && (
            <p style={{ fontSize: 14, color: '#ddd' }}>כוון ליד חפץ בבית ותצלם</p>
          )}
          {captureStatus === 'working' && (
            <p style={{ fontSize: 14, color: '#F59E0B', fontWeight: 700 }}>שומר תמונה…</p>
          )}
          {captureStatus === 'saved' && (
            <p style={{ fontSize: 14, color: 'var(--color-success)', fontWeight: 700 }}>✓ נשמר</p>
          )}
          {captureStatus === 'error' && (
            <p style={{ fontSize: 14, color: 'var(--color-danger)', fontWeight: 700 }}>
              לא הצלחנו לשמור. נסו שוב.
            </p>
          )}
        </div>

        <div className="relative flex w-full items-center justify-center gap-4" style={{ zIndex: 10000 }}>
          <button
            type="button"
            onClick={handleShare}
            style={{
              minHeight: 44,
              border: '1px solid #F59E0B',
              color: '#F59E0B',
              borderRadius: 50,
              padding: '10px 20px',
              touchAction: 'manipulation',
            }}
            className="text-sm font-semibold"
          >
            שתף 🚀
          </button>
          <button
            type="button"
            onClick={handleSnap}
            onTouchEnd={(e) => {
              e.preventDefault()
              handleSnap()
            }}
            aria-label="צלם"
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: '#F59E0B',
              touchAction: 'manipulation',
            }}
            className="flex items-center justify-center text-2xl"
          >
            📷
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default ARCamera
