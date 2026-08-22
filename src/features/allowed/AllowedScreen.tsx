import { useState } from 'react'
import { allowedItems } from '../../content/allowed'
import type { AllowedItem, Verdict } from '../../types/content'
import BottomSheet from '../../components/BottomSheet'

const VERDICT_EMOJI: Record<Verdict, string> = {
  green: '🟢',
  yellow: '🟡',
  red: '🔴',
}

const VERDICT_LABEL: Record<Verdict, string> = {
  green: 'מותר',
  yellow: 'תלוי',
  red: 'להימנע',
}

function AllowedScreen() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<AllowedItem | null>(null)

  const filtered = allowedItems.filter((item) =>
    item.item.includes(query.trim()),
  )

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[390px] bg-white pb-24 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <header className="p-4">
        <h1 className="text-xl font-bold">🟢 מותר לה?</h1>
      </header>

      <div className="px-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="חפשי... קפה, סושי, טיסה"
          className="w-full rounded-xl border border-neutral-700 bg-neutral-900 p-3 text-sm text-neutral-100 focus:border-accent focus:outline-none"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 px-4">
        {filtered.map((item) => (
          <button
            key={item.item}
            type="button"
            onClick={() => setSelected(item)}
            className="flex items-start gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-right"
          >
            <span className="text-xl">{VERDICT_EMOJI[item.verdict]}</span>
            <span className="flex flex-col gap-0.5">
              <span className="text-base font-bold">{item.item}</span>
              <span className="text-xs text-neutral-400">{item.short}</span>
            </span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="mt-6 text-center text-sm text-neutral-500">
            לא נמצא כלום
          </p>
        )}
      </div>

      <BottomSheet open={selected !== null} onClose={() => setSelected(null)}>
        {selected && (
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold">{selected.item}</h2>
            <div
              className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-lg font-bold ${
                selected.verdict === 'green'
                  ? 'border-emerald-500/40 bg-emerald-500/10'
                  : selected.verdict === 'yellow'
                    ? 'border-amber-500/40 bg-amber-500/10'
                    : 'border-red-500/40 bg-red-500/10'
              }`}
            >
              <span>{VERDICT_EMOJI[selected.verdict]}</span>
              <span>{VERDICT_LABEL[selected.verdict]}</span>
            </div>
            <p className="italic text-accent">{selected.aba_translation}</p>
            <p className="text-sm text-neutral-300">{selected.short}</p>
          </div>
        )}
      </BottomSheet>
    </div>
  )
}

export default AllowedScreen
