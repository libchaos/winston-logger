const loggerConfig = require('../index')


const logger = loggerConfig({
  dir: 'logs'
})

logger.warn('sfsfsfsfsfdsf')
logger.error('what is the chicken?')