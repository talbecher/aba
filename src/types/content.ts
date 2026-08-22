export type Severity = 0 | 1 | 2 | 3

export interface ToneVariants {
  bro: string
  tachles: string
  deep: string
  doctor: string
}

export interface WeekOverview {
  week: number
  size_item: string
  size_punchline: string
  size_value: string
  size_display: string
  emoji: string
  severity: Severity
  tone_variants: ToneVariants
}

export interface Fact {
  id: string
  week: number
  category: string
  factual_text: string
  severity: Severity
  source: string | null
  tone_variants: ToneVariants
}

export interface Action {
  id: string
  week: number
  factual_text: string
  severity: Severity
  tone_variants: ToneVariants
}

export interface WowFact {
  id: string
  week: number
  factual_text: string
  severity: Severity
  source: string | null
  tone_variants: ToneVariants
}

export interface RedFlag {
  id: string
  week: number
  factual_text: string
  severity: Severity
  neutral_text: string
}

export type Verdict = 'green' | 'yellow' | 'red'

export interface AllowedItem {
  verdict: Verdict
  item: string
  short: string
  aba_translation: string
}

export interface DictionaryTerm {
  term: string
  plain: string
  aba_translation: string
}

export interface SizeComparison {
  week: number
  size_item: string
  size_punchline: string
  size_value: string
  size_display: string
  size_disclaimer: string
  emoji: string
}

export type SosClass = 'couple' | 'medical'

export interface SosItem {
  id: string
  class: SosClass
  emoji: string
  label: string
  severity: Severity
  answer?: string
  answer_variants?: ToneVariants
  actions?: string[]
}
