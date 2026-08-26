export type EventType = 'medical' | 'milestone' | 'action'

export interface TimelineEvent {
  week: number
  type: EventType
  title: string
  icon: string
  description: string
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  // טרימסטר ראשון
  {
    week: 4,
    type: 'milestone',
    title: 'בדיקת הריון ראשונה',
    icon: '✅',
    description: 'אישור רשמי שההריון בתהליך. HCG מזוהה בבדיקה.',
  },
  {
    week: 6,
    type: 'medical',
    title: 'אולטרסאונד ראשון',
    icon: '🩺',
    description: 'בדיקה שמאשרת דופק לב ומיקום תקין ברחם.',
  },
  {
    week: 8,
    type: 'milestone',
    title: 'כל האיברים הראשיים קיימים',
    icon: '🥜',
    description: 'מרבית המערכות כבר נוצרו וממשיכות להתפתח.',
  },
  {
    week: 10,
    type: 'action',
    title: 'להתחיל לחפש גינקולוג/ית',
    icon: '👩‍⚕️',
    description: 'כדאי לסגור מעקב הריון קבוע מוקדם.',
  },
  {
    week: 11,
    type: 'medical',
    title: 'בדיקת שקיפות עורפית (NT)',
    icon: '🩺',
    description: 'סקר לסיכון לתסמונות כרומוזומליות.',
  },
  {
    week: 12,
    type: 'milestone',
    title: '🎉 סוף טרימסטר ראשון',
    icon: '🎉',
    description: 'הסיכון להפלה יורד משמעותית מכאן.',
  },
  {
    week: 13,
    type: 'action',
    title: 'זמן לבשר לסביבה',
    icon: '📣',
    description: 'רוב הזוגות משתפים אחרי טרימסטר ראשון.',
  },
  // טרימסטר שני
  {
    week: 14,
    type: 'action',
    title: 'להתחיל לחפש כיתת לידה',
    icon: '📚',
    description: 'כיתות טובות מתמלאות מראש, כדאי להקדים.',
  },
  {
    week: 16,
    type: 'milestone',
    title: 'הבוטן שומע אותך',
    icon: '👂',
    description: 'מערכת השמיעה מתחילה לקלוט צלילים.',
  },
  {
    week: 16,
    type: 'medical',
    title: 'בדיקת AFP / Triple test',
    icon: '🩺',
    description: 'בדיקת דם סקר נוספת לתקינות ההריון.',
  },
  {
    week: 18,
    type: 'milestone',
    title: 'טביעות אצבע נקבעות',
    icon: '🥜',
    description: 'התבנית הייחודית שלו נחתמת ולא תשתנה.',
  },
  {
    week: 20,
    type: 'medical',
    title: '🩺 סקירת מחצית',
    icon: '🩺',
    description: 'בדיקת האולטרסאונד המקיפה ביותר בהריון.',
  },
  {
    week: 20,
    type: 'milestone',
    title: 'אמצע הדרך',
    icon: '⭐',
    description: 'חצי מהדרך כבר מאחוריכם.',
  },
  {
    week: 22,
    type: 'action',
    title: 'להתחיל לחקור חדרי לידה',
    icon: '🏥',
    description: 'כדאי להשוות בתי חולים מראש.',
  },
  {
    week: 24,
    type: 'milestone',
    title: 'שבוע החיות — Viability',
    icon: '💪',
    description: 'מרגע זה יש סיכוי הישרדות מחוץ לרחם.',
  },
  {
    week: 24,
    type: 'medical',
    title: 'בדיקת סוכר הריון (GDM)',
    icon: '🩺',
    description: 'בדיקת העמסת סוכר לאיתור סכרת הריון.',
  },
  {
    week: 26,
    type: 'milestone',
    title: 'עיניים נפתחות לראשונה',
    icon: '👁️',
    description: 'העפעפיים שהיו סגורים נפתחים.',
  },
  {
    week: 26,
    type: 'action',
    title: 'לקבוע כיתת לידה',
    icon: '📚',
    description: 'זמן טוב לסגור מועדים סופיים.',
  },
  {
    week: 28,
    type: 'milestone',
    title: '🎈 טרימסטר שלישי מתחיל',
    icon: '🎈',
    description: 'השליש האחרון והמכריע מתחיל.',
  },
  {
    week: 28,
    type: 'action',
    title: 'ביקורים כל שבועיים מכאן',
    icon: '📅',
    description: 'תדירות המעקב הרפואי עולה.',
  },
  // טרימסטר שלישי
  {
    week: 30,
    type: 'action',
    title: 'לבחור חדר לידה',
    icon: '🏥',
    description: 'כדאי לסגור החלטה ולתאם ביקור.',
  },
  {
    week: 32,
    type: 'action',
    title: 'להתחיל לארוז תיק לידה',
    icon: '🎒',
    description: 'עדיף לא לחכות לרגע האחרון.',
  },
  {
    week: 34,
    type: 'milestone',
    title: 'ריאות כמעט בשלות',
    icon: '💨',
    description: 'מערכת הנשימה כמעט מוכנה לעולם החוץ.',
  },
  {
    week: 35,
    type: 'action',
    title: 'תיק לידה: לסיים',
    icon: '🎒',
    description: 'מהשבוע הזה הלידה יכולה להתחיל בכל רגע.',
  },
  {
    week: 36,
    type: 'medical',
    title: 'בדיקת GBS',
    icon: '🩺',
    description: 'בדיקה לחיידק שיכול להשפיע על הלידה.',
  },
  {
    week: 36,
    type: 'milestone',
    title: 'Early Term',
    icon: '⭐',
    description: 'התינוק נחשב כמעט מוכן ללידה.',
  },
  {
    week: 36,
    type: 'action',
    title: 'ביקורים כל שבוע מכאן',
    icon: '📅',
    description: 'המעקב הרפואי מתהדק לקראת הסוף.',
  },
  {
    week: 37,
    type: 'milestone',
    title: 'Full Term ✅',
    icon: '✅',
    description: 'ההריון נחשב מלא. הלידה יכולה לקרות בכל עת.',
  },
  {
    week: 38,
    type: 'action',
    title: 'לחזור על סימני לידה',
    icon: '📝',
    description: 'טוב לרענן מתי לצאת לבית החולים.',
  },
  {
    week: 40,
    type: 'milestone',
    title: '👶 תאריך לידה משוער',
    icon: '👶',
    description: 'היעד. רק 5% נולדים בדיוק בתאריך.',
  },
]

export const TOTAL_PREGNANCY_WEEKS = 40
export const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000
export const MS_PER_DAY = 24 * 60 * 60 * 1000

export function eventDate(dueDate: Date, week: number): Date {
  return new Date(
    dueDate.getTime() - (TOTAL_PREGNANCY_WEEKS - week) * MS_PER_WEEK,
  )
}
