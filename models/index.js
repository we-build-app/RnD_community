const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const User = require('./user');
const User_login = require('./user_login');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = User;
db.User_login = User_login;
db.sequelize = sequelize;
User.init(sequelize);
User_login.init(sequelize);
User.associate(db);
User_login.associate(db);

module.exports = db;
