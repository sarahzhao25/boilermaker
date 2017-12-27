//entry point for server JS
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const {db, User} = require('./models');
if (process.env.NODE_ENV === 'development') require('../localSecrets');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//session middleware
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({db: db});
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth');

dbStore.sync();

app.use(session({
  secret: process.env.SESSION_SECRET || 'this is an insecure but attempted secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}));

//consumes req.session object & attach the user to the request object
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => done(null, user))
  .catch(done);
})

app.post('/login', (req, res, next) => {
  User.find({
    where: req.body
  })
  .then(user => {
    if (!user) {
      let err = new Error('No user found!')
      err.status = 401;
      next(err);
    }
    else if (!user.hasMatchingPassword(req.body.password)) res.status(401).send('Incorrect password');
    else {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      })
    }
  })
  .catch(next);
})

app.post('/signup', (req, res, next) => {
  User.create(req.body)
  .then(user => {
  //   req.session.userId = user.id;
  //   res.status(200).send(user);
  // })
    req.login(user, err => {
      if (err) next(err);
      else res.json(user);
    });
  })
  .catch(next);
})

app.get('/logout', (req, res, next) => {
  req.logout();
  res.sendStatus(200);
})

app.get('/auth/google', passport.authenticate('google', {scope: 'email'}));

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}))


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
