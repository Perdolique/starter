import { object, parse } from 'valibot'
import { defineEventHandler, readValidatedBody } from 'h3'
import { kvTestKeyName } from '@/constants'
import { NonEmptyStringSchema } from '@starter/validation/schemas/strings'

const bodySchema = object({
  valueToStore: NonEmptyStringSchema
})

function bodyValidator(body: unknown) {
  return parse(bodySchema, body)
}

export default defineEventHandler(async (event) => {
  const { valueToStore } = await readValidatedBody(event, bodyValidator)

  await event.runtime?.cloudflare?.env.KV.put(kvTestKeyName, valueToStore)

  return {
    storedValue: await event.runtime?.cloudflare?.env.KV.get(kvTestKeyName)
  }
})
