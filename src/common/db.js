const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/task/task.model');

const DB = [];
const BDB = [];
const TDB = [];
function getBoardById(id) {
  const board = BDB.filter(el => el.id === id)[0];
  return board;
}

DB.push(new User(), new User(), new User());

BDB.push(new Board(), new Board());

TDB.push(new Task(), new Task());

module.exports = { DB, BDB, TDB, getBoardById };
