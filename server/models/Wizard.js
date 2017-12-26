const Sequelize = require('sequelize');
const db = require('./db');

const Wizard = db.define('wizard', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Wizard;
