const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.get(id);
const create = body => boardsRepo.create(body);
const remove = id => boardsRepo.remove(id);
const update = (id, body) => boardsRepo.update(id, body);

module.exports = { getAll, get, create, remove, update };
