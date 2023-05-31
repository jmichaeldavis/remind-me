const router = require('express').Router();
const { Reminder } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const dbReminderData = await Reminder.findAll({
      where: {
        user_id: req.session.user_id
      }  
    });

    const reminders = dbReminderData.map((reminder) =>
    reminder.get({ plain: true }))

    res.render('homepage', {
      reminders,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
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

module.exports = router;