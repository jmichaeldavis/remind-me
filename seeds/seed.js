const sequelize = require('../config/connection');
const { User, Reminder } = require('../models');

const userData = require('./userData.json');
const reminderData = require('./reminderData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const reminder of reminderData) {
    await Reminder.create({
      ...reminder,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();