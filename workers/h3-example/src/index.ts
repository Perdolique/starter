import { H3 } from 'h3'

const app = new H3()

app.get('/', (event) => {
  return {
    EXAMPLE_VARIABLE: event.runtime?.cloudflare?.env.EXAMPLE_VARIABLE
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
