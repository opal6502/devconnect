const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validationProfileInput = require('../../validation/profile');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET /api/profile/test
// @desc Tests profile route
// @access Public
router.get('/test', (req, res) =>
  res.json({ message: 'Profile endpoint works!' })
);

// @route GET /api/profile
// @desc Get current user's profile
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route POST /api/profile
// @desc Create/update profile for user
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.handle = req.body.company;
    if (req.body.website) profileFields.handle = req.body.website;
    if (req.body.location) profileFields.handle = req.body.locate;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubUsername)
      profileFields.githubUsername = req.body.githubUsername;
    // Skills - split into array
    if (typeof req.body.skills === 'string') {
      profileFields.skills = req.body.skills.split(',');
    }
    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profiile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.body.user },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        // Create

        // Handle must be unique
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = 'That handle is already in use';
            res.status(400).json(errors);
          }
          new Profile(profileFields)
            .save()
            .then((profile) => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
