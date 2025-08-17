import { defineLazyEventHandler, H3 } from 'h3'

const app = new H3()

app.get('/', defineLazyEventHandler(
  () => import('./routes/index.get').then(module => module.default)
))

app.get('/kv-test', defineLazyEventHandler(
  () => import('./routes/kv-test.get').then(module => module.default)
))

app.post('/kv-test', defineLazyEventHandler(
  () => import('./routes/kv-test.post').then(module => module.default)
))

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
