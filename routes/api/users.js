const express = require('express');
const router = express.Router();

// @route GET /api/users/test
// @desc Tests post route
// @access Public
router.get('/test', (req, res) =>
  res.json({ message: 'Users endpoint works!' })
);

module.exports = router;
