import * as v from 'valibot'

const EnvSchema = v.object({
  DATABASE_URL: v.pipe(
    v.string(),
    v.nonEmpty()
  ),

  LOCAL_DATABASE: v.pipe(
    v.optional(
      v.string(),
      '0'
    ),

    v.transform((value) => value === '1'),
  )
})

/**
 * Validate the environment variables.
 * @param env The environment variables to validate.
 * @returns The validated environment variables.
 */
export function validateEnv(env: unknown) {
  const result = v.parse(EnvSchema, env)

  return {
    isLocalDatabase: result.LOCAL_DATABASE,
    databaseUrl: result.DATABASE_URL
  }
}
