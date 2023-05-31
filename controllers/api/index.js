const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reminderRoutes = require('./reminderRoutes');

router.use('/users', userRoutes);
router.use('/reminders', reminderRoutes);


module.exports = router;
