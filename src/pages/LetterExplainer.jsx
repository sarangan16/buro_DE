import { useState, useRef, useCallback } from "react";
import styles from "./LetterExplainer.module.css";

const SAMPLES = {
  anmeldung: {
    label: "Anmeldung notice",
    text: `Einwohnermeldeamt Berlin-Mitte
Datum: 20. Mai 2026

Betreff: Erinnerung zur Ummeldung Ihres Wohnsitzes

Sehr geehrte Damen und Herren,

laut unseren Unterlagen sind Sie seit dem 15. März 2026 unter der Anschrift Schönhauser Allee 42, 10435 Berlin gemeldet. Bitte beachten Sie, dass Sie gemäß § 17 Bundesmeldegesetz verpflichtet sind, sich innerhalb von zwei Wochen nach dem Einzug anzumelden.

Wir bitten Sie daher, umgehend das Einwohnermeldeamt aufzusuchen und die Ummeldung nachzuholen. Bitte bringen Sie folgende Unterlagen mit:
- Personalausweis oder Reisepass
- Wohnungsgeberbestätigung Ihres Vermieters
- Ausgefülltes Anmeldeformular

Bei Nichtbeachtung droht gemäß § 54 BMG ein Bußgeld von bis zu 1.000 Euro.

Mit freundlichen Grüßen
Das Einwohnermeldeamt Berlin-Mitte`,
  },
  finanzamt: {
    label: "Finanzamt reminder",
    text: `Finanzamt Düsseldorf-Mitte
Steuer-Nr: 134/5678/9012
Datum: 18. Mai 2026

Betreff: Erinnerung – Abgabe Ihrer Einkommensteuererklärung 2024

Sehr geehrte Damen und Herren,

bis heute ist Ihre Einkommensteuererklärung für das Steuerjahr 2024 noch nicht bei uns eingegangen. Die Abgabefrist endete am 31. März 2026.

Wir fordern Sie auf, die Erklärung bis spätestens 15. Juni 2026 einzureichen. Nach Ablauf dieser Frist wird das Finanzamt die Steuer schätzen. Zusätzlich kann ein Verspätungszuschlag von bis zu 10% der festgesetzten Steuer erhoben werden.

Mit freundlichen Grüßen
Finanzamt Düsseldorf-Mitte`,
  },
  auslaenderbehoerde: {
    label: "Ausländerbehörde",
    text: `Ausländerbehörde Frankfurt am Main
Aktenzeichen: 2026-AF-8834
Datum: 22. Mai 2026

Betreff: Verlängerung Ihrer Aufenthaltserlaubnis – Termin und erforderliche Unterlagen

Sehr geehrte Frau/Herr,

Ihre Aufenthaltserlaubnis läuft am 30. Juni 2026 ab. Ihr Termin ist am 10. Juni 2026 um 10:30 Uhr, Zimmer 204.

Bitte bringen Sie mit: Reisepass, Passfoto, Mietvertrag, Krankenversicherungsnachweis, Einkommensnachweis (3 Monate), Antragsformular.

Mit freundlichen Grüßen
Ausländerbehörde Frankfurt`,
  },
  krankenversicherung: {
    label: "Krankenversicherung",
    text: `AOK Rheinland/Hamburg
Kundennummer: 1234567890
Datum: 19. Mai 2026

Betreff: Wichtige Mitteilung zu Ihrem Beitragskonto

Sehr geehrte Damen und Herren,

laut unseren Unterlagen weist Ihr Beitragskonto einen rückständigen Betrag von 284,50 Euro auf (Beitragsmonat: März und April 2026).

Wir bitten Sie dringend, diesen Betrag bis zum 31. Mai 2026 zu begleichen.
IBAN: DE12 3456 7890 1234 5678 90 | BIC: AOKHDE33

Bei ausbleibender Zahlung kann die AOK Ihre Mitgliedschaft auf Notfallversorgung beschränken.

Mit freundlichen Grüßen
AOK Rheinland/Hamburg`,
  },
};

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

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const isBinary =
      file.type === "application/pdf" || file.type.startsWith("image/");
    reader.onerror = () => reject(new Error("Could not read file"));
    if (isBinary) {
      reader.onload = () =>
        resolve({ base64: reader.result.split(",")[1], mediaType: file.type });
      reader.readAsDataURL(file);
    } else {
      reader.onload = () => resolve({ text: reader.result });
      reader.readAsText(file);
    }
  });
}

const GEMINI_KEY = process.env.REACT_APP_GEMINI_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

async function callGemini(file, pastedText) {
  const parts = [];
  parts.push({ text: SYSTEM_PROMPT });

  if (
    file &&
    (file.type === "application/pdf" || file.type.startsWith("image/"))
  ) {
    const { base64, mediaType } = await readFile(file);
    parts.push({ inlineData: { mimeType: mediaType, data: base64 } });
    parts.push({
      text: "Please explain this German letter. Return only JSON.",
    });
  } else {
    let letterText = pastedText.trim();
    if (file) {
      const { text } = await readFile(file);
      letterText = text;
    }
    parts.push({
      text: `Please explain this German letter. Return only JSON.\n\n${letterText}`,
    });
  }

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts }],
      generationConfig: { maxOutputTokens: 8192, temperature: 0.2 },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }

  const apiData = await res.json();
  const finishReason = apiData.candidates?.[0]?.finishReason;
  if (finishReason === "MAX_TOKENS") {
    throw new Error(
      "The response was cut off (MAX_TOKENS). Try a shorter letter or contact support.",
    );
  }
  const raw = apiData.candidates?.[0]?.content?.parts?.[0]?.text || "";

  // Strip markdown fences Gemini sometimes wraps around JSON
  const cleaned = raw
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("Could not find JSON in the response. Please try again.");
  }
  const jsonSlice = cleaned.slice(start, end + 1);

  try {
    return JSON.parse(jsonSlice);
  } catch {
    throw new Error("Failed to parse the letter analysis. Please try again.");
  }
}

function Spinner() {
  return <div className={styles.spinner} aria-label="Loading" />;
}

const SEVERITY_CONFIG = {
  urgent: {
    label: "Urgent — act now",
    badgeClass: styles.sevUrgent,
    dotClass: styles.dotUrgent,
  },
  "action-required": {
    label: "Action required",
    badgeClass: styles.sevAction,
    dotClass: styles.dotAction,
  },
  info: {
    label: "Information only",
    badgeClass: styles.sevInfo,
    dotClass: styles.dotInfo,
  },
};

function senderIcon(sender = "", letterType = "") {
  const s = (sender + letterType).toLowerCase();
  if (s.includes("finanz") || s.includes("steuer") || s.includes("tax"))
    return "ti-receipt-tax";
  if (s.includes("ausländer") || s.includes("visa") || s.includes("aufenthalt"))
    return "ti-passport";
  if (
    s.includes("kranken") ||
    s.includes("aok") ||
    s.includes("health") ||
    s.includes("versicherung")
  )
    return "ti-heart-rate-monitor";
  if (s.includes("melde") || s.includes("einwohner") || s.includes("register"))
    return "ti-map-pin";
  if (s.includes("payment") || s.includes("zahlung") || s.includes("beitrag"))
    return "ti-credit-card";
  if (s.includes("appointment") || s.includes("termin"))
    return "ti-calendar-event";
  return "ti-building-bank";
}

function ResultCard({ data, fileName }) {
  const sevKey =
    data.severity && SEVERITY_CONFIG[data.severity] ? data.severity : "info";
  const sev = SEVERITY_CONFIG[sevKey];
  const icon = senderIcon(data.sender, data.letterType);

  const hasActions =
    Array.isArray(data.actions) &&
    data.actions.length > 0 &&
    data.actions[0] !== "No action needed.";

  const hasDeadline = data.deadline && data.deadline.trim() !== "";

  return (
    <div className={styles.resultCard}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.senderIcon}>
          <i className={`ti ${icon}`} aria-hidden="true" />
        </div>
        <div className={styles.senderMeta}>
          <div className={styles.senderName}>
            {data.sender || fileName || "Your letter"}
          </div>
          <div className={styles.senderDate}>
            {[data.date, data.reference].filter(Boolean).join(" · ") ||
              "No date or reference found"}
          </div>
        </div>
        <div className={`${styles.severityBadge} ${sev.badgeClass}`}>
          <span className={`${styles.sevDot} ${sev.dotClass}`} />
          {sev.label}
        </div>
      </div>

      {/* Summary */}
      <div className={styles.summaryBlock}>
        <p className={styles.summaryText}>{data.summary}</p>
      </div>

      {/* Sections */}
      <div className={styles.sections}>
        {/* Deadline */}
        {hasDeadline && (
          <div className={styles.section}>
            <div className={`${styles.sectionIcon} ${styles.iconDeadline}`}>
              <i className="ti ti-calendar-due" aria-hidden="true" />
            </div>
            <div className={styles.sectionBody}>
              <span className={styles.sectionLabel}>Deadline</span>
              <div className={styles.deadlinePill}>
                <i
                  className="ti ti-clock"
                  style={{ fontSize: 13 }}
                  aria-hidden="true"
                />
                {data.deadline}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        {hasActions && (
          <div className={styles.section}>
            <div className={`${styles.sectionIcon} ${styles.iconAction}`}>
              <i className="ti ti-list-check" aria-hidden="true" />
            </div>
            <div className={styles.sectionBody}>
              <span className={styles.sectionLabel}>What you need to do</span>
              <ul className={styles.actionList}>
                {data.actions.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Letter type */}
        <div className={styles.section}>
          <div className={`${styles.sectionIcon} ${styles.iconType}`}>
            <i className="ti ti-info-circle" aria-hidden="true" />
          </div>
          <div className={styles.sectionBody}>
            <span className={styles.sectionLabel}>Type of letter</span>
            <div className={styles.typeRow}>
              <span
                className={`${styles.typeBadge} ${
                  sevKey === "info"
                    ? styles.typeBadgeInfo
                    : styles.typeBadgeAction
                }`}
              >
                {data.letterType || "Notice"}
              </span>
              {data.severityReason && (
                <span className={styles.severityReason}>
                  {data.severityReason}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LetterExplainer() {
  const [file, setFile] = useState(null);
  const [pastedText, setPastedText] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [letterData, setLetterData] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const isReady = file || pastedText.trim();
  const missingKey = !GEMINI_KEY;

  const handleFile = useCallback((f) => {
    if (!f) return;
    setFile(f);
    setLetterData(null);
    setError(null);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile],
  );

  const handleSample = (key) => {
    setPastedText(SAMPLES[key].text);
    setFile(null);
    setLetterData(null);
    setError(null);
  };

  const handleExplain = async () => {
    if (!isReady || missingKey) return;
    setLoading(true);
    setLetterData(null);
    setError(null);
    try {
      const parsed = await callGemini(file, pastedText);
      setLetterData(parsed);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      {missingKey && (
        <div className={styles.keyBanner}>
          <strong>Setup needed:</strong> Add{" "}
          <code>REACT_APP_GEMINI_KEY=your_key</code> to your <code>.env</code>{" "}
          file.{" "}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
          >
            Get a free key →
          </a>
        </div>
      )}

      <header className={styles.hero}>
        <p className={styles.eyebrow}>Briefklar · Letter Explainer</p>
        <h1 className={styles.headline}>
          Upload your German letter.
          <br />
          <em>Understand it in 30 seconds.</em>
        </h1>
        <p className={styles.sub}>No signup. No waiting. Just clarity.</p>
        <span className={styles.badge}>
          <span className={styles.dot} />
          No signup required
        </span>
      </header>

      <div className={styles.uploadArea}>
        <div
          className={`${styles.dropzone} ${dragOver ? styles.dragOver : ""}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          aria-label="Upload letter file"
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.txt"
            className={styles.hiddenInput}
            onChange={(e) => handleFile(e.target.files[0])}
          />
          <svg
            className={styles.uploadIcon}
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className={styles.dropLabel}>Drop your letter here</p>
          <p className={styles.dropHint}>
            PDF, image, or text file · up to 10 MB
          </p>
        </div>

        {file && (
          <div className={styles.filePreview}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span className={styles.fileNameText}>{file.name}</span>
            <button
              className={styles.removeBtn}
              onClick={() => {
                setFile(null);
                fileInputRef.current.value = "";
              }}
              aria-label="Remove file"
            >
              ×
            </button>
          </div>
        )}

        <div className={styles.divider}>
          <span>or paste text</span>
        </div>

        <textarea
          className={styles.pasteArea}
          placeholder="Paste the German text from your letter here..."
          value={pastedText}
          onChange={(e) => {
            setPastedText(e.target.value);
            setLetterData(null);
            setError(null);
          }}
          rows={4}
        />

        <button
          className={styles.explainBtn}
          disabled={!isReady || loading || missingKey}
          onClick={handleExplain}
        >
          {loading ? (
            <>
              <Spinner /> Explaining…
            </>
          ) : (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Explain this letter
            </>
          )}
        </button>
      </div>

      {!letterData && !loading && (
        <div className={styles.samples}>
          <p className={styles.samplesLabel}>Try a sample letter</p>
          <div className={styles.chips}>
            {Object.entries(SAMPLES).map(([key, { label }]) => (
              <button
                key={key}
                className={styles.chip}
                onClick={() => handleSample(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className={styles.errorMsg} role="alert">
          {error}
        </div>
      )}

      {letterData && (
        <div className={styles.resultWrapper}>
          <ResultCard data={letterData} fileName={file?.name} />
        </div>
      )}

      <footer className={styles.trustBar}>
        <span className={styles.trustItem}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Not stored
        </span>
        <span className={styles.trustItem}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Free to use
        </span>
        <span className={styles.trustItem}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <a
            href="https://sarangan16.github.io/sarangan/"
            target="_blank"
            rel="noreferrer"
          >
            S4RANGAN
          </a>
        </span>
      </footer>
    </div>
  );
}
