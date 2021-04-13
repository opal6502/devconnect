'use strict';

console.log('starting up!');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

// import route files:
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected.'))
  .catch((err) => console.log('MongoDB connect failed: ', err));

const passport = require('passport');

app.use(passport.initialize);

// Passport Config
require('./config/passport')(passport);

const port = process.env.PORT || 5000; // process.env.PORT on Heroku

// API routes:
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server running on port ${port}`));
