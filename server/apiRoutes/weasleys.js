const weasleysRouter = require('express').Router();

weasleysRouter.get('/', (req, res, next) => {
  res.send('My name is Ron Weasley!')
})

module.exports = weasleysRouter;
