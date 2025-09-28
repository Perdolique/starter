import { useLogger } from '@/composables/use-logger'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const logger = useLogger()

  logger.info('Handling request for example variable')

  return {
    EXAMPLE_VARIABLE: event.runtime?.cloudflare?.env.EXAMPLE_VARIABLE
  }
})
