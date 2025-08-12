import { createError, H3, readBody } from 'h3'
import { object, string, parse } from 'valibot'
import { kvTestKeyName } from './constants'

const KvTestSchema = object({
  valueToStore: string()
})

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

  let validatedData
  try {
    validatedData = parse(KvTestSchema, body)
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body'
    })
  }

  await event.runtime?.cloudflare?.env.KV.put(kvTestKeyName, validatedData.valueToStore)

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
