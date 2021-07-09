const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth =  require('../utils/auth');

// Get individual post by id — WORKING
router.get('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User }, 
                { model: Comment, include: [ User ] }
            ],
            order: [[Comment, 'comment', 'DESC']]
        });
        if (!postData) {
            res.status(404).json({ message: "The post you're looking for does not exist"});
            return;
        }
        const post = postData.get({plain: true});
        // res.status(200).json(postData);
        // res.json(post);
        res.render('post', post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create new post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body, 
            // title: req.body.title,
            // content: req.body.content,
            user_id: req.session.user_id
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// // Render edit post page
// router.get('/edit/:id', withAuth, async (req, res) => {
//     try {
//     const postData = await Post.findOne({
//         where: {
//             id: req.params.id
//         },
//         include: [
//             {model: Comment, include: {model: User, attributes: ['username']}},
//             {mode: User, attributes: ['username']}
//         ]
//     });
//     if (!postData) {
//         res.status(404).json({ message: 'No post found with this ID'});
//         return;
//     }
//     const post = postData.get({plain: true});
//     res.render('edit', {
//         post, 
//         logged_in: true
//     });
//     } catch(err) {
//         res.status(500).json(err);
//     }
// });

// Need: PUT route to edit post title and/or content
router.put('/:id', withAuth, async (req,res) => {
    try {
        const postData = await Post.update(req.body, 
            {
            where: {
                id: req.params.id
            }
        });
        if(!postData) {
            res.status(404).json({ message: 'No post found with this ID!'});
            return;
        }
        const post =postData.get({plain: true});
        res.render('edit', {
            post,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;