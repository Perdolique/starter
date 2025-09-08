import * as v from 'valibot'

const EnvSchema = v.object({
  DATABASE_URL: v.pipe(
    v.string(),
    v.nonEmpty()
  ),

  // FIXME: https://github.com/fabian-hiller/valibot/issues/1266
  LOCAL_DATABASE: v.exactOptional(
    v.string(),
    '0'
  )
})

/**
 * Validate the environment variables.
 * @param env The environment variables to validate.
 * @returns The validated environment variables.
 */
export function validateEnv(env: unknown) {
  const result = v.parse(EnvSchema, env)

  // TODO: move it to schema when the issue is resolved
  const isLocalDatabase = result.LOCAL_DATABASE === '1'

  return {
    isLocalDatabase,
    databaseUrl: result.DATABASE_URL
  }
}
