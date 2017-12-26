const Sequelize = require('sequelize');
const db = require('./db');
const House = require('./House');
const Witch = require('./Witch');
const Wizard = require('./Wizard');

Witch.belongsTo(House);
Wizard.belongsTo(House);
House.hasMany(Witch);
House.hasMany(Wizard);

module.exports = {
  db,
  House,
  Witch,
  Wizard
};
