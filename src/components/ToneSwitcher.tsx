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
          className={`flex h-9 w-9 items-center justify-center rounded-full border text-lg ${
            tone === t.id
              ? 'border-accent bg-accent/10'
              : 'border-neutral-700 bg-neutral-900'
          }`}
        >
          {t.emoji}
        </button>
      ))}
    </div>
  )
}

export default ToneSwitcher
