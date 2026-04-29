import React, { useState } from "react";

// --- DATA ---
// Each city has offices with their services and an official booking link.
// We removed fake appointment slots because Germany's Bürgeramt booking is done
// through official government portals — we just link people there directly.

const officesData = {
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
        name: "Einwohnermeldeamt Düsseldorf-Gerresheim",
        address: "Neusser Tor 8, 40625 Düsseldorf",
        services: ["Anmeldung", "Abmeldung"],
      },
      {
        id: 15,
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
        id: 16,
        name: "Bürgeramt Frankfurt-Nordwest",
        address: "Niddastraße 55, 60439 Frankfurt",
        services: ["Anmeldung", "Pass"],
      },
      {
        id: 17,
        name: "Bürgeramt Frankfurt-Süd",
        address: "Hessenplatz 2, 60528 Frankfurt",
        services: ["Anmeldung", "Abmeldung"],
      },
      {
        id: 18,
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
        id: 19,
        name: "Bürgeramt Stuttgart-Feuerbach",
        address: "Wilhelminenstraße 33, 70469 Stuttgart",
        services: ["Anmeldung", "Abmeldung"],
      },
      {
        id: 20,
        name: "Bürgeramt Stuttgart-Mitte",
        address: "Eberhardstraße 35, 70173 Stuttgart",
        services: ["Pass"],
      },
      {
        id: 21,
        name: "Bürgeramt Stuttgart-Süd",
        address: "Rotebühlstraße 137, 70197 Stuttgart",
        services: ["Abmeldung", "Pass"],
      },
    ],
  },
};

// Documents needed per service.
// Each item is either a string (document name) or an object with a downloadLink.
const documentsRequired = {
  Anmeldung: [
    "Valid passport or national ID card",
    "Wohnungsgeberbestätigung — landlord confirmation of your address (required by law)",
    "If you have children: their passports or birth certificates",
    "If someone else is registering for you: a signed power of attorney (Vollmacht) and a copy of your ID",
    "If you're registering multiple addresses: a form declaring which is your main residence (Hauptwohnung)",
    {
      label: "Download the Anmeldung form (Meldeschein)",
      url: "https://www.duesseldorf.de/fileadmin/Amt33/Einwohnermeldeamt/Formulare/Meldeschein.pdf",
    },
  ],
  Abmeldung: [
    "Valid passport or national ID card",
    "Completed Abmeldung form",
    "If registering by mail: the 'Deregistration with the Registration Authority' form",
    "For more than 3 people deregistering at once: additional registration forms for each person",
    {
      label: "Download the Abmeldung form",
      url: "https://www.stw.berlin/assets/sw-berlin/files/Wohnen/abmeldung_bei_der_meldebehoerde.pdf",
    },
  ],
  Pass: [
    "Biometric passport photo (taken recently — most Bürgerämter are strict about this)",
    "Current valid ID or expired passport you are replacing",
    "If it's your first German passport: birth certificate",
    "For children under 16: both parents must be present, or one parent with written consent from the other",
    {
      label: "Download the passport application form",
      url: "https://australien.diplo.de/resource/blob/2415828/171cd32165f7cd2b0236bf59509c63ac/antrag-pass-erwachsene-deutsch-englisch-data.pdf",
    },
  ],
};

// --- COMPONENT ---

function Appointments() {
  const [cityInput, setCityInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedOffice, setSelectedOffice] = useState(null);

  // For the interactive checklist — tracks which items the user has ticked off
  const [checkedDocs, setCheckedDocs] = useState({});

  const allCities = Object.keys(officesData);

  // Filter city suggestions as user types
  const citySuggestions = allCities.filter(function (city) {
    return city.toLowerCase().startsWith(cityInput.toLowerCase());
  });

  function handleCityInput(e) {
    setCityInput(e.target.value);
    setShowDropdown(true);

    // If user clears the field, reset everything below
    if (e.target.value === "") {
      resetAll();
    }
  }

  function pickCity(city) {
    setSelectedCity(city);
    setCityInput(city);
    setShowDropdown(false);
    setSelectedService("");
    setSelectedOffice(null);
    setCheckedDocs({});
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

  function toggleDoc(index) {
    setCheckedDocs(function (prev) {
      return { ...prev, [index]: !prev[index] };
    });
  }

  function resetAll() {
    setSelectedCity("");
    setSelectedService("");
    setSelectedOffice(null);
    setCheckedDocs({});
  }

  // Only show offices that support the selected service
  const filteredOffices =
    selectedCity && selectedService
      ? officesData[selectedCity].offices.filter(function (office) {
          return office.services.includes(selectedService);
        })
      : [];

  const docs = selectedService ? documentsRequired[selectedService] : [];

  // How many non-link docs are checked
  const stringDocs = docs.filter(function (d) {
    return typeof d === "string";
  });
  const checkedCount = Object.values(checkedDocs).filter(Boolean).length;

  const cityBookingUrl = selectedCity
    ? officesData[selectedCity].bookingUrl
    : "";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step 1 — City */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Step 1 — Where are you?
        </h2>
        <label className="block text-base font-medium text-gray-700 mb-2">
          Your city
        </label>
        <div className="relative">
          <input
            type="text"
            value={cityInput}
            onChange={handleCityInput}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            placeholder="Type a city, e.g. Berlin"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {showDropdown && citySuggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-40 overflow-auto">
              {citySuggestions.map(function (city) {
                return (
                  <li
                    key={city}
                    onMouseDown={() => pickCity(city)}
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-50"
                  >
                    {city}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Step 2 — Service (only shows once city is picked) */}
      {selectedCity && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Step 2 — What do you need to do?
          </h2>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Select a service
          </label>
          <select
            value={selectedService}
            onChange={handleServiceChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">-- Choose one --</option>
            <option value="Anmeldung">Anmeldung — Register your address</option>
            <option value="Abmeldung">
              Abmeldung — Deregister your address
            </option>
            <option value="Pass">Pass / ID — Passport or ID card</option>
          </select>
        </div>
      )}

      {/* Step 3 — Pick an office (only shows when we have filtered results) */}
      {filteredOffices.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Step 3 — Choose a nearby office
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            These offices in {selectedCity} offer {selectedService}:
          </p>
          <ul className="space-y-2">
            {filteredOffices.map(function (office) {
              var isSelected =
                selectedOffice && selectedOffice.id === office.id;
              return (
                <li
                  key={office.id}
                  onClick={() => pickOffice(office)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors duration-100 ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium text-sm text-gray-800">
                    {office.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {office.address}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {office.services.map(function (s) {
                      return (
                        <span
                          key={s}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                        >
                          {s}
                        </span>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* No offices warning */}
      {selectedCity && selectedService && filteredOffices.length === 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-4">
          <p className="text-orange-800 text-sm">
            No offices in {selectedCity} offer {selectedService} in our list.
            Try checking the official city website directly.
          </p>
        </div>
      )}

      {/* Step 4 — Documents checklist (shows once a service is selected) */}
      {selectedService && docs.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Step 4 — Documents to bring
            </h2>
            {stringDocs.length > 0 && (
              <span className="text-xs text-gray-400">
                {checkedCount} / {stringDocs.length} ready
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Tick each item as you prepare it — don't show up without these!
          </p>

          <ul className="space-y-3">
            {docs.map(function (doc, index) {
              // Download link items look different from regular checklist items
              if (typeof doc !== "string") {
                return (
                  <li key={index} className="pt-2 border-t border-gray-100">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline font-medium"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      {doc.label}
                    </a>
                  </li>
                );
              }

              return (
                <li
                  key={index}
                  onClick={() => toggleDoc(index)}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  {/* Custom checkbox */}
                  <div
                    className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                      checkedDocs[index]
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 group-hover:border-green-400"
                    }`}
                  >
                    {checkedDocs[index] && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm leading-snug ${
                      checkedDocs[index]
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {doc}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* All checked celebration message */}
          {checkedCount === stringDocs.length && stringDocs.length > 0 && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700 font-medium text-center">
              ✅ You're ready! Head to the Bürgeramt with confidence.
            </div>
          )}
        </div>
      )}

      {/* Step 5 — Book appointment (shows once office is selected) */}
      {selectedOffice && cityBookingUrl && (
        <div className="bg-blue-600 rounded-xl p-6 text-white mb-4">
          <h2 className="font-semibold text-lg mb-1">Ready to book?</h2>
          <p className="text-blue-100 text-sm mb-4">
            Appointments for {selectedOffice.name} are booked through{" "}
            {selectedCity}'s official portal. We'll take you there now.
          </p>
          <a
            href={cityBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Book on the official {selectedCity} website →
          </a>
          <p className="text-xs text-blue-200 mt-3">
            Note: You'll be taken to the city's own booking system. Appointments
            can be competitive — check back often if slots are full.
          </p>
        </div>
      )}
    </div>
  );
}

export default Appointments;
