import { createLogger } from '@starter/utils/logger'

const logger = createLogger('nuxt')

export function useLogger() {
  return logger
}
