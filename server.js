const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ══════════════════════════════════════════════════════════════════════════════
// מסד נתונים מדויק מפוליסות רשמיות
// ══════════════════════════════════════════════════════════════════════════════
const DB = {
  מגדל: {
    product: "מזור מורחב",
    color: "#1B3A6B",
    diseases: "44",
    max_sum: "700,000 ₪ (קבוצה ראשונה עד 1,050,000 ₪)",
    groups: "2 קבוצות בלבד",
    waiting_first: "90 יום",
    waiting_second: "365 יום",
    waiting_cancer: "5 שנות החלמה",
    cancer_recur: "100% לאחר 5 שנות החלמה",
    insitu: "20% ל-19 סוגי סרטן מוקדם — הרשימה הרחבה ביותר",
    catheter: "10% נוסף (לא מחליף תביעת לב)",
    age_entry: "0–65",
    age_exit: "75",
    reduction: "50% מגיל 70",
    premium_fixed: "קבועה לילדים עד גיל 25, משתנה כל 5 שנים, קבועה מגיל 65",
    unique_service: "מגדל CARE — בדיקת זכויות ממדינה (ביטוח לאומי, בנקים, מס הכנסה)",
    pros: [
      "44 מחלות — הרשימה הארוכה ביותר",
      "150% פיצוי למחלה רב-מערכתית עד גיל 60",
      "פרמיה קבועה לילדים עד גיל 25",
      "19 סוגי סרטן מוקדם (20%) — הרחב בשוק",
      "AIDS מכוסה — ייחודי!",
      "גיליאן בארה — ייחודי!",
      "מגדל CARE — שירות ייחודי לבירור זכויות",
      "סכום מקסימלי עד 1,050,000 ₪"
    ],
    cons: [
      "אכשרה שנייה 365 יום — הארוכה ביותר",
      "קבוצה ראשונה מבטלת את הכיסוי",
      "אין ליווי פסיכולוגי מובנה"
    ],
    unique: [
      "AIDS (קבוצה שנייה) — ייחודי במגדל!",
      "גיליאן בארה — ייחודי במגדל!",
      "19 סוגי סרטן מוקדם 20% — הרחב בשוק",
      "150% פיצוי למחלה רב-מערכתית עד גיל 60",
      "מגדל CARE — בירור זכויות אקטיבי"
    ],
    score_coverage: 92, score_service: 85, score_simplicity: 90, score_value: 88,
    age_child: "מצוין — פרמיה קבועה עד 25, 44 מחלות, סכרת נעורים עד 20",
    age_young: "מצוין — סכום גבוה, CARE, פרמיה יציבה",
    age_middle: "מצוין — 150% רב-מערכתי, AIDS, סרטן מוקדם רחב",
    age_senior: "טוב — שים לב להפחתה 50% מגיל 70",
    price_note: "~17 ₪/חודש לילד | ~230 ₪ גיל 40 | ~1,029 ₪ גיל 55 (לפי 300K)"
  },

  הפניקס: {
    product: "מרפא 2023",
    color: "#C0392B",
    diseases: "47 (כולל כיסויים חלקיים)",
    max_sum: "600,000 ₪",
    groups: "ללא קבוצות — רשימה אחת",
    waiting_first: "90 יום",
    waiting_second: "180 יום",
    waiting_cancer: "60 חודשים (5 שנים) מהפסקת טיפול מלאה",
    cancer_recur: "100% לאחר 60 חודשים מהפסקת טיפול",
    insitu: "15% עד 50,000 ₪",
    catheter: "15,000 ₪ בלבד (מופחת ממקרה לב עתידי)",
    age_entry: "0–65",
    age_exit: "75",
    reduction: "50% מגיל 70",
    premium_fixed: "משתנה לפי גיל",
    unique_service: "ליווי פסיכולוגי 24 מפגשים למבוטח ולמשפחה",
    pros: [
      "ביטול ימי שרידות ל-33 מחלות — ייחודי!",
      "ליווי פסיכולוגי 24 מפגשים למשפחה",
      "קרוהן עם כריתת מעי — 20% ייחודי",
      "סכרת נעורים 100% עד גיל 21",
      "ללא קבוצות — הפשוט ביותר",
      "סרטן מוקדם — רשימה פתוחה (הרחב בשוק)"
    ],
    cons: [
      "600,000 ₪ מקסימום",
      "צנתור: 15,000 ₪ בלבד",
      "אין חוות דעת בחו\"ל",
      "אין שירות CARE"
    ],
    unique: [
      "ביטול ימי שרידות ל-33 מחלות — ייחודי בשוק!",
      "ליווי פסיכולוגי 24 מפגשים למשפחה",
      "קרוהן עם כריתת מעי 20%",
      "סרטן IN-SITU — הרשימה הפתוחה ביותר"
    ],
    score_coverage: 85, score_service: 90, score_simplicity: 95, score_value: 83,
    age_child: "מצוין — סכרת נעורים 100%, ביטול שרידות, ליווי פסיכולוגי",
    age_young: "מצוין — פשטות, ביטול שרידות, כיסוי מיידי",
    age_middle: "טוב — סרטן חוזר 100%, ביטול שרידות",
    age_senior: "טוב — שים לב להפחתה 50% מגיל 70",
    price_note: "~23 ₪/חודש לילד | ~270 ₪ גיל 40 | ~690 ₪ גיל 55 (לפי 300K)"
  },

  מנורה: {
    product: "קרן אור TOP",
    color: "#1A5E2A",
    diseases: "40+",
    max_sum: "600,000 ₪",
    groups: "3 קבוצות",
    waiting_first: "90 יום",
    waiting_second: "365 יום (קבוצה ראשונה)",
    waiting_third: "180 יום (קבוצה שלישית)",
    waiting_cancer: "5 שנות החלמה",
    cancer_recur: "100% לאחר 5 שנות החלמה",
    insitu: "20% שד/ערמונית, 10% צוואר רחם ואיברים נוספים",
    catheter: "10% מסכום הביטוח",
    age_entry: "לידה–65",
    age_exit: "75",
    reduction: "50% מגיל 70",
    premium_fixed: "משתנה לפי גיל",
    unique_service: "חוות דעת פתולוגית בחו\"ל + מנורה HUG — ליווי אישי",
    pros: [
      "חוות דעת פתולוגית בחו\"ל — ייחודי!",
      "מנורה HUG — ליווי אישי להחלמה",
      "סרטן חוזר 100% לאחר 5 שנים",
      "נמק חוט השדרה (שבץ ספינלי) מכוסה",
      "פיצוי 10% למפרצת מוחית וצנתור"
    ],
    cons: [
      "40 מחלות — פחות ממגדל ו-AIG",
      "600,000 ₪ מקסימום",
      "אכשרה שנייה 365 יום",
      "אין ליווי פסיכולוגי מובנה"
    ],
    unique: [
      "חוות דעת פתולוגית בחו\"ל בביופסיה",
      "מנורה HUG — ליווי אישי מותאם",
      "מצב וגטטיבי קבוע (צמח) מכוסה"
    ],
    score_coverage: 78, score_service: 92, score_simplicity: 75, score_value: 80,
    age_child: "בינוני — אין כיסויים ייחודיים לילדים, מחיר גבוה יחסית",
    age_young: "בינוני — חוות דעת בחו\"ל יתרון, אבל 40 מחלות בלבד",
    age_middle: "טוב — HUG + חוות דעת בחו\"ל לרמה רפואית גבוהה",
    age_senior: "טוב — HUG, חוות דעת בחו\"ל, שים לב ל-50% מגיל 70",
    price_note: "~31.5 ₪/חודש לילד | ~284 ₪ גיל 40 | ~910 ₪ גיל 55 (לפי 300K)"
  },

  AIG: {
    product: "Extra Care",
    color: "#003087",
    diseases: "45+ (כולל ייחודיים)",
    max_sum: "700,000 ₪",
    groups: "3 קבוצות",
    waiting_first: "90 יום",
    waiting_second: "180 יום",
    waiting_cancer: "5 שנות החלמה",
    cancer_recur: "100% לאחר 5 שנים",
    insitu: "20% שד/ערמונית/צוואר רחם, 10% נוספים עד 50,000 ₪",
    catheter: "בקבוצה שנייה — 100% מסכום הביטוח",
    age_entry: "0–65",
    age_exit: "75",
    reduction: "50% מגיל 70",
    premium_fixed: "משתנה לפי גיל",
    unique_service: "תגמולים חודשיים 12 חודשים — ייחודי בשוק!",
    pros: [
      "תגמולים חודשיים × 12 — ייחודי בשוק!",
      "700,000 ₪ מקסימום",
      "פסציאיטיס נמקית — ייחודי!",
      "הפטיטיס לילד עד 18 — ייחודי!",
      "טיפול נמרץ הנשמה מלאכותית — ייחודי!",
      "גידול שפיר בחוט השדרה",
      "כריתת ריאה שלמה"
    ],
    cons: [
      "קבוצה ראשונה — ביטול פוליסה (15 מחלות!)",
      "סוכרת נעורים בקבוצה 1 (= ביטול!)",
      "אין שירות ייחודי לבירור זכויות"
    ],
    unique: [
      "תגמולים חודשיים × 12 חודשים",
      "פסציאיטיס נמקית נקרוטית — ייחודי!",
      "הפטיטיס לילד עד גיל 18 — ייחודי!",
      "טיפול נמרץ הדורש הנשמה מלאכותית",
      "גידול שפיר בחוט השדרה"
    ],
    score_coverage: 88, score_service: 85, score_simplicity: 72, score_value: 82,
    age_child: "טוב — הפטיטיס לילד, אבל סוכרת נעורים בקבוצה 1 (ביטול!)",
    age_young: "מצוין — תגמולים חודשיים לאובדן הכנסה",
    age_middle: "מצוין — תגמולים חודשיים + 700K + מחלות ייחודיות",
    age_senior: "בינוני — שים לב לקבוצה 1 הגדולה",
    price_note: "~27 ₪/חודש לילד | ~300 ₪ גיל 40 | ~780 ₪ גיל 55 (לפי 300K)"
  },

  הראל: {
    product: "מענקית זהב",
    color: "#6C3483",
    diseases: "39",
    max_sum: "600,000 ₪",
    groups: "4 קבוצות",
    waiting_first: "90 יום",
    waiting_second: "180 יום",
    waiting_cancer: "5 שנות החלמה",
    cancer_recur: "100% לאחר 5 שנות החלמה",
    insitu: "20% שד/ערמונית, 10% צוואר רחם",
    catheter: "לא מכוסה בנפרד",
    age_entry: "0–65",
    age_exit: "75",
    reduction: "5% בשנה מגיל 65 (הדרגתי — לא 50% בבת אחת!)",
    premium_fixed: "משתנה כל 5 שנים, קבועה מגיל 65",
    unique_service: "סיסטיק פיברוזיס 100% — ייחודי! + החזר פרמיה לפטירה לפני 60",
    pros: [
      "סיסטיק פיברוזיס 100% — ייחודי בשוק!",
      "הפחתה הדרגתית 5%/שנה מגיל 65 (לא 50% בבת אחת)",
      "סרטן שד/ערמונית +20%, צוואר רחם +10%",
      "סכרת נעורים עד גיל 20",
      "החזר פרמיה לפטירה לפני גיל 60",
      "מחיר זול יחסית"
    ],
    cons: [
      "39 מחלות — הפחות מבין כולן",
      "600,000 ₪ מקסימום",
      "4 קבוצות — מורכב",
      "אין שירותי ליווי מיוחדים"
    ],
    unique: [
      "סיסטיק פיברוזיס 100% — היחידה בשוק!",
      "הפחתה הדרגתית 5%/שנה מגיל 65",
      "החזר פרמיה לפטירה לפני 60",
      "הגדלת כיסוי ללא הצהרת בריאות"
    ],
    score_coverage: 75, score_service: 78, score_simplicity: 78, score_value: 82,
    age_child: "מצוין לילד עם סיסטיק פיברוזיס במשפחה — ייחודי! אחרת בינוני",
    age_young: "טוב — מחיר נמוך, החזר פרמיה, הפחתה הדרגתית",
    age_middle: "בינוני — פחות מחלות מהמתחרים",
    age_senior: "טוב — הפחתה הדרגתית 5% (לא 50% בבת אחת) — יתרון!",
    price_note: "~25 ₪/חודש לילד | ~230 ₪ גיל 40 | ~1,029 ₪ גיל 55 (לפי 300K)"
  },

  כלל: {
    product: "מדיכלל מחלות קשות 33",
    color: "#784212",
    diseases: "33",
    max_sum: "700,000 ₪",
    groups: "4 קבוצות",
    waiting_first: "90 יום",
    waiting_second: "180 יום",
    waiting_cancer: "לא צוין בנפרד",
    cancer_recur: "25% בלבד (!) — חסרון קריטי",
    insitu: "15% עד 50,000 ₪",
    catheter: "בקבוצה שלישית — 100% מסכום הביטוח",
    age_entry: "0–64",
    age_exit: "75",
    reduction: "50% מגיל 70",
    premium_fixed: "פרמיה קבועה עד גיל 21 לילדים",
    unique_service: "צליאק גיל 5–35: 50% עד 50,000 ₪ — ייחודי! + אשפוז ממושך לילד 20%",
    pros: [
      "צליאק גיל 5–35 (50%) — ייחודי בשוק!",
      "700,000 ₪ מקסימום",
      "פרמיה קבועה עד גיל 21",
      "אשפוז ממושך לילד (3–18): 20% — ייחודי!",
      "מחיר זול — 0.71 ₪ ל-10,000 ₪"
    ],
    cons: [
      "33 מחלות בלבד — הפחות בשוק!",
      "סרטן חוזר: 25% בלבד — חסרון קריטי!",
      "4 קבוצות — המורכב ביותר",
      "אין שירותי ליווי"
    ],
    unique: [
      "צליאק גיל 5–35 (50% עד 50,000 ₪) — ייחודי בשוק!",
      "אשפוז ממושך לילד 3–18 (20%) — ייחודי!",
      "פרמיה קבועה עד גיל 21"
    ],
    score_coverage: 65, score_service: 70, score_simplicity: 68, score_value: 75,
    age_child: "מתאים רק אם יש צליאק/אשפוז ממושך במשפחה — אחרת לא מומלץ",
    age_young: "פחות מתאים — 33 מחלות בלבד",
    age_middle: "לא מומלץ — סרטן חוזר 25% חסרון קריטי",
    age_senior: "לא מומלץ — 33 מחלות ו-25% סרטן חוזר",
    price_note: "~21 ₪/חודש לילד | ~129 ₪ גיל 40 | ~590 ₪ גיל 55 (לפי 300K)"
  },

  איילון: {
    product: "בשביל החוסן",
    color: "#0E6655",
    diseases: "43 + כיסויים מיוחדים",
    max_sum: "600,000 ₪",
    groups: "4 קבוצות",
    waiting_first: "90 יום",
    waiting_second: "365 יום",
    waiting_third: "180 יום (מקרה שלישי)",
    waiting_cancer: "לא צוין בנפרד",
    cancer_recur: "100% לאחר 5 שנות החלמה",
    insitu: "שד/ערמונית: 15,000 ₪, צוואר רחם לא מוזכר",
    catheter: "בקבוצה שלישית — 100% מסכום הביטוח",
    age_entry: "0–65",
    age_exit: "75",
    reduction: "50% מגיל 70",
    premium_fixed: "משתנה לפי גיל, קבועה מגיל 70",
    unique_service: "החלפת מפרק ירך/ברך/כתף: 15,000 ₪ + שבר ירך: 15,000 ₪ + עד 3 מקרי ביטוח!",
    pros: [
      "עד 3 מקרי ביטוח — ייחודי!",
      "החלפת מפרק ירך/ברך/כתף: 15,000 ₪",
      "שבר באגן/ירך: 15,000 ₪",
      "סכרת נעורים עד גיל 20",
      "צנתור בקבוצה 3 — 100%"
    ],
    cons: [
      "אכשרה שנייה 365 יום — הארוכה!",
      "600,000 ₪ מקסימום",
      "קבוצה ראשונה גדולה מאוד (13 מחלות) = ביטול",
      "4 קבוצות"
    ],
    unique: [
      "עד 3 מקרי ביטוח — ייחודי בשוק!",
      "החלפת מפרק ירך/ברך/כתף: 15,000 ₪",
      "שבר באגן/ירך: 15,000 ₪",
      "פסציאיטיס נמקית בקבוצה 1"
    ],
    score_coverage: 80, score_service: 78, score_simplicity: 70, score_value: 76,
    age_child: "בינוני — סוכרת נעורים, אבל קבוצה ראשונה גדולה",
    age_young: "בינוני — אכשרה שנייה 365 יום חסרון",
    age_middle: "טוב — 3 מקרי ביטוח, אורתופדיה",
    age_senior: "מצוין — אורתופדיה (מפרק/שבר), 3 מקרים, רלוונטי מגיל 55+",
    price_note: "~30 ₪/חודש לילד | ~330 ₪ גיל 40 | ~840 ₪ גיל 55 (לפי 300K)"
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// Helper functions
// ══════════════════════════════════════════════════════════════════════════════
function findCompany(name) {
  return Object.keys(DB).find(k =>
    k === name || name.includes(k) || k.includes(name)
  );
}

function getAgeFit(co, age) {
  if (!age) return 'לא צוין';
  const note = getAgeNote(co, age);
  if (note.startsWith('מצוין')) return 'מתאים מאוד';
  if (note.startsWith('טוב')) return 'מתאים';
  return 'פחות מתאים';
}

function getAgeNote(co, age) {
  if (!age) return '';
  if (age <= 17) return co.age_child;
  if (age <= 35) return co.age_young;
  if (age <= 55) return co.age_middle;
  return co.age_senior;
}

// ══════════════════════════════════════════════════════════════════════════════
// API Route
// ══════════════════════════════════════════════════════════════════════════════
app.post('/api/compare', async (req, res) => {
  const { companies, age, gender, smoke, amount } = req.body;

  if (!companies || companies.length === 0) {
    return res.status(400).json({ error: 'נדרשת לפחות חברה אחת' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API Key חסר' });

  // Build company data from DB
  const coData = companies.map(name => {
    const key = findCompany(name);
    if (!key) return null;
    const co = DB[key];
    return {
      name: key,
      product: co.product,
      color: co.color,
      diseases: co.diseases,
      max_sum: co.max_sum,
      groups: co.groups,
      waiting: `ראשון: ${co.waiting_first} | שני: ${co.waiting_second}`,
      cancer_recur: co.cancer_recur,
      insitu: co.insitu,
      catheter: co.catheter,
      reduction: co.reduction,
      premium_fixed: co.premium_fixed,
      unique_service: co.unique_service,
      pros: co.pros,
      cons: co.cons,
      unique: co.unique,
      price_note: co.price_note,
      age_fit: getAgeFit(co, age),
      age_note: getAgeNote(co, age),
      score_coverage: co.score_coverage,
      score_service: co.score_service,
      score_simplicity: co.score_simplicity,
      score_value: co.score_value,
    };
  }).filter(Boolean);

  if (coData.length === 0) {
    return res.status(400).json({ error: 'לא נמצאו חברות במסד הנתונים' });
  }

  // Comparison table from DB
  const compTable = [
    { param: "שם המוצר",              values: coData.map(c => c.product) },
    { param: "מחלות מכוסות",          values: coData.map(c => c.diseases) },
    { param: "סכום ביטוח מקסימלי",   values: coData.map(c => c.max_sum) },
    { param: "חלוקה לקבוצות",         values: coData.map(c => c.groups) },
    { param: "תקופת אכשרה",           values: coData.map(c => c.waiting) },
    { param: "סרטן חוזר",             values: coData.map(c => c.cancer_recur) },
    { param: "סרטן IN-SITU",          values: coData.map(c => c.insitu) },
    { param: "צנתור כלילי",           values: coData.map(c => c.catheter) },
    { param: "הפחתה מגיל 70",         values: coData.map(c => c.reduction) },
    { param: "פרמיה",                  values: coData.map(c => c.premium_fixed) },
    { param: "שירות ייחודי",          values: coData.map(c => c.unique_service) },
    { param: `מחיר משוער (300K)`,      values: coData.map(c => c.price_note) },
    ...(age ? [{ param: `התאמה לגיל ${age}`, values: coData.map(c => c.age_note) }] : []),
  ];

  // Ask AI only for summary, recommendations, critical diffs
  const ageCtx = age ? `לקוח גיל ${age}${gender ? ' ' + gender : ''}${smoke ? ' ' + smoke : ''}.` : '';
  const dbSummary = coData.map(c =>
    `${c.name}: ${c.diseases} מחלות, סרטן חוזר: ${c.cancer_recur}, ייחודי: ${c.unique.slice(0,2).join(', ')}`
  ).join(' | ');

  const ageNotes = age ? coData.map(c => `${c.name}: ${c.age_note}`).join('. ') : '';

  const prompt = `מומחה ביטוח בריאות ישראל. ${ageCtx}
נתונים מדויקים מפוליסות: ${dbSummary}.
${age ? `התאמה לגיל ${age}: ${ageNotes}.` : ''}
צור: summary (2 משפטים), age_recommendation (משפט אחד${age ? ' לגיל ' + age : ''}), recommendations (4 פריטים לפי פרופיל לקוח שונה), critical_diffs (3 הבדלים קריטיים).
JSON בלבד: {"summary":"","age_recommendation":"","recommendations":[{"profile":"","company":"","reason":""}],"critical_diffs":[""]}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const result = await response.json();
    if (result.error) return res.status(500).json({ error: result.error.message });

    const raw = result.content[0].text;
    const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const aiData = JSON.parse(clean);

    res.json({
      summary: aiData.summary || '',
      age_recommendation: aiData.age_recommendation || '',
      companies: coData,
      comparison_table: compTable,
      recommendations: aiData.recommendations || [],
      critical_diffs: aiData.critical_diffs || [],
    });

  } catch (err) {
    console.error('Error:', err);
    // Fallback without AI
    res.json({
      summary: `השוואה בין ${companies.join(', ')} — נתונים מפוליסות רשמיות`,
      age_recommendation: age ? coData.map(c => `${c.name}: ${c.age_note}`).join('. ') : '',
      companies: coData,
      comparison_table: compTable,
      recommendations: coData.map(c => ({
        profile: c.age_note || 'לקוח כללי',
        company: c.name,
        reason: c.unique[0] || ''
      })),
      critical_diffs: [
        'סרטן חוזר: ' + coData.map(c => `${c.name} — ${c.cancer_recur}`).join(' | '),
        'מחלות: ' + coData.map(c => `${c.name} — ${c.diseases}`).join(' | '),
        'צנתור: ' + coData.map(c => `${c.name} — ${c.catheter}`).join(' | '),
      ],
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
