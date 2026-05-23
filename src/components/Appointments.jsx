import React, { useState } from "react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

// All the offices we know about, grouped by city.
// Each city also has its official booking URL — because Germany's booking
// system is internal, we just send users to the right portal.
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

// Documents needed per service.
// Items with a `url` are download links shown differently from the checklist items.
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
// COMPONENT
// ─────────────────────────────────────────────

function Appointments() {
  // What the user typed into the city search box
  const [cityInput, setCityInput] = useState("");

  // Whether the city dropdown list is visible
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  // The city the user actually selected (empty means none yet)
  const [selectedCity, setSelectedCity] = useState("");

  // The service the user picked from the dropdown
  const [selectedService, setSelectedService] = useState("");

  // The specific office the user clicked on
  const [selectedOffice, setSelectedOffice] = useState(null);

  // An object tracking which document checkboxes are ticked
  // e.g. { 0: true, 1: false, 2: true } means first and third items are ticked
  const [checkedDocs, setCheckedDocs] = useState({});

  // ── City autocomplete ──────────────────────

  var allCities = Object.keys(officesData);

  // Filter cities that start with what the user typed
  var citySuggestions = allCities.filter(function (city) {
    if (cityInput === "") return true; // show all if nothing typed yet
    return city.toLowerCase().startsWith(cityInput.toLowerCase());
  });

  function handleCityTyping(e) {
    var typed = e.target.value;
    setCityInput(typed);
    setShowCityDropdown(true);

    // If the user clears the box, reset everything below
    if (typed === "") {
      resetEverything();
    }
  }

  function handleCityFocus() {
    setShowCityDropdown(true);
  }

  // Called when user clicks a city from the dropdown
  function pickCity(city) {
    setSelectedCity(city);
    setCityInput(city);
    setShowCityDropdown(false);
    // Reset the steps below when city changes
    setSelectedService("");
    setSelectedOffice(null);
    setCheckedDocs({});
  }

  // Hide the dropdown — but with a tiny delay so clicking a city registers first
  function hideCityDropdown() {
    setTimeout(function () {
      setShowCityDropdown(false);
    }, 150);
  }

  // ── Service selection ──────────────────────

  function handleServiceChange(e) {
    setSelectedService(e.target.value);
    // When service changes, reset the office and checklist
    setSelectedOffice(null);
    setCheckedDocs({});
  }

  // ── Office selection ───────────────────────

  function pickOffice(office) {
    setSelectedOffice(office);
    setCheckedDocs({}); // reset checklist when a different office is picked
  }

  // ── Document checklist ─────────────────────

  function toggleDocItem(index) {
    setCheckedDocs(function (prev) {
      // Copy the existing state, then flip the value at this index
      var updated = Object.assign({}, prev);
      updated[index] = !updated[index];
      return updated;
    });
  }

  // ── Reset everything ───────────────────────

  function resetEverything() {
    setSelectedCity("");
    setSelectedService("");
    setSelectedOffice(null);
    setCheckedDocs({});
  }

  // ── Derived values ─────────────────────────

  // Offices in the selected city that offer the selected service
  var matchingOffices = [];
  if (selectedCity && selectedService) {
    matchingOffices = officesData[selectedCity].offices.filter(
      function (office) {
        return office.services.includes(selectedService);
      },
    );
  }

  // The documents list for the selected service
  var docs = selectedService ? documentsData[selectedService] : [];

  // Only the checkable items (not the download links)
  var checkableDocs = docs.filter(function (doc) {
    return doc.url === null;
  });

  // How many checkable items are ticked
  var checkedCount = checkableDocs.filter(function (doc, index) {
    return checkedDocs[index] === true;
  }).length;

  // Progress percentage for the progress bar
  var progressPercent =
    checkableDocs.length > 0
      ? Math.round((checkedCount / checkableDocs.length) * 100)
      : 0;

  var allDocsDone =
    checkableDocs.length > 0 && checkedCount === checkableDocs.length;

  // The booking URL for the selected city
  var bookingUrl = selectedCity ? officesData[selectedCity].bookingUrl : "";

  // Which step are we on? Used to show the step indicator pills
  var currentStep = 1;
  if (selectedCity) currentStep = 2;
  if (selectedService) currentStep = 3;
  if (selectedOffice) currentStep = 4;

  // ──────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Main card ── */}
      <div className="bg-white/3 border border-white/10 rounded-2xl p-7">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-7 flex-wrap">
          {["City", "Service", "Office", "Documents"].map(function (label, i) {
            var stepNum = i + 1;
            var isDone = currentStep > stepNum;
            var isActive = currentStep === stepNum;

            return (
              <React.Fragment key={label}>
                <span
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                    isDone
                      ? "bg-emerald-500/20 text-emerald-400"
                      : isActive
                        ? "bg-blue-500 text-white"
                        : "bg-white/7 text-white/30"
                  }`}
                >
                  {stepNum} · {label}
                </span>
                {/* Dash between steps */}
                {i < 3 && <span className="text-white/15 text-xs">—</span>}
              </React.Fragment>
            );
          })}
        </div>

        {/* ── STEP 1: City input ── */}
        <div className="mb-5">
          <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
            Your city
          </label>
          <div className="relative">
            <input
              type="text"
              value={cityInput}
              onChange={handleCityTyping}
              onFocus={handleCityFocus}
              onBlur={hideCityDropdown}
              placeholder="Type a city, e.g. Berlin"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
            />

            {/* City dropdown — shows when user is typing */}
            {showCityDropdown && citySuggestions.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full bg-[#141929] border border-white/10 rounded-xl overflow-hidden">
                {citySuggestions.map(function (city) {
                  return (
                    <li
                      key={city}
                      onMouseDown={() => pickCity(city)}
                      className="px-4 py-2.5 text-sm text-white/75 cursor-pointer hover:bg-blue-500/15 hover:text-white transition-colors"
                    >
                      {city}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* ── STEP 2: Service dropdown (only shows after city is picked) ── */}
        {selectedCity && (
          <div className="mb-5">
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
              What do you need to do?
            </label>
            <select
              value={selectedService}
              onChange={handleServiceChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
            >
              <option value="" style={{ background: "#141929" }}>
                — Choose a service —
              </option>
              <option value="Anmeldung" style={{ background: "#141929" }}>
                Anmeldung — Register your address
              </option>
              <option value="Abmeldung" style={{ background: "#141929" }}>
                Abmeldung — Deregister your address
              </option>
              <option value="Pass" style={{ background: "#141929" }}>
                Pass / ID — Passport or ID card
              </option>
            </select>
          </div>
        )}

        {/* ── STEP 3: Office list (only shows after service is picked) ── */}
        {matchingOffices.length > 0 && (
          <div className="mb-5">
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
              Offices in {selectedCity} that offer {selectedService}
            </label>
            <div className="flex flex-col gap-2">
              {matchingOffices.map(function (office) {
                var isSelected =
                  selectedOffice && selectedOffice.id === office.id;
                return (
                  <div
                    key={office.id}
                    onClick={() => pickOffice(office)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-blue-500/40 bg-blue-500/10"
                        : "border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5"
                    }`}
                  >
                    <div className="text-sm font-medium text-white">
                      {office.name}
                    </div>
                    <div className="text-xs text-white/40 mt-0.5">
                      {office.address}
                    </div>
                    {/* Service tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {office.services.map(function (service) {
                        return (
                          <span
                            key={service}
                            className="text-xs bg-white/8 text-white/50 px-2 py-0.5 rounded-full"
                          >
                            {service}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Edge case: service picked but no offices match it in this city */}
        {selectedService && matchingOffices.length === 0 && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-5">
            <p className="text-amber-300/80 text-sm">
              No offices in {selectedCity} offer {selectedService} in our list.
              Try checking the city's official website directly.
            </p>
          </div>
        )}

        {/* ── STEP 4: Document checklist (shows after service is picked) ── */}
        {selectedService && docs.length > 0 && (
          <div>
            <div className="border-t border-white/7 pt-5 mt-2">
              {/* Header with counter */}
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs text-white/40 uppercase tracking-wider">
                  Documents to bring
                </label>
                <span className="text-xs text-white/30">
                  {checkedCount} / {checkableDocs.length} ready
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-0.5 bg-white/7 rounded-full mb-5 overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: progressPercent + "%" }}
                />
              </div>

              {/* The checklist */}
              <ul className="flex flex-col gap-3">
                {docs.map(function (doc, index) {
                  // If it has a URL it's a download link, not a checkbox
                  if (doc.url) {
                    return (
                      <li key={index} className="pt-2 border-t border-white/6">
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 no-underline transition-colors"
                        >
                          <svg
                            width="14"
                            height="14"
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

                  // Regular checklist item
                  var isTicked = checkedDocs[index] === true;
                  return (
                    <li
                      key={index}
                      onClick={() => toggleDocItem(index)}
                      className="flex items-start gap-3 cursor-pointer group"
                    >
                      {/* Custom checkbox */}
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-md border flex-shrink-0 flex items-center justify-center transition-all ${
                          isTicked
                            ? "bg-emerald-500 border-emerald-500"
                            : "border-white/20 group-hover:border-emerald-500/50"
                        }`}
                      >
                        {isTicked && (
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                          >
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

                      {/* Document text — strikes through when ticked */}
                      <span
                        className={`text-sm leading-snug transition-colors ${
                          isTicked
                            ? "line-through text-white/25"
                            : "text-white/65"
                        }`}
                      >
                        {doc.text}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Celebration message when all items are ticked */}
              {allDocsDone && (
                <div className="mt-5 bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-4 text-center">
                  <p className="text-emerald-400 text-sm font-medium">
                    You're ready — head to the Bürgeramt with confidence!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Booking CTA (only appears after an office is selected) ── */}
      {selectedOffice && bookingUrl && (
        <div className="mt-4 bg-blue-600 rounded-2xl p-6">
          <p
            style={{ fontFamily: "'Syne', sans-serif" }}
            className="text-white font-bold text-lg mb-1"
          >
            Ready to book?
          </p>
          <p className="text-blue-100/70 text-sm mb-4">
            Appointments for {selectedOffice.name} are booked through{" "}
            {selectedCity}'s official portal.
          </p>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors no-underline"
          >
            Book on the official {selectedCity} website →
          </a>
          <p className="text-blue-200/40 text-xs mt-3">
            Slots can go fast — check early in the morning when new ones drop.
          </p>
        </div>
      )}

      {/* ── 14-day deadline reminder ── */}
      <div className="mt-4 bg-amber-500/8 border border-amber-500/20 rounded-2xl p-5">
        <p className="text-amber-300/80 text-sm leading-relaxed">
          <strong className="text-amber-300 font-medium">Heads up:</strong> If
          you just moved to a new address in Germany, you must Anmeldung within{" "}
          <strong className="text-amber-300 font-medium">14 days</strong> of
          moving in. Some Bürgerämter have long waits — don't leave it too late.
        </p>
      </div>
    </div>
  );
}

export default Appointments;
