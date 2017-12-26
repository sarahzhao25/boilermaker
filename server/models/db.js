const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/HPFamilies', {logging: false});
//heroku uses the 'process.env'

module.exports = db;
