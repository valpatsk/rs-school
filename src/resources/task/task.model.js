const mongoose = require('mongoose');
const uuid = require('uuid');

const taskSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  { versionKey: false }
);
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

/*
class Task {
  constructor({
    id = uuid(),
    title = 'TASK',
    order = 0,
    description = 'TASKDESCRIPTION',
    userId = '',
    boardId = '',
    columnId = ''
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

}

module.exports = Task;
*/
