export type JourneyEventType = 'milestone' | 'check' | 'task'
export type JourneyBadge = 'milestone' | 'בדיקה' | 'הכנה' | 'לידה'

export interface JourneyPreparation {
  what: string
  why: string
  prepare: string
  partner: boolean
  window?: string
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
      what: 'בדיקת אולטרסאונד שמודדת נוזל בעורף הבוטן.',
      why: 'משמשת להערכת סיכון לתסמונת דאון ומצבים כרומוזומליים אחרים. לא מאבחנת — רק מעריכה סיכון.',
      prepare: 'אין הכנה מיוחדת. לבוא עם שאלה אחת מוכנה.',
      partner: true,
      window: 'שבועות 11–13 בלבד. מעבר לכך — הבדיקה כבר לא תקפה.',
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
      what: 'אולטרסאונד מפורט שבודק 20+ פרמטרים אנטומיים של הבוטן.',
      why: 'לוודא שהתפתחות הבוטן תקינה — לב, מוח, עמוד שדרה, גפיים, שלייה, מי שפיר.',
      prepare: 'הכן שאלה אחת מראש. הבדיקה ארוכה — לקחת מים.',
      partner: true,
      window: 'שבועות 20–23. לתאם מראש כי מתמלאת מהר.',
    },
  },
  {
    week: 24,
    type: 'check',
    title: 'בדיקת סוכר הריון',
    desc: 'GDM. שגרתי.',
    badge: 'בדיקה',
    preparation: {
      what: 'בדיקת דם שבודקת כיצד הגוף מעבד סוכר — לאיתור סכרת הריון (GDM).',
      why: 'סכרת הריון שכיחה ודורשת מעקב. רוב הנשים עוברות אותה בהצלחה עם תזונה מותאמת.',
      prepare: 'היא צריכה לשתות תמיסת סוכר ולחכות שעה. לא להגיע רעבה.',
      partner: false,
      window: 'שבועות 24–28.',
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
      what: 'בדיקת סוואב לאיתור חיידק סטרפטוקוקוס B.',
      why: 'לא מחלה — חיידק שכיח. אם חיובי, תקבל אנטיביוטיקה בלידה להגנה על הנבון.',
      prepare: 'בדיקה פשוטה ומהירה. לא מכאיבה.',
      partner: false,
      window: 'שבועות 36–37.',
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
