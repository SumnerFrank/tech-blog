const router = require('express').Router();
const { useInflection } = require('sequelize');
const { Comment, Post, User } = require('../../models');

// Gets all users
router.get('/', (req, res) => {
    User.findAll({
    })
    .then(deUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Gets individual user 
router.get('/:id', (req, res) => {
    User.findOne({

    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'ID Not Found.' });
            return;
        } res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Creates a new user 
router.post('/', (req, res) => {
    User.create({

    })
    .then(dbUserData)
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Logs user in
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

// Logs user out 
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });