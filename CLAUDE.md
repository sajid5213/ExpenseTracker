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
- The whole app is a single component in `src/App.jsx`: transaction list state (seeded with hardcoded sample data), add-transaction form state, type/category filters, and derived income/expense/balance totals all live there. There's no persistence; state resets on reload.
- Transaction shape: `{ id, description, amount, type: "income" | "expense", category, date: "YYYY-MM-DD" }`. Categories come from the `categories` array in `App.jsx`, which drives both the form and the filter dropdowns.
- `amount` is always stored as a **number**. The form input yields a string, so `handleSubmit` converts it with `Number(amount)` before saving; keep that invariant so the totals' `reduce` adds rather than concatenates.
- Styling: global styles in `src/index.css`, component styles in `src/App.css` (plain CSS, class names like `summary-card`, `income-amount`, `expense-amount`).

## Lint rules worth knowing

`no-unused-vars` is an error, except for names matching `^[A-Z_]`. The react-hooks and react-refresh (Vite) recommended rules are enabled.
