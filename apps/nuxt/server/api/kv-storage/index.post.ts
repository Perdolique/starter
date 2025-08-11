import { kvStarterStorage, kvTestKeyName } from '#shared/constants'

export default defineEventHandler(async (event) => {
  const { value } = await readBody(event)

  if (typeof value !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Value must be a string'
    })
  }

  const storage = useStorage<string>(kvStarterStorage)

  await storage.setItem(kvTestKeyName, value)

  return {
    testValue: value
  }
})
