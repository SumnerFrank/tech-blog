const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment, Post, User } = require('../../models');

// gets all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_title',
            'post_body',
        ], 
        order: [['created_at', 'DESC']],
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
                    attributes: ['name']
                }

            }
        ]
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
        where: {
            id: req.params.id
        }, 
        attributes: [
            'id',
            'post_title',
            'post_body'
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
                    attributes: ['name']
                }
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'Post ID Not Found.' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// creates a new post
router.post('/', withAuth, (req, res) => {
    Post.create({
        post_title: req.body.title,
        post_body: req.body.description,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update an existing post
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.post_title,
            content: req.body.post_body
        },
        {
            where: { id: req.params.id }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post with this ID' });
            return;
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// deletes an existing post 
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
         where: { id: req.params.id }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post with this ID' });
            return;
        }
        res.json(dbPostData);
    })
})

module.exports = router;