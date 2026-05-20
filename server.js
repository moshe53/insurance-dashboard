const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── מסד נתונים מדויק של חברות הביטוח ──────────────────────────────────────
const DB = {
  מגדל: {
    product: "מזור מורחב",
    color: "#1B3A6B",
    max_sum: "700,000 ₪ (עד 1,050,000 ₪ קבוצה א׳ עד גיל 60)",
    diseases: "44",
    groups: "2 קבוצות",
    waiting: "90 יום (180 יום מקרה שני)",
    cancer_recur: "100% ללא הגבלה (קבוצה ב׳)",
    insitu: "20% ל-19 סוגי סרטן מוקדם",
    age_entry: "0–65",
    age_exit: "75",
    unique_service: "מגדל CARE – בירור זכויות (ביטוח לאומי, בנקים, מס הכנסה)",
    pros: ["44 מחלות – הרשימה הארוכה ביותר", "סכום ביטוח עד 1,050,000 ₪ (הגבוה בשוק)", "פרמיה קבועה לילדים עד גיל 25", "150% פיצוי למחלה רב-מערכתית עד גיל 60", "10% לצנתור לב (עד 70,000 ₪)", "מגדל CARE – שירות בירור זכויות ייחודי"],
    cons: ["365 יום אכשרה למקרה שני", "אין ליווי פסיכולוגי מובנה", "אין חוות דעת בחו״ל"],
    unique: ["מגדל CARE – בירור זכויות אקטיבי", "150% פיצוי למחלה רב-מערכתית", "פרמיה קבועה לילד עד גיל 25", "19 סוגי סרטן מוקדם (20%)"],
    notes_age_child: "הכי מתאים – פרמיה קבועה עד 25, 44 מחלות, סכרת נעורים",
    notes_age_young: "מצוין – סכום גבוה, פרמיה נמוכה, CARE",
    notes_age_middle: "מצוין – סכום ביטוח גבוה, 150% רב-מערכתי",
    notes_age_senior: "טוב – שים לב להפחתה 50% מגיל 70",
    price_300k: "~17 ₪ לילד / ~80 ₪ גיל 40 / ~200 ₪ גיל 55",
    price_500k: "~28 ₪ לילד / ~130 ₪ גיל 40 / ~330 ₪ גיל 55",
  },
  הפניקס: {
    product: "מרפא 2023",
    color: "#C0392B",
    max_sum: "600,000 ₪",
    diseases: "42 + 4 חלקיות",
    groups: "ללא קבוצות – רשימה אחת",
    waiting: "90 יום (ביטול ל-33 מחלות – ייחודי!)",
    cancer_recur: "100% לאחר החלמה מלאה",
    insitu: "רשימה לא סגורה – הרחבה ביותר בענף",
    age_entry: "0–65",
    age_exit: "75",
    unique_service: "ליווי פסיכולוגי 24 מפגשים למבוטח ולמשפחה",
    pros: ["ביטול ימי שרידות ל-33 מחלות – ייחודי!", "ליווי פסיכולוגי 24 מפגשים", "קרוהן עם כריתת מעי – ייחודי", "סכרת נעורים 100% עד גיל 21", "IN-SITU הרחב ביותר בשוק", "ללא קבוצות – פשוט ביותר"],
    cons: ["600,000 ₪ מקסימום (פחות ממגדל)", "אין חוות דעת Mayo Clinic", "אין שירות HUG", "אין בירור זכויות כמו CARE"],
    unique: ["ביטול ימי שרידות ל-33 מחלות", "ליווי פסיכולוגי מובנה למשפחה", "קרוהן עם כריתת מעי", "סכרת נעורים 100% עד גיל 21"],
    notes_age_child: "מצוין – סכרת נעורים 100%, ביטול שרידות, ליווי פסיכולוגי",
    notes_age_young: "מצוין – פשטות, ביטול שרידות, כיסוי מיידי",
    notes_age_middle: "טוב – סרטן חוזר 100%, ביטול שרידות",
    notes_age_senior: "טוב – שים לב להפחתה 50% מגיל 70",
    price_300k: "~23 ₪ לילד / ~90 ₪ גיל 40 / ~230 ₪ גיל 55",
    price_500k: "~38 ₪ לילד / ~150 ₪ גיל 40 / ~380 ₪ גיל 55",
  },
  מנורה: {
    product: "קרן אור TOP",
    color: "#1A5E2A",
    max_sum: "600,000 ₪",
    diseases: "40",
    groups: "3 קבוצות",
    waiting: "90 יום (365 יום קבוצה 1 / 180 יום קבוצה 2)",
    cancer_recur: "25% בלבד (!) כשסרטן ראשון",
    insitu: "19 סוגים – 20% שד/ערמונית, 10% אחרים",
    age_entry: "0–64",
    age_exit: "75",
    unique_service: "Mayo Clinic חוות דעת + מנורה HUG ליווי",
    pros: ["חוות דעת Mayo Clinic – ייחודי!", "מנורה HUG – ליווי אישי להחלמה", "פיצוי 10% לפטירה 48ש׳–10 ימים", "פיצוי 10%: צנתור / מפרצת / הוצאת עין", "הפחתה הדרגתית 5%/שנה מגיל 65"],
    cons: ["40 מחלות – הפחות מבין השלוש", "סרטן חוזר: 25% בלבד (!) – חסרון קריטי", "3 קבוצות – מורכב", "600,000 ₪ מקסימום", "אין ליווי פסיכולוגי מובנה"],
    unique: ["Mayo Clinic – חוות דעת שנייה בארה״ב", "מנורה HUG – ליווי אישי", "פיצוי לפטירה מהירה (48ש׳–10 ימים)", "הפחתה הדרגתית מגיל 65 (לא בבת אחת)"],
    notes_age_child: "פחות מתאים – אין כיסויים ייחודיים לילדים, סרטן חוזר 25%",
    notes_age_young: "בינוני – Mayo Clinic יתרון, אבל סרטן חוזר 25% חסרון",
    notes_age_middle: "טוב – Mayo Clinic + HUG לליווי רפואי מקצועי",
    notes_age_senior: "טוב – הפחתה הדרגתית מגיל 65 יתרון, Mayo Clinic",
    price_300k: "~24 ₪ לילד / ~95 ₪ גיל 40 / ~240 ₪ גיל 55",
    price_500k: "~40 ₪ לילד / ~158 ₪ גיל 40 / ~400 ₪ גיל 55",
  },
  AIG: {
    product: "Extra Care",
    color: "#003087",
    max_sum: "700,000 ₪",
    diseases: "45 (48 לילדים)",
    groups: "3 קבוצות (קבוצה 1 = סיום פוליסה!)",
    waiting: "90 יום (180 יום מקרה שני)",
    cancer_recur: "100% לאחר 5 שנות החלמה",
    insitu: "רשימה מוגבלת",
    age_entry: "6 חודשים–65",
    age_exit: "75",
    unique_service: "תגמולים חודשיים 2,000 ₪ × 12 חודשים – ייחודי בשוק!",
    pros: ["תגמולים חודשיים 2,000 ₪ × 12 – ייחודי בשוק!", "45 מחלות (48 לילדים) – הרשימה הרחבה", "מחלות נדירות: דוויק, פסציאיטיס, שבץ ספינלי", "700,000 ₪ מקסימום", "מקום 1 שירות רשות שוק ההון 2024"],
    cons: ["קבוצה 1: הפוליסה מסתיימת לחלוטין!", "אין חוות דעת בחו״ל", "אין ליווי פסיכולוגי", "IN-SITU מוגבל"],
    unique: ["תגמולים חודשיים 2,000 ₪ × 12 חודשים", "48 מחלות לילדים", "מחלת דוויק, פסציאיטיס נמקית, שבץ ספינלי", "מקום 1 שירות רשות שוק ההון 2024"],
    notes_age_child: "מצוין – 48 מחלות לילד, הרשימה הרחבה ביותר",
    notes_age_young: "מצוין – תגמולים חודשיים לאובדן הכנסה",
    notes_age_middle: "מצוין – תגמולים חודשיים + 700K",
    notes_age_senior: "בינוני – שים לב לקבוצה 1 שמסיימת פוליסה",
    price_300k: "~27 ₪ לילד / ~100 ₪ גיל 40 / ~260 ₪ גיל 55",
    price_500k: "~45 ₪ לילד / ~167 ₪ גיל 40 / ~433 ₪ גיל 55",
  },
  הראל: {
    product: "מענקית זהב",
    color: "#6C3483",
    max_sum: "600,000 ₪",
    diseases: "39",
    groups: "3 קבוצות",
    waiting: "90 יום",
    cancer_recur: "100% לאחר 5 שנות החלמה",
    insitu: "רשימה סגורה",
    age_entry: "0–65",
    age_exit: "75",
    unique_service: "סיסטיק פיברוזיס 100% – ייחודי! + החזר פרמיה לפטירה לפני 60",
    pros: ["סיסטיק פיברוזיס 100% – ייחודי בשוק!", "סכרת נעורים 100%", "החזר פרמיה לפטירה לפני גיל 60", "הגדלת כיסוי 10% ללא הצהרת בריאות", "מחיר זול יחסית"],
    cons: ["39 מחלות – פחות מהאחרים", "600,000 ₪ מקסימום", "אין שירותי ליווי מיוחדים", "3 קבוצות"],
    unique: ["סיסטיק פיברוזיס 100% – היחידה בשוק!", "החזר פרמיה לפטירה לפני גיל 60", "הגדלת כיסוי ללא הצהרת בריאות"],
    notes_age_child: "מצוין לילד עם סיסטיק פיברוזיס במשפחה – ייחודי!",
    notes_age_young: "טוב – מחיר נמוך, החזר פרמיה",
    notes_age_middle: "בינוני – פחות מחלות מהמתחרים",
    notes_age_senior: "בינוני",
    price_300k: "~20 ₪ לילד / ~85 ₪ גיל 40 / ~210 ₪ גיל 55",
    price_500k: "~33 ₪ לילד / ~142 ₪ גיל 40 / ~350 ₪ גיל 55",
  },
  כלל: {
    product: "מדיכלל",
    color: "#784212",
    max_sum: "700,000 ₪",
    diseases: "33",
    groups: "4 קבוצות",
    waiting: "90 יום (180 יום מקרה שני)",
    cancer_recur: "25% בלבד (!) כשסרטן ראשון",
    insitu: "שד, ערמונית, צוואר רחם בלבד",
    age_entry: "0–64",
    age_exit: "75",
    unique_service: "צליאק גיל 5-35: 50% עד 50,000 ₪ – ייחודי!",
    pros: ["צליאק גיל 5-35 (50%) – ייחודי בשוק!", "700,000 ₪ מקסימום", "פרמיה קבועה עד גיל 21", "מחיר זול"],
    cons: ["33 מחלות – הפחות בשוק!", "סרטן חוזר: 25% בלבד – חסרון קריטי!", "4 קבוצות – המורכב ביותר", "IN-SITU מוגבל מאוד", "אין שירותי ליווי"],
    unique: ["צליאק גיל 5-35 (50% עד 50,000 ₪) – ייחודי!", "פרמיה קבועה עד גיל 21"],
    notes_age_child: "מתאים רק אם יש צליאק במשפחה – אחרת לא מומלץ",
    notes_age_young: "פחות מתאים – 33 מחלות בלבד",
    notes_age_middle: "פחות מתאים – סרטן חוזר 25% חסרון קריטי",
    notes_age_senior: "פחות מתאים",
    price_300k: "~18 ₪ לילד / ~75 ₪ גיל 40 / ~190 ₪ גיל 55",
    price_500k: "~30 ₪ לילד / ~125 ₪ גיל 40 / ~316 ₪ גיל 55",
  },
  איילון: {
    product: "בשביל החוסן",
    color: "#0E6655",
    max_sum: "600,000 ₪",
    diseases: "43",
    groups: "4 קבוצות",
    waiting: "90 יום (365 יום מקרה שני – הארוך ביותר!)",
    cancer_recur: "100% לאחר 5 שנות החלמה",
    insitu: "שד (20%), ערמונית (20%), צוואר רחם (10%)",
    age_entry: "2–65",
    age_exit: "75",
    unique_service: "100% לצנתור כלילי + כיסוי שבר ירך/החלפת מפרק – ייחודי!",
    pros: ["100% לצנתור כלילי – הגבוה בשוק!", "שבר ירך + החלפת מפרק – ייחודי!", "מקרה שלישי אפשרי", "פיצוי למוטב לפטירה 14+ ימים", "סכרת נעורים 100%"],
    cons: ["600,000 ₪ מקסימום", "365 יום אכשרה מקרה שני – הארוך ביותר!", "4 קבוצות", "אין תגמולים חודשיים", "גיל כניסה מגיל 2 (לא מלידה)"],
    unique: ["100% לצנתור כלילי (לא 10%)", "שבר ירך + החלפת מפרק", "מקרה שלישי אפשרי", "פיצוי למוטב לפטירה 14+ ימים"],
    notes_age_child: "טוב – סכרת נעורים 100%, אבל כניסה מגיל 2",
    notes_age_young: "בינוני – 365 יום אכשרה שנייה חסרון",
    notes_age_middle: "מצוין – 100% לצנתור, רלוונטי מגיל 45+",
    notes_age_senior: "מצוין – צנתור 100%, אורתופדיה, מקרה שלישי",
    price_300k: "~30 ₪ לילד / ~110 ₪ גיל 40 / ~280 ₪ גיל 55",
    price_500k: "~50 ₪ לילד / ~183 ₪ גיל 40 / ~466 ₪ גיל 55",
  },
  הכשרה: {
    product: "מחלות קשות",
    color: "#1A5276",
    max_sum: "500,000 ₪",
    diseases: "35",
    groups: "3 קבוצות",
    waiting: "90 יום",
    cancer_recur: "100% לאחר 5 שנות החלמה",
    insitu: "רשימה מוגבלת",
    age_entry: "0–65",
    age_exit: "75",
    unique_service: "ביטוח משלים לפוליסות קיימות",
    pros: ["מחיר תחרותי", "מתאים כביטוח משלים", "תנאים גמישים"],
    cons: ["500,000 ₪ מקסימום – הנמוך בשוק", "35 מחלות – מוגבל", "שירותי ליווי מינימליים"],
    unique: ["מתאים כביטוח משלים לפוליסות קיימות"],
    notes_age_child: "פחות מומלץ – 500K מקסימום",
    notes_age_young: "מתאים כפוליסה משלימה",
    notes_age_middle: "מתאים כפוליסה משלימה",
    notes_age_senior: "מתאים כפוליסה משלימה",
    price_300k: "~32 ₪ לילד / ~120 ₪ גיל 40 / ~300 ₪ גיל 55",
    price_500k: "לא זמין (מקסימום 500K)",
  },
};

// ── Helper: get age note ──────────────────────────────────────────────────────
function getAgeNote(co, age) {
  if (!age) return '';
  if (age <= 17) return co.notes_age_child;
  if (age <= 35) return co.notes_age_young;
  if (age <= 55) return co.notes_age_middle;
  return co.notes_age_senior;
}

function getAgeFit(co, age) {
  if (!age) return 'לא צוין';
  const note = getAgeNote(co, age);
  if (note && (note.startsWith('מצוין') || note.startsWith('הכי מתאים'))) return 'מתאים מאוד';
  if (note && (note.startsWith('טוב') || note.startsWith('בינוני'))) return 'מתאים';
  return 'פחות מתאים';
}

function getScores(co, age) {
  const base = {
    מגדל:   {cov:90, svc:85, sim:80, val:88},
    הפניקס: {cov:82, svc:85, sim:95, val:83},
    מנורה:  {cov:78, svc:92, sim:72, val:80},
    AIG:    {cov:88, svc:90, sim:75, val:82},
    הראל:   {cov:75, svc:78, sim:78, val:80},
    כלל:    {cov:65, svc:72, sim:68, val:72},
    איילון: {cov:80, svc:80, sim:70, val:78},
    הכשרה:  {cov:65, svc:68, sim:75, val:70},
  };
  const s = base[co] || {cov:75, svc:75, sim:75, val:75};
  return {score_coverage: s.cov, score_service: s.svc, score_simplicity: s.sim, score_value: s.val};
}

function getPriceInfo(coName, age, amount) {
  const co = DB[coName];
  if (!co) return 'לא ידוע';
  const use500 = amount && amount.includes('500');
  return use500 ? co.price_500k : co.price_300k;
}

// ── API ───────────────────────────────────────────────────────────────────────
app.post('/api/compare', async (req, res) => {
  const { companies, age, gender, smoke, amount } = req.body;

  if (!companies || companies.length === 0) {
    return res.status(400).json({ error: 'נדרשת לפחות חברה אחת' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API Key חסר' });

  // Build DB data for requested companies
  const coData = companies.map(name => {
    // Try exact match first, then partial
    const key = Object.keys(DB).find(k => k === name || name.includes(k) || k.includes(name));
    return key ? { name, ...DB[key], ...getScores(key, age), age_fit: getAgeFit(DB[key], age), price_info: getPriceInfo(key, age, amount) } : null;
  }).filter(Boolean);

  // Build comparison table from DB
  const compTable = [
    { param: "שם המוצר",             values: coData.map(c => c.product) },
    { param: "מחלות מכוסות",         values: coData.map(c => c.diseases) },
    { param: "סכום ביטוח מקסימלי",  values: coData.map(c => c.max_sum) },
    { param: "חלוקה לקבוצות",        values: coData.map(c => c.groups) },
    { param: "תקופת אכשרה",          values: coData.map(c => c.waiting) },
    { param: "סרטן חוזר",            values: coData.map(c => c.cancer_recur) },
    { param: "סרטן IN-SITU",         values: coData.map(c => c.insitu) },
    { param: "גיל כניסה",            values: coData.map(c => c.age_entry) },
    { param: "גיל סיום כיסוי",       values: coData.map(c => c.age_exit) },
    { param: "שירות ייחודי",         values: coData.map(c => c.unique_service) },
    { param: `מחיר משוער (${amount || '300,000 ₪'})`, values: coData.map(c => c.price_info) },
  ];

  // Ask AI only for recommendations and summary (not raw facts)
  const dbSummary = coData.map(c =>
    `${c.name} (${c.product}): ${c.diseases} מחלות, ${c.max_sum}, סרטן חוזר: ${c.cancer_recur}, ייחודי: ${c.unique.join(', ')}`
  ).join(' | ');

  const ageCtx = age ? `לקוח גיל ${age}${gender ? ' ' + gender : ''}${smoke ? ' ' + smoke : ''}.` : '';
  const ageNote = age ? `התאמה לגיל ${age}: ${coData.map(c => c.name + ' – ' + getAgeNote(c, age)).join('. ')}.` : '';

  const prompt = `מומחה ביטוח ישראל. ${ageCtx} נתונים מדויקים: ${dbSummary}. ${ageNote} צור רק: summary (2 משפטים), age_recommendation (משפט אחד לגיל ${age||''}), recommendations (4 פריטים לפי פרופיל), critical_diffs (3 הבדלים). JSON בלבד: {"summary":"","age_recommendation":"","recommendations":[{"profile":"","company":"","reason":""}],"critical_diffs":["",""]}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 1000, messages: [{ role: 'user', content: prompt }] }),
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
    // Fallback: return DB data without AI
    res.json({
      summary: `השוואה בין ${companies.join(', ')} בתחום מחלות קשות`,
      age_recommendation: age ? `לגיל ${age}: ${coData.map(c => c.name + ' – ' + getAgeNote(c, age)).join('. ')}` : '',
      companies: coData,
      comparison_table: compTable,
      recommendations: coData.map(c => ({ profile: getAgeNote(c, age) || 'לקוח כללי', company: c.name, reason: c.unique[0] || '' })),
      critical_diffs: ["סרטן חוזר: " + coData.map(c => c.name + ' ' + c.cancer_recur).join(' | '), "מחלות: " + coData.map(c => c.name + ' ' + c.diseases).join(' | ')],
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
