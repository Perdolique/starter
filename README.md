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

The H3 worker includes full database integration with Drizzle ORM, providing a complete backend solution with PostgreSQL support. It demonstrates how to build scalable serverless APIs with database operations.

### Worker Features

- **Database Integration** - Full PostgreSQL support with Drizzle ORM for type-safe database operations
- **Lazy Routing** - Route handlers are loaded only when needed for optimal cold start performance
- **Environment Validation** - Robust validation of environment variables using Valibot
- **Demo Endpoints** - Example endpoints for KV storage and database operations

### API Endpoints

- `GET /` - Welcome endpoint
- `GET /kv-test` and `POST /kv-test` - KV storage demonstration
- `GET /users-count` - Database integration example (returns user count from PostgreSQL)

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

## Database

The project includes a complete PostgreSQL database setup with Drizzle ORM in the `@starter/database` package for type-safe database operations across the monorepo.

### Features

- **PostgreSQL with Docker** - Complete database infrastructure with Docker Compose setup
- [**Drizzle ORM**](https://orm.drizzle.team/) - Type-safe SQL query builder with excellent TypeScript support
- **UUID v7 support** - Modern UUID generation with timestamp ordering
- **Migration system** - Automated database schema versioning and updates
- **Multi-environment support** - Local development with Docker and production with Neon Database
- **WebSocket transactions** - Full transactional support via WebSocket connections

### Database Schema

The database includes predefined tables for common use cases:

- `users` - User management with admin roles and timestamps
- `oauthProviders` - Authentication provider integration
- `oauthAccounts` - Linking user accounts with OAuth providers

### Database Configuration

1. Copy `common/database/.env.example` to `common/database/.env`
2. Configure your database connection URL
3. Set `LOCAL_DATABASE=1` for local Docker development

The project supports both local and production database environments:

- **Local Development**: Uses Docker PostgreSQL with Neon HTTP/WebSocket proxies for compatibility
- **Production**: Connects directly to Neon Database or other PostgreSQL providers
- **Environment Variables**:
  - `DATABASE_URL` - PostgreSQL connection string
  - `LOCAL_DATABASE` - Set to `1` for local Docker development
  - `SESSION_SECRET` - Secure random string for session cookie signing

### Local Development

1. **Start the database**: `pnpm --filter @starter/database run db:start`
2. **Run migrations**: `pnpm --filter @starter/database run db:migrate:local`

The local setup includes:

- **PostgreSQL 17** with custom `pg_uuidv7` extension for modern UUID generation
- **Neon HTTP Proxy** on port 4444 for HTTP-based database queries (compatible with Neon's serverless driver)
- **Neon WebSocket Proxy** on port 5433 for transactional operations
- **Database accessible** at `postgres://user:password@db.localtest.me:5432/starter`

To generate new migrations based on your schema changes, use:

```bash
pnpm --filter @starter/database run db:generate
```

### Additional Database Scripts

- `pnpm --filter @starter/database run db:kit` - Run Drizzle Kit commands directly
- `pnpm --filter @starter/database run db:seed` - Seed database with initial data

### Database API Endpoints

The Nuxt application includes demo authentication API endpoints that showcase database integration patterns for user management:

- `GET /api/auth` - Get current user session information
- `POST /api/auth` - Create a new user account
- `DELETE /api/auth` - Delete current user account

These endpoints serve as examples of how to implement authentication with database operations using Drizzle ORM and can be used as a starting point for building your own authentication system.

**Server Utilities:**

- `validateSessionUser()` - Utility function to ensure user is authenticated in API routes
- `createDatabase()` - Creates Drizzle ORM instance with HTTP driver
- `createDatabaseWebsocket()` - Creates Drizzle ORM instance with WebSocket support for transactions

### Database Testing

You can test the database functionality using:

- **Demo UI** at `/test-page/database` in the Nuxt app - Interactive page for creating and deleting user accounts
- **User Store (Pinia)** - State management for user authentication with reactive user data
- **Session Management** - Automatic authentication state persistence across page refreshes

### Database Middleware

The Nuxt app includes automatic database integration through middleware:

- `1.session.ts` - Session management middleware for user authentication
- `2.database.ts` - Database connection middleware that provides Drizzle ORM instance to all API routes

### Database CI/CD

The project includes automated database migrations via GitHub Actions:

- **Staging migrations** - Automatically run on pull requests when `common/database/migrations/**` files change
- **Production migrations** - Automatically run on master branch pushes when migration files change
- **Database seeding** - Included in staging environment for testing data setup

Both workflows require `DATABASE_URL` secret to be configured in GitHub repository environments.

## Validation

The project includes a dedicated validation package `@starter/validation` built on top of [Valibot](https://valibot.dev) for type-safe data validation across the monorepo.

### Validation Features

- **Shared validation schemas** - Common validation rules that can be reused across apps and workers
- **Safe validation** - Validators support both throwing (`safe: false`) and non-throwing (`safe: true`) modes

### Validation Usage

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

## Logging

The project includes a centralized logging system in the `@starter/utils` package that provides structured logging across all applications and workers. The logger is designed following [Cloudflare Workers Logs best practices](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#best-practices) for optimal observability and performance.

### Logging Features

- **Structured JSON output** - All logs are formatted as JSON objects with consistent schema, enabling better filtering and indexing in Workers Logs
- **Cloudflare Workers optimized** - Follows best practices for Workers Logs with structured data instead of string concatenation
- **Tagging system** - Each logger instance is tagged (e.g., 'nuxt', 'h3-example') for easy filtering and segmentation
- **Multiple log levels** - Support for `info`, `warn`, and `error` logging levels
- **Flexible content** - Accepts both string messages and object data for rich logging
- **Cross-platform** - Works seamlessly in Nuxt server routes and Cloudflare Workers

### Usage Examples

```typescript
import { createLogger } from '@starter/utils/logger'

// Create logger instance with tag
const logger = createLogger('my-app')

// Log string messages
logger.info('Server started successfully')
logger.warn('Deprecated API endpoint used')
logger.error('Database connection failed')

// Log structured data
logger.info({ userId: 123, action: 'login', timestamp: Date.now() })
logger.error({ error: 'ValidationError', field: 'email', value: 'invalid' })
```

## HTTP Testing

The `requests/` directory contains HTTP request files for testing API endpoints across different services. These files can be used with VS Code [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension or similar tools for quick API testing during development.

Currently includes:

- `kv-save-data.http` - KV storage endpoints testing for both Nuxt app and H3 worker
- `database-check.http` - Database endpoints testing for H3 worker (`/users-count`)
- Database API endpoints can be tested directly via the demo UI at `/test-page/database`

## Environment variables

The project relies on several environment variables for configuration. You can find the example values in the `.env.example` files:

- `apps/nuxt/.env.example` - Nuxt app configuration including database URL and session secret
- `workers/h3-example/.env.example` - H3 worker configuration for Cloudflare Workers environment
- `common/database/.env.example` - Database-specific configuration for local development

Required variables:

- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Secure random string for session cookie signing (generate with `openssl rand -hex 32`)
- `LOCAL_DATABASE` - Set to `1` for local Docker development (optional, defaults to production mode)

## 🛠️ Technical stack

- Bleeding-edge technologies and tools.
- Only evergreen browsers are supported
- No legacy code, no outdated libraries.

## 📚 Tools, libs, etc

- [TypeScript](https://www.typescriptlang.org) - static type checker for JavaScript.
- [Nuxt.js](https://nuxt.com) - web framework.
- [Drizzle ORM](https://orm.drizzle.team) - TypeScript ORM for SQL databases.
- [PostgreSQL](https://www.postgresql.org) - advanced open source relational database.
- [Neon Database](https://neon.tech) - serverless PostgreSQL for modern applications.
- [Docker](https://www.docker.com) - containerization platform for local database setup.
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
- `/common/database` - PostgreSQL database setup with Drizzle ORM, schemas, migrations and Docker configuration
- `/common/utils` - utility functions and helpers including structured logging system
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
