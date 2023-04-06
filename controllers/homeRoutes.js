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
        res.render('example', {
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

router.get('/profile/:id', async (req, res) => {
    const usersPosts = await Post.findAll({
        where: { user_id: (req.params.id) }
    })
    console.log('LOOK HERE CAPITAL LETTERS', usersPosts)
    res.render('profile', {
        posts: usersPosts
    });
});

module.exports = router;
