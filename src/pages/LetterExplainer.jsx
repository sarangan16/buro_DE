import { useState, useRef, useCallback } from "react";
import styles from "./LetterExplainer.module.css";
import { SAMPLES, readFile } from "./utils";
import { explainLetter } from "./api";
import ResultCard from "./ResultCard";

const geminiKeyMissing = !process.env.REACT_APP_GEMINI_KEY;

function Spinner() {
  return <div className={styles.spinner} aria-label="Loading" />;
}

function UploadIcon() {
  return (
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
  );
}

export default function LetterExplainer() {
  const [file, setFile] = useState(null);
  const [pastedText, setPastedText] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);
  const canExplain = (file || pastedText.trim()) && !geminiKeyMissing;

  function resetState() {
    setResult(null);
    setError(null);
  }

  const onFileSelected = useCallback((f) => {
    if (!f) return;
    setFile(f);
    resetState();
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      onFileSelected(e.dataTransfer.files[0]);
    },
    [onFileSelected],
  );

  function onSampleClick(key) {
    setPastedText(SAMPLES[key].text);
    setFile(null);
    resetState();
  }

  function removeFile() {
    setFile(null);
    fileInputRef.current.value = "";
  }

  async function onExplainClick() {
    if (!canExplain || loading) return;

    setLoading(true);
    resetState();

    try {
      // read the file first if there is one, then pass it to the api call
      let fileData = null;
      if (file) {
        fileData = await readFile(file);
        console.log("file read ok, type:", file.type);
      }

      const parsed = await explainLetter(fileData, pastedText);
      setResult(parsed);
    } catch (err) {
      console.error("explain failed:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.root}>
      {geminiKeyMissing && (
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
          onDrop={onDrop}
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
            onChange={(e) => onFileSelected(e.target.files[0])}
          />
          <UploadIcon />
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
              onClick={removeFile}
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
          rows={4}
          onChange={(e) => {
            setPastedText(e.target.value);
            resetState();
          }}
        />

        <button
          className={styles.explainBtn}
          disabled={!canExplain || loading}
          onClick={onExplainClick}
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

      {!result && !loading && (
        <div className={styles.samples}>
          <p className={styles.samplesLabel}>Try a sample letter</p>
          <div className={styles.chips}>
            {Object.entries(SAMPLES).map(([key, { label }]) => (
              <button
                key={key}
                className={styles.chip}
                onClick={() => onSampleClick(key)}
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

      {result && (
        <div className={styles.resultWrapper}>
          <ResultCard data={result} fileName={file?.name} />
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
