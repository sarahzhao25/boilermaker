const apiRouter = require('express').Router();

apiRouter.get('/', (req, res, next) => {
  res.send('Hello');
})

apiRouter.use('/grangers', require('./grangers'));
apiRouter.use('/potters', require('./potters'));
apiRouter.use('/weasleys', require('./weasleys'));

apiRouter.use((req, res, next) => {
  const err = new Error('Not an existing API route');
  err.status = 404;
  next(err);
})

module.exports = apiRouter;
