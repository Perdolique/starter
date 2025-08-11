import { createError, H3, readBody } from 'h3'
import { kvTestKeyName } from './constants'

const app = new H3()

app.get('/', (event) => {
  return {
    EXAMPLE_VARIABLE: event.runtime?.cloudflare?.env.EXAMPLE_VARIABLE
  }
})

app.get('/kv-test', async (event) => {
  const storedValue = await event.runtime?.cloudflare?.env.KV.get(kvTestKeyName)

  return {
    storedValue
  }
})

app.post('/kv-test', async (event) => {
  const body = await readBody(event)

  if (
    typeof body !== 'object' ||
    body === null ||
    'valueToStore' in body === false ||
    typeof body.valueToStore !== 'string'
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body'
    })
  }

  await event.runtime?.cloudflare?.env.KV.put(kvTestKeyName, body.valueToStore)

  return {
    storedValue: await event.runtime?.cloudflare?.env.KV.get(kvTestKeyName)
  }
})

export default {
  fetch(request, env, context) {
    Object.defineProperties(request, {
      waitUntil: {
        value: context.waitUntil.bind(context)
      },

      runtime: {
        enumerable: true,

        value: {
          cloudflare: {
            env,
            context
          }
        }
      }
    })

    return app.fetch(request)
  }
} satisfies ExportedHandler<Env>
