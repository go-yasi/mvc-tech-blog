const router = require('express').Router();
const { Post, User, Comment } = require('../models')

// GET posts on home page
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll();
  
      const blog_posts = postData.map((info) => info.get({ plain: true }));
  
      res.render('home', {
        blog_posts
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;