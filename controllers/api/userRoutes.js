/////////////////////////////
//  ROUTES for /api/user  //
////////////////////////////

const router = require('express').Router();
const { User } = require('../../models');

// GET user by id
// router.get('/:id', 
// // withAuth, 
// async (req, res) => {
//     try {
//         const userData = await User.findByPk(req.params.id);
//         const user = userData.get({ plain: true });
//         res.render('dashboard', user);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// CREATE new user at signup — WORKING
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

// LOGIN user — WORKING
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { username: req.body.username } });
  console.log(userData);
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
      res.status(500).json(err);
    }
  });

// LOGOUT user 
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;