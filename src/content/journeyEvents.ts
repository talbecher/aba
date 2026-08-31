export type JourneyEventType = 'milestone' | 'check' | 'task'
export type JourneyBadge = 'milestone' | 'בדיקה' | 'הכנה' | 'לידה'

export interface JourneyPreparation {
  what: string
  why: string
  prepare: string
  partner: boolean
}

export interface JourneyEvent {
  week: number
  type: JourneyEventType
  title: string
  desc: string
  badge: JourneyBadge
  preparation?: JourneyPreparation
}

export const journeyEvents: JourneyEvent[] = [
  { week: 1, type: 'milestone', title: 'הריון מתחיל', desc: '', badge: 'milestone' },
  {
    week: 6,
    type: 'check',
    title: 'אולטרסאונד ראשון',
    desc: 'הפעם הראשונה שרואים את הבוטן. תבוא.',
    badge: 'בדיקה',
    preparation: {
      what: 'סריקת אולטרסאונד שמאשרת שהריון מתקדם תקין.',
      why: 'לוודא דופק עוברי, מיקום, וגיל הריון.',
      prepare: 'אין הכנה מיוחדת. לבוא עם שאלה אחת מוכנה.',
      partner: true,
    },
  },
  {
    week: 11,
    type: 'check',
    title: 'שקיפות עורפית',
    desc: 'חלון: שבועות 11–13.',
    badge: 'בדיקה',
    preparation: {
      what: 'בדיקת אולטרסאונד שמודדת נוזל בעורף העובר, בשילוב בדיקת דם.',
      why: 'סקר לסיכון לתסמונות כרומוזומליות כמו דאון.',
      prepare: 'לתאם את הבדיקה בחלון הזמן המדויק — שבועות 11–13 בלבד.',
      partner: true,
    },
  },
  { week: 12, type: 'milestone', title: 'סוף טרימסטר ראשון', desc: 'הסיכון יורד. אפשר לבשר.', badge: 'milestone' },
  { week: 16, type: 'task', title: 'להירשם לכיתת לידה', desc: 'מתמלאות מהר.', badge: 'הכנה' },
  {
    week: 20,
    type: 'check',
    title: 'סקירת מחצית',
    desc: 'חלון: שבועות 20–23. 20+ פרמטרים. תבוא.',
    badge: 'בדיקה',
    preparation: {
      what: 'סריקת אולטרסאונד מקיפה שבודקת 20+ פרמטרים אנטומיים.',
      why: 'לוודא שכל האיברים מתפתחים כמו שצריך — מוח, לב, כליות, גפיים.',
      prepare: 'בדיקה ארוכה יחסית (30–60 דקות). לבוא עם סבלנות ושלפוחית לא מלאה מדי.',
      partner: true,
    },
  },
  {
    week: 24,
    type: 'check',
    title: 'בדיקת סוכר הריון',
    desc: 'GDM. שגרתי.',
    badge: 'בדיקה',
    preparation: {
      what: 'בדיקת העמסת סוכר (GTT) לאיתור סכרת הריון.',
      why: 'סכרת הריון לא מאובחנת יכולה להשפיע על התינוק ועל הלידה.',
      prepare: 'בדרך כלל דורשת צום מראש ושהייה של שעה-שעתיים במרפאה.',
      partner: false,
    },
  },
  { week: 28, type: 'milestone', title: 'טרימסטר שלישי מתחיל', desc: 'ביקורים כל שבועיים.', badge: 'milestone' },
  { week: 32, type: 'task', title: 'להתחיל לארוז תיק לידה', desc: 'לא "בקרוב".', badge: 'הכנה' },
  { week: 34, type: 'task', title: 'לבחור חדר לידה', desc: '', badge: 'הכנה' },
  {
    week: 36,
    type: 'check',
    title: 'בדיקת GBS',
    desc: 'לא מחלה. בדיקה.',
    badge: 'בדיקה',
    preparation: {
      what: 'בדיקת מריחה לאיתור חיידק Group B Strep.',
      why: 'אם קיים, נותנים אנטיביוטיקה בזמן הלידה כדי להגן על התינוק.',
      prepare: 'בדיקה מהירה וללא כאב. אין הכנה מיוחדת.',
      partner: false,
    },
  },
  { week: 37, type: 'milestone', title: 'Full Term', desc: 'מוכן.', badge: 'milestone' },
  { week: 40, type: 'milestone', title: 'תאריך לידה משוער', desc: '4-5% נולדים בתאריך המדויק.', badge: 'לידה' },
]

export const TOTAL_PREGNANCY_WEEKS = 40
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000

export function eventDate(dueDate: Date, week: number): Date {
  return new Date(
    dueDate.getTime() - (TOTAL_PREGNANCY_WEEKS - week) * MS_PER_WEEK,
  )
}
