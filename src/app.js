const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/task/task.router');
const logger = require('./common/logger.js');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

// logging requests
app.use(['/users', '/boards'], (req, res, next) => {
  logger.requestInfo(req, res);
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

// common error logging
app.use((err, req, res, next) => {
  logger.error('EXPRESS ERROR', err);
  res.status(res.statusCode).send(err);
  return;
});

// Exceptions catcher
process.on('uncaughtException', err => {
  logger.error('UNCAUGHT EXCEPTION', err);
});
process.on('unhandledRejection', err => {
  logger.error('UNHANDLED REJECTION', err);
});

//* FOR TEST *

// throw new Error('Oops!');

// Promise.reject(Error('Oops!'));

module.exports = app;
