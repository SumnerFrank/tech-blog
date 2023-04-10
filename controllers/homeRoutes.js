const router = require('express').Router();
const { Post, User, Comment } = require('../models')

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_title',
            'post_body',
            'user_id'
        ], 
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_body',
                    'post_id',
                ],
            },
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('profile', {
            posts, 
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});


router.get('/post/:id', async (req, res) => {
    const usersPosts = await Post.findOne({
        where: { user_id: (req.params.id) },
        attributes: [
            'id',
            'post_title',
            'post_body',
        ]
    })
    res.render('profile', {
        posts: usersPosts
    });
});

router.get('/profile', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    console.log('REQ DOT SESSION', req.session);
    // create variable for all posts by this user
    const postData = await Post.findAll({
        where: { user_id: req.session.user_id },
    })
    console.log('POST DATA', postData)
    res.render('profile', { posts: postData });
});

module.exports = router;
