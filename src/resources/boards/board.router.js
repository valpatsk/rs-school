const router = require('express').Router();
const Board = require('./board.model');

const boardsService = require('./board.service');
const tasksService = require('../task/task.service');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardsService.getAll();
    res.status(200).json(boards);
  } catch (e) {
    res.status(404);
    next(e.message);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.status(200).json(board);
  } catch (e) {
    res.status(404);
    next(e.message);
  }
});

router.route('/').post(async (req, res, next) => {
  const board = await boardsService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.status(200).json(board);
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    Promise.all([
      await boardsService.remove(req.params.id),
      await tasksService.removeInBoard(req.params.id)
    ]);
  } catch (e) {
    res.status(404);
    next(e.message);
  }
  res.sendStatus(200);
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const board = await boardsService.update(req.params.id, req.body);
    res.status(200).json(board);
  } catch (e) {
    res.status(404);
    next(e.message);
  }
});

module.exports = router;
