# ActionPath – Smart Citizen Guide

A bilingual (English / हिंदी) eligibility checker that tells Indian citizens which government documents, schemes, scholarships, and jobs they should apply for next, based on a simple profile.

The app curates 27+ real central-government programs (PMAY, PMJAY, PM-KISAN, Atal Pension Yojana, NSP scholarships, Skill India, Mudra Loan, UPSC, SSC and more), filters them with a rule-based recommendation engine, and presents next steps in plain language.

---

## Tech stack

This is a **pnpm monorepo** with two deployable apps:

| Path | Stack | Purpose |
|---|---|---|
| `artifacts/actionpath` | React + Vite + TypeScript, TailwindCSS, shadcn/ui, wouter, react-i18next, framer-motion, TanStack Query | Frontend SPA |
| `artifacts/api-server` | Node 20 + Express 5 + Pino + Zod | Backend REST API |
| `lib/api-spec` | OpenAPI 3.1 + Orval | Single source of truth for API contract |
| `lib/api-client-react` | Generated React Query hooks | Typed client used by the frontend |
| `lib/api-zod` | Generated Zod schemas | Used by the server for request/response validation |

No database is required — the scheme catalog is in-memory; user preferences (saved/completed actions) live in `localStorage`.

---

## Run locally

```bash
pnpm install

# Terminal 1 — backend API on :8080
pnpm --filter @workspace/api-server run dev

# Terminal 2 — frontend on :5173
pnpm --filter @workspace/actionpath run dev
```

Open http://localhost:5173 (the frontend dev server).

The frontend will call relative `/api/...` paths. For local dev, set `VITE_API_BASE_URL=http://localhost:8080` in `artifacts/actionpath/.env.local` if your backend is on a different host/port.

### Regenerate API client / Zod schemas after editing the OpenAPI spec

```bash
pnpm --filter @workspace/api-spec run codegen
```

---

## Project layout

```
.
├── artifacts/
│   ├── actionpath/      # Vite + React frontend
│   └── api-server/      # Express backend
├── lib/
│   ├── api-spec/        # openapi.yaml + Orval config (codegen source)
│   ├── api-client-react/  # Generated React Query hooks
│   └── api-zod/         # Generated Zod schemas
├── pnpm-workspace.yaml
└── README.md
```

---

## Deploy

The two apps are deployed independently:

- **Frontend** → Vercel (static site)
- **Backend** → Render (Node web service)

See [`DEPLOY.md`](./DEPLOY.md) for step-by-step instructions.
