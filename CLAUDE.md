# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Starter project for a Claude Code course: a React expense tracker that **intentionally** ships with a bug, poor UI, and messy code, all meant to be fixed step by step. Don't fix unrelated issues as a side effect of another change; keep each change scoped to what was asked.

## Commands

```bash
npm install       # required once after cloning; `vite` is not found without it
npm run dev       # Vite dev server at http://localhost:5173 (HMR)
npm run build     # production build to dist/
npm run preview   # serve the built dist/
npm run lint      # ESLint (flat config in eslint.config.js)
```

There is no test framework or test script configured.

## Architecture

- Vite + React 19, plain JavaScript (JSX, no TypeScript). Entry: `index.html` → `src/main.jsx` → `src/App.jsx` (rendered inside `StrictMode`).
### Component tree and data flow

```
App                 owns: transactions (the only shared state), categories (module constant)
├── Summary         props: transactions
├── TransactionForm props: categories, onAdd    owns: form field state
└── TransactionList props: transactions, categories, onDelete    owns: filter state
```

- **Single source of truth:** `App.jsx` holds the transaction list (seeded with hardcoded sample data; no persistence, so it resets on reload). Data flows down as props; changes go up only through callbacks: `onAdd` appends a transaction and `onDelete(id)` removes one by `id` from the full list (so it works on filtered views too).
- **State lives where it's used:** form field state is local to `TransactionForm`, and filter state is local to `TransactionList`. Only lift state into `App` when another component needs it.
- `Summary` derives income/expense/balance from the **full** list, so totals ignore the list filters. Nothing derived is stored in state; it's recomputed on each render.
- `TransactionForm` builds the complete transaction (`id: Date.now()`, today's `date`) before calling `onAdd`, so `App` just stores what it receives.
- Components are flat in `src/` (one default-exported function component per `.jsx` file, imported with the `.jsx` extension). There's no `components/` folder.

### Data

- Transaction shape: `{ id, description, amount, type: "income" | "expense", category, date: "YYYY-MM-DD" }`. `categories` drives both the form and the filter dropdowns.
- `amount` is always stored as a **number**. The form input yields a string, so `TransactionForm` converts it with `Number(amount)` before calling `onAdd`; keep that invariant so the totals' `reduce` adds rather than concatenates.

### Styling

Global styles are in `src/index.css`. All component styles are in `src/App.css`, imported once by `App.jsx` and shared by every child (plain CSS, class names like `summary-card`, `income-amount`, `expense-amount`). Child components don't import CSS.

## Lint rules worth knowing

`no-unused-vars` is an error, except for names matching `^[A-Z_]`. The react-hooks and react-refresh (Vite) recommended rules are enabled.
