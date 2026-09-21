# RightsGuard AI — Architecture Specification

## Architectural Overview

RightsGuard AI is a Malawi-focused legal rights assistant designed to support survivors of domestic violence and gender-based violence (GBV).

```
User Query (Browser)
     │
     ▼
Safety Classification Engine (Deterministic Rule-Based)
     ├── High Risk / Immediate Danger?
     │      ├── YES ──► Crisis Response (Immediate Emergency Contacts & Local Law)
     │      │
     │      └── NO  ──► RAG Pipeline (Vector / TF-IDF Search on Malawian Laws)
     │                       │
     │                       ▼
     │                 Context Assembly
     │                       │
     │                       ▼
     │                 Multi-Provider LLM Chain
     │                 (Gemini 2.0 Flash ➔ Groq ➔ OpenRouter ➔ Fallback)
     │                       │
     │                       ▼
     │                 Response Validation & Structured JSON
     ▼
Session Store (Zustand In-Memory ONLY - Zero Storage / No Cookies)
```

## Key Modules

### 1. Privacy Engine (`store/session.ts`)
- Implements in-memory state only via Zustand.
- **NO** local storage, sessionStorage, IndexedDB, or cookie persistence.
- `clearSession()` destroys all messages and transient state instantly.

### 2. Safety Engine (`lib/safety/`)
- Pre-LLM safety classifier running deterministic regex and keyword pattern matching.
- Detects physical danger, weapons, suicidal ideation, child abuse, sexual violence, and prompt injection.
- Immediately intercepts dangerous queries without waiting for LLM completion.

### 3. RAG Pipeline (`lib/rag/`)
- Indexes Malawian legal Acts (`data/laws/`): Prevention of Domestic Violence Act (2006), Gender Equality Act (2013), Penal Code Cap 7:01, Constitution of Malawi.
- Performs cosine similarity (embedding) and TF-IDF keyword matching fallback.
- Constructs strict token-bounded legal context.

### 4. Multi-Provider AI Engine (`lib/ai/`)
- Primary: Google Gemini (`gemini-2.0-flash`, free tier)
- Secondary: Groq (`gemma2-9b-it`)
- Tertiary: OpenRouter (`google/gemma-3-27b-it:free`)
- Fallback: Local pre-verified safe responses if all API keys or networks fail.

### 5. Discreet Mode ("Daily Brief") (`app/page.tsx`, `hooks/useDiscreetMode.ts`)
- Instant visual swap to a news digest layout ("Daily Brief").
- Replaces branding, layout, nav labels, and titles to hide sensitive legal navigation.
