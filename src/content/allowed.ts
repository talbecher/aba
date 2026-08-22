import type { AllowedItem } from '../types/content'

export const allowedItems: AllowedItem[] = [
  {
    verdict: 'yellow',
    item: 'קפה',
    short: 'עד כ-200 מ"ג קפאין ביום',
    aba_translation: 'אפשר. פשוט לא להפוך את ההריון לתחנת דלק של אספרסו.',
  },
  {
    verdict: 'yellow',
    item: 'סושי',
    short: 'דג מבושל — כן. נא — להימנע',
    aba_translation: 'הסשימי נשאר לאחרי הלידה.',
  },
  {
    verdict: 'yellow',
    item: 'טונה',
    short: 'לא כל יום. כמויות קטנות בסדר',
    aba_translation: 'קצת טונה — בסדר. קנטינה של טונה — לא.',
  },
  {
    verdict: 'yellow',
    item: 'גבינות רכות',
    short: 'פסטוריזציה = בסדר',
    aba_translation: 'תבדוק את התווית. פסטוריזציה — כן. לא מפוסטרת — לא.',
  },
  {
    verdict: 'yellow',
    item: 'לצבוע שיער',
    short: 'טרימסטר שני ושלישי — לרוב בסדר',
    aba_translation: 'טרימסטר ראשון — להיוועץ. אחרי זה — בדרך כלל אפשר.',
  },
  {
    verdict: 'green',
    item: 'חדר כושר',
    short: 'פעילות מתונה — מומלצת',
    aba_translation: 'ללכת. לא להרים ספסל.',
  },
  {
    verdict: 'green',
    item: 'שחייה',
    short: 'אחת הפעילויות הכי מומלצות',
    aba_translation: 'הפעילות הכי טובה שיש. ברצינות.',
  },
  {
    verdict: 'yellow',
    item: 'לטוס',
    short: 'עד שבוע 36 — לרוב בסדר',
    aba_translation: 'תבדוק עם חברת התעופה. הם לפעמים דורשים אישור רופא.',
  },
  {
    verdict: 'yellow',
    item: 'עיסוי',
    short: 'מעסה מוסמך להריון — כן',
    aba_translation: 'לא כל עיסוי. מעסה שיודע מה הוא עושה.',
  },
  {
    verdict: 'green',
    item: 'סקס',
    short: 'בהריון תקין — לרוב בסדר',
    aba_translation: 'כן — אלא אם הרופא אמר אחרת.',
  },
  {
    verdict: 'red',
    item: "ג'קוזי",
    short: 'טמפרטורה גבוהה — לא מומלצת',
    aba_translation: 'חם מדי. לא עכשיו.',
  },
  {
    verdict: 'red',
    item: 'אלכוהול',
    short: 'אין כמות בטוחה מוכחת',
    aba_translation: 'אין כמות בטוחה. זה הגבול הכי ברור שיש.',
  },
  {
    verdict: 'red',
    item: 'ארגז חול חתול',
    short: 'סיכון לטוקסופלזמה',
    aba_translation: 'המשימה הזו עוברת אליך. לא משא ומתן.',
  },
  {
    verdict: 'yellow',
    item: 'תרופות OTC',
    short: 'פרצטמול — לרוב בסדר. שאר — לבדוק',
    aba_translation: 'פרצטמול — בדרך כלל אפשר. כל שאר — שאלה לרופא.',
  },
  {
    verdict: 'yellow',
    item: 'צום',
    short: 'קצר — לרוב לא מסכן. ממושך — להיוועץ',
    aba_translation: 'צום קצר — בדרך כלל בסדר. ממושך — שאלה לרופא.',
  },
]
