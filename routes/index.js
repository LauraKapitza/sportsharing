const express = require('express');
const router  = express.Router();
const CATEGORIES = require('../constants');

const CATEGORIES = require('../constants');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index',{ 
    user: req.session.currentUser, 
    categories: CATEGORIES });
});

module.exports = router;
