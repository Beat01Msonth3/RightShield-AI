# RightsGuard AI — Malawi Legal Rights Assistant

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-Session--Only-green)](https://github.com/pmndrs/zustand)

**RightsGuard AI** is a confidential, session-only legal rights assistant designed for survivors of domestic violence and sexual offences in **Malawi**.

---

## Key Features

- 🛡️ **Session-Only Privacy**: Zero conversation data stored in local storage, cookies, or databases. State lives strictly in memory and is wiped on "End Session" or page close.
- 📜 **Backed by Malawian Law**: RAG knowledge base seeded from verified Malawian legal Acts:
  - Prevention of Domestic Violence Act (2006)
  - Gender Equality Act (2013)
  - Penal Code (Cap 7:01)
  - Marriage, Divorce and Family Relations Act (2015)
  - Child Care, Protection and Justice Act (2010)
  - Constitution of the Republic of Malawi (1994)
- 🚨 **Independent Safety Engine**: Pre-LLM crisis classifier detects immediate physical danger, weapons, and child abuse, routing directly to 997 Police or 5600 GBV Crisis Line.
- 👁️ **Discreet Mode ("Daily Brief")**: One-click visual transform into a innocent-looking morning news reader.
- 🌐 **Offline Experience**: Full legal knowledge browsing and pre-set scenario guidance work without an internet connection.
- 🇲🇼 **Bilingual Support**: English + Chichewa (Nyanja) UI strings.
- 🤖 **Multi-Provider AI Fallback**: Multi-tier provider chain: **Google Gemini** ➔ **Groq** ➔ **OpenRouter** ➔ Local Safe Fallback.

---

## Quick Start

### 1. Installation

```bash
git clone https://github.com/your-org/rightsguard-ai.git
cd rightsguard-ai
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Set your API keys:

```env
# AI Providers (At least one required for dynamic online LLM)
GEMINI_API_KEY=your_gemini_api_key_here
AI_MODEL=gemini-2.0-flash

# Emergency & Helpline Numbers (Malawi)
NEXT_PUBLIC_EMERGENCY_NUMBER=997
NEXT_PUBLIC_HOTLINE_GBV=5600
NEXT_PUBLIC_HOTLINE_CHILD=116
NEXT_PUBLIC_HOTLINE_WOLREC=+265888750183
NEXT_PUBLIC_PANIC_EXIT_URL=https://www.google.com
```

### 3. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Testing

Run unit & integration tests:

```bash
npm run test
```

---

## Deployment (Vercel)

Deploy to Vercel with a single click:

```bash
npx vercel
```

Ensure environment variables (`GEMINI_API_KEY`, emergency numbers) are added in the Vercel dashboard.

---

## License

MIT License — Built for public benefit and survivor safety in Malawi.
