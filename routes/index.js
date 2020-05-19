
const express = require('express')
const router = express.Router()
const { ensureAuthenticated, forwardAuthenticated } = require('../utilites/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('main', {
    user: req.user
  })
);

module.exports = router;