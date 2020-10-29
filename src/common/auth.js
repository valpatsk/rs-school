const jwt = require('jsonwebtoken');
require('dotenv').config();

function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.secretOrPrivateKey);
    return decoded;
  } catch (err) {
    return `JWT decode error ${err}`;
  }
}
function encodeToken(object) {
  console.log(object);
  const token = jwt.sign(object, process.env.secretOrPrivateKey);
  return token;
}

module.exports = {
  decodeToken,
  encodeToken
};
