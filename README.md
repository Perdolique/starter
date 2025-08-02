# Starter pack for future awesome projects 🐕💨

## Nuxt.js application

Example of Nuxt.js application is located in the `apps/nuxt` directory and works as SSR (Server-Side Rendering) application by default.

> By default configuration has two environments: `staging` and `production`. <br>
> [starter-nuxt-staging](https://starter-nuxt-staging.perd.workers.dev/) | [starter-nuxt-production](https://starter-nuxt-production.perd.workers.dev/)

To run the Nuxt.js application locally, follow these steps:

1. Run `pnpm --filter @starter/nuxt run dev` to start the development server.

### Deployment

To deploy the Nuxt.js application, you need to prepare environment:

1. Create two workers on Cloudflare. One for `staging` and one for `production` (e.g. `starter-nuxt-staging` and `starter-nuxt-production`).
2. Connect GitHub repository to those workers and configure build settings:
   - Set your default branch as branch control setting in both workers.
   - Set build command as `pnpm run build` in both workers.
   - Set deploy command as `pnpm run deploy:staging` for staging worker.
   - Set deploy command as `pnpm run deploy:production` for production worker.
   - Set path as `apps/nuxt` in both workers.
   - For staging worker enable build for non-production branches with command `pnpm run upload:staging`. It will upload builds for every non-production branch.
   - Update worker names in `wrangler.jsonc` file accordingly.

To test deployment locally, you can use following commands:

1. Build: `pnpm --filter @starter/nuxt run build`
2. Preview: `pnpm --filter @starter/nuxt run preview`

### Icons

By default, the project uses [client bundle mode](https://nuxt.com/modules/icon#client-bundle) for icons. It means that icon packs [should be installed](https://nuxt.com/modules/icon#iconify-dataset) separately.

To install icons, run the following command: `pnpm --filter @starter/nuxt add @iconify-json/streamline-emojis`

## Cloudflare workers

Example of [H3.js](https://h3.dev/) worker is located in the `workers/h3-example` directory.

### Directories and files

- `wrangler.jsonc` - configuration file for Cloudflare Workers.
- `src/` - source code of the worker.
- `src/index.ts` - entry point of the worker.
- `.env.example` - example environment variables file.

### Configuration

1. Copy `.env.example` to `.env` and fill in your values.
2. Update `wrangler.jsonc` with your worker name and account ID.
3. Run `pnpm --filter @starter/h3-example run cf:typegen` to generate TypeScript types for Cloudflare Workers.

### Running locally

To run the worker locally, you can use the following command: `pnpm --filter @starter/h3-example run dev`

### Deployment

To deploy the worker, you can use the following commands:

- For staging: `pnpm --filter @starter/h3-example run deploy:staging`
- For production: `pnpm --filter @starter/h3-example run deploy:production`

### GitHub Integration

To integrate the worker with GitHub, you can use the following steps:

1. Create two workers on Cloudflare or deploy existing one (see above).
2. Connect GitHub repository to those workers and configure build settings:
   - Set your default branch as branch control setting in both workers.
   - Keep build command empty.
   - Set deploy command as `pnpm run deploy:staging` for staging worker.
   - Set deploy command as `pnpm run deploy:production` for production worker.
   - Set path as `workers/h3-example` in both workers.
   - For staging worker enable build for non-production branches with command `pnpm run upload:staging`. It will upload builds for every non-production branch.

## 🛠️ Technical stack

- Bleeding-edge technologies and tools.
- Only evergreen browsers are supported
- No legacy code, no outdated libraries.

## 📚 Tools, libs, etc

- [TypeScript](https://www.typescriptlang.org) - static type checker for JavaScript.
- [Nuxt.js](https://nuxt.com) - web framework.
- [Drizzle ORM](https://orm.drizzle.team) - TypeScript ORM for SQL databases.
- [H3.js](https://h3.dev/) - HTTP framework for building web servers.
- [pnpm](https://pnpm.io) - package manager.
- [taze](https://github.com/antfu-collective/taze) - package update utility.
- [Vue Language Tools](https://github.com/vuejs/language-tools) - High-performance Vue language tooling based-on Volar.js
- [Pinia](https://pinia.vuejs.org) - state management library for Vue.js.
- [@nuxt/icon](https://github.com/nuxt/icon?tab=readme-ov-file#nuxt-icon) - icon management for Nuxt.js.

## Other technical things

- Monorepo with [pnpm workspaces](https://pnpm.io/workspaces).
- `.editorconfig` for consistent code style.
- [Dependabot](https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide) for automatic dependency updates.
- [GitHub Copilot](https://github.com/features/copilot) for AI-powered code suggestions.
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) for serverless functions.

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
