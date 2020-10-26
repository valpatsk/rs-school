const mongoose = require('mongoose');
const uuid = require('uuid');

/*
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
}
*/

const columnSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid
  },
  title: String,
  order: 0
});

const boardSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: [columnSchema]
  },
  { versionKey: false }
);
const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
