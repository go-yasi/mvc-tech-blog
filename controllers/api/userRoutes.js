/////////////////////////////
//  ROUTES for /api/user  //
////////////////////////////

const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
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

// CREATE new user at signup
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

// LOGIN route
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { username: req.body.username } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'User not found.' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'Logging you in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;