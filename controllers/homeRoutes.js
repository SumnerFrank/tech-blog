const router = require('express').Router();
const { Post, User, Comment } = require('../models')

router.get('/', (req, res) => {
    Post.findAll({

    })
    .then(dbPostData => {
        //render homepage with posts
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

