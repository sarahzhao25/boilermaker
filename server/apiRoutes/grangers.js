const grangersRouter = require('express').Router();

grangersRouter.get('/', (req, res, next) => {
  res.send('My name is Hermione Granger!')
})

module.exports = grangersRouter;
