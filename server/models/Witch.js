const Sequelize = require('sequelize');
const db = require('./db');

const Witch = db.define('wizard', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Witch;
