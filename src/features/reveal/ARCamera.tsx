import { useEffect, useRef, useState } from 'react'

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

  const snap = () => {
    const flash = document.getElementById('ar-flash') ?? document.querySelector('.ar-flash')
    if (flash instanceof HTMLElement) {
      flash.style.opacity = '1'
      setTimeout(() => {
        flash.style.opacity = '0'
      }, 150)
    } else {
      const video = videoRef.current
      if (video) {
        video.style.filter = 'brightness(3)'
        setTimeout(() => {
          video.style.filter = ''
        }, 150)
      }
    }

    navigator.vibrate?.(50)
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

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col overflow-hidden"
      style={{ backgroundColor: '#000' }}
    >
      <div
        id="ar-flash"
        className="ar-flash pointer-events-none"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#fff',
          opacity: 0,
          transition: 'opacity 0.15s',
          zIndex: 9999,
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
        className="absolute inset-x-0 top-0 flex items-start justify-between px-5 pb-8 pt-5"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)' }}
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

      {/* סילואט מרכזי */}
      <div className="flex flex-1 items-center justify-center">
        <svg width={shape.width} height={shape.height} style={{ overflow: 'visible' }}>
          <rect
            x={0}
            y={0}
            width={shape.width}
            height={shape.height}
            rx={shape.rx}
            ry={shape.rx}
            fill="rgba(245,158,11,0.06)"
            stroke="#F59E0B"
            strokeWidth={2}
            strokeDasharray="8 4"
          />
        </svg>
      </div>

      {/* HUD תחתון */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-5 pb-8 pt-10"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <p style={{ fontSize: 14, color: '#ddd' }}>כוון ליד חפץ בבית ותצלם</p>
        </div>

        <div className="flex w-full items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleShare}
            style={{
              minHeight: 44,
              border: '1px solid #F59E0B',
              color: '#F59E0B',
              borderRadius: 50,
              padding: '10px 20px',
            }}
            className="text-sm font-semibold"
          >
            שתף 🚀
          </button>
          <button
            type="button"
            onClick={snap}
            aria-label="צלם"
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: '#F59E0B',
            }}
            className="flex items-center justify-center text-2xl"
          >
            📷
          </button>
        </div>
      </div>
    </div>
  )
}

export default ARCamera
