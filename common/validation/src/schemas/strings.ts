import { nonEmpty, pipe, string } from 'valibot'

export const NonEmptyStringSchema = pipe(
  string(),
  nonEmpty()
)
