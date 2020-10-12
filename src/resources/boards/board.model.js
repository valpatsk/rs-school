const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = [
      {
        id: uuid(),
        title: 'COLUMN',
        order: 0
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /* static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }*/
}

module.exports = Board;
