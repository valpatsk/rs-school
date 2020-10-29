const router = require('express').Router();

const loginService = require('./login.service');
// const User = require('../users/user.model');

router.route('/').post(async (req, res, next) => {
  try {
    const user = await loginService.checkUser(
      req.body.login,
      req.body.password
    );
    if (user === false) {
      res.status(404).send("Login doesn't exist.");
      return;
    }
    if (user === null) {
      res.status(403).send('Incorrect password');
      return;
    }
    const jwt = await loginService.makeJwt(user);
    console.log(jwt);
    res.status(200).json({ token: jwt });
  } catch (e) {
    res.status(404);
    next(e.message);
    return;
  }
  return;
});

module.exports = router;
