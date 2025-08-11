import { object, parse, string } from 'valibot'
import { kvStarterStorage, kvTestKeyName } from '#shared/constants'

const requestSchema = object({
  value: string('Value must be a string')
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const { value } = parse(requestSchema, body)

  const storage = useStorage<string>(kvStarterStorage)

  await storage.setItem(kvTestKeyName, value)

  return {
    testValue: value
  }
})
