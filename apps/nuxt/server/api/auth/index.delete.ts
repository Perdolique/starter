import { eq } from 'drizzle-orm'
import { useLogger } from '~~/server/composables/use-logger'

export default defineEventHandler(async (event) => {
  const { db } = event.context
  const userId = validateSessionUser(event)
  const logger = useLogger()

  try {
    await db
      .delete(tables.users)
      .where(
        eq(tables.users.id, userId)
      )
  } catch (error) {
    logger.error({
      error,
      message: 'Failed to delete user',
    })

    throw createError({ statusCode: 500, statusMessage: 'Failed to delete user' })
  }

  await clearAppSession(event)

  sendNoContent(event)
})
