const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
// const Task = require('../resources/task/task.model');
require('dotenv').config();

const connectToDB = callBack => {
  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
    db.dropDatabase();
    const test_board = new Board({ title: 'TESTBOARD' });
    test_board.save();
    callBack();
  });
};

const TDB = [];

// Boards
async function getAllBoards() {
  return Board.find({}).exec();
}
async function getBoardById(board_id) {
  return Board.findOne({ id: board_id }).exec();
}
async function removeBoard(board_id) {
  const result = await Board.deleteOne({ id: board_id });
  if (result.deletedCount === 0) {
    return false;
  }
  return true;
}
async function createBoard(board) {
  return await Board.create(board);
}
async function updateBoard(board_id, body) {
  const result = await Board.updateOne({ id: board_id }, body);
  if (result.nModified === 0) {
    return false;
  }
  return Board.findOne({ id: board_id });
}
// Users
async function getAllUsers() {
  return User.find({}).exec();
}
async function getUserById(user_id) {
  return User.findOne({ id: user_id }).exec();
}
async function removeUser(user_id) {
  const result = await User.deleteOne({ id: user_id });
  if (result.deletedCount === 0) {
    return false;
  }
  return true;
}
async function createUser(user) {
  return await User.create(user);
}
async function updateUser(user_id, body) {
  const result = await User.updateOne({ id: user_id }, body);
  if (result.nModified === 0) {
    return false;
  }
  return Board.findOne({ id: user_id });
}

module.exports = {
  TDB,
  connectToDB,
  getBoardById,
  getAllBoards,
  removeBoard,
  createBoard,
  updateBoard,
  getUserById,
  getAllUsers,
  removeUser,
  createUser,
  updateUser
};
