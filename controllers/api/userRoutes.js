/////////////////////////////
//  ROUTES for /api/user  //
////////////////////////////

const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

// GET user by id
router.get('/:id', 
// withAuth, 
async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        const user = userData.get({ plain: true });
        res.render('dashboard', user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;