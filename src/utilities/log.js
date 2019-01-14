const LogLevels = {
  LOG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  DEBUG: 5,
}

const _IS_LOGGING = localStorage.getItem('_IS_LOGGING')
const _LOGGING_LEVEL = localStorage.getItem('_LOGGING_LEVEL')

function shouldLog(logLevel) {
  return Boolean(_IS_LOGGING) && _LOGGING_LEVEL >= logLevel
}

export function log() {
  shouldLog(LogLevels.LOG) && console.log.apply(console, arguments)
}

export function info() {
  shouldLog(LogLevels.INFO) && console.info.apply(console, arguments)
}

export function error() {
  shouldLog(LogLevels.ERROR) && console.error.apply(console, arguments)
}

export function debug() {
  shouldLog(LogLevels.DEBUG) && console.debug.apply(console, arguments)
}

export function warn() {
  shouldLog(LogLevels.WARN) && console.warn.apply(console, arguments)
}
