const router = require('express').Router();
const User = require('./user.model');

const usersService = require('./user.service');
const tasksService = require('../task/task.service');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  } catch (e) {
    res.status(404);
    next(e.message);
    return;
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.get(req.params.id);
    res.status(200).json(User.toResponse(user));
  } catch (e) {
    res.status(404);
    next(e.message);
    return;
  }
});

router.route('/').post(async (req, res, next) => {
  const user = await usersService.create(
    new User({
      login: req.body.login,
      password: req.body.password,
      name: req.body.name
    })
  );
  res.status(200).json(User.toResponse(user));
  return;
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await Promise.all([
      await usersService.remove(req.params.id),
      await tasksService.unassignUser(req.params.id)
    ]);
  } catch (e) {
    res.status(404);
    next(e.message);
    return;
  }
  res.sendStatus(200);
  return;
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.status(200).json(User.toResponse(user));
  } catch (e) {
    res.status(404);
    next(e.message);
    return;
  }
});

module.exports = router;
