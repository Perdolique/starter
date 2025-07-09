# Starter pack for future awesome projects 🐕💨

## Quick start

## Project structure

- `/` - root directory with global scripts
- `/apps` - frontend applications
- `/apps/nuxt` - Nuxt.js application boilerplate
- `/common` - shared packages
- `/common/database` - database schema, related utils, types etc.
- `/common/utils` - utility functions and helpers
- `/workers` - worker applications
- `/workers/h3-example` - H3.js example worker

## Scripts

- `update:all` - check package updates in all workspaces in interactive mode
- `update:newest` - check package updates in all workspaces and update to the newest versions interactively

## Some useful commands

- `pnpm --filter @starter/<workspace> add <package>` - adds a `package` to the `@starter/<workspace>`.

## 🛠️ Technical stack

- GitHub Copilot instructions.

### 📚 Tools, libs, etc

- [Nuxt.js](https://nuxt.com) - web framework.
- [Drizzle ORM](https://orm.drizzle.team) - TypeScript ORM for SQL databases.
- [H3.js](https://h3.dev/) - HTTP framework for building web servers.
- [pnpm](https://pnpm.io) - package manager.
- [taze](https://github.com/antfu-collective/taze) - package update utility.

### Other technical things

- Monorepo with [pnpm workspaces](https://pnpm.io/workspaces).
- `.editorconfig` for consistent code style.
- [Dependabot](https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide) for automatic dependency updates.
