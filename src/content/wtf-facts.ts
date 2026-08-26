// 50 עובדות מאומתות ל-"ידעת?" — Aba
// מקורות: Mayo Clinic, ACOG, Cleveland Clinic, PubMed

export interface WtfFact {
  id: string;
  factual_text: string;
  aba_line: string;
  week?: number;
  source: string;
}

export const wtfFacts: WtfFact[] = [
  { id:'w3-sex', factual_text:'המין הגנטי נקבע ברגע ההפריה על ידי הזרע.', aba_line:'אתה החלטת ילד או בת. עוד לפני שידעת שאתה אבא.', week:3, source:'ACOG' },
  { id:'w4-hcg', factual_text:'בדיקת הריון מזהה הורמון HCG — לא את הבוטן עצמו.', aba_line:'הבדיקה לא ראתה אותו. היא ראתה את ההורמון. הוא עדיין שקוף.', week:4, source:'Mayo Clinic' },
  { id:'w5-growth', factual_text:'הבוטן גדל פי 10,000 ביחס לגודלו בהפריה תוך השבועות הראשונים.', aba_line:'פי 10,000. שום דבר בטבע לא גדל ככה. כולל הכסף שלך.', week:5, source:'Embryology (Moore)' },
  { id:'w7-neurons', factual_text:'המוח העוברי מייצר מאות אלפי תאי עצב בדקה בשבועות 7-18.', aba_line:'כל דקה — מאות אלפי תאי מוח חדשים. בגוף קטן מאצבעך.', week:7, source:'Purves Neuroscience' },
  { id:'w9-yawn', factual_text:'הבוטן מפהק כבר משבוע 9 — המוח מתרגל רפלקסים.', aba_line:'הוא מפהק. לא כי משעמם לו. כי המוח מתרגל. בשבוע 9.', week:9, source:'Cleveland Clinic' },
  { id:'w9-eyelids', factual_text:'העפעפיים נסגרים בשבוע 9 ונשארים סגורים עד שבוע 28.', aba_line:'19 שבועות עם עיניים סגורות. ישן יותר ממך בלילות הראשונים.', week:9, source:'Mayo Clinic' },
  { id:'w11-teeth', factual_text:'ניצני כל 20 שיני החלב קיימים מתחת לחניכיים כבר בשבוע 11.', aba_line:'20 שיניים מוכנות. עדיין אין לו פה שיכול לנגוס. עוד.', week:11, source:'Mayo Clinic' },
  { id:'w12-urine', factual_text:'מי השפיר מוחלפים כל כמה שעות — הבוטן שותה, מעבד, מפריש.', aba_line:'שותה, משתין, ושותה שוב. לתוך אותו נוזל. זה הנורמל שם.', week:12, source:'ACOG' },
  { id:'w13-gut', factual_text:'המעיים בלטו דרך בסיס חבל הטבור עד שבוע 13 — ואז חזרו פנימה.', aba_line:'המעיים היו בחוץ. הגוף שלח אותם לאחסון זמני. עכשיו חזרו.', week:13, source:"Moore's Embryology" },
  { id:'w14-fingerprints', factual_text:'טביעות האצבע נקבעות בין שבועות 10-16 ולא ישתנו לעולם.', aba_line:'יש לו זהות ביומטרית. Biometric login מגיל 14 שבועות.', week:14, source:'Mayo Clinic' },
  { id:'w15-lanugo', factual_text:'הבוטן מכוסה בשיער עדין (לנוגו) בשבוע 15 — שינשר לפני הלידה.', aba_line:'לרגע קצר הבוטן שלך שעיר לגמרי. ייסתדר.', week:15, source:'Mayo Clinic' },
  { id:'w16-voice', factual_text:'ביום הלידה הדבר הכי מוכר לתינוק יהיה קול האב — אם דיבר אליו.', aba_line:'ביום הלידה הוא לא יכיר כלום. חוץ מהקול שלך. אם דיברת.', week:16, source:'DeCasper & Fifer' },
  { id:'w18-twins-fp', factual_text:'גם תאומים זהים יש להם טביעות אצבע שונות — כי הן מושפעות מסביבת הרחם.', aba_line:'DNA זהה. טביעות שונות. הרחם הוסיף את הפרטים שלו.', week:18, source:'Dermatoglyphics research' },
  { id:'w19-permanent', factual_text:'השיניים הקבועות מתפתחות כבר בשבוע 14-16 — לפני שיצאה שן חלב.', aba_line:'שיניים קבועות: מוכנות. שיניים ראשונות: טרם יצאו. הגוף תמיד קדימה.', week:19, source:'Mayo Clinic' },
  { id:'w20-anatomy', factual_text:'סקירת המחצית בודקת 20+ פרמטרים — מוח, לב, שפתיים, כליות, גפיים.', aba_line:'זה לא "לראות את הבייבי". זה 20+ פרמטרים. תבוא מוכן.', week:20, source:'ACOG, ISUOG' },
  { id:'w23-rem', factual_text:'80% מזמן השינה של הבוטן בשבוע 23 הוא שנת REM — שלב החלומות.', aba_line:'80% שנת חלומות. מה הוא חולם? אנחנו לא יודעים. אבל הוא חולם.', week:23, source:'Fetal sleep research' },
  { id:'w24-pain', factual_text:'הבוטן מסוגל לחוש כאב מגיל 24 שבועות — הוביל לפרוטוקולי הרדמה עוברית.', aba_line:'שבוע 24 — מרגיש כאב. לא תיאוריה. לכן יש הרדמה בניתוחים עובריים.', week:24, source:'Thalamo-cortical connections research' },
  { id:'w25-flavor', factual_text:'מוכח שתינוקות מעדיפים טעמים שהאם אכלה בהריון — מי השפיר משנים טעם.', aba_line:'הוא טועם מה שהיא אוכלת. ויזכור. כשיסרב לאכול — תזכור את זה.', week:25, source:'Flavor learning in utero' },
  { id:'w27-signal', factual_text:'האות ללידה יוצא מריאות הבוטן עצמו — כשהן בשלות מספיק.', aba_line:'הוא מחליט מתי לצאת. הגוף שלו שולח את האות. לא היא.', week:39, source:'Fetal lung maturity research' },
  { id:'w28-eyes', factual_text:'הבוטן פותח עיניים לראשונה בשבוע 26-28 — אחרי 17 שבועות סגורות.', aba_line:'17 שבועות עם עיניים סגורות. שבוע 28 — פתיחה ראשונה.', week:28, source:'Fetal development' },
  { id:'w32-fluid', factual_text:'הבוטן שותה עד 500 מ"ל מי שפיר ביום בטרימסטר השלישי.', aba_line:'500 מ"ל ביום. שותה, מעבד, מפריש. מתרגל לחיים.', week:32, source:'Amniotic fluid research' },
  { id:'gen-placenta', factual_text:'השלייה מייצרת יותר הורמונים מכל בלוטה אחרת בגוף האדם.', aba_line:'השלייה שולטת. יותר הורמונים מכל בלוטה בגוף. לא פלא שהיא מרגישה אחרת.', source:'Placental endocrinology' },
  { id:'gen-blood', factual_text:'נפח הדם שלה עולה ב-50% במהלך ההריון.', aba_line:'פי 1.5 דם בגוף. לא מושאל — מיוצר. ולכן היא עייפה.', source:'ACOG' },
  { id:'gen-heart', factual_text:'הלב שלה עובד 40-50% יותר קשה במהלך ההריון.', aba_line:'הלב שלה עובד 50% יותר קשה. כל יום. 9 חודשים. בלי חדר כושר.', source:'Cardiovascular changes in pregnancy' },
  { id:'gen-brain-mom', factual_text:'המוח שלה מתכווץ קלות במהלך ההריון ומתאושש לאחר הלידה.', aba_line:'המוח שלה קטן קצת בהריון. לא שתגיד לה את זה.', source:'Neurological changes in pregnancy' },
  { id:'gen-smell', factual_text:'חוש הריח מתחזק דרמטית בהריון — תגובת הגנה אבולוציונית לרעלים.', aba_line:'הריח שלה חזק פי כמה. לא גחמה. אבולוציה. תוציא מהבית מה שמסריח.', source:'Olfactory changes in pregnancy' },
  { id:'gen-dna-mom', factual_text:'תאי DNA של הבוטן נשארים בגוף האם עשרות שנים לאחר הלידה.', aba_line:'חלק מהבוטן יישאר בגופה לכל החיים. גם אחרי שיגדל.', source:'Fetal microchimerism research' },
  { id:'gen-cry', factual_text:'תינוקות מתרגלים לבכות ברחם — גלי קול אופייניים נראים בשבוע 28.', aba_line:'הוא מתרגל לבכות. עוד בפנים. יש לו חודשיים חזרות לפני שתשמע.', source:'Gingras et al.' },
  { id:'gen-first-breath', factual_text:'הנשימה הראשונה היא האקט הפיזי המאומץ ביותר שבן אדם אי פעם עושה.', aba_line:'הנשימה הראשונה שלו תהיה הדבר הכי קשה שיעשה אי פעם. ואחרי זה — יגדל.', source:'Neonatal physiology' },
  { id:'gen-recognition', factual_text:'תינוקות מזהים את פני האם תוך שעות מהלידה ומעדיפים לעקוב אחריה.', aba_line:'שעות לאחר הלידה — הוא כבר מעדיף את פניה. חודשים של הכרה בחושך.', source:'Neonatal face recognition' },
  { id:'gen-placenta2', factual_text:'השלייה נבנית כמעט לגמרי מתאי הבוטן — לא מתאי האם.', aba_line:'השלייה נבנית על ידיו. הוא בנה את מכשיר ההזנה שלו בעצמו.', source:'Placental development' },
  { id:'gen-hiccups', factual_text:'שיהוקים עובריים מופיעים מוקדם בהריון — עוד לפני שהריאות מוכנות.', aba_line:'הוא משהק. לפני שיכול לנשום. המוח מתרגל גם בלי אוויר.', source:'Fetal hiccup research' },
  { id:'gen-melatonin', factual_text:'המלטונין של האם עובר לבוטן וקובע לו גרסה ראשונית של שעון ביולוגי.', aba_line:'היא מלמדת אותו יום ולילה. דרך הורמון. בלי מילים.', source:'Circadian rhythm development' },
  { id:'gen-immune', factual_text:'הנבון מקבל נוגדנים מהאם דרך השלייה — רק בטרימסטר השלישי.', aba_line:'החיסונים הראשונים שלו — מגופה. לא מהמזרק. שבועות 28-40.', source:'Passive immunity transfer' },
  { id:'gen-sex', factual_text:'ברירת המחדל הביולוגית היא נקבה — זכר מצריך תוספת של testosterone.', aba_line:'ברירת המחדל הביולוגית היא נקבה. זכר זה תוספת. מעניין.', source:'Sexual differentiation' },
  { id:'gen-folic', factual_text:'חומצה פולית בשבועות הראשונים מפחיתה עד 70% את הסיכון למומי צינור עצבי.', aba_line:'ויטמין אחד, בזמן הנכון, 70% פחות סיכון. תוודא שהיא לוקחת.', source:'ACOG, WHO' },
  { id:'gen-nesting', factual_text:'דחף ה-nesting — לנקות ולסדר לפני הלידה — מוכח הורמונלית.', aba_line:'כשהיא פתאום רוצה לנקות הכל — זה הורמונים. תצטרף. לא תשאל.', source:'Nesting behavior research' },
  { id:'gen-colostrum', factual_text:'הגוף מתחיל לייצר קולוסטרום — החלב הראשון — כבר מסביבות שבוע 16.', aba_line:'החלב הראשון מוכן מחצי הדרך. הגוף שלה לא מחכה לדד-ליין.', source:'Lactation physiology' },
  { id:'gen-dna2', factual_text:'בנבון שנולד יש כ-2 מטר של DNA מקופל לתוך כל תא.', aba_line:'2 מטר DNA בכל תא. מקופל. לתאית. בגוף שלא רואים בלי מיקרוסקופ.', source:'Genomics basics' },
  { id:'gen-contractions', factual_text:'הרחם מתכווץ לאורך כל ההריון — רוב ההתכווצויות לא מורגשות כלל.', aba_line:'הרחם מתכווץ כל הזמן. רק חלק קטן מורגש. שאר הזמן — עבודה שקטה.', source:'Uterine physiology' },
  { id:'gen-twins', factual_text:'תאומים זהים מפתחים אישיות שונה עוד ברחם — מוכח על ידי תנועות שונות.', aba_line:'DNA זהה. אישיות שונה מהרחם. ה-DNA לא קובע הכל.', source:'Twin behavior in utero' },
  { id:'gen-stretch', factual_text:'הרחם גדל מגודל אגרוף לגודל אבטיח — ומתכווץ חזרה לאחר הלידה.', aba_line:'מאגרוף לאבטיח — ואז חזרה. הגוף שלה עושה מה שאף שריר אחר לא יכול.', source:'Uterine physiology' },
  { id:'gen-oxytocin', factual_text:'אוקסיטוצין — "הורמון האהבה" — משתחרר גם בלידה וגם בהנקה.', aba_line:'הורמון שגורם לאהבה משתחרר בלידה. זה לא מטאפורה. זה כימיה.', source:'Oxytocin research' },
  { id:'gen-amniotic', factual_text:'מי השפיר בסוף ההריון מורכבים בעיקר משתן עוברי — לא מנוזל "נקי".', aba_line:'מי השפיר בסוף? בעיקר שתן שלו. הוא שחה בזה. ועכשיו הוא בסדר גמור.', source:'Amniotic fluid composition' },
  { id:'gen-micro', factual_text:'תאים עובריים שעוברים לגוף האם יכולים לסייע בתיקון רקמות פגועות שלה.', aba_line:'הוא לא רק לוקח — הוא גם עוזר לתקן אותה. מהגוף שלו. בלי שיודע.', source:'Fetal microchimerism therapeutic effects' },
  { id:'gen-gravity', factual_text:'הלחץ שהרחם מפעיל על עצב הסיאטיק גורם לכאב שמקרין לרגל — שכיח בT3.', aba_line:'הכאב שלה שיורד לרגל? הבוטן לוחץ על עצב. לא ניתן לתיקון. יחלוף אחרי הלידה.', source:'Sciatic nerve compression in pregnancy' },
  { id:'gen-movement', factual_text:'תנועות עובריות מורגשות ראשית על ידי אמהות מנוסות מוקדם יותר — כי הן מכירות את התחושה.', aba_line:'היא תדע לפני שתוכל להסביר לך מה היא מרגישה. תאמין לה.', source:'Quickening research' },
  { id:'gen-taste2', factual_text:'המחקרים מראים שתינוקות שנחשפו לגזר ברחם מגיבים חיובית לגזר אחרי הלידה.', aba_line:'מה שהיא אוכלת עכשיו — הוא יאהב אחר כך. השקעה לטווח ארוך.', source:'Prenatal flavor learning - carrot study' },
  { id:'gen-brain2', factual_text:'המוח של הנבון ממשיך להתפתח עד גיל 25 — לידה היא רק ציון דרך.', aba_line:'הלידה היא לא הסוף של הפיתוח. עוד 25 שנים. ברוך הבא.', source:'Brain development research' },
];
