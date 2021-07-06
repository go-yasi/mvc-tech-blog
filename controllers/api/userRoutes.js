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

// CREATE new user
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = userData.id;
            res.status(200).json(userData);
        });

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
    }
});

module.exports = router;