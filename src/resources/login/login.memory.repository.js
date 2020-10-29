const { checkUserByLogin } = require('../../common/db');

const checkUser = async login => {
  try {
    const user = await checkUserByLogin(login);
    return user;
  } catch (e) {
    throw new Error(`Cant login user (${e.message}).`);
  }
};

module.exports = { checkUser };
