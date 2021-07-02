// const router = require('express').Router();
// const { Post, User, Comment } = require.apply('../models');
// // const withAuth =  require('.//utils/auth;');

// // GET blog posts
// router.get('/', async (req, res) => {
//     try {
//         const postData = await Post.findAll({
//             include: [{ model: User }],
//         });
//         const blog_posts = postData.map((post) => 
//         post.get({plain: true}));
//         res.render('homepage', {
//             blog_posts
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// module.exports = router;