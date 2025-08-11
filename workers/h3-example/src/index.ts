import { createError, H3, readBody } from 'h3'
import { object, parse, string } from 'valibot'
import { kvTestKeyName } from './constants'

const kvTestRequestSchema = object({
  valueToStore: string('valueToStore must be a string')
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

  const { valueToStore } = parse(kvTestRequestSchema, body)

  await event.runtime?.cloudflare?.env.KV.put(kvTestKeyName, valueToStore)

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
