export interface RevealWeek {
  emoji: string
  name: string
  punch: string
  size: string
  size_cm: number
  weight: string
}

export const revealData: Record<number, RevealWeek> = {
  3: { emoji: '•', name: 'נקודה בסוף משפט', punch: 'אפילו גוגל לא היה מוצא אותו.', size: '0.1 מ"מ', size_cm: 0.01, weight: '<1 גרם' },
  4: { emoji: '🧂', name: 'גרגר מלח גס', punch: 'מה שמשנה הכל — לפעמים זה קטן.', size: '0.2 ס"מ', size_cm: 0.2, weight: '<1 גרם' },
  5: { emoji: '☕', name: 'פול קפה', punch: 'הוא עוד לא צריך קפאין. אתה כן.', size: '0.4 ס"מ', size_cm: 0.4, weight: '~1 גרם' },
  6: { emoji: '✏️', name: 'מחק של עיפרון', punch: 'אין כפתור Undo.', size: '0.6 ס"מ', size_cm: 0.6, weight: '~2 גרם' },
  7: { emoji: '🔋', name: 'סוללת שעון', punch: 'קטנה. מפעילה הכל.', size: '1.0 ס"מ', size_cm: 1.0, weight: '~4 גרם' },
  8: { emoji: '🪙', name: '10 אגורות', punch: 'המטבע שכולם מוצאים ואף אחד לא שומר.', size: '1.6 ס"מ', size_cm: 1.6, weight: '~8 גרם' },
  9: { emoji: '🍺', name: 'פקק בירה קורונה', punch: 'מאוחר מדי.', size: '2.3 ס"מ', size_cm: 2.3, weight: '~14 גרם' },
  10: { emoji: '🏓', name: 'כדור פינג פונג', punch: 'תמיד מוצאים אותו בפינה הלא נכונה.', size: '3.1 ס"מ', size_cm: 3.1, weight: '~22 גרם' },
  11: { emoji: '💊', name: 'גלולה למניעת הריון', punch: 'מאוחר מדי.', size: '4.1 ס"מ', size_cm: 4.1, weight: '~35 גרם' },
  12: { emoji: '🍬', name: 'חפיסת מסטיק Orbit', punch: 'תמיד יש אחת בכיס. עד שאין.', size: '5.4 ס"מ', size_cm: 5.4, weight: '~58 גרם' },
  13: { emoji: '☕', name: 'קפסולת נספרסו', punch: 'בלי מים לא הולך.', size: '7.4 ס"מ', size_cm: 7.4, weight: '~81 גרם' },
  14: { emoji: '💳', name: 'כרטיס אשראי', punch: 'עוד לא חייבים אותו. תכף כן.', size: '8.7 ס"מ', size_cm: 8.7, weight: '~110 גרם' },
  15: { emoji: '🥃', name: 'כוס צ׳ייסר', punch: 'לא יחזור על עצמו בקרוב.', size: '10.1 ס"מ', size_cm: 10.1, weight: '~140 גרם' },
  16: { emoji: '🌡️', name: 'שלט המזגן', punch: 'מעכשיו אין טמפרטורה נכונה בבית.', size: '11.6 ס"מ', size_cm: 11.6, weight: '~170 גרם' },
  17: { emoji: '📦', name: 'קופסת סיגריות', punch: 'הפסקת לעשן? יופי. עכשיו תפסיק גם להלחיץ.', size: '13.0 ס"מ', size_cm: 13.0, weight: '~180 גרם' },
  18: { emoji: '🃏', name: 'קופסת קלפים Bicycle', punch: '54 קלפים. הוא מחזיק בכולם.', size: '14.2 ס"מ', size_cm: 14.2, weight: '~190 גרם' },
  19: { emoji: '🥤', name: 'פחית רד בול', punch: 'הוא עוד לא צריך. אתה כבר לא יכול בלי.', size: '15.3 ס"מ', size_cm: 15.3, weight: '~240 גרם' },
  20: { emoji: '📱', name: 'אייפון 6', punch: 'ישן. איטי. כולם עדיין משתמשים.', size: '16.4 ס"מ', size_cm: 16.4, weight: '~300 גרם' },
  21: { emoji: '🧀', name: 'בלוק גבינה צהובה', punch: 'כולם אוהבים. אף אחד לא מודה.', size: '19.0 ס"מ', size_cm: 19.0, weight: '~360 גרם' },
  22: { emoji: '🎮', name: 'שלט Xbox', punch: 'השעות שלך במשחק עומדות להצטמצם.', size: '21.0 ס"מ', size_cm: 21.0, weight: '~430 גרם' },
  23: { emoji: '🥜', name: 'שקית במבה', punch: 'אין דבר כזה שקית אחת.', size: '23.0 ס"מ', size_cm: 23.0, weight: '~500 גרם' },
  24: { emoji: '🍅', name: 'בקבוק קטשופ Heinz', punch: 'לא זזה כמה שתנענע. ואז — הכל בבת אחת.', size: '25.0 ס"מ', size_cm: 25.0, weight: '~600 גרם' },
  25: { emoji: '🍺', name: '2 פחיות היינקן', punch: 'לא בשבילך. עדיין לא.', size: '34.0 ס"מ', size_cm: 34.0, weight: '~660 גרם' },
  26: { emoji: '🐟', name: '3 קופסאות טונה', punch: 'הריח שהיא לא יכולה לסבול עכשיו.', size: '35.6 ס"מ', size_cm: 35.6, weight: '~760 גרם' },
  27: { emoji: '🥩', name: 'קילו בשר טחון', punch: 'מינוס הקציצה שאכלת.', size: '36.6 ס"מ', size_cm: 36.6, weight: '~875 גרם' },
  28: { emoji: '☕', name: 'חבילת קפה Lavazza', punch: 'יקר יותר מהמחשבה. שווה כל שקל.', size: '37.6 ס"מ', size_cm: 37.6, weight: '~1,000 גרם' },
  29: { emoji: '🔧', name: 'בקבוק שמן מנוע', punch: 'חיוני. כבד. לא רואים אותו — רק מרגישים.', size: '38.6 ס"מ', size_cm: 38.6, weight: '~1,150 גרם' },
  30: { emoji: '🍝', name: '2 חבילות פסטה', punch: 'לפני הלידה תבשל. אחרי — תזמין.', size: '39.9 ס"מ', size_cm: 39.9, weight: '~1,300 גרם' },
  31: { emoji: '💻', name: 'MacBook Air', punch: 'יקר יותר. פחות קל להחזיר.', size: '41.1 ס"מ', size_cm: 41.1, weight: '~1,500 גרם' },
  32: { emoji: '🍺', name: 'שישיית בירה חסר אחת', punch: 'אחד כבר חסר. אתה יודע למה.', size: '42.4 ס"מ', size_cm: 42.4, weight: '~1,700 גרם' },
  33: { emoji: '🥙', name: 'לאפה שוורמה', punch: 'עם כל התוספות. לא לשכוח את האחינה.', size: '43.7 ס"מ', size_cm: 43.7, weight: '~1,900 גרם' },
  34: { emoji: '🔨', name: 'מקדחה עם סוללה', punch: 'סופסוף תשתמש בה.', size: '45.0 ס"מ', size_cm: 45.0, weight: '~2,100 גרם' },
  35: { emoji: '🥥', name: 'קוקוס שלם', punch: 'קשה מבחוץ. מפתיע מבפנים.', size: '46.2 ס"מ', size_cm: 46.2, weight: '~2,400 גרם' },
  36: { emoji: '🎮', name: 'Nintendo Switch', punch: 'תיהנה ממנו. יש לו תאריך תפוגה.', size: '47.4 ס"מ', size_cm: 47.4, weight: '~2,600 גרם' },
  37: { emoji: '🥗', name: 'קערת סלט גדולה', punch: 'כן. גם הקערה.', size: '48.6 ס"מ', size_cm: 48.6, weight: '~2,900 גרם' },
  38: { emoji: '🎒', name: 'תרמיל ילדים ממולא', punch: 'כבר ארזת אותו?', size: '49.8 ס"מ', size_cm: 49.8, weight: '~3,100 גרם' },
  39: { emoji: '🥫', name: '10 קופסאות שימורים', punch: 'המלאי שצברת למלחמה הבאה.', size: '50.7 ס"מ', size_cm: 50.7, weight: '~3,300 גרם' },
  40: { emoji: '👶', name: 'הוא / היא', punch: 'אין יותר השוואות.', size: '≈51 ס"מ', size_cm: 51.2, weight: '≈3,400 גרם' },
}
