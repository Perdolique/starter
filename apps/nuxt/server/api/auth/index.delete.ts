import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { db } = event.context
  const userId = validateSessionUser(event)

  try {
    await db
      .delete(tables.users)
      .where(
        eq(tables.users.id, userId)
      )
  } catch {
    // TODO: add logging

    throw createError({ statusCode: 500, statusMessage: 'Failed to delete user' })
  }

  await clearAppSession(event)

  sendNoContent(event)
})
