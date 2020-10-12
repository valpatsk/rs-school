const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/task/task.model');

const DB = [];
const BDB = [];
const TDB = [];

DB.push(new User(), new User(), new User());

BDB.push(new Board(), new Board());

TDB.push(new Task(), new Task());

module.exports = { DB, BDB, TDB };
