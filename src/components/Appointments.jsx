import React, { useState } from "react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

var officesData = {
  Berlin: {
    bookingUrl: "https://service.berlin.de/terminvereinbarung/",
    offices: [
      {
        id: 1,
        name: "Bürgeramt Rathaus Tiergarten",
        address: "Mathilde-Jacob-Platz 1, 10551 Berlin",
        services: ["Anmeldung", "Abmeldung", "Pass"],
      },
      {
        id: 2,
        name: "Bürgeramt Rathaus Mitte",
        address: "Karl-Marx-Allee 31, 10178 Berlin",
        services: ["Anmeldung", "Abmeldung", "Pass"],
      },
      {
        id: 3,
        name: "Bürgeramt Wedding",
        address: "Brunnenstraße 102, 13355 Berlin",
        services: ["Anmeldung", "Abmeldung"],
      },
      {
        id: 4,
        name: "Bürgeramt Neukölln",
        address: "Karl-Marx-Straße 118, 12043 Berlin",
        services: ["Abmeldung", "Pass"],
      },
    ],
  },
  Hamburg: {
    bookingUrl: "https://www.hamburg.de/buergerservice/",
    offices: [
      {
        id: 5,
        name: "Kundenzentrum Hamburg-Mitte",
        address: "Klosterwall 8, 20095 Hamburg",
        services: ["Anmeldung", "Abmeldung"],
      },
      {
        id: 6,
        name: "Kundenzentrum Billstedt",
        address: "Billstedt Center, Hamburg",
        services: ["Anmeldung", "Abmeldung"],
      },
      {
        id: 7,
        name: "Kundenzentrum Altona",
        address: "Große Bergstraße 254, 22767 Hamburg",
        services: ["Anmeldung", "Pass"],
      },
      {
        id: 8,
        name: "Kundenzentrum Harburg",
        address: "Rathausplatz 1, 21073 Hamburg",
        services: ["Abmeldung"],
      },
    ],
  },
  Munich: {
    bookingUrl: "https://www.muenchen.de/rathaus/terminvereinbarung",
    offices: [
      {
        id: 9,
        name: "Einwohnermeldeamt München-City (KVR)",
        address: "Ruppertstraße 19, 80466 München",
        services: ["Anmeldung", "Abmeldung", "Pass"],
      },
      {
        id: 10,
        name: "Einwohnermeldeamt München-West",
        address: "Pasinger Bahnhofsplatz 1, 81241 München",
        services: ["Anmeldung", "Abmeldung"],
      },
      {
        id: 11,
        name: "Einwohnermeldeamt München-Ost",
        address: "Klinikum der Universität München, 81925 München",
        services: ["Abmeldung"],
      },
    ],
  },
  Düsseldorf: {
    bookingUrl: "https://www.duesseldorf.de/buergerbuero/online-services",
    offices: [
      {
        id: 12,
        name: "Einwohnermeldeamt Düsseldorf-Oberkassel",
        address: "Luegallee 65, 40545 Düsseldorf",
        services: ["Anmeldung", "Abmeldung"],
      },
      {
        id: 13,
        name: "Einwohnermeldeamt Düsseldorf-Kaiserswerth",
        address: "Kaiserwerther Markt 35, 40489 Düsseldorf",
        services: ["Anmeldung", "Abmeldung"],
      },
      {
        id: 14,
        name: "Einwohnermeldeamt Düsseldorf-Düsseltal",
        address: "Kaiserswerther Str. 126, 40221 Düsseldorf",
        services: ["Pass"],
      },
    ],
  },
  Frankfurt: {
    bookingUrl: "https://frankfurt.de/buergeramt",
    offices: [
      {
        id: 15,
        name: "Bürgeramt Frankfurt-Nordwest",
        address: "Niddastraße 55, 60439 Frankfurt",
        services: ["Anmeldung", "Pass"],
      },
      {
        id: 16,
        name: "Bürgeramt Frankfurt-Süd",
        address: "Hessenplatz 2, 60528 Frankfurt",
        services: ["Anmeldung", "Abmeldung"],
      },
      {
        id: 17,
        name: "Bürgeramt Frankfurt-Zentrum",
        address: "Römerberg 1, 60311 Frankfurt",
        services: ["Abmeldung", "Pass"],
      },
    ],
  },
  Stuttgart: {
    bookingUrl: "https://www.stuttgart.de/buergerservices/",
    offices: [
      {
        id: 18,
        name: "Bürgeramt Stuttgart-Feuerbach",
        address: "Wilhelminenstraße 33, 70469 Stuttgart",
        services: ["Anmeldung", "Abmeldung"],
      },
      {
        id: 19,
        name: "Bürgeramt Stuttgart-Mitte",
        address: "Eberhardstraße 35, 70173 Stuttgart",
        services: ["Pass"],
      },
      {
        id: 20,
        name: "Bürgeramt Stuttgart-Süd",
        address: "Rotebühlstraße 137, 70197 Stuttgart",
        services: ["Abmeldung", "Pass"],
      },
    ],
  },
};

var documentsData = {
  Anmeldung: [
    { text: "Valid passport or national ID card", url: null },
    {
      text: "Wohnungsgeberbestätigung — your landlord's written confirmation that you live there",
      url: null,
    },
    {
      text: "Children's passports or birth certificates (if you have children)",
      url: null,
    },
    {
      text: "Written Vollmacht (power of attorney) + copy of your ID — only if someone else is going for you",
      url: null,
    },
    {
      text: "Download the Anmeldung form (Meldeschein)",
      url: "https://www.duesseldorf.de/fileadmin/Amt33/Einwohnermeldeamt/Formulare/Meldeschein.pdf",
    },
  ],
  Abmeldung: [
    { text: "Valid passport or national ID card", url: null },
    { text: "Completed Abmeldung form", url: null },
    {
      text: "If registering by mail: the 'Deregistration with Registration Authority' form",
      url: null,
    },
    {
      text: "Download the Abmeldung form",
      url: "https://www.stw.berlin/assets/sw-berlin/files/Wohnen/abmeldung_bei_der_meldebehoerde.pdf",
    },
  ],
  Pass: [
    {
      text: "Biometric passport photo — must be recent, offices are strict about this",
      url: null,
    },
    {
      text: "Current valid ID or the expired passport you are replacing",
      url: null,
    },
    {
      text: "Birth certificate — only needed if it's your first German passport",
      url: null,
    },
    {
      text: "For children under 16: both parents present, or one parent with written consent from the other",
      url: null,
    },
    {
      text: "Download the passport application form",
      url: "https://australien.diplo.de/resource/blob/2415828/171cd32165f7cd2b0236bf59509c63ac/antrag-pass-erwachsene-deutsch-englisch-data.pdf",
    },
  ],
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const S = {
  wrap: { fontFamily: "'DM Sans', sans-serif", padding: "32px" },
  steps: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "32px",
  },
  stepDone: {
    fontSize: "12px",
    padding: "5px 12px",
    borderRadius: "100px",
    fontWeight: "500",
    background: "#dcfce7",
    color: "#16a34a",
  },
  stepActive: {
    fontSize: "12px",
    padding: "5px 12px",
    borderRadius: "100px",
    fontWeight: "600",
    background: "#1a1a1a",
    color: "white",
  },
  stepIdle: {
    fontSize: "12px",
    padding: "5px 12px",
    borderRadius: "100px",
    fontWeight: "400",
    background: "#f4f4f3",
    color: "#9ca3af",
  },
  stepDash: { color: "#d1d5db", fontSize: "12px" },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: "600",
    color: "#9ca3af",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "11px 16px",
    fontSize: "14px",
    color: "#1a1a1a",
    outline: "none",
    background: "white",
    boxSizing: "border-box",
    fontFamily: "'DM Sans', sans-serif",
  },
  dropdown: {
    position: "absolute",
    zIndex: 10,
    marginTop: "4px",
    width: "100%",
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  },
  dropdownItem: {
    padding: "10px 16px",
    fontSize: "14px",
    color: "#374151",
    cursor: "pointer",
  },
  select: {
    width: "100%",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "11px 16px",
    fontSize: "14px",
    color: "#1a1a1a",
    outline: "none",
    background: "white",
    appearance: "none",
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
  },
  officeCard: {
    padding: "16px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    marginBottom: "8px",
    transition: "all 0.15s",
  },
  officeCardSelected: {
    padding: "16px",
    borderRadius: "10px",
    border: "1px solid #2563eb",
    background: "#eff6ff",
    cursor: "pointer",
    marginBottom: "8px",
  },
  officeTag: {
    fontSize: "11px",
    background: "#f4f4f3",
    color: "#6b7280",
    padding: "2px 8px",
    borderRadius: "100px",
    display: "inline-block",
    marginRight: "4px",
    marginTop: "6px",
  },
  divider: { borderTop: "1px solid #f0f0ee", margin: "24px 0" },
  progressTrack: {
    height: "3px",
    background: "#f0f0ee",
    borderRadius: "100px",
    overflow: "hidden",
    marginBottom: "20px",
  },
  progressFill: {
    height: "100%",
    background: "#22c55e",
    borderRadius: "100px",
    transition: "width 0.3s",
  },
  checkRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    cursor: "pointer",
    marginBottom: "14px",
  },
  checkboxUnticked: {
    width: "18px",
    height: "18px",
    borderRadius: "5px",
    border: "1.5px solid #d1d5db",
    flexShrink: 0,
    marginTop: "1px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxTicked: {
    width: "18px",
    height: "18px",
    borderRadius: "5px",
    border: "1.5px solid #22c55e",
    background: "#22c55e",
    flexShrink: 0,
    marginTop: "1px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bookingBox: {
    marginTop: "24px",
    background: "#1a1a1a",
    borderRadius: "14px",
    padding: "24px",
  },
  reminderBox: {
    marginTop: "16px",
    background: "#fffbeb",
    border: "1px solid #fde68a",
    borderRadius: "12px",
    padding: "16px",
  },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

function Appointments() {
  const [cityInput, setCityInput] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [checkedDocs, setCheckedDocs] = useState({});

  var allCities = Object.keys(officesData);
  var citySuggestions = allCities.filter(function (city) {
    if (cityInput === "") return true;
    return city.toLowerCase().startsWith(cityInput.toLowerCase());
  });

  function handleCityTyping(e) {
    setCityInput(e.target.value);
    setShowCityDropdown(true);
    if (e.target.value === "") resetEverything();
  }

  function pickCity(city) {
    setSelectedCity(city);
    setCityInput(city);
    setShowCityDropdown(false);
    setSelectedService("");
    setSelectedOffice(null);
    setCheckedDocs({});
  }

  function hideCityDropdown() {
    setTimeout(function () {
      setShowCityDropdown(false);
    }, 150);
  }

  function handleServiceChange(e) {
    setSelectedService(e.target.value);
    setSelectedOffice(null);
    setCheckedDocs({});
  }

  function pickOffice(office) {
    setSelectedOffice(office);
    setCheckedDocs({});
  }

  function toggleDocItem(index) {
    setCheckedDocs(function (prev) {
      var updated = Object.assign({}, prev);
      updated[index] = !updated[index];
      return updated;
    });
  }

  function resetEverything() {
    setSelectedCity("");
    setSelectedService("");
    setSelectedOffice(null);
    setCheckedDocs({});
  }

  var matchingOffices = [];
  if (selectedCity && selectedService) {
    matchingOffices = officesData[selectedCity].offices.filter(function (o) {
      return o.services.includes(selectedService);
    });
  }

  var docs = selectedService ? documentsData[selectedService] : [];
  var checkableDocs = docs.filter(function (d) {
    return d.url === null;
  });
  var checkedCount = checkableDocs.filter(function (d, i) {
    return checkedDocs[i] === true;
  }).length;
  var progressPercent =
    checkableDocs.length > 0
      ? Math.round((checkedCount / checkableDocs.length) * 100)
      : 0;
  var allDocsDone =
    checkableDocs.length > 0 && checkedCount === checkableDocs.length;
  var bookingUrl = selectedCity ? officesData[selectedCity].bookingUrl : "";

  var currentStep = 1;
  if (selectedCity) currentStep = 2;
  if (selectedService) currentStep = 3;
  if (selectedOffice) currentStep = 4;

  return (
    <div style={S.wrap}>
      {/* Steps */}
      <div style={S.steps}>
        {["City", "Service", "Office", "Documents"].map(function (label, i) {
          var stepNum = i + 1;
          var style =
            currentStep > stepNum
              ? S.stepDone
              : currentStep === stepNum
                ? S.stepActive
                : S.stepIdle;
          return (
            <React.Fragment key={label}>
              <span style={style}>
                {stepNum} · {label}
              </span>
              {i < 3 && <span style={S.stepDash}>—</span>}
            </React.Fragment>
          );
        })}
      </div>

      {/* City */}
      <div style={{ marginBottom: "20px" }}>
        <label style={S.label}>Your city</label>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            value={cityInput}
            onChange={handleCityTyping}
            onFocus={() => setShowCityDropdown(true)}
            onBlur={hideCityDropdown}
            placeholder="Type a city, e.g. Berlin"
            style={S.input}
          />
          {showCityDropdown && citySuggestions.length > 0 && (
            <ul
              style={{
                ...S.dropdown,
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {citySuggestions.map(function (city) {
                return (
                  <li
                    key={city}
                    onMouseDown={() => pickCity(city)}
                    style={S.dropdownItem}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f9fafb")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "white")
                    }
                  >
                    {city}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Service */}
      {selectedCity && (
        <div style={{ marginBottom: "20px" }}>
          <label style={S.label}>What do you need to do?</label>
          <select
            value={selectedService}
            onChange={handleServiceChange}
            style={S.select}
          >
            <option value="">— Choose a service —</option>
            <option value="Anmeldung">Anmeldung — Register your address</option>
            <option value="Abmeldung">
              Abmeldung — Deregister your address
            </option>
            <option value="Pass">Pass / ID — Passport or ID card</option>
          </select>
        </div>
      )}

      {/* Offices */}
      {matchingOffices.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <label style={S.label}>
            Offices in {selectedCity} offering {selectedService}
          </label>
          {matchingOffices.map(function (office) {
            var isSelected = selectedOffice && selectedOffice.id === office.id;
            return (
              <div
                key={office.id}
                onClick={() => pickOffice(office)}
                style={isSelected ? S.officeCardSelected : S.officeCard}
                onMouseEnter={(e) => {
                  if (!isSelected)
                    e.currentTarget.style.borderColor = "#2563eb";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected)
                    e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#0f0f0f",
                  }}
                >
                  {office.name}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    marginTop: "2px",
                  }}
                >
                  {office.address}
                </div>
                <div>
                  {office.services.map(function (s) {
                    return (
                      <span key={s} style={S.officeTag}>
                        {s}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* No offices match */}
      {selectedService && matchingOffices.length === 0 && (
        <div
          style={{
            background: "#fffbeb",
            border: "1px solid #fde68a",
            borderRadius: "10px",
            padding: "14px 16px",
            marginBottom: "20px",
          }}
        >
          <p style={{ fontSize: "13px", color: "#92400e", margin: 0 }}>
            No offices in {selectedCity} offer {selectedService} in our list.
            Check the city's official website.
          </p>
        </div>
      )}

      {/* Checklist */}
      {selectedService && docs.length > 0 && (
        <div>
          <div style={S.divider} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <label style={S.label}>Documents to bring</label>
            <span style={{ fontSize: "12px", color: "#9ca3af" }}>
              {checkedCount} / {checkableDocs.length} ready
            </span>
          </div>
          <div style={S.progressTrack}>
            <div style={{ ...S.progressFill, width: progressPercent + "%" }} />
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {docs.map(function (doc, index) {
              if (doc.url) {
                return (
                  <li
                    key={index}
                    style={{
                      borderTop: "1px solid #f0f0ee",
                      paddingTop: "12px",
                      marginTop: "4px",
                    }}
                  >
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "13px",
                        color: "#2563eb",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 10v6m0 0-3-3m3 3 3-3m2 8H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
                      </svg>
                      {doc.text}
                    </a>
                  </li>
                );
              }
              var isTicked = checkedDocs[index] === true;
              return (
                <li
                  key={index}
                  style={S.checkRow}
                  onClick={() => toggleDocItem(index)}
                >
                  <div style={isTicked ? S.checkboxTicked : S.checkboxUnticked}>
                    {isTicked && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path
                          d="M1 4l3 3 5-5"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      color: isTicked ? "#9ca3af" : "#374151",
                      textDecoration: isTicked ? "line-through" : "none",
                      lineHeight: "1.5",
                    }}
                  >
                    {doc.text}
                  </span>
                </li>
              );
            })}
          </ul>
          {allDocsDone && (
            <div
              style={{
                marginTop: "16px",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "10px",
                padding: "14px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "#16a34a",
                  fontWeight: "600",
                  margin: 0,
                }}
              >
                You're ready — head to the Bürgeramt with confidence! ✓
              </p>
            </div>
          )}
        </div>
      )}

      {/* Booking CTA */}
      {selectedOffice && bookingUrl && (
        <div style={S.bookingBox}>
          <p
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: "16px",
              margin: "0 0 6px",
            }}
          >
            Ready to book?
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "13px",
              margin: "0 0 16px",
            }}
          >
            Book your appointment for {selectedOffice.name} on {selectedCity}'s
            official portal.
          </p>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "white",
              color: "#1a1a1a",
              fontWeight: "600",
              fontSize: "13px",
              padding: "10px 20px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Book on official {selectedCity} website →
          </a>
          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "12px",
              marginTop: "10px",
              marginBottom: 0,
            }}
          >
            Slots go fast — check early in the morning when new ones drop.
          </p>
        </div>
      )}

      {/* 14-day reminder */}
      <div style={S.reminderBox}>
        <p
          style={{
            fontSize: "13px",
            color: "#92400e",
            margin: 0,
            lineHeight: "1.6",
          }}
        >
          <strong style={{ fontWeight: "600" }}>Heads up:</strong> If you just
          moved to Germany, you must Anmeldung within{" "}
          <strong style={{ fontWeight: "600" }}>14 days</strong> of moving in.
          Some Bürgerämter have long waits — don't leave it too late.
        </p>
      </div>
    </div>
  );
}

export default Appointments;
