import { forwardRef } from 'react'

interface ShareCardProps {
  week: number
  emoji: string
  sizeItem: string
  sizePunchline: string
  sizeDisplay: string
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ week, emoji, sizeItem, sizePunchline, sizeDisplay }, ref) => {
    return (
      <div
        ref={ref}
        dir="rtl"
        style={{
          width: 400,
          height: 560,
          backgroundColor: '#1A1A1A',
          color: '#FFFFFF',
        }}
        className="flex flex-col items-center justify-center gap-3 p-8 text-center"
      >
        <h1 className="text-2xl font-extrabold tracking-wide">Aba</h1>

        <p className="mt-4 text-lg" style={{ color: '#D4D4D4' }}>
          שבוע {week}
        </p>

        <div className="my-2 text-[80px] leading-none" aria-hidden="true">
          {emoji}
        </div>

        <h2 className="text-2xl font-extrabold" style={{ color: '#F59E0B' }}>
          {sizeItem}
        </h2>
        <p className="text-sm italic" style={{ color: '#A3A3A3' }}>
          {sizePunchline}
        </p>

        <span className="mt-2 text-lg font-semibold">{sizeDisplay}</span>
      </div>
    )
  },
)

ShareCard.displayName = 'ShareCard'

export default ShareCard
