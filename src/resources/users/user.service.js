const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const create = body => usersRepo.create(body);

module.exports = { getAll, get, create };
