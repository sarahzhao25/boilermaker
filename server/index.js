//entry point for server JS
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const {db} = require('./models');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./apiRoutes'));

app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})
//because we generally want to build SPAs, our server should send its index.html for any requests that don't match one of our API routes.

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
})

const PORT = process.env.PORT || 1337;
db.sync({force: true})
.then(() => {
  console.log('db is synced! Let\'s kick a pump in gear!')
  app.listen(PORT, () => {
  console.log(`80 bpm and 10,000 psi on the line. 40 minutes left to flush on PORT ${PORT}!`)
  });
});

module.exports = app;
