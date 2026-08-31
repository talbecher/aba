export interface Task {
  id: string
  week_start: number
  week_end: number
  title: string
  description: string
}

export const tasks: Task[] = [
  { id: 't001', week_start: 1, week_end: 12, title: 'קרקרים ליד המיטה', description: 'תקנה קרקרים יבשים ותשים אותם בצד המיטה שלה. עכשיו.' },
  { id: 't002', week_start: 1, week_end: 12, title: 'הוצא ריחות חזקים', description: 'בשמים, ניקויים, בשר — אם ריח חזק, מחוץ לבית.' },
  { id: 't003', week_start: 1, week_end: 12, title: 'שאל אחת בלבד', description: 'שאל "מה אני יכול לעשות עכשיו?" תחכה לתשובה.' },
  { id: 't004', week_start: 4, week_end: 10, title: 'למד על בחילות הריון', description: 'קרא 10 דקות על NVP. תבין למה זה לא בראש שלה.' },
  { id: 't005', week_start: 6, week_end: 10, title: 'תבוא לאולטרסאונד', description: 'לא "אם אפשר". תסדר את הלו"ז ותבוא.' },
  { id: 't006', week_start: 1, week_end: 12, title: 'קנה כרית הריון', description: 'U-shape. תזמין עכשיו. ישנה טוב יותר = מתנהגת טוב יותר.' },
  { id: 't007', week_start: 8, week_end: 13, title: 'ארוחה בחוץ', description: 'הבחילות מתחילות לסגת? תציע ארוחה בחוץ.' },
  { id: 't008', week_start: 10, week_end: 16, title: 'חפש כיתת לידה', description: 'תחפש כיתות לידה באזורכם. מתמלאות מהר.' },
  { id: 't009', week_start: 12, week_end: 14, title: 'תחליט מתי מבשרים', description: 'שניכם מחליטים יחד. לא המשפחה.' },
  { id: 't010', week_start: 16, week_end: 22, title: 'דבר אל הבטן', description: 'מרגיש מוזר? בסדר. הוא שומע אותך מסביבות שבוע 16.' },
  { id: 't011', week_start: 18, week_end: 21, title: 'וודא תור סקירת מחצית', description: 'תפתח יומן. תוודא שיש תור. תרשום שאלה אחת.' },
  { id: 't012', week_start: 14, week_end: 26, title: 'יד על הבטן', description: 'אחרי ארוחת ערב — יד על הבטן, 5 דקות, שקט.' },
  { id: 't013', week_start: 14, week_end: 26, title: 'טיול זוגי', description: 'T2 הוא הנוח ביותר. תתכנן לילה אחד בחוץ.' },
  { id: 't014', week_start: 20, week_end: 28, title: 'חקר חדרי לידה', description: 'תבקרו בשניים-שלושה. תשאלו שאלות.' },
  { id: 't015', week_start: 13, week_end: 26, title: 'הליכה משותפת', description: '20-30 דקות אחרי ארוחה. טוב לה, לבוטן, ולכם.' },
  { id: 't016', week_start: 22, week_end: 28, title: 'רשימת ציוד', description: 'לא לקנות עדיין. רק לדעת מה צריך.' },
  { id: 't017', week_start: 13, week_end: 26, title: 'ערב בלי הריון', description: 'פעם בשבוע — לא לדבר על הריון. סרט, ארוחה.' },
  { id: 't018', week_start: 20, week_end: 26, title: 'שמור מספר גינקולוג', description: 'לא לחפש כשזה קורה. שמור עכשיו.' },
  { id: 't019', week_start: 27, week_end: 35, title: 'ארוז תיק לידה', description: 'לא "בקרוב". עד שבוע 35. תעשה את זה עכשיו.' },
  { id: 't020', week_start: 27, week_end: 38, title: 'למד את הדרך', description: 'כולל חניה. כולל כניסה. כולל שעה שלוש בלילה.' },
  { id: 't021', week_start: 27, week_end: 40, title: 'שנן סימני לידה', description: 'צירים כל 5 דקות / שבירת מים / דימום = יוצאים.' },
  { id: 't022', week_start: 30, week_end: 40, title: 'אל תשאל "מתי כבר"', description: 'היא יודעת. היא מחכה יותר ממך.' },
  { id: 't023', week_start: 28, week_end: 38, title: 'עיסוי גב', description: '10 דקות. גב תחתון. פעם בשבוע.' },
  { id: 't024', week_start: 32, week_end: 37, title: 'כיתת לידה', description: 'אחרון. עכשיו. לפני שלא יהיה מקום.' },
  { id: 't025', week_start: 36, week_end: 40, title: 'ערב שקט לפני הסוף', description: 'ארוחה ביחד, בלי טלפונים. אתם שניים, לפני שתהיו שלושה.' },
  { id: 't026', week_start: 36, week_end: 40, title: 'טען את הטלפון', description: 'נשמע טריוויאלי. לא תרצה שהסוללה תגמר ביום.' },
  { id: 't027', week_start: 38, week_end: 40, title: 'זנב דלק', description: 'מיכל מלא. תמיד. עכשיו.' },
  { id: 't028', week_start: 35, week_end: 40, title: 'כתוב לה משהו', description: 'הודעה, פתק, כל דבר. היא תשמור את זה.' },
  { id: 't029', week_start: 1, week_end: 40, title: 'שלח לה הודעה סתם', description: '"חושב עליכם" — ולא יותר. לא לחכות לאירוע.' },
  { id: 't030', week_start: 28, week_end: 38, title: 'בדוק זכויות לידה', description: 'ימי לידה לגבר בישראל. תבדוק מול המעסיק.' },
]
