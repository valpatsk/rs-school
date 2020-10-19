const winston = require('winston');

const config = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    path: 3
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    path: 'orange'
  }
};

const log = winston.createLogger({
  levels: config.levels,
  format: winston.format.combine(winston.format.simple()),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({}))
    }),
    new winston.transports.File({
      filename: './log/log.log'
    })
  ]
});

function requestInfo(req) {
  log.log(
    'info',
    `${req.method}: ${req.originalUrl}, ${JSON.stringify(
      req.query
    )}, ${JSON.stringify(req.body)}`
  );
}

function error(err, message) {
  log.log('error', `${err}: "${message}"`);
}
function info(message) {
  log.log('info', `${message}`);
}
function warning(warn, message) {
  log.log('warn', `${warn}: "${message}"`);
}

module.exports = { error, info, warning, requestInfo };
