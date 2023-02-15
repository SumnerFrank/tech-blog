const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Comment, Post, User } = require('../../models');


module.exports = router;