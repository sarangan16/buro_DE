import React, { useState } from "react";

const officesData = {
  Berlin: [
    {
      id: 1,
      name: "Bürgeramt Rathaus Tiergarten",
      address: "Mathilde‑Jacob‑Platz 1, 10551 Berlin",
      services: ["Anmeldung", "Abmeldung", "Pass"],
      appointments: ["2025-08-01 10:00", "2025-08-01 11:30", "2025-08-02 09:00"],
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
      name: "Bürgeramt Klosterstraße",
      address: "Klosterstraße 71, 10179 Berlin",
      services: ["Anmeldung", "Abmeldung"],
      appointments: ["2025-08-05 08:45", "2025-08-05 10:15"],
    },
  ],
  Hamburg: [
    {
      id: 4,
      name: "Kundenzentrum Hamburg‑Mitte",
      address: "Klosterwall 8, 20095 Hamburg",
      services: ["Anmeldung", "Abmeldung"],
      appointments: ["2025-08-02 11:00", "2025-08-06 13:00"],
    },
    {
      id: 5,
      name: "Kundenzentrum Billstedt",
      address: "Billstedt Center, Hamburg",
      services: ["Anmeldung", "Abmeldung"],
      appointments: ["2025-08-01 09:15", "2025-08-07 15:45"],
    },
  ],
  Munich: [
    {
      id: 6,
      name: "Einwohnermeldeamt München‑City (KVR)",
      address: "Ruppertstraße 19, 80466 München",
      services: ["Anmeldung", "Abmeldung", "Pass"],
      appointments: ["2025-08-03 08:30", "2025-08-03 11:00"],
    },
  ],
  Düsseldorf: [
    {
      id: 7,
      name: "Einwohnermeldeamt Düsseldorf‑Oberkassel",
      address: "Luegallee 65, 40545 Düsseldorf",
      services: ["Anmeldung", "Abmeldung"],
      appointments: ["2025-08-01 10:45", "2025-08-08 12:00"],
    },
    {
      id: 8,
      name: "Einwohnermeldeamt Düsseldorf‑Kaiserswerth",
      address: "Kaiserwerther Markt 35, 40489 Düsseldorf",
      services: ["Anmeldung", "Abmeldung"],
      appointments: ["2025-08-02 09:00", "2025-08-09 16:00"],
    },
    {
      id: 9,
      name: "Einwohnermeldeamt Düsseldorf‑Gerresheim",
      address: "Neusser Tor 8, 40625 Düsseldorf",
      services: ["Anmeldung", "Abmeldung"],
      appointments: ["2025-08-04 13:30", "2025-08-10 10:00"],
    },
  ],
};

const documentsRequired = {
  Anmeldung: [
    "Passport or valid ID",
    "Rental contract",
    "Landlord confirmation (Wohnungsgeberbestätigung)",
    "Completed Anmeldung form",
  ],
  Abmeldung: ["Passport or valid ID", "Completed Abmeldung form"],
  Pass: ["Passport photo", "Proof of identity", "Previous passport (if applicable)"],
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

  function handleInputFocus() {
    setShowCityList(true);
    setCitySuggestions(cities);
    setSelectedCity("");
    setOffices([]);
    setSelectedOffice(null);
    setSelectedService("");
    setSelectedAppointment("");
  }

  function handleInputChange(e) {
    const val = e.target.value;
    setCityInput(val);
    setShowCityList(true);

    if (!val) {
      setCitySuggestions(cities);
      return;
    }

    const filtered = cities.filter((city) =>
      city.toLowerCase().startsWith(val.toLowerCase())
    );
    setCitySuggestions(filtered);
  }

  function selectCity(city) {
    setSelectedCity(city);
    setCityInput(city);
    setShowCityList(false);
    setSelectedOffice(null);
    setSelectedService("");
    setSelectedAppointment("");

    setOffices(officesData[city] || []);
  }

  function selectOffice(office) {
    setSelectedOffice(office);
    setSelectedService("");
    setSelectedAppointment("");
  }

  function selectService(e) {
    setSelectedService(e.target.value);
    setSelectedAppointment("");
  }

  function selectAppointment(e) {
    setSelectedAppointment(e.target.value);
  }

  const services = selectedOffice ? selectedOffice.services : [];
  const appointments = selectedOffice ? selectedOffice.appointments : [];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Book Appointment</h1>

      <label className="block mb-2 font-semibold">Enter City Name:</label>
      <input
        type="text"
        value={cityInput}
        onFocus={handleInputFocus}
        onChange={handleInputChange}
        placeholder="e.g. Berlin"
        className="w-full border rounded p-2"
      />

      {showCityList && citySuggestions.length > 0 && (
        <ul className="border rounded mt-2 bg-white shadow max-h-40 overflow-auto">
          {citySuggestions.map((city, i) => (
            <li
              key={i}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => selectCity(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}

      {offices.length > 0 && (
        <div className="mt-4 mb-4">
          <label className="block mb-1 font-semibold">Select Office:</label>
          <ul className="border rounded max-h-60 overflow-auto">
            {offices.map((office) => (
              <li
                key={office.id}
                onClick={() => selectOffice(office)}
                className={`cursor-pointer p-2 hover:bg-gray-200 ${
                  selectedOffice?.id === office.id ? "bg-gray-300 font-semibold" : ""
                }`}
              >
                <div>{office.name}</div>
                <div className="text-sm text-gray-500">{office.address}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedOffice && (
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Select Service:</label>
          <select
            value={selectedService}
            onChange={selectService}
            className="w-full border rounded p-2"
          >
            <option value="">-- Choose a service --</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedOffice && selectedService && appointments.length > 0 && (
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Select Appointment Slot:</label>
          <select
            value={selectedAppointment}
            onChange={selectAppointment}
            className="w-full border rounded p-2"
          >
            <option value="">-- Choose a time --</option>
            {appointments.map((slot, i) => (
              <option key={i} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedService && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Documents Required for {selectedService}:
          </h2>
          <ul className="list-disc list-inside">
            {documentsRequired[selectedService].map((doc, i) => (
              <li key={i}>{doc}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Appointments;
