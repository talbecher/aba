import type { Tone } from '../types/user'

export interface ToneMeta {
  id: Tone
  emoji: string
  label: string
  description: string
  preview: string
}

export const tones: ToneMeta[] = [
  {
    id: 'bro',
    emoji: '😎',
    label: 'Bro',
    description: "קז'ואל, ישיר",
    preview: 'הבוטן כבר בגודל של קופסת קלפים. 54 קלפים. הוא מחזיק בכולם.',
  },
  {
    id: 'tachles',
    emoji: '🎯',
    label: "תכל'ס",
    description: 'קצר, action-oriented',
    preview: 'שבוע 18. קופסת קלפים. ~14 ס״מ. מתקדמים.',
  },
  {
    id: 'deep',
    emoji: '🧠',
    label: 'Deep',
    description: 'עמוק, מעניין',
    preview:
      'שבוע 18 — הבוטן הגיע לגודל של קופסת קלפים. כל שבוע שעובר — עוד מערכת מתחברת.',
  },
  {
    id: 'doctor',
    emoji: '👨‍⚕️',
    label: 'Doctor',
    description: 'מדויק, מקצועי',
    preview: 'שבוע 18. אורך משוער: 14 ס״מ. התפתחות עוברית תקינה בשלב זה.',
  },
]
