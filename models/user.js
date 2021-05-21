const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      User_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      User_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Profile_message : {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      Profile_pic_url:{
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      nickname:{
        type: Sequelize.STRING(45),
        allowNull: true,
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'User',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }
  static associate(db){
    db.User.hasOne(db.User_login, {foreignKey: 'User_id'});
  }
};