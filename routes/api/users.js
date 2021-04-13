const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load User model
const User = require('../../models/User');

// @route GET /api/users/test
// @desc Tests user route
// @access Public
router.get('/test', (req, res) =>
  res.json({ message: 'Users endpoint works!' })
);

// @route POST /api/users/register
// @desc Register new user
// @access Public
router.post('/register', (req, res) => {
  console.log('In register route!');
  const avatar = gravatar.url(req.body.email, {
    s: '200', // image size
    r: 'pg', // Rating
    d: 'mm', // Default
  });
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ error: 'Account with that email already exists' });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => res.json({ message: "Couldn't create user" }));
        });
      });
    }
  });
});

// @route POST /api/users/login
// @desc Login User / Generate token
// @access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email:
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: 'User with that email not found' });
    }

    // check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // user authenticated, sign token
        const jwt_payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        };

        jwt.sign(
          jwt_payload,
          keys.secretKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      } else {
        return res.status(400).json({ password: 'Password incorrect' });
      }
    });
  });
});

// @route GET /api/users/current
// @desc Return current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: 'false' }),
  (req, res) => {
    res.json({ message: 'Success' });
  }
);

module.exports = router;
