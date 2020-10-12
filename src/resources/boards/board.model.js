const uuid = require('uuid');

class Bord {
  constructor({ id = uuid(), title = 'BORD' } = {}) {
    this.id = id;
    this.title = title;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = Bord;
