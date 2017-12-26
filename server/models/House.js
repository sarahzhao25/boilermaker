const Sequelize = require('sequelize');
const db = require('./db');

const House = db.define('house', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  colors: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  attribute: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = House;
