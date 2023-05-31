const router = require('express').Router();
const { Reminder } = require('../../models');

// /api/reminders
router.post('/', async (req, res) => {
  try {
    const newReminder = await Reminder.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newReminder);
  } catch (err) {
    res.status(400).json(err);
  }
});

// /api/reminders/{id}
router.delete('/:id', async (req, res) => {
  try {
    const reminderData = await Reminder.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!reminderData) {
      res.status(404).json({ message: 'No reminder found with this id!' });
      return;
    }

    res.status(200).json(reminderData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add a put request to update reminders

module.exports = router;