import { tones } from '../content/tones'
import { useUserStore } from '../store/useUserStore'

function ToneSwitcher() {
  const tone = useUserStore((state) => state.tone)
  const setTone = useUserStore((state) => state.setTone)

  return (
    <div className="flex gap-2">
      {tones.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => setTone(t.id)}
          aria-label={t.label}
          aria-pressed={tone === t.id}
          className={`rounded-[20px] px-[14px] py-1 text-[13px] ${
            tone === t.id
              ? 'bg-accent font-bold text-black'
              : 'border border-[#333333] text-[#666666]'
          }`}
        >
          {t.emoji} {t.label}
        </button>
      ))}
    </div>
  )
}

export default ToneSwitcher
