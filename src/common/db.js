const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/task/task.model');
require('dotenv').config();
const bcrypt = require('bcrypt');

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
    createUser({
      name: 'Valery Patskevich',
      login: 'admin',
      password: bcrypt.hashSync('admin', 10)
    });
    const test_board = new Board({ title: 'TESTBOARD' });
    test_board.save();
    callBack();
  });
};

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
  return true;
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
  return true;
}

// tasks
async function getAllTasks(board_id) {
  const query = Task.find({ boardId: board_id });
  const res = await query.exec();
  return res;
}
async function getTaskById(board_id, task_id) {
  return Task.findOne({ boardId: board_id, id: task_id }).exec();
}
async function removeTask(board_id, task_id) {
  const result = await Task.deleteOne({ id: task_id, boardId: board_id });
  if (result.deletedCount === 0) {
    return false;
  }
  return true;
}
async function createTask(board_id, task) {
  task.boardId = board_id; //! get from params, not from body!
  return await Task.create(task);
}
async function updateTask(board_id, task_id, body) {
  body.boardId = board_id; //! get from params, not from body!
  const result = await Task.updateOne({ boardId: board_id, id: task_id }, body);
  if (result.nModified === 0) {
    return false;
  }
  return true;
}
// login
async function checkUserByLogin(login) {
  return User.findOne({ login }).exec();
}

// common
async function removeTasksInBoard(board_id) {
  const res = await Task.deleteMany({ boardId: board_id });
}
async function unassignUserOnDelete(user_id) {
  const res = await Task.updateMany({ userId: user_id }, { userId: null });
}
module.exports = {
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
  updateUser,
  getTaskById,
  getAllTasks,
  removeTask,
  createTask,
  updateTask,
  removeTasksInBoard,
  unassignUserOnDelete,
  checkUserByLogin
};
