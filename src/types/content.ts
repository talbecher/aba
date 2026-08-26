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
}

export interface WeekSection extends ToneVariants {
  factual_text: string
}

export interface WeekData {
  week: number
  whats_happening: WeekSection
  she_feels: WeekSection
  dad_tip: WeekSection
  wtf_fact: WeekSection
  coming_next: string
  severity: Severity
}

export type Verdict = 'green' | 'yellow' | 'red'

export type AllowedCategory =
  | 'fish'
  | 'cheese'
  | 'meat'
  | 'drinks'
  | 'eggs'
  | 'exercise'
  | 'travel'
  | 'beauty'
  | 'medicine'
  | 'other'

export interface AllowedItem {
  verdict: Verdict
  item: string
  emoji: string
  short: string
  aba_translation: string
  category: AllowedCategory
  dad_action: string
}

export interface DictionaryTerm {
  term: string
  plain: string
  aba_translation: string
  dad_action: string
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
