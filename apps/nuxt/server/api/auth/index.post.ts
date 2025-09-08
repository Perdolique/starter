interface ResponseData {
  userId: string
}

export default defineEventHandler(async (event) : Promise<ResponseData> => {
  const { db } = event.context
  const session = await getAppSession(event)

  if (session.data.userId !== undefined) {
    throw createError({
      statusCode: 409,
      statusMessage: 'User already exists'
    })
  }

  const [inserted] = await db
    .insert(tables.users)
    .values({})
    .returning({
      id: tables.users.id
    })

  // FIXME: `inserted` can be undefined, but TypeScript doesn't know that
  if (inserted === undefined) {
    throw createError({
      statusCode: 500,
      statusMessage: 'User creation failed'
    })
  }

  await updateAppSession(event, {
    userId: inserted.id
  })

  setResponseStatus(event, 201)

  return {
    userId: inserted.id
  }
})
