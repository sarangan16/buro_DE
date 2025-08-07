import React from "react";

function Home() {
  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-4xl font-semibold tracking-wide text-pretty sm:text-5xl lg:text-balance text-blue-600 dark:text-blue-500">
              Germany Bürokratie? Einfach gemacht!
            </p>
            <p className="mt-6 text-lg/8 text-gray-700">
              Say goodbye to confusion and long waits — find your Bürgeramt
              office, check required documents, book appointments, and fill
              forms all in one place. Bürokrasy? We keep it simple, so you don’t
              have to!
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600"></div>
                  Find the Nearest Bürgeramt
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">
                  Easily locate local offices for Anmeldung, Abmeldung, or other
                  services. Just enter your ZIP code or city name.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600"></div>
                  Check Required Documents
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">
                  Not sure what to bring? We'll tell you exactly what documents
                  are needed based on your service and location.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600"></div>
                  Complete Your Forms Digitally
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">
                  No need to print blank forms and write by hand. Fill in your
                  Anmeldung or Abmeldung forms right here and export them as
                  PDFs.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600"></div>
                  Book or Prepare for Your Appointment
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">
                  Learn how to book an appointment online or walk in prepared —
                  we guide you step-by-step.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
