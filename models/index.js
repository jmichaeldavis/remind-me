const User = require('./User');
const Reminder = require('./Reminder');

User.hasMany(Reminder, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
Reminder.belongsTo(User, {
    foreignKey: 'user_id'
  });

module.exports = { User, Reminder };
