const router = require('express').Router();
const { Post, User, Comment } = require('../models')

// Render login page — WORKING
router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render signup page — WORKING
router.get('/signup', async (req,res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render homepage and show all posts — WORKING
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          { model: User }
        ], 
        order: [[ 'created_at', 'DESC']]
      });
      // console.log(postData);
  
      const blog_posts = postData.map((info) => info.get({ plain: true }));
      // res.status(200).json(postData);
      // console.log(blog_posts);

      res.render('home', {
        blog_posts
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;