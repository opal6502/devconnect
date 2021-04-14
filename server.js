'use strict';

console.log('starting up!');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// Server port:
const port = process.env.PORT || 5000; // process.env.PORT on Heroku

// Connect to MongoDB:
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected.'))
  .catch((err) => console.log('MongoDB connect failed: ', err));

// Init express:
const app = express();

// Add JSON body parser middleware:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Init passport:
app.use(passport.initialize());
require('./config/passport')(passport);

// import route files:
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// API routes:
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server running on port ${port}`));
