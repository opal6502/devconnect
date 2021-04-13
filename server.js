'use strict';

const express = require('express');
const app = express();

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

const port = process.env.PORT || 5000; // process.env.PORT on Heroku

app.get('/', (req, res) => res.send('Hello from devconnector'));

// API routes:
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server running on port ${port}`));
