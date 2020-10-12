const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const DB = [];
const BDB = [];

DB.push(new User(), new User(), new User());

BDB.push(new Board(), new Board());

module.exports = { DB, BDB };
