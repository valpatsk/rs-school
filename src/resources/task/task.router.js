const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');

const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.boardId, req.params.id);
    res.json(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(
    req.params.boardId,
    new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId, //!  !!!from params
      columnId: req.body.columnId
    })
  );
  res.json(task);
});

router.route('/:id').delete(async (req, res) => {
  try {
    await tasksService.remove(req.params.boardId, req.params.id);
  } catch (e) {
    res.status(404).send(e.message);
  }
  res.sendStatus(200);
});

router.route('/:id').put(async (req, res) => {
  try {
    const task = await tasksService.update(
      req.params.boardId,
      req.params.id,
      req.body
    );
    res.json(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
