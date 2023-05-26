const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// Make sure to tweak the route names as needed
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;