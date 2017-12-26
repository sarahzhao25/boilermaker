const pottersRouter = require('express').Router();

pottersRouter.get('/', (req, res, next) => {
  res.send('My name is Harry Potter!')
})

module.exports = pottersRouter;
