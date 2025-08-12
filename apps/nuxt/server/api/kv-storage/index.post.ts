import { object, string, parse } from 'valibot'
import { kvStarterStorage, kvTestKeyName } from '#shared/constants'

const KvStorageSchema = object({
  value: string()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  let validatedData
  try {
    validatedData = parse(KvStorageSchema, body)
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Value must be a string'
    })
  }

  const storage = useStorage<string>(kvStarterStorage)

  await storage.setItem(kvTestKeyName, validatedData.value)

  return {
    testValue: validatedData.value
  }
})
