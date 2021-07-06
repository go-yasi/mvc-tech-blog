const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const postRoutes = require('./postRoutes');
const dashRoutes = require('./dashRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/post', postRoutes);
router.use('/dashboard', dashRoutes);


module.exports = router;
