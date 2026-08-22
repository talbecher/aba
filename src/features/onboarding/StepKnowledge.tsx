import { useUserStore } from '../../store/useUserStore'
import type { KnowledgeLevel } from '../../types/user'

interface StepKnowledgeProps {
  onComplete: () => void
}

const options: { level: KnowledgeLevel; emoji: string; label: string }[] = [
  { level: 'beginner', emoji: '🥜', label: 'אין לי מושג' },
  { level: 'medium', emoji: '👍', label: 'בערך' },
  { level: 'pro', emoji: '🧠', label: 'תן לי הכל' },
]

function StepKnowledge({ onComplete }: StepKnowledgeProps) {
  const setKnowledgeLevel = useUserStore((state) => state.setKnowledgeLevel)

  const handleSelect = (level: KnowledgeLevel) => {
    setKnowledgeLevel(level)
    onComplete()
  }

  return (
    <div className="flex h-full flex-col gap-4 p-6 pt-12">
      <h1 className="text-2xl font-bold">כמה אתה בעניינים?</h1>

      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <button
            key={option.level}
            type="button"
            onClick={() => handleSelect(option.level)}
            className="rounded-xl border border-neutral-700 bg-neutral-900 p-4 text-right text-lg font-semibold active:border-accent"
          >
            {option.emoji} {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default StepKnowledge
