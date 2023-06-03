const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reminder extends Model {} 

Reminder.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      task_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      task_description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      task_folder: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      months: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'reminder',
    }
  );
  
  module.exports = Reminder;
  