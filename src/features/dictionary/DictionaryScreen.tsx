import { useState } from 'react'
import { dictionaryTerms } from '../../content/dictionary'
import type { DictionaryTerm } from '../../types/content'
import BottomSheet from '../../components/BottomSheet'

function DictionaryScreen() {
  const [selected, setSelected] = useState<DictionaryTerm | null>(null)

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[390px] bg-white pb-24 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <header className="p-4">
        <h1 className="text-xl font-bold">📖 מה הרופא אמר?</h1>
      </header>

      <div className="flex flex-col gap-2 px-4">
        {dictionaryTerms.map((term) => (
          <button
            key={term.term}
            type="button"
            onClick={() => setSelected(term)}
            className="flex flex-col gap-0.5 rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-right"
          >
            <span className="text-base font-bold">{term.term}</span>
            <span className="text-xs text-neutral-400">{term.plain}</span>
          </button>
        ))}
      </div>

      <BottomSheet open={selected !== null} onClose={() => setSelected(null)}>
        {selected && (
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold">{selected.term}</h2>
            <p className="text-sm text-neutral-300">{selected.plain}</p>
            <p className="text-lg font-semibold text-accent">
              {selected.aba_translation}
            </p>
          </div>
        )}
      </BottomSheet>
    </div>
  )
}

export default DictionaryScreen
