const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment, Post, User } = require('../../models');

// gets all posts
router.get('/', (req, res) => {
    Post.findAll({

    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// gets individual post
router.get('/:id', (req, res) => {
    Post.findOne({

    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'Post ID Not Found.' });
            return;
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// creates a new post
router.post('/', withAuth, (req, res) => {
    Post.create({
        post_title: req.body.post_title,
        post_body: req.body.post_body,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;