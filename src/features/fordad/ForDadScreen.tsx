import { useCurrentWeek } from '../../hooks/useCurrentWeek'

interface NoSayItem {
  wrong: string
  right: string
}

const noSay: NoSayItem[] = [
  { wrong: '"את בטוחה שלא מגזימה?"', right: 'תאמין לה. תמיד.' },
  { wrong: '"גם אני עייף"', right: 'לא הזמן הנכון.' },
  { wrong: '"הכל יהיה בסדר"', right: 'תשאל מה היא צריכה.' },
]

function actionForWeek(week: number): string {
  if (week <= 12) return 'קרקרים יבשים ליד המיטה שלה. עכשיו, לא מחר.'
  if (week <= 20) return 'דבר אל הבטן. הוא שומע אותך משבוע 16.'
  if (week <= 28) return 'בדוק שתור סקירת המחצית ביומן.'
  if (week <= 35) return 'ארוז תיק לידה. לא "בקרוב".'
  return 'תדע בעל פה: צירים כל 5 דקות = יוצאים.'
}

function ForDadScreen() {
  const week = useCurrentWeek()

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-6 bg-[var(--bg)] px-5 pb-24 pt-5 text-[var(--text)]">
      <header>
        <h1 className="text-xl font-black">👨 בשבילך</h1>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-black">אל תגיד לה</h2>
        <div className="flex flex-col gap-3">
          {noSay.map((item) => (
            <div
              key={item.wrong}
              className="flex flex-col gap-1 rounded-2xl p-4"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <p className="text-sm line-through" style={{ color: '#EF4444' }}>
                {item.wrong}
              </p>
              <p className="text-lg font-bold" style={{ color: '#10B981' }}>
                {item.right}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-black">ידעת שזה קורה לך?</h2>
        <div
          className="flex flex-col gap-3 rounded-2xl p-5"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid #F59E0B' }}
        >
          <p className="text-[15px] leading-relaxed">
            בין 11% ל-97% מהאבות חווים תסמינים פיזיים של הריון — עייפות,
            בחילות, עלייה במשקל.
          </p>
          <p className="text-[15px] leading-relaxed">
            זה לא בראש שלך. יש לזה שם: Couvade Syndrome.
          </p>
          <p className="text-[15px] leading-relaxed">
            הטסטוסטרון שלך יורד עכשיו. הגוף שלך מכין אותך לאבהות — בלי
            שביקשת.
          </p>
          <p className="text-[11px]" style={{ color: '#444444' }}>
            Wdowiak et al., 2025
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-black">הדבר שלך השבוע</h2>
        <div
          className="rounded-2xl p-5"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid #F59E0B' }}
        >
          <p className="text-[20px] font-bold leading-snug">
            {actionForWeek(week)}
          </p>
        </div>
      </section>
    </div>
  )
}

export default ForDadScreen
