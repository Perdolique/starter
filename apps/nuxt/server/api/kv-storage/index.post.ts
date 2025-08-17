import { object, parse } from 'valibot'
import { kvStarterStorage, kvTestKeyName } from '#shared/constants'
import { NonEmptyStringSchema } from '@starter/validation/schemas/strings'

const bodySchema = object({
  storedValue: NonEmptyStringSchema
})

function bodyValidator(body: unknown) {
  return parse(bodySchema, body)
}

export default defineEventHandler(async (event) => {
  const { storedValue } = await readValidatedBody(event, bodyValidator)
  const storage = useStorage<string>(kvStarterStorage)

  await storage.setItem(kvTestKeyName, storedValue)

  return {
    storedValue
  }
})
