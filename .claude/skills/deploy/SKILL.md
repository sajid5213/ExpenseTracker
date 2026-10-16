---
name: deploy
description: Deploy the expense tracker to staging - run all checks/tests, build the production bundle, then push to the staging branch. Use when the user asks to deploy or ship to staging.
disable-model-invocation: true
---

# Deploy to staging

Run these steps in order. **Stop at the first failure**, show the user the
error output, and do not continue to later steps. Never skip a step or work
around a failure (no `--no-verify`, no disabling lint rules, no force push).

## 1. Pre-flight

- `git status --short` must be empty. If there are uncommitted changes, stop and
  ask the user whether to commit them first - never deploy work that isn't committed.
- Note the current branch and commit (`git rev-parse --short HEAD`) for the report.

## 2. Run all tests and checks

- `npm run lint` - must exit 0.
- If `package.json` has a `test` script, run `npm test` - must exit 0.
  If it has no `test` script, say so in the report ("no tests configured;
  lint only") rather than pretending tests ran.

## 3. Build the production bundle

- `npm run build` - must exit 0 and produce `dist/`.
- The >500 kB chunk-size warning (from recharts) is a warning, not a failure.
  Any other error fails the deploy.

## 4. Push to staging

Staging is the `staging` branch on `origin`. Push the current commit to it:

```bash
git push origin HEAD:staging
```

- If the push is rejected as non-fast-forward, stop and tell the user -
  do **not** force push. Staging has commits that aren't in this branch.
- `dist/` is gitignored, so the build itself isn't pushed; whatever hosts
  staging builds from the pushed source. Step 3 proves that build will succeed.

## 5. Report

Summarize in a few lines: the commit deployed, check results (lint, tests or
"none configured"), build result, and the push result (the remote's output).
