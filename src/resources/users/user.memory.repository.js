const {
  getUserById,
  getAllUsers,
  removeUser,
  createUser,
  updateUser
} = require('../../common/db');

const getAll = async () => {
  try {
    const boards = await getAllUsers();
    return boards;
  } catch (e) {
    throw new Error(`Can't get all Users (${e.message}).`);
  }
};

const get = async id => {
  try {
    const user = await getUserById(id);
    if (!user) {
      throw new Error(`The user with ID ${id} was not found.`);
    }
    return user;
  } catch (e) {
    throw new Error(`Can't get user ${id} (${e.message}).`);
  }
};

const remove = async id => {
  try {
    const result = await removeUser(id);
    if (result === false) {
      throw new Error(`The user with ID ${id} was not deleted.`);
    }
    return true;
  } catch (e) {
    throw new Error(`Can't remove user ${id} (${e.message}).`);
  }
};

const create = async user => {
  try {
    const newUser = await createUser(user);
    return newUser;
  } catch (e) {
    throw new Error(`Can't create user (${e.message}).`);
  }
};

const update = async (id, body) => {
  try {
    const result = await updateUser(id, body);
    if (result === false) {
      throw new Error(`The user with ID ${id} was not found.`);
    }
    return await get(id);
  } catch (e) {
    throw new Error(`Can't update user ${id} (${e.message}).`);
  }
};

module.exports = { getAll, get, create, remove, update };
