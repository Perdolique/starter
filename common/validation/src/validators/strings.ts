import { parse, safeParse } from 'valibot';
import { NonEmptyStringSchema } from '@/schemas/strings';

type ParseSchema = Parameters<typeof parse>[0];

function createValidator<S extends ParseSchema>(schema: S) {
  function validator(value: unknown) : ReturnType<typeof parse<S>>;
  function validator(value: unknown, options: { safe: true }) : ReturnType<typeof safeParse<S>>;
  function validator(value: unknown, options: { safe: false }) : ReturnType<typeof parse<S>>;

  function validator(value: unknown, options = { safe: false }) {
    if (options.safe) {
      return safeParse(schema, value);
    }

    return parse(schema, value);
  }

  return validator;
}

export const nonEmptyStringValidator = createValidator(NonEmptyStringSchema);
