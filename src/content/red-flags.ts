// Red Flags Database - Automatically Generated for Aba Application
// Grounded in sources: ACOG, NHS, Mayo Clinic
// Tone: Strict, Level 3 medical (100% neutral, no humor, no cynicism)

export interface RedFlag {
  id: string;
  symptom: string;
  weeks: 'early' | 'all' | 'late';
  action: 'מיון' | 'רופא' | 'לצפות';
  urgency: 'immediate' | 'same_day' | 'monitor';
  source: 'ACOG' | 'NHS' | 'Mayo Clinic';
}

export const redFlags: RedFlag[] = [
  {
    id: "vaginal_bleeding",
    symptom: "דימום נרתיקי טרי (קל או כבד) בכל שלב של ההריון",
    weeks: "all",
    action: "מיון",
    urgency: "immediate",
    source: "ACOG"
  },
  {
    id: "prom_pre_37",
    symptom: "חשד לדליפת מי שפיר (ירידת מים) לפני שבוע 37 להריון",
    weeks: "all",
    action: "מיון",
    urgency: "immediate",
    source: "NHS"
  },
  {
    id: "decreased_movement_general",
    symptom: "הפחתה כללית או שינוי משמעותי בדפוס תנועות העובר הרגיל",
    weeks: "late",
    action: "רופא",
    urgency: "same_day",
    source: "Mayo Clinic"
  },
  {
    id: "preeclampsia_headache",
    symptom: "כאב ראש עז שאינו חולף, המלווה בטשטוש ראייה, הבזקים או כתמים כהים בשדה הראייה",
    weeks: "late",
    action: "מיון",
    urgency: "immediate",
    source: "Mayo Clinic"
  },
  {
    id: "sudden_swelling",
    symptom: "נפיחות פתאומית ובלתי מוסברת בפנים, בעיניים, בידיים או באצבעות",
    weeks: "late",
    action: "רופא",
    urgency: "same_day",
    source: "Mayo Clinic"
  },
  {
    id: "severe_abdominal_pain",
    symptom: "כאב בטן חזק, חד, עוויתי או ממושך שאינו משתפר",
    weeks: "all",
    action: "מיון",
    urgency: "immediate",
    source: "ACOG"
  },
  {
    id: "high_fever",
    symptom: "חום גוף של 38.0 מעלות צלזיוס (100.4°F) ומעלה, או תסמינים דמויי שפעת וצמרמורות",
    weeks: "all",
    action: "רופא",
    urgency: "same_day",
    source: "ACOG"
  },
  {
    id: "preterm_contractions",
    symptom: "התכווצויות רחם קצביות, סדירות או כואבות המופיעות לפני שבוע 37 להריון",
    weeks: "late",
    action: "מיון",
    urgency: "immediate",
    source: "NHS"
  },
  {
    id: "sharp_drop_movement_28",
    symptom: "ירידה חדה ותלולה בתנועות העובר לאחר שבוע 28 (אי-עמידה בספירה של 10 תנועות בתוך שעתיים)",
    weeks: "late",
    action: "מיון",
    urgency: "immediate",
    source: "Mayo Clinic"
  },
  {
    id: "sudden_shortness_of_breath",
    symptom: "קוצר נשימה פתאומי וחריף, קשיי נשימה במנוחה או כאב חד באזור החזה",
    weeks: "all",
    action: "מיון",
    urgency: "immediate",
    source: "Mayo Clinic"
  },
  {
    id: "back_pain_bleeding_early",
    symptom: "כאב גב תחתון עז ופתאומי, או התכווצויות קשות באגן המלוות בדימום נרתיקי בשבועות הראשונים",
    weeks: "early",
    action: "מיון",
    urgency: "immediate",
    source: "ACOG"
  },
  {
    id: "no_movement_completely",
    symptom: "הפסקת תנועות העובר לחלוטין (חוסר יכולת לחוש תנועה גם לאחר שתייה קרה או שכיבה על הצד)",
    weeks: "late",
    action: "מיון",
    urgency: "immediate",
    source: "ACOG"
  }
];
