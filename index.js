const winston = require('winston')
const winstonRotator = require('winston-daily-rotate-file')
const moment = require('moment')
const path = require('path')

const timeFormatFn = function() {
    return moment().format('YYYY-MM-DDTHH:mm:ss')
}

function LoggerConfig(options) {
  options = Object.assign({
    maxSize: 5 * 1024 * 1024,
  }, options)
  const consoleConfig = [
  new winston.transports.Console({
    colorize: true,
    timestamp: timeFormatFn,
    level: options.isDebug ? 'debug' : 'info',
    handleExceptions: true,
    humanReadableUnhandledException: true
  })
]

  const createLogger = new winston.Logger({
    transports: consoleConfig,
    exitOnError: false
  })

  const logger = createLogger
  logger.add(winstonRotator, {
    name: 'access-file',
    level: 'info',
    filename: path.join(options.dir, 'access.log'),
    maxsize: options.maxSize,
    json: false,
    datePattern: 'yyyy-MM-dd.',
    prepend: true
  })
  return logger
}

module.exports = LoggerConfig




