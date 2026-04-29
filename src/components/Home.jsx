import React from "react";
import Appointments from "./Appointments";
function Home() {
  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-xl font-semibold tracking-wide text-pretty sm:text-5xl lg:text-balance text-blue-600 dark:text-blue-500">
              Streamline Your German Bureaucracy: Everything You Need in One
              Place{" "}
            </p>
            <p className="mt-6 text-lg/8 text-gray-700">
              No more stress, no more delays — easily find your nearest
              Bürgeramt, know exactly what documents you'll need, book
              appointments, and fill out forms, all from one simple platform.
              Say goodbye to complicated paperwork and hello to a smoother
              process!
            </p>
          </div>
        </div>
        <Appointments />
      </div>
    </div>
  );
}

export default Home;
