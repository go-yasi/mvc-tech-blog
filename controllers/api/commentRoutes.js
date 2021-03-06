////////////////////////////////
//  ROUTES for /api/comment  //
///////////////////////////////

const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

// POST new comments to Comment table
router.post('/', 
// withAuth,
async (req, res) => {
    try {
        const commentData = await Comment.create({...req.body, user_id:req.session.user_id});
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// // GET to show comments on blog post
// router.get('/', async (req, res) => {
//     try {
//         const commentData = await Comment.findAll({
//             include: [
//                 {
//                     model: User,
//                     attributes: ['id','username'],
//                 },
//                 {
//                     model: Post,
//                     attributes: ['id'],
//                 },
//             ],
//             order: [[ Comment, 'comment', 'DESC']]
//         });

//         const comments = commentData.map((comment) => 
//         comment.get({ plain: true })
//         );
//         res.status(200).json(comments);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

module.exports = router;