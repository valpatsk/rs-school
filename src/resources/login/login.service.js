// const usersService = require('../users/user.service');
const loginRepo = require('./login.memory.repository');
const bcrypt = require('bcrypt');
const { encodeToken } = require('../../common/auth');

const checkUser = async (login, password) => {
  const user = await loginRepo.checkUser(login);
  if (!user) return false;
  if (bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
};
// make jwt here
const makeJwt = async user => {
  const token = encodeToken({ userId: user.id, login: user.login });
  return token;
};

module.exports = { checkUser, makeJwt };
