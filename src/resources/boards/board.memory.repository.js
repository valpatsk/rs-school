const { BDB } = require('../../common/db');

const getAll = async () => {
  return BDB;
};

const get = async id => {
  const board = BDB.filter(el => el.id === id)[0];
  if (!board) {
    throw new Error(`The board with ID: ${id} was not found.`);
  }
  return board;
};

const remove = async id => {
  const boards = BDB.filter(el => el.id !== id);
  if (boards.length === BDB.length) {
    throw new Error(`The board with ID: ${id} was not found.`);
  }
  while (BDB.length > 0) {
    BDB.pop();
  }
  while (boards.length > 0) {
    BDB.push(boards.pop());
  }
  return true;
};

const create = async board => {
  BDB.push(board);
  return get(board.id);
};

const update = async (id, body) => {
  const board = await get(id);
  if (!board) {
    throw new Error(`The board with ID: ${id} was not found.`);
  }
  if (body.id) board.id = body.id;
  if (body.title) board.title = body.title;
  if (body.columns) board.columns = body.columns;

  return get(body.id);
};

module.exports = { getAll, get, create, remove, update };
