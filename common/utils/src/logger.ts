type LogContent = { [key: string]: unknown } | string

function formatContent(content: LogContent) : { [key: string]: unknown } {
  if (typeof content === 'string') {
    return {
      message: content
    }
  }

  return content
}

export function createLogger(tag: string) {
  function log(level: 'info' | 'warn' | 'error', content: LogContent) {
    const formattedContent = formatContent(content)

    console[level]({
      tag,
      ...formattedContent
    })
  }

  function warn(content: LogContent) {
    log('warn', content)
  }

  function info(content: LogContent) {
    log('info', content)
  }

  function error(content: LogContent) {
    log('error', content)
  }

  return {
    warn,
    info,
    error
  }
}
