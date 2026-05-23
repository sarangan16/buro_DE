// api/chat.js
// Vercel serverless function — proxies requests to Groq
// GROQ_API_KEY lives in Vercel env vars, never in the browser

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, system } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages" });
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1000,
          messages: [{ role: "system", content: system }, ...messages],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    // Normalize to same shape AiCopilot.jsx expects
    const reply =
      data.choices?.[0]?.message?.content || "Sorry, something went wrong.";
    return res.status(200).json({ content: [{ text: reply }] });
  } catch (err) {
    console.error("Groq proxy error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
