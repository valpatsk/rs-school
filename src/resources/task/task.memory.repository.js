const { TDB } = require('../../common/db');

const getAll = async boardId => {
  const tasks = TDB.filter(el => el.boardId === boardId);
  if (!tasks || tasks.length === 0) {
    throw new Error(`The tasks in board: ${boardId} were not found.`);
  }
  return tasks;
};

const get = async (boardId, id) => {
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
  const tasksInBoard = TDB.filter(el => el.boardId !== boardId);
  console.log('start');
  console.log(TDB);
  console.log(tasksInBoard);
  if (tasksInBoard.length === TDB.length) {
    return true;
  }
  while (TDB.length > 0) {
    TDB.pop();
  }
  while (tasksInBoard.length > 0) {
    TDB.push(tasksInBoard.pop());
  }
  console.log(TDB);
  console.log('end');
  return true;
};

const unassignUser = async userId => {
  const tasksInUser = TDB.filter(el => el.userId === userId);
  for (let i = 0; i < tasksInUser.length; i++) {
    tasksInUser[i].userId = null;
  }
  return true;
};

const create = async (boardId, task) => {
  task.boardId = boardId; //! get from params, not from body!
  TDB.push(task);
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
