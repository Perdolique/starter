import { useLogger } from '~~/server/composables/use-logger'

export default defineEventHandler(async (event) => {
  const logger = useLogger()

  logger.info('A log from the Nuxt API route!')

  return sendNoContent(event)
})
