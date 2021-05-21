const Sequelize = require('sequelize');

module.exports = class User_login extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      User_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      Email: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      pw : {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User_login',
      tableName: 'User_login',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }
  static associate(db){
    db.User_login.belongsTo(db.User, {foreignKey: 'User_id'});
  }
};