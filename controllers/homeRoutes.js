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
                    'user_id',
                ],
                include: {
                    model: User,
                    attrubutes: ['name']
                }
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts, 
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

