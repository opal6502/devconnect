const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

const validatePostInput = require('../../validation/post');

// @route GET /api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) =>
  res.json({ message: 'Posts endpoint works!' })
);

// @route GET /api/posts
// @desc Get posts
// @access Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ error: 'No posts found' }));
});

// @route GET /api/posts/:id
// @desc Get post by id
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post === null) {
        return res.status(404).json({ error: 'No post with that id found' });
      }
      res.json(post);
    })
    .catch((err) =>
      res.status(404).json({ error: 'No post with that id found' })
    );
});

// @route POST /api/posts
// @desc Create a post
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });

    newPost.save().then((post) => res.json(post));
  }
);

// @route DELETE /api/posts/:id
// @desc Delete post by id
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // console.log('DELETE /api/posts/:id', req.params);
    // console.log('DELETE /api/posts/:id', req.user);

    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          // Check post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ error: 'Not authorized to delete this post' });
          }
          // Perform delte
          post
            .remove()
            .then((post) => res.json({ success: true }))
            .catch((err) => res.status(404).json({ error: 'Post not found' }));
        })
        .catch((err) => res.status(404).json({ error: 'Post not found' }));
    });
  }
);

module.exports = router;
