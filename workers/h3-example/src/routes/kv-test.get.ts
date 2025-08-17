import { defineEventHandler } from 'h3'
import { kvTestKeyName } from '@/constants'

export default defineEventHandler(async (event) => {
  const storedValue = await event.runtime?.cloudflare?.env.KV.get(kvTestKeyName)

  return {
    storedValue
  }
})
