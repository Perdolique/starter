import { isSamePath } from 'ufo'
import { publicApiPaths } from '#shared/constants'

declare module 'h3' {
  interface H3EventContext {
    userId?: string;
  }
}

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const isApiPath = url.pathname.startsWith('/api')

  if (isApiPath === false) {
    return
  }

  const session = await getAppSession(event)
  const { userId } = session.data

  event.context.userId = userId

  const isPublic = publicApiPaths.some((path) => {
    return isSamePath(path, url.pathname)
  })

  if (isPublic === false && userId === undefined) {
    throw createError({
      statusCode: 401
    })
  }
})
