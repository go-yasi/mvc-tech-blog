const router = require('express').Router();

const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');
const dashRoutes = require('./dashRoutes');

router.use('/comment', commentRoutes);
router.use('/user', userRoutes);
router.use('/dashboard', dashRoutes);


module.exports = router;