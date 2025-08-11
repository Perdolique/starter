import { kvStarterStorage, kvTestKeyName } from '#shared/constants'

export default defineEventHandler(async () => {
  const storage = useStorage<string>(kvStarterStorage)
  const storedValue = await storage.get(kvTestKeyName)

  return {
    testValue: storedValue
  }
})
