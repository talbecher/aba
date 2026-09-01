export interface Task {
  id: string
  week_start: number
  week_end: number
  title: string
  description: string
}

export const tasks: Task[] = [
  // T1 — שבועות 1-12
  { id: 't001', week_start: 1, week_end: 12, title: 'קרקרים ליד המיטה', description: 'תקנה קרקרים יבשים ותשים אותם בצד המיטה שלה. זה עוזר עם בחילות בוקר.' },
  { id: 't002', week_start: 1, week_end: 12, title: 'הוצא ריחות חזקים', description: 'בשמים, חומרי ניקוי, ריח בשר — אם ריח חזק, מחוץ לבית.' },
  { id: 't003', week_start: 1, week_end: 12, title: 'שתייה מספקת', description: 'תוודא שיש לה תמיד מים בהישג יד. בחילות + יובש = גרוע יותר.' },
  { id: 't004', week_start: 1, week_end: 12, title: 'קח על עצמך את הבישול', description: 'אם הריחות מפריעים לה — אתה מבשל. ואם לא יודע — תזמין.' },
  { id: 't005', week_start: 1, week_end: 12, title: 'חפש מידע על בחילות הריון', description: 'קרא 10 דקות על NVP. תבין למה זה אמיתי ולא "בראש שלה".' },
  { id: 't006', week_start: 4, week_end: 10, title: 'קבע תור ראשון לגינקולוג', description: 'לא לחכות שהיא תזכור. תיזום. תקבע. תלווה.' },
  { id: 't007', week_start: 6, week_end: 10, title: 'תבוא לאולטרסאונד הראשון', description: 'לא "אם אפשר". תסדר את הלו"ז. זה הרגע הראשון שזה מרגיש אמיתי.' },
  { id: 't008', week_start: 1, week_end: 12, title: 'קנה כרית הריון', description: 'U-shape pregnancy pillow. ישנה טוב יותר = מתפקדת טוב יותר.' },
  { id: 't009', week_start: 8, week_end: 13, title: 'ארוחה בחוץ', description: 'כשהבחילות מתחילות לסגת — תציע ארוחה בחוץ. ראשונה מזה שבועות.' },
  { id: 't010', week_start: 1, week_end: 12, title: 'למד מה מותר ומה אסור', description: 'רשימת מזון אסור: דגי ים נאים, גבינה לא מפוסטרת, כבד. תדע זאת.' },
  { id: 't011', week_start: 8, week_end: 12, title: 'חפש כיתת לידה', description: 'מתמלאות מהר. תחפש עכשיו, תירשם מוקדם.' },
  { id: 't012', week_start: 1, week_end: 12, title: 'צמצם קפאין', description: 'לא רק שלה — גם ממך. מגביר מתח. לא עוזר לאף אחד.' },
  { id: 't013', week_start: 10, week_end: 13, title: 'תחליט מתי מבשרים', description: 'שניכם מחליטים יחד. לא המשפחה, לא החברים — אתם.' },
  { id: 't014', week_start: 1, week_end: 12, title: 'תמנע דריכה על ביצים', description: 'פחות ויכוחים, פחות לחץ, פחות "אבל". הגוף שלה עושה עבודה כפולה.' },
  { id: 't015', week_start: 6, week_end: 12, title: 'קנה ספר הריון לאבות', description: 'Fathercraft, The Expectant Father — יש ספרים טובים לגברים ספציפית.' },
  // T2 — שבועות 13-26
  { id: 't016', week_start: 13, week_end: 26, title: 'דבר אל הבטן', description: 'מרגיש מוזר? בסדר. הוא שומע אותך מסביבות שבוע 16. תגיד שלום.' },
  { id: 't017', week_start: 16, week_end: 21, title: 'וודא תור סקירת מחצית', description: 'שבועות 20-23. תפתח יומן. תוודא שיש תור. תרשום שאלה אחת.' },
  { id: 't018', week_start: 16, week_end: 26, title: 'יד על הבטן', description: 'אחרי ארוחת ערב — יד על הבטן, 5 דקות, שקט. הוא הכי פעיל אז.' },
  { id: 't019', week_start: 14, week_end: 22, title: 'טיול זוגי', description: 'T2 הוא הנוח ביותר. לילה אחד בחוץ. אחרי — פחות קל.' },
  { id: 't020', week_start: 20, week_end: 28, title: 'חקור חדרי לידה', description: 'תבקרו בשניים-שלושה. תשאלו שאלות. תחליטו ביחד.' },
  { id: 't021', week_start: 13, week_end: 26, title: 'הליכה משותפת', description: '20-30 דקות אחרי ארוחה. טוב לה, לבוטן, ולזוגיות.' },
  { id: 't022', week_start: 18, week_end: 26, title: 'עשה רשימת ציוד', description: 'לא לקנות עדיין — רק לדעת מה צריך. עגלה, כסא בטיחות, עריסה.' },
  { id: 't023', week_start: 13, week_end: 26, title: 'ערב בלי הריון', description: 'פעם בשבוע — לא לדבר על הריון. סרט, ארוחה, שיחה אחרת.' },
  { id: 't024', week_start: 20, week_end: 26, title: 'שמור מספר גינקולוג', description: 'לא לחפש כשזה קורה. שמור עכשיו. בנייד.' },
  { id: 't025', week_start: 20, week_end: 26, title: 'בדוק ביטוח לתינוק', description: 'מה הביטוח מכסה. מה לא. מה צריך לשנות. עכשיו, בשקט.' },
  { id: 't026', week_start: 13, week_end: 20, title: 'שיחה על שמות', description: 'לא להחליט — לשאול. יש לך דעה? תגיד אותה עכשיו.' },
  { id: 't027', week_start: 16, week_end: 24, title: 'קרא על שלבי הלידה', description: 'להבין מה זה T1/T2 של הלידה, מה אפידורל, מה תרחישים אפשריים.' },
  { id: 't028', week_start: 20, week_end: 26, title: 'תן לה עיסוי גב', description: '10 דקות, גב תחתון. לא לשאול — לעשות.' },
  { id: 't029', week_start: 24, week_end: 28, title: 'הכן שאלות לסקירת מחצית', description: '3 שאלות מוכנות לפני הבדיקה. תגיע מוכן, לא ריק.' },
  { id: 't030', week_start: 13, week_end: 26, title: 'שלח לה הודעה סתם', description: '"חושב עליכם" — ולא יותר. לא לחכות לאירוע.' },
  // T3 — שבועות 27-40
  { id: 't031', week_start: 27, week_end: 35, title: 'ארוז תיק לידה', description: 'לא "בקרוב". עד שבוע 35. תעשה את זה עכשיו.' },
  { id: 't032', week_start: 27, week_end: 38, title: 'למד את הדרך לחדר לידה', description: 'כולל חניה, כניסה, ושעה שלוש בלילה. תכיר את זה.' },
  { id: 't033', week_start: 27, week_end: 40, title: 'שנן סימני לידה', description: 'צירים כל 5 דקות / שבירת מים / דימום = יוצאים. שנן.' },
  { id: 't034', week_start: 28, week_end: 38, title: 'עיסוי גב שבועי', description: '10 דקות, גב תחתון. פעם בשבוע לפחות.' },
  { id: 't035', week_start: 30, week_end: 37, title: 'כיתת לידה — אחרון', description: 'אם עוד לא נרשמתם — עכשיו. לפני שלא יהיה מקום.' },
  { id: 't036', week_start: 34, week_end: 38, title: 'התקן מושב בטיחות ברכב', description: 'לפני הלידה. לא בדרך חזרה מבית החולים.' },
  { id: 't037', week_start: 35, week_end: 38, title: 'הכן ארוחות מוקדשות', description: 'בשל וקפא 5-10 ארוחות לשבועות הראשונים אחרי הלידה.' },
  { id: 't038', week_start: 36, week_end: 40, title: 'ערב שקט לפני הסוף', description: 'ארוחה ביחד, בלי טלפונים. אתם שניים, לפני שתהיו שלושה.' },
  { id: 't039', week_start: 36, week_end: 40, title: 'טען את הטלפון כל לילה', description: 'ביום הלידה לא תרצה שהסוללה תגמר.' },
  { id: 't040', week_start: 37, week_end: 40, title: 'זנב דלק — תמיד', description: 'מיכל מלא. תמיד. עכשיו.' },
  { id: 't041', week_start: 35, week_end: 40, title: 'כתוב לה משהו', description: 'הודעה, פתק, כרטיס. מה אתה מרגיש לקראת. היא תשמור את זה.' },
  { id: 't042', week_start: 27, week_end: 38, title: 'בדוק זכויות לידה', description: '5 ימי לידה לגבר בישראל + אפשרות הארכה. תבדוק מול המעסיק עכשיו.' },
  { id: 't043', week_start: 30, week_end: 38, title: 'הכן רשימת אנשי קשר', description: 'מי מטפל בדברים ביום הלידה: הורים, חברים, שכנים. תכין רשימה.' },
  { id: 't044', week_start: 36, week_end: 40, title: 'למד על אפידורל', description: 'מה זה, איך עובד, מה ההשפעות. היא תחליט — אתה צריך להבין.' },
  { id: 't045', week_start: 27, week_end: 36, title: 'קנה בגדי נבון', description: 'גדלים: 0-3 חודשים. לא קטן יותר. ולא יותר מדי — גדלים עוברים מהר.' },
  // כללי — כל השבועות
  { id: 't046', week_start: 1, week_end: 40, title: 'שאל איך היא מרגישה', description: 'לא "מה שלומך" — "איך אתה מרגישה היום?" שאלה אחת. תחכה לתשובה.' },
  { id: 't047', week_start: 1, week_end: 40, title: 'אל תפתור — תקשיב', description: 'כשהיא מתלוננת — לא "אז תעשי X". פשוט להקשיב. זה מה שנדרש.' },
  { id: 't048', week_start: 1, week_end: 40, title: 'קח משימת בית אחת', description: 'כביסה, שואב אבק, כלים — קח אחת שהיא עושה בדרך כלל. עכשיו.' },
  { id: 't049', week_start: 1, week_end: 40, title: 'ארוחת ערב ביחד', description: 'בלי טלפונים, בלי מסך. 20 דקות. רק אתם.' },
  { id: 't050', week_start: 1, week_end: 40, title: 'שתף אותה בדאגות שלך', description: 'גם אתה מרגיש משהו. מותר לומר את זה. היא לא היחידה שעוברת שינוי.' },
]
