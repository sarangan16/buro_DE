import React, { useState } from "react";

// All questions in one place.
// Each has a tag so we can filter by topic.
var allFaqs = [
  {
    tag: "Anmeldung",
    question: "What is Anmeldung and do I actually have to do it?",
    answer:
      "Yes — it's legally required. Anmeldung means registering your address with the local Einwohnermeldeamt (registration office). You must do it within 14 days of moving in. Without it you can't open a bank account, get a German tax ID, or sign many contracts. Don't skip it.",
  },
  {
    tag: "Anmeldung",
    question: "What is a Wohnungsgeberbestätigung and how do I get one?",
    answer:
      "It's a form your landlord fills out confirming that you live at their address. You cannot register without it — bring it to your appointment. Most landlords know exactly what it is. If yours doesn't, your local Bürgeramt website usually has a downloadable template you can hand them.",
  },
  {
    tag: "Anmeldung",
    question: "Can someone else do my Anmeldung for me?",
    answer:
      "Yes. Write them a Vollmacht (power of attorney) and give them a copy of your ID. They can then go to the Bürgeramt on your behalf. This is really common for couples where one person handles the paperwork for both.",
  },
  {
    tag: "Anmeldung",
    question: "What happens if I miss the 14-day deadline?",
    answer:
      "There is technically a fine, but first-time offenders are rarely charged — especially when it's clear you were genuinely trying to sort things out. Just register as soon as you can. Being a bit late is much better than not registering at all.",
  },
  {
    tag: "Anmeldung",
    question: "I moved to a new flat within Germany — do I Anmeldung or Abmeldung?",
    answer:
      "Just do Anmeldung at your new address. Your registration updates automatically in the system. Abmeldung is only for when you leave Germany entirely — don't do both.",
  },
  {
    tag: "Abmeldung",
    question: "I'm leaving Germany — what do I need to do?",
    answer:
      "You need to Abmeldung — deregister your address. Go to your local Bürgeramt ideally within one week before leaving (or up to a week after). Bring your passport and a completed Abmeldung form. You'll get a confirmation letter — keep it, because you'll need it to close German bank accounts and cancel subscriptions.",
  },
  {
    tag: "Abmeldung",
    question: "Do I need to tell my employer when I Abmeldung?",
    answer:
      "The Abmeldung itself doesn't automatically notify your employer. If you're leaving Germany you need to separately handle your employment contract, tax affairs, and health insurance cancellation. The Abmeldung just takes care of the address deregistration.",
  },
  {
    tag: "Office",
    question: "How do I book an appointment at the Bürgeramt?",
    answer:
      "Each city has its own online booking portal. Use the tool on the home page — we link you directly to the correct page for your city. Appointments can go fast, especially in big cities like Berlin. Check early in the morning when new slots are released.",
  },
  {
    tag: "Office",
    question: "Can I walk in without an appointment?",
    answer:
      "In some cities yes, in others no. Berlin is largely appointment-only and walk-in spots are very limited. Smaller towns tend to be more flexible. It's worth calling ahead or checking the office's website before showing up without a booking.",
  },
  {
    tag: "Office",
    question: "Do I need to speak German at the Bürgeramt?",
    answer:
      "It helps but isn't strictly required. Many offices in bigger cities have staff who speak some English. Bring your documents organised and labelled clearly. You can also bring a German-speaking friend — they don't need any official role, they're just there to help translate.",
  },
  {
    tag: "Pass",
    question: "My German passport is expiring — how far ahead should I apply?",
    answer:
      "Apply at least 6–8 weeks before your passport expires, ideally more. After your appointment the passport is made centrally and sent back to the office for you to collect. Summer and end-of-year periods tend to be slower so factor that in.",
  },
  {
    tag: "Pass",
    question: "Can I travel on an expired German passport?",
    answer:
      "No. An expired passport is not valid for travel. Some countries allow entry for a short period after expiry, but most don't. Apply for renewal well before any planned travel. If you're in a real emergency, some German embassies can issue a temporary travel document.",
  },
];

// The filter buttons shown at the top of the page
var filterTags = ["All", "Anmeldung", "Abmeldung", "Office", "Pass"];

function FAQ() {
  // Which question is open right now — we store its index, null means none
  const [openIndex, setOpenIndex] = useState(null);

  // What the user typed in the search box
  const [searchText, setSearchText] = useState("");

  // Which topic filter is currently active
  const [activeTag, setActiveTag] = useState("All");

  // Toggle a question open or closed
  function toggleQuestion(index) {
    // If this one is already open, close it. Otherwise open it.
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  }

  // When user switches tag, close any open question and reset
  function handleTagClick(tag) {
    setActiveTag(tag);
    setOpenIndex(null);
  }

  // Filter the FAQ list based on search and active tag
  var visibleFaqs = allFaqs.filter(function (faq) {
    var matchesTag = activeTag === "All" || faq.tag === activeTag;

    var lowerSearch = searchText.toLowerCase();
    var matchesSearch =
      searchText === "" ||
      faq.question.toLowerCase().includes(lowerSearch) ||
      faq.answer.toLowerCase().includes(lowerSearch);

    return matchesTag && matchesSearch;
  });

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="bg-[#0a0f1e] min-h-screen text-white pb-24"
    >

      {/* ── Page header ── */}
      <div className="max-w-2xl mx-auto px-6 pt-16 pb-10">
        <p className="text-xs text-blue-400 uppercase tracking-widest mb-3">
          Help center
        </p>
        <h1
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-4xl font-extrabold tracking-tight leading-tight text-white mb-3"
        >
          Questions expats{" "}
          <span className="text-white/30">always ask</span>
        </h1>
        <p className="text-white/40 text-sm leading-relaxed mb-8">
          Everything you'd normally Google at 11pm, answered clearly.
        </p>

        {/* Search box */}
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-30"
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search questions..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
      </div>

      {/* ── Topic filter pills ── */}
      <div className="max-w-2xl mx-auto px-6 flex flex-wrap gap-2 mb-8">
        {filterTags.map(function (tag) {
          var isActive = activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`text-xs px-4 py-2 rounded-full border transition-all ${
                isActive
                  ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                  : "bg-transparent border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* ── FAQ accordion list ── */}
      <div className="max-w-2xl mx-auto px-6 flex flex-col gap-1.5">

        {/* Show a message if nothing matched the search */}
        {visibleFaqs.length === 0 && (
          <p className="text-white/30 text-sm py-4">
            No questions matched your search. Try a different word or clear the filter.
          </p>
        )}

        {visibleFaqs.map(function (faq, index) {
          var isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`rounded-xl border overflow-hidden transition-colors ${
                isOpen
                  ? "border-blue-500/25 bg-blue-500/5"
                  : "border-white/7 bg-white/[0.03] hover:border-white/12"
              }`}
            >
              {/* Question row — clicking toggles the answer */}
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-white/85 leading-snug">
                  {faq.question}
                </span>

                {/* Circle icon — rotates when open */}
                <span
                  className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 transition-colors ${
                    isOpen ? "bg-blue-500 border-blue-500" : "border-white/20"
                  }`}
                >
                  <svg
                    width="9" height="9" viewBox="0 0 10 10"
                    fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  >
                    <line x1="5" y1="1" x2="5" y2="9" />
                    <line x1="1" y1="5" x2="9" y2="5" />
                  </svg>
                </span>
              </button>

              {/* Answer — only rendered when this question is open */}
              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-white/6">
                  <p className="text-sm text-white/50 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Footer — invite more questions ── */}
      <div className="max-w-2xl mx-auto px-6 mt-12">
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex items-center justify-between gap-6 flex-wrap">
          <div>
            <p className="text-white/70 text-sm font-medium mb-1">
              Still have a question?
            </p>
            <p className="text-white/35 text-xs leading-relaxed">
              Ask us and we might add it to this page.
            </p>
          </div>
          <a
            href="mailto:hello@buergeramt-helper.com"
            className="bg-blue-500/15 border border-blue-500/30 rounded-lg px-5 py-2.5 text-sm text-blue-300 no-underline whitespace-nowrap hover:bg-blue-500/25 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>

    </div>
  );
}

export default FAQ;