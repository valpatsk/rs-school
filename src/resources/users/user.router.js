const router = require('express').Router();
const User = require('./user.model');

const usersService = require('./user.service');
const tasksService = require('../task/task.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(
    new User({
      login: req.body.login,
      password: req.body.password,
      name: req.body.name
    })
  );
  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  try {
    await Promise.all([
      usersService.remove(req.params.id),
      tasksService.unassignUser(req.params.id)
    ]);
  } catch (e) {
    res.status(404).send(e.message);
  }
  res.sendStatus(200);
});

router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
