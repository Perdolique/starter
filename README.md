# Starter pack for future awesome projects 🐕💨

## Nuxt.js application

Example of Nuxt.js application is located in the `apps/nuxt` directory and works as SSR (Server-Side Rendering) application by default.

> By default configuration has two environments: `staging` and `production`. <br>
> [starter-nuxt-staging](https://starter-nuxt-staging.perd.workers.dev/) | [starter-nuxt-production](https://starter-nuxt-production.perd.workers.dev/)

To run the Nuxt.js application locally, follow these steps:

1. Run `pnpm --filter @starter/nuxt run dev` to start the development server.

### Nuxt.js deployment

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

Example of [H3.js](https://h3.dev/) worker is located in the `workers/h3-example` directory. The worker uses lazy routing to optimize cold start performance by loading route handlers only when needed.

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

To run the worker locally, you can use the following commands:

- `pnpm --filter @starter/h3-example run dev` - run with local bindings (emulated)
- `pnpm --filter @starter/h3-example run dev:remote` - run with [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings)

### Worker deployment

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

## Cloudflare KV integration

Cloudflare KV is integrated for both the Nuxt app (server routes) and the H3 worker. The PR #37 added:

- KV namespaces bindings (`KV`) to both `apps/nuxt/wrangler.jsonc` and `workers/h3-example/wrangler.jsonc` (staging + production).
- A Nitro storage mapping (`kv-starter-storage`) using the `cloudflare-kv-binding` driver for Nuxt app.
- Demo API endpoints: `GET /api/kv-storage` and `POST /api/kv-storage` in Nuxt app.
- Demo API endpoints: `GET /kv-test` and `POST /kv-test` in H3 worker.
- Demo UI page `/test-page/kv-storage` with a Pinia store to read/write a test value.
- Shared constants file with storage + key names.
- Local development aid via `nitro-cloudflare-dev` module (environment = staging by default) to emulate KV binding.
- HTTP request files in `requests/` directory for testing API endpoints.

### 1. Create namespaces

In Cloudflare Dashboard create two KV namespaces (or reuse existing): one for `staging`, one for `production`.

### 2. Add bindings (if not already)

Update (or verify) `kv_namespaces` arrays in:

- `apps/nuxt/wrangler.jsonc`
- `workers/h3-example/wrangler.jsonc`

### 3. Use in server code

Example GET handler in Nuxt app (`apps/nuxt/server/api/kv-storage/index.get.ts`):

```typescript
const storage = useStorage<string>(kvStarterStorage)
const storedValue = await storage.get(kvTestKeyName)

await storage.set(kvTestKeyName, 'Woof!')
```

Example handler in H3 worker (`workers/h3-example/src/index.ts`):

```typescript
app.get('/kv-test', async (event) => {
  const storedValue = await event.runtime?.cloudflare?.env.KV.get(kvTestKeyName)

  await event.runtime?.cloudflare?.env.KV.put(kvTestKeyName, 'Woof!')
})
```

### 4. Local development

The Nuxt project uses `nitro-cloudflare-dev` module + `nitro.cloudflareDev.environment = 'staging'` so running the standard dev command will emulate the staging binding locally.

### 5. Testing KV storage

You can test KV storage using:

- Demo UI at `/test-page/kv-storage` in the Nuxt app
- HTTP request files in `requests/kv-save-data.http` for testing endpoints
- Direct API calls to the endpoints mentioned above

## Validation

The project includes a dedicated validation package `@starter/validation` built on top of [Valibot](https://valibot.dev) for type-safe data validation across the monorepo.

### Features

- **Shared validation schemas** - Common validation rules that can be reused across apps and workers
- **Safe validation** - Validators support both throwing (`safe: false`) and non-throwing (`safe: true`) modes

### Usage

```typescript
import { nonEmptyStringValidator } from '@starter/validation/validators/strings';

// Throwing mode (default)
const result = nonEmptyStringValidator('hello world'); // string

// Safe mode - returns success/error result
const safeResult = nonEmptyStringValidator('hello world', { safe: true });
if (safeResult.success) {
  console.log(safeResult.data); // string
} else {
  console.log(safeResult.issues); // validation errors
}
```

## HTTP Testing

The `requests/` directory contains HTTP request files for testing API endpoints across different services. These files can be used with VS Code [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension or similar tools for quick API testing during development.

Currently includes:

- `kv-save-data.http` - KV storage endpoints testing for both Nuxt app and H3 worker

## 🛠️ Technical stack

- Bleeding-edge technologies and tools.
- Only evergreen browsers are supported
- No legacy code, no outdated libraries.

## 📚 Tools, libs, etc

- [TypeScript](https://www.typescriptlang.org) - static type checker for JavaScript.
- [Nuxt.js](https://nuxt.com) - web framework.
- [Drizzle ORM](https://orm.drizzle.team) - TypeScript ORM for SQL databases.
- [H3.js](https://h3.dev/) - HTTP framework for building web servers.
- [Valibot](https://valibot.dev) - schema validation library with great TypeScript support.
- [pnpm](https://pnpm.io) - package manager.
- [taze](https://github.com/antfu-collective/taze) - package update utility.
- [Vue Language Tools](https://github.com/vuejs/language-tools) - High-performance Vue language tooling based-on Volar.js
- [Pinia](https://pinia.vuejs.org) - state management library for Vue.js.
- [@nuxt/icon](https://github.com/nuxt/icon?tab=readme-ov-file#nuxt-icon) - icon management for Nuxt.js.
- [nitro-cloudflare-dev](https://github.com/nitrojs/nitro-cloudflare-dev) - local development tool for Cloudflare Workers.

## Other technical things

- Monorepo with [pnpm workspaces](https://pnpm.io/workspaces).
- `.editorconfig` for consistent code style.
- Code style instructions in `.github/instructions/` directory for consistent development practices.
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
- `/common/validation` - shared validation schemas and utilities using Valibot
- `/requests` - HTTP request files for testing API endpoints across services
- `/scripts` - utility scripts for development and deployment
- `/workers` - worker applications
- `/workers/h3-example` - H3.js example worker
- `/.github/instructions` - coding style and development instructions

## Scripts

- `update:all` - check package updates in all workspaces in interactive mode
- `update:newest` - check package updates in all workspaces and update to the newest versions interactively

## Some useful commands

- `pnpm --filter @starter/<workspace> add <package>` - adds a `package` to the `@starter/<workspace>`.
