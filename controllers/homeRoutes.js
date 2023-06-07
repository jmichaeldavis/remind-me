const router = require('express').Router();
const { Reminder, User } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/',
  withAuth,
  async (req, res) => {
    try {
      const dbReminderData = await Reminder.findAll({
        where: {
          user_id: req.session.user_id
        },
        include: [
          {
            model: User,
            attributes: ['name', 'email'],
          },
        ],
      });

      const reminders = dbReminderData.map((reminder) =>
        reminder.get({ plain: true }))

      res.render('homepage', {
        reminders,
        user_name: req.session.user_name,
        // Pass the logged in flag to the template
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/reminder/:id', async (req, res) => {

  try {
    const dbOneReminderData = await Reminder.findOne({
      where: {
        user_id: req.session.user_id,
        id: req.params.id
      }
    });

    if (!dbOneReminderData) {
      // render homescreen if reminder is not found
    }

    console.log(req.session);
    const reminder = dbOneReminderData.get({ plain: true })
    console.log(reminder);
    res.render('reminder', { reminder, loggedIn: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;