import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  const { db } = event.context
  const userId = await validateSessionUser(event)

  try {
    await db
      .delete(tables.users)
      .where(
        eq(tables.users.id, userId)
      )
  } catch {
    // TODO: add logging
  }

  await clearAppSession(event)

  sendNoContent(event)
})
