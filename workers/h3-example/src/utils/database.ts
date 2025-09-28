import { H3Event, HTTPError } from 'h3'
import { createDrizzle } from '@starter/database/connection'
import { useLogger } from '@/composables/use-logger'
import { validateEnv } from '@/utils/validation'

// TODO: Error handling can be moved to middleware and keep this function simple
export function createDatabase(event: H3Event) {
  const logger = useLogger()

  try {
    const { databaseUrl, isLocalDatabase } = validateEnv(event.runtime?.cloudflare?.env)

    return createDrizzle(databaseUrl, isLocalDatabase)
  } catch (error) {
    logger.error({
      error,
      message: 'Failed to create database connection',
    })

    throw new HTTPError('Failed to create database connection')
  }
}
