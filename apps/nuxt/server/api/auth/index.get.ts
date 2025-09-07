export default defineEventHandler(async (event) => {
  const session = await getAppSession(event)

  return {
    userId: session.data.userId
  }
})
