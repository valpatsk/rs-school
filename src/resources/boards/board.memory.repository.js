const {
  getBoardById,
  getAllBoards,
  removeBoard,
  createBoard,
  updateBoard
} = require('../../common/db');

const getAll = async () => {
  try {
    const boards = await getAllBoards();
    return boards;
  } catch (e) {
    throw new Error(`Can't get all Boards (${e.message}).`);
  }
};

const get = async id => {
  try {
    const board = await getBoardById(id);
    console.log(board);
    if (!board) {
      throw new Error(`The board with ID ${id} was not found.`);
    }
    return board;
  } catch (e) {
    throw new Error(`Can't get Board ${id} (${e.message}).`);
  }
};

const remove = async id => {
  try {
    const result = await removeBoard(id);
    if (result === false) {
      throw new Error(`The board with ID ${id} was not deleted.`);
    }
    return true;
  } catch (e) {
    throw new Error(`Can't remove Board ${id} (${e.message}).`);
  }
};

const create = async board => {
  try {
    const newBoard = await createBoard(board);
    // console.log(newBoard);
    return newBoard;
  } catch (e) {
    throw new Error(`Can't create Board (${e.message}).`);
  }
};

const update = async (id, body) => {
  try {
    const result = await updateBoard(id, body);
    if (result === false) {
      throw new Error(`The board with ID ${id} was not found.`);
    }
    return await get(id);
  } catch (e) {
    throw new Error(`Can't update Board ${id} (${e.message}).`);
  }
};

module.exports = { getAll, get, create, remove, update };
