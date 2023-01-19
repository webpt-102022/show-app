const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const user = req.session.currentUser;
  res.render('index', { title: 'Show app', user });
});

module.exports = router;
