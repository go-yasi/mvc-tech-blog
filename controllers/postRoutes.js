const router = require('express').Router();
const { Post, User, Comment } = require('../models');
// const withAuth =  require('.//utils/auth;');

// GET blog post by id
router.get('/:id', 
// withAuth, 
async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User}, {model: Comment}]
        });
        if (!postData) {
            res.status(404).json({ message: "This post does not exist"});
            return;
        }
        const post = postData.get({plain: true});
        res.render('post', {post
            // , logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;