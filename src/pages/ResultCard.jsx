import styles from "./LetterExplainer.module.css";
import { getIconForLetter, SEVERITY_CONFIG } from "./utils";

export default function ResultCard({ data, fileName }) {
  const sevKey = SEVERITY_CONFIG[data.severity] ? data.severity : "info";
  const sev = SEVERITY_CONFIG[sevKey];
  const icon = getIconForLetter(data.sender, data.letterType);

  const hasActions =
    Array.isArray(data.actions) &&
    data.actions.length > 0 &&
    data.actions[0] !== "No action needed.";

  const hasDeadline = data.deadline?.trim();

  // fallback to filename if sender wasn't parsed
  const displayName = data.sender || fileName || "Your letter";
  const metaLine =
    [data.date, data.reference].filter(Boolean).join(" · ") ||
    "No date or reference found";

  return (
    <div className={styles.resultCard}>
      <div className={styles.cardHeader}>
        <div className={styles.senderIcon}>
          <i className={`ti ${icon}`} aria-hidden="true" />
        </div>
        <div className={styles.senderMeta}>
          <div className={styles.senderName}>{displayName}</div>
          <div className={styles.senderDate}>{metaLine}</div>
        </div>
        <div className={`${styles.severityBadge} ${styles[sev.badgeClass]}`}>
          <span className={`${styles.sevDot} ${styles[sev.dotClass]}`} />
          {sev.label}
        </div>
      </div>

      <div className={styles.summaryBlock}>
        <p className={styles.summaryText}>{data.summary}</p>
      </div>

      <div className={styles.sections}>
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

        {hasActions && (
          <div className={styles.section}>
            <div className={`${styles.sectionIcon} ${styles.iconAction}`}>
              <i className="ti ti-list-check" aria-hidden="true" />
            </div>
            <div className={styles.sectionBody}>
              <span className={styles.sectionLabel}>What you need to do</span>
              <ul className={styles.actionList}>
                {data.actions.map((action, i) => (
                  <li key={i}>{action}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className={styles.section}>
          <div className={`${styles.sectionIcon} ${styles.iconType}`}>
            <i className="ti ti-info-circle" aria-hidden="true" />
          </div>
          <div className={styles.sectionBody}>
            <span className={styles.sectionLabel}>Type of letter</span>
            <div className={styles.typeRow}>
              <span
                className={`${styles.typeBadge} ${sevKey === "info" ? styles.typeBadgeInfo : styles.typeBadgeAction}`}
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
