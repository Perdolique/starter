import { H3Event, HTTPError } from 'h3'
import { createDrizzle } from '@starter/database/connection'
import { validateEnv } from './validation'

// TODO: Error handling can be moved to middleware and keep this function simple
export function createDatabase(event: H3Event) {
  try {
    const { databaseUrl, isLocalDatabase } = validateEnv(event.runtime?.cloudflare?.env)

    return createDrizzle(databaseUrl, isLocalDatabase)
  } catch (error) {
    // TODO: use logger
    console.error(error)

    throw new HTTPError('Failed to create database connection')
  }
}
