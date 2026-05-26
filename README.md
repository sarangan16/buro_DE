# Briefklar

Upload a German bureaucratic letter and get a plain-English explanation in seconds.

Built for expats living in Germany who receive official letters they can't fully understand.

## What it does

- Upload a PDF, image, or text file — or just paste the letter text
- Gemini reads the letter and returns a structured explanation
- Shows the sender, deadline, what you need to do, and how urgent it is
- Sample letters included to try without uploading anything

## Stack

- React
- Gemini 2.5 Flash API
- Deployed on Vercel

## Running locally

1. Clone the repo
2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root and add your Gemini API key

```
REACT_APP_GEMINI_KEY=your_key_here
```

Get a free key at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

4. Start the dev server

```bash
npm start
```

## Live demo

[buro-de.vercel.app](https://buro-de.vercel.app)

---

Built by [S4RANGAN](https://sarangan16.github.io/sarangan/)
