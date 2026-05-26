const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.REACT_APP_GEMINI_KEY}`;

// telling gemini exactly what shape i want back
// took a few tries to get it to stop wrapping in markdown
const SYSTEM_PROMPT = `You are an expert at explaining German bureaucratic letters to English-speaking expats.

When given a German letter, respond with ONLY a valid JSON object. No markdown, no code fences, no extra text — just raw JSON.

The JSON must have exactly these fields:

{
  "sender": "Name of the sending authority or organisation",
  "date": "Date of the letter in English format e.g. 18 May 2026, or empty string if not found",
  "reference": "Reference number, tax number, case number, or empty string if not found",
  "summary": "2-3 sentence plain-English summary of what this letter is about and why it was sent.",
  "actions": ["Step 1 the recipient must take", "Step 2", "..."],
  "deadline": "Clear deadline e.g. 31 May 2025, or empty string if none",
  "letterType": "One of: Formal demand, Payment notice, Appointment notice, Information only, Warning, Confirmation",
  "severity": "One of: urgent, action-required, info",
  "severityReason": "One sentence explaining why you chose this severity level"
}

severity guide:
- urgent = legal consequences, fines, service suspension, or rights at risk
- action-required = must do something but no immediate legal threat
- info = no action needed, purely informational

Be direct, friendly, and reassuring. Avoid jargon. Always return valid JSON only.`;

function buildParts(fileData, text) {
  const parts = [{ text: SYSTEM_PROMPT }];

  if (fileData?.base64) {
    parts.push({
      inlineData: { mimeType: fileData.mediaType, data: fileData.base64 },
    });
    parts.push({
      text: "Please explain this German letter. Return only JSON.",
    });
  } else {
    const content = text || fileData?.text || "";
    parts.push({
      text: `Please explain this German letter. Return only JSON.\n\n${content}`,
    });
  }

  return parts;
}

function parseGeminiResponse(raw) {
  // gemini sometimes wraps in ```json even when you tell it not to
  const cleaned = raw
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("Couldn't find JSON in the response. Please try again.");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

export async function explainLetter(fileData, pastedText) {
  const parts = buildParts(fileData, pastedText);

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts }],
      generationConfig: { maxOutputTokens: 8192, temperature: 0.2 },
    }),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody?.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  // console.log("gemini raw response", data);

  const candidate = data.candidates?.[0];

  if (candidate?.finishReason === "MAX_TOKENS") {
    throw new Error("Response was cut off — try a shorter letter.");
  }

  const raw = candidate?.content?.parts?.[0]?.text || "";
  return parseGeminiResponse(raw);
}
