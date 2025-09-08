import type { H3Event, EventHandlerRequest } from 'h3'

export function validateSessionUser(event: H3Event<EventHandlerRequest>) {
  const { userId } = event.context

  if (userId === undefined) {
    throw createError({
      statusCode: 401
    })
  }

  return userId
}
