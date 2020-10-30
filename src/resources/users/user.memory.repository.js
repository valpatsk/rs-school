const { TDB } = require('../../common/db');

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

    const assigned_tasks = TDB.filter(el => el.userId === id);
    for (let i = 0; i < assigned_tasks.length; i++) {
      assigned_tasks.userId = null;
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


/*

const getAll = async () => {
  return DB;
};

const get = async id => {
  const user = DB.filter(el => el.id === id)[0];
  if (!user) {
    throw new Error(`The user with ID: ${id} was not found.`);
  }
  return user;
};

const remove = async id => {
  const users = DB.filter(el => el.id !== id);
  if (users.length === DB.length) {
    throw new Error(`The user with ID: ${id} was not found.`);
  }
  while (DB.length > 0) {
    DB.pop();
  }
  while (users.length > 0) {
    DB.push(users.pop());
  }
  const assigned_tasks = TDB.filter(el => el.userId === id);
  for (let i = 0; i < assigned_tasks.length; i++) {
    assigned_tasks.userId = null;
  }
  return true;
};

const create = async user => {
  DB.push(user);
  return get(user.id);
};

const update = async (id, body) => {
  const user = await get(id);
  if (!user) {
    throw new Error(`The user with ID: ${id} was not found.`);
  }
  if (body.id) user.id = body.id;
  if (body.login) user.login = body.login;
  if (body.name) user.name = body.name;
  if (body.password) user.password = body.password;

  return get(user.id);
};

module.exports = { getAll, get, create, remove, update };
