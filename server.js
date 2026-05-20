const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/compare', async (req, res) => {
  const { companies, age, gender, smoke } = req.body;

  if (!companies || companies.length === 0) {
    return res.status(400).json({ error: 'נדרשת לפחות חברה אחת' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API Key חסר' });
  }

  const list = companies.join(', ');
  const isSingle = companies.length === 1;
  const ageCtx = age ? `לקוח גיל ${age}${gender ? ' ' + gender : ''}.` : '';

  const prompt = isSingle
    ? `אתה מומחה ביטוח ישראל. ${ageCtx} נתח פוליסת מחלות קשות של ${list}. החזר JSON בלבד ללא טקסט נוסף: {"summary":"טקסט","product_name":"","max_sum":"","diseases_count":"","unique":["","",""],"pros":["","",""],"cons":["",""],"age_recommendation":""}`
    : `אתה מומחה ביטוח ישראל. ${ageCtx} השווה מחלות קשות: ${list}. החזר JSON בלבד ללא טקסט נוסף: {"summary":"","age_recommendation":"","companies":[{"name":"","product":"","color":"#1B3A6B","max_sum":"","diseases":"","pros":["",""],"cons":["",""],"unique":["",""],"score_coverage":80,"score_service":75,"score_simplicity":70,"score_value":75,"age_fit":""}],"comparison_table":[{"param":"","values":["",""]}],"recommendations":[{"profile":"","company":"","reason":""}],"critical_diffs":["",""]}`;

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
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const result = await response.json();

    if (result.error) {
      return res.status(500).json({ error: result.error.message });
    }

    const raw = result.content[0].text;
    const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const data = JSON.parse(clean);
    res.json(data);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message || 'שגיאה לא ידועה' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
