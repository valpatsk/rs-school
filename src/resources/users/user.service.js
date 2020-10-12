const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const create = body => usersRepo.create(body);
const remove = id => usersRepo.remove(id);
const update = (id, body) => usersRepo.update(id, body);

module.exports = { getAll, get, create, remove, update };
