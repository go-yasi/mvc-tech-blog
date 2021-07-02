const router = require('express').Router();
const { Post, User, Comment } = require('../models')

// router.get('/', async (req,res) => {
//     try {
//         res.render('homepage');
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll();
  
      const blog_posts = postData.map((info) => info.get({ plain: true }));
  
      res.render('homepage', {
        blog_posts
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;