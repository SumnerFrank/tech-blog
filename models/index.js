const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

module.exports = { User, Comment, Post };
