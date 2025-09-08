import { createDatabase } from '@/utils/database'
import { tables } from '@starter/database/connection'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const db = createDatabase(event)

  const count = await db.$count(tables.users)

  return {
    usersCount: count
  }
})
