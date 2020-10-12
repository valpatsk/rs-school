const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const get = (boardId, id) => tasksRepo.get(boardId, id);
const create = (boardId, body) => tasksRepo.create(boardId, body);
const remove = (boardId, id) => tasksRepo.remove(boardId, id);
const removeInBoard = boardId => tasksRepo.removeInBoard(boardId);
const unassignUser = userId => tasksRepo.unassignUser(userId);
const update = (boardId, id, body) => tasksRepo.update(boardId, id, body);

module.exports = {
  getAll,
  get,
  create,
  remove,
  update,
  removeInBoard,
  unassignUser
};
