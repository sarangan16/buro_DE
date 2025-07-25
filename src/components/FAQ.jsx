import React from 'react';

function FAQ() {
  return (
    <div className="relative w-full bg-white px-6 pt-10 pb-8 mt-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10">
      <div className="mx-auto px-5">
        <div className="flex flex-col items-center">
          <h2 className="mt-5 text-center text-3xl font-bold tracking-tight md:text-5xl">FAQ</h2>
          <p className="mt-3 text-lg text-neutral-500 md:text-xl">Frequently asked questions</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
          {faqList.map((item, index) => (
            <div className="py-5" key={index}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                  <span>{item.question}</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5"
                      viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <p className="group-open:animate-fadeIn mt-3 text-neutral-600">{item.answer}</p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const faqList = [
  {
    question: 'How do I find the right Bürgeramt office for my address?',
    answer: 'You can search by entering your ZIP code or city name in the office finder. Our app will list nearby offices with their services and opening hours.'
  },
  {
    question: 'What documents do I need to bring for Anmeldung or Abmeldung?',
    answer: 'Each service page lists required documents. Typically, you’ll need a valid ID or passport, rental contract, and completed forms. Check the specific office’s instructions.'
  },
  {
    question: 'Can I book an appointment online through this app?',
    answer: 'Yes! Once you find your office, we provide direct links to their official appointment booking system if available.'
  },
  {
    question: 'Is it possible to submit application forms online?',
    answer: 'Some offices offer online form submission. If available, the app guides you through filling and submitting the forms digitally.'
  },
  {
    question: 'How long does the Anmeldung or Abmeldung process take?',
    answer: 'Processing time varies by office, but usually ranges from a few minutes to an hour during your appointment.'
  },
  {
    question: 'Can I print or save my filled application forms?',
    answer: 'Yes, after completing forms in the app, you can download and print a PDF copy for your records and office submission.'
  }
];

export default FAQ;