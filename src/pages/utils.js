export const SAMPLES = {
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
IBAN: DE89 3704 0044 0532 0130 00 | BIC: COBADEFFXXX

Bei ausbleibender Zahlung kann die AOK Ihre Mitgliedschaft auf Notfallversorgung beschränken.

Mit freundlichen Grüßen
AOK Rheinland/Hamburg`,
  },
};

// reads a file and returns either base64 (for pdf/images) or plain text
export function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const isBinary =
      file.type === "application/pdf" || file.type.startsWith("image/");

    reader.onerror = () => reject(new Error("Could not read file"));

    if (isBinary) {
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        resolve({ base64, mediaType: file.type });
      };
      reader.readAsDataURL(file);
    } else {
      reader.onload = () => resolve({ text: reader.result });
      reader.readAsText(file);
    }
  });
}

// maps sender/type keywords to a tabler icon name
// probably should be a map not a bunch of ifs but this works fine
export function getIconForLetter(sender = "", letterType = "") {
  const combined = (sender + letterType).toLowerCase();

  if (combined.includes("finanz") || combined.includes("steuer"))
    return "ti-receipt-tax";
  if (combined.includes("ausländer") || combined.includes("aufenthalt"))
    return "ti-passport";
  if (
    combined.includes("kranken") ||
    combined.includes("aok") ||
    combined.includes("versicherung")
  )
    return "ti-heart-rate-monitor";
  if (combined.includes("melde") || combined.includes("einwohner"))
    return "ti-map-pin";
  if (combined.includes("zahlung") || combined.includes("beitrag"))
    return "ti-credit-card";
  if (combined.includes("termin")) return "ti-calendar-event";

  return "ti-building-bank";
}

export const SEVERITY_CONFIG = {
  urgent: {
    label: "Urgent — act now",
    badgeClass: "sevUrgent",
    dotClass: "dotUrgent",
  },
  "action-required": {
    label: "Action required",
    badgeClass: "sevAction",
    dotClass: "dotAction",
  },
  info: {
    label: "Information only",
    badgeClass: "sevInfo",
    dotClass: "dotInfo",
  },
};
