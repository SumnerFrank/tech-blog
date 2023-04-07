const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

// gets all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id', 
            'comment_body', 
            'post_id', 
            'user_id'
        ]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// creates a new comment
router.post('/', withAuth, (req, res) => {
    if (req.session.loggedIn) {
    Comment.create({
        comment_body: req.body.comment_body,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    }
});

// deletes an existing comment
router.delete('/', withAuth, (req, res) => {
    Comment.destroy({
        where: { id: req.params.id }
    })
    .then(dbpostData => {
        if(!dbpostData) {
            res.status(404).json({ message: 'No post with this ID'});
            return;
        };
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;