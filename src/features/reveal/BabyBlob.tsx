import { useEffect, useState } from 'react'

const MAX_CM = 51 // שבוע 40
const MAX_PX = 200 // גודל מקסימלי על המסך
const GROW_DELAY_MS = 400

interface BabyBlobProps {
  sizeCm: number
  animate: boolean
}

function BabyBlob({ sizeCm, animate }: BabyBlobProps) {
  const targetPx = Math.max(16, (sizeCm / MAX_CM) * MAX_PX)
  const [px, setPx] = useState(animate ? 16 : targetPx)

  useEffect(() => {
    if (!animate) {
      setPx(targetPx)
      return
    }
    setPx(16)
    const t = setTimeout(() => setPx(targetPx), GROW_DELAY_MS)
    return () => clearTimeout(t)
  }, [animate, targetPx])

  return (
    <div
      style={{
        width: px,
        height: px,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #FFD584, #F59E0B 45%, #C67C00 100%)',
        boxShadow: '0 0 60px rgba(245,158,11,0.4), inset -8px -8px 24px rgba(0,0,0,0.2)',
        transition: animate
          ? 'width 1.2s cubic-bezier(.34,1.1,.5,1), height 1.2s cubic-bezier(.34,1.1,.5,1)'
          : 'none',
        animation: 'blobPulse 3s ease-in-out infinite',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '22%',
          width: '25%',
          height: '25%',
          background: 'rgba(255,255,255,0.35)',
          borderRadius: '50%',
          filter: 'blur(3px)',
        }}
      />
    </div>
  )
}

export default BabyBlob
