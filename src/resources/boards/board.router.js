const router = require('express').Router();
const Board = require('./board.model');

const boardsService = require('./board.service');
const tasksService = require('../task/task.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.json(board);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  try {
    await Promise.all([
      boardsService.remove(req.params.id),
      tasksService.removeInBoard(req.params.id)
    ]);
    /*
    await boardsService
      .remove(req.params.id)
      .then(await tasksService.removeInBoard(req.params.id));
      */
  } catch (e) {
    res.status(404).send(e.message);
  }
  res.sendStatus(200);
});

router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardsService.update(req.params.id, req.body);
    res.json(board);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
