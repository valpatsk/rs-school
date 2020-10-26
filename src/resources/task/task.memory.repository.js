const { TDB } = require('../../common/db');
const { getBoardById } = require('../../common/db');

const getAll = async boardId => {
  const board = getBoardById(boardId);
  if (!board) {
    throw new Error(`Board ${boardId} was not found.`);
  }
  const tasks = TDB.filter(el => el.boardId === boardId);
  if (!tasks || tasks.length === 0) {
    throw new Error(`The tasks in board: ${boardId} were not found.`);
  }
  return tasks;
};

const get = async (boardId, id) => {
  const board = getBoardById(boardId);
  if (!board) {
    throw new Error(`Board ${boardId} was not found.`);
  }
  const task = TDB.filter(el => el.id === id && el.boardId === boardId)[0];
  if (!task) {
    throw new Error(`The task with ID: ${id} was not found.`);
  }
  return task;
};

const remove = async (boardId, id) => {
  const tasks = TDB.filter(el => el.id !== id && el.boardId === boardId);
  if (tasks.length === TDB.length) {
    throw new Error(
      `The task with ID: ${id} in board: ${boardId} was not found.`
    );
  }
  while (TDB.length > 0) {
    TDB.pop();
  }
  while (tasks.length > 0) {
    TDB.push(tasks.pop());
  }
  return true;
};

const removeInBoard = async boardId => {
  const tasksNotInBoard = await TDB.filter(el => el.boardId !== boardId);
  if (tasksNotInBoard.length === TDB.length) {
    return true;
  }
  while (TDB.length > 0) {
    await TDB.pop();
  }
  while (tasksNotInBoard.length > 0) {
    await TDB.push(tasksNotInBoard.pop());
  }
  return true;
};

const unassignUser = async userId => {
  const tasksInUser = await TDB.filter(el => el.userId === userId);
  for (let i = 0; i < tasksInUser.length; i++) {
    tasksInUser[i].userId = null;
  }
  return true;
};

const create = async (boardId, task) => {
  task.boardId = boardId; //! get from params, not from body!
  await TDB.push(task);
  return get(task.boardId, task.id);
};

const update = async (boardId, id, body) => {
  const task = await get(boardId, id);
  if (!task) {
    throw new Error(
      `The task with ID: ${id} and boardId ${boardId} was not found.`
    );
  }
  if (body.id) task.id = body.id;
  if (body.title) task.title = body.title;
  if (body.description) task.description = body.description;
  if (body.userId) task.userId = body.userId;
  if (body.columnId) task.columnId = body.columnId;
  task.boardId = boardId; //! !!get from params, not from body

  return get(task.boardId, task.id);
};

module.exports = {
  getAll,
  get,
  create,
  remove,
  update,
  removeInBoard,
  unassignUser
};
