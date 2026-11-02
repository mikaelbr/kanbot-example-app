---

name: project-conventions
description: This project's stack, exact commands (install, run, test, lint, typecheck, build), code conventions and recorded decisions. Read first before planning, implementing, reviewing or fixing anything in this repository, and whenever you need to know how to run tests or the project.
---

# Project conventions

## Instructions for agents

- Read this skill before doing anything else in the repository.
- Use the commands below exactly. Do not guess alternatives when one is listed.
- If something here is wrong or missing and you learned the right answer (a command, a convention, a gotcha), propose an addition: edit this file in the same branch as a separate commit (`docs(conventions): …`) and mention it under "Notes for reviewer" in the PR. Only add durable facts about commands, stack and conventions. Lessons from human corrections go in `project-memory`. Planners and reviewers, who do not edit files, mention the proposed addition in their summary instead.

## Product

- What it is: a reading list in the browser. Add books, mark them read, filter by read state.
- Primary users: one person tracking their own reading. No accounts.
- Language of what users see: English.

## Stack

- Language and runtime: TypeScript, React 19, built with Vite. Runs in the browser only.
- Main parts: one single-page app in `src/`. Data lives in `localStorage`.
- Package manager: pnpm. Never npm or yarn.

## Commands

| Task        | Command                                        |
| ----------- | ---------------------------------------------- |
| Install     | `pnpm install`                                 |
| Run locally | `pnpm dev`, then open http://localhost:5173    |
| Test (all)  | `pnpm test`                                    |
| Test (one)  | `pnpm vitest run src/App.test.tsx -t "<name>"` |
| Lint        | `pnpm lint`                                    |
| Format      | `pnpm format`                                  |
| Typecheck   | `pnpm typecheck`                               |
| Build       | `pnpm build`                                   |

Environment: Node 22+ and pnpm 10. No services or env vars needed.

## Layout

```
src/lib/          pure logic and storage, no React
src/components/   React components, one per file
src/App.tsx       state and wiring
src/*.test.ts(x)  tests sit next to the code
```

## Code conventions

- Naming: components in `PascalCase.tsx` with named exports. Other files `camelCase.ts`.
- State: book changes are pure functions in `src/lib/books.ts` that return a new array. Components call them; they don't change books themselves.
- Errors: show input errors next to the form with `role="alert"`. Don't use `alert()`.
- Tests: Vitest with Testing Library. Query by role or label, as a user would. Test pure logic in `src/lib` directly.
- Accessibility: every input has a label. Toggle buttons use `aria-pressed`. Biome's a11y rules must pass.
- Commits: Conventional Commits (`feat`, `fix`, `refactor`, `test`, `docs`, `build`, `ci`, `chore`) with a scope.
- Do not: add a state library, a router or a CSS framework without a plan that asks for it.

## Decisions

- 2026-11-02: `localStorage`, no backend, because the app is for one person on one device.
- 2026-11-02: Biome for lint and format, not ESLint and Prettier, because one tool is enough.

## Gotchas

- `localStorage` is shared between tests. `src/test-setup.ts` clears it after each test; keep it that way.
- `crypto.randomUUID()` needs a secure context. It works on localhost, not on plain http hosts.
