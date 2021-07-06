////////////////////////////
//  ROUTES for /dashboard  //
////////////////////////////

const router = require('express').Router();
const { User, Post, Comment } = require('../models');
// const withAuth = require('../../utils/auth');

// Render dashboard page
router.get('/', async (req, res) => {
    try {
        res.render('dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;