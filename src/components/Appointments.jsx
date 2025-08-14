import React, { useState } from "react";

const officesData = {
  Berlin: [
    {
      id: 1,
      name: "Bürgeramt Rathaus Tiergarten",
      address: "Mathilde‑Jacob‑Platz 1, 10551 Berlin",
      services: ["Anmeldung", "Abmeldung", "Pass"],
      appointments: [
        "2025-08-01 10:00",
        "2025-08-01 11:30",
        "2025-08-02 09:00",
      ],
    },
    {
      id: 2,
      name: "Bürgeramt Rathaus Mitte",
      address: "Karl‑Marx‑Allee 31, 10178 Berlin",
      services: ["Anmeldung", "Abmeldung", "Pass"],
      appointments: ["2025-08-03 14:00", "2025-08-04 09:30"],
    },
    {
      id: 3,
      name: "Bürgeramt Wedding",
      address: "Brunnenstraße 102, 13355 Berlin",
      services: ["Anmeldung", "Abmeldung"],
      appointments: ["2025-08-05 10:15", "2025-08-06 12:45"],
    },
    {
      id: 4,
      name: "Bürgeramt Neukölln",
      address: "Karl-Marx-Straße 118, 12043 Berlin",
      services: ["Abmeldung", "Pass"],
      appointments: ["2025-08-07 08:30", "2025-08-09 14:00"],
    },
  ],
  Hamburg: [
    {
      id: 5,
      name: "Kundenzentrum Hamburg‑Mitte",
      address: "Klosterwall 8, 20095 Hamburg",
      services: ["Anmeldung", "Abmeldung"],
      appointments: ["2025-08-02 11:00", "2025-08-06 13:00"],
    },
    {
      id: 6,
      name: "Kundenzentrum Billstedt",
      address: "Billstedt Center, Hamburg",
      services: ["Anmeldung", "Abmeldung"],
      appointments: ["2025-08-01 09:15", "2025-08-07 15:45"],
    },
    {
      id: 7,
      name: "Kundenzentrum Altona",
      address: "Große Bergstraße 254, 22767 Hamburg",
      services: ["Anmeldung", "Pass"],
      appointments: ["2025-08-10 11:30", "2025-08-12 14:00"],
    },
    {
      id: 8,
      name: "Kundenzentrum Harburg",
      address: "Rathausplatz 1, 21073 Hamburg",
      services: ["Abmeldung"],
      appointments: ["2025-08-03 15:00", "2025-08-05 09:45"],
    },
  ],
  Munich: [
    {
      id: 9,
      name: "Einwohnermeldeamt München‑City (KVR)",
      address: "Ruppertstraße 19, 80466 München",
      services: ["Anmeldung", "Abmeldung", "Pass"],
      appointments: ["2025-08-03 08:30", "2025-08-03 11:00"],
    },
    {
      id: 10,
      name: "Einwohnermeldeamt München-West",
      address: "Pasinger Bahnhofsplatz 1, 81241 München",
      services: ["Anmeldung", "Abmeldung"],
      appointments: ["2025-08-05 09:00", "2025-08-07 10:30"],
    },
    {
      id: 11,
      name: "Einwohnermeldeamt München-Ost",
      address: "Klinikum der Universität München, 81925 München",
      services: ["Abmeldung"],
      appointments: ["2025-08-02 13:15", "2025-08-04 16:00"],
    },
  ],
  Düsseldorf: [
    {
      id: 12,
      name: "Einwohnermeldeamt Düsseldorf‑Oberkassel",
      address: "Luegallee 65, 40545 Düsseldorf",
      services: ["Anmeldung", "Abmeldung"],
      appointments: ["2025-08-01 10:45", "2025-08-08 12:00"],
    },
    {
      id: 13,
      name: "Einwohnermeldeamt Düsseldorf‑Kaiserswerth",
      address: "Kaiserwerther Markt 35, 40489 Düsseldorf",
      services: ["Anmeldung", "Abmeldung"],
      appointments: ["2025-08-02 09:00", "2025-08-09 16:00"],
    },
    {
      id: 14,
      name: "Einwohnermeldeamt Düsseldorf‑Gerresheim",
      address: "Neusser Tor 8, 40625 Düsseldorf",
      services: ["Anmeldung", "Abmeldung"],
      appointments: ["2025-08-04 13:30", "2025-08-10 10:00"],
    },
    {
      id: 15,
      name: "Einwohnermeldeamt Düsseldorf‑Düsseltal",
      address: "Kaiserswerther Str. 126, 40221 Düsseldorf",
      services: ["Pass"],
      appointments: ["2025-08-07 14:30", "2025-08-10 15:15"],
    },
  ],
  Frankfurt: [
    {
      id: 16,
      name: "Bürgeramt Frankfurt-Nordwest",
      address: "Niddastraße 55, 60439 Frankfurt",
      services: ["Anmeldung", "Pass"],
      appointments: ["2025-08-06 10:00", "2025-08-09 13:00"],
    },
    {
      id: 17,
      name: "Bürgeramt Frankfurt-Süd",
      address: "Hessenplatz 2, 60528 Frankfurt",
      services: ["Anmeldung", "Abmeldung"],
      appointments: ["2025-08-01 14:30", "2025-08-04 10:30"],
    },
    {
      id: 18,
      name: "Bürgeramt Frankfurt-Zentrum",
      address: "Römerberg 1, 60311 Frankfurt",
      services: ["Abmeldung", "Pass"],
      appointments: ["2025-08-05 09:30", "2025-08-07 16:30"],
    },
  ],
  Stuttgart: [
    {
      id: 19,
      name: "Bürgeramt Stuttgart-Feuerbach",
      address: "Wilhelminenstraße 33, 70469 Stuttgart",
      services: ["Anmeldung", "Abmeldung"],
      appointments: ["2025-08-01 10:00", "2025-08-03 14:00"],
    },
    {
      id: 20,
      name: "Bürgeramt Stuttgart-Mitte",
      address: "Eberhardstraße 35, 70173 Stuttgart",
      services: ["Pass"],
      appointments: ["2025-08-04 15:00", "2025-08-06 11:30"],
    },
    {
      id: 21,
      name: "Bürgeramt Stuttgart-Süd",
      address: "Rotebühlstraße 137, 70197 Stuttgart",
      services: ["Abmeldung", "Pass"],
      appointments: ["2025-08-02 12:00", "2025-08-07 09:30"],
    },
  ],
};

const documentsRequired = {
  Anmeldung: [
    "Proof of identity (eID card, passport, or child's passport)",
    "Confirmation of occupancy from the landlord",
    "For Ukrainian refugees: Confirmation of permanent accommodation",
    "For parents with joint custody: Consent of the absent parent",
    "For separated parents: Declaration of consent with proof of identity",
    "For multiple apartments: Supplementary sheet for registration/declaration of main residence",
    "Civil status certificates (if applicable)",
    "In case of representation: Written power of attorney / declaration of consent",
    {
      downloadLink: "https://example.com/anmeldung-form.pdf", // Link to the Anmeldung form
    },
  ],
  Abmeldung: [
    "Passport or valid ID",
    "Completed Abmeldung form",
    "If you are deregistering by mail: Completed 'Deregistration with the Registration Authority' form",
    "If more than three people are being deregistered, use additional registration forms",
    {
      downloadLink: "https://example.com/abmeldung-form.pdf", // Link to the Abmeldung form
    },
  ],
  Pass: [
    "Passport photo",
    "Proof of identity",
    "Previous passport (if applicable)",
    {
      downloadLink: "https://example.com/pass-form.pdf",
    },
  ],
};

function Appointments() {
  const [cityInput, setCityInput] = useState("");
  const [showCityList, setShowCityList] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [offices, setOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState("");

  const cities = Object.keys(officesData);

  function handleInputChange(e) {
    const value = e.target.value;
    setCityInput(value);
    setShowCityList(true);

    if (value === "") {
      setCitySuggestions(cities);
      return;
    }

    const filteredCities = cities.filter(function (city) {
      return city.toLowerCase().startsWith(value.toLowerCase());
    });
    setCitySuggestions(filteredCities);
  }

  function selectCity(city) {
    setSelectedCity(city);
    setCityInput(city);
    setShowCityList(false);
    setSelectedOffice(null);
    setSelectedService("");
    setSelectedAppointment("");
    setOffices([]);
  }

  function selectService(e) {
    const service = e.target.value;
    setSelectedService(service);
    setSelectedOffice(null);
    setSelectedAppointment("");

    if (selectedCity && service) {
      const cityOffices = officesData[selectedCity] || [];
      const filteredOffices = cityOffices.filter(function (office) {
        return office.services.indexOf(service) !== -1;
      });
      setOffices(filteredOffices);
    }
  }

  function selectOffice(office) {
    setSelectedOffice(office);
    setSelectedAppointment("");
  }

  function selectAppointment(e) {
    setSelectedAppointment(e.target.value);
  }

  const appointments = selectedOffice ? selectedOffice.appointments : [];
  const serviceDocuments = selectedService
    ? documentsRequired[selectedService]
    : [];
  const downloadLink =
    serviceDocuments.length > 0
      ? serviceDocuments[serviceDocuments.length - 1].downloadLink
      : "";

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Enter City Name:
        </label>
        <input
          type="text"
          value={cityInput}
          onChange={handleInputChange}
          onFocus={() => setShowCityList(true)}
          placeholder="e.g. Berlin"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {showCityList && citySuggestions.length > 0 && (
          <ul className="mt-2 border border-gray-200 rounded-lg max-h-40 overflow-auto bg-white shadow-md">
            {citySuggestions.map(function (city, i) {
              return (
                <li
                  key={i}
                  className="p-3 cursor-pointer hover:bg-gray-100"
                  onClick={() => selectCity(city)}
                >
                  {city}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {selectedCity && (
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Select Service:
          </label>
          <select
            value={selectedService}
            onChange={selectService}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Choose a service --</option>
            {["Anmeldung", "Abmeldung", "Pass"].map(function (service) {
              return (
                <option key={service} value={service}>
                  {service}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {offices.length > 0 && (
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Select Office:
          </label>
          <ul className="border border-gray-300 rounded-lg max-h-60 overflow-auto bg-white shadow-md">
            {offices.map(function (office) {
              return (
                <li
                  key={office.id}
                  onClick={() => selectOffice(office)}
                  className={`p-4 cursor-pointer hover:bg-gray-100 ${
                    selectedOffice && selectedOffice.id === office.id
                      ? "bg-gray-200 font-semibold"
                      : ""
                  }`}
                >
                  <div>{office.name}</div>
                  <div className="text-sm text-gray-500">{office.address}</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {selectedOffice && selectedService && appointments.length > 0 && (
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Select Appointment Slot:
          </label>
          <select
            value={selectedAppointment}
            onChange={selectAppointment}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Choose a time --</option>
            {appointments.map(function (slot, i) {
              return (
                <option key={i} value={slot}>
                  {slot}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {selectedService && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Documents Required for {selectedService}:
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            {serviceDocuments.map(function (doc, i) {
              if (typeof doc === "string") {
                return <li key={i}>{doc}</li>;
              } else if (doc.downloadLink) {
                return (
                  <li key={i}>
                    <a
                      href={doc.downloadLink}
                      className="text-blue-500 underline"
                      download
                    >
                      Download {selectedService} Form
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Appointments;
