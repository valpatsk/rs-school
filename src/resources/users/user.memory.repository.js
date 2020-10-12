const DB = require('../../common/db');

const getAll = async () => {
  return DB;
};

const get = async id => {
  return DB.filter(el => el.id === id)[0];
};

const create = async user => {
  DB.push(user);
  return get(user.id);
};

module.exports = { getAll, get, create };
