# kanbot-example-app

A small reading list app, set up with [kanbot](https://github.com/mikaelbr/kanbot). Use it to see what a filled-in [`project-conventions`](./.agents/skills/project-conventions/SKILL.md) looks like.

## The app

React 19, TypeScript and Vite. Add books, mark them read, filter. Data stays in `localStorage`.

```sh
pnpm install
pnpm dev
```

## The kanbot setup

`kanbot init` added the agents, skills and workflows. Then we:

1. Filled in [`project-conventions`](./.agents/skills/project-conventions/SKILL.md): stack, commands, layout, rules, decisions and gotchas.
2. Made [`ci.yml`](./.github/workflows/ci.yml) run the same lint, typecheck, test and build commands.

[See the diff](https://github.com/mikaelbr/kanbot-example-app/commit/1dac372db490e1db21166e318e838d0f0898a7e2) from the template.

For a repo that maps its own skills as capabilities, see [kanbot-example-web](https://github.com/mikaelbr/kanbot-example-web).

## Try it

1. Create your own copy (**Use this template**, or fork) and clone it.
2. Set `repo:` in `.kanbot/config.yml` to your `owner/name`.
3. Create the board, push, and start:

```sh
kanbot board create
git commit -am "chore: point kanbot at my repo" && git push
kanbot doctor
kanbot run
```

4. Add an issue, for example "Sort books by title", and move it to **Planning**.
