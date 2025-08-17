import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  return {
    EXAMPLE_VARIABLE: event.runtime?.cloudflare?.env.EXAMPLE_VARIABLE
  }
})
