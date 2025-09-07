import { createDrizzle, createDrizzleWebsocket, tables } from '@starter/database/connection'

export { tables }

function getDatabaseUrl() {
  if (process.env.DATABASE_URL === undefined) {
    throw new Error('DATABASE_URL is not defined')
  }

  return process.env.DATABASE_URL
}

function isLocalDatabase() {
  // import.meta.dev for Vite environment, LOCAL_DATABASE for Cloudflare environment
  return import.meta.dev === true || process.env.LOCAL_DATABASE === '1'
}

export function createDatabase() {
  return createDrizzle(getDatabaseUrl(), isLocalDatabase())
}

export function createDatabaseWebsocket() {
  return createDrizzleWebsocket(getDatabaseUrl(), isLocalDatabase())
}
