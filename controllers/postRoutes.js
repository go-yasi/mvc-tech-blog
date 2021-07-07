const router = require('express').Router();
const { Post, User, Comment } = require('../models');
// const withAuth =  require('.//utils/auth;');

// Get individual post by id — WORKING
router.get('/:id', 
// withAuth, 
async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User }, 
                { model: Comment, attributes: ['comment', 'created_at', 'user_id'] }
            ],
        });
        if (!postData) {
            res.status(404).json({ message: "The post you're looking for does not exist"});
            return;
        }
        const post = postData.get({plain: true});
        // res.status(200).json(postData);
        // res.json(post);
        res.render('post', {post});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;