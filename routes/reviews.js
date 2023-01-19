const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

/* POST new review */
/* ROUTE /reviews/new/:showId */
router.post('/new/:showId', async function (req, res, next) {
  const { stars, comment } = req.body;
  const { username } = req.session.currentUser;
  const { showId } = req.params;
  try {
    await Review.create({ stars, comment, username, show: showId });
    res.redirect(`/shows/${showId}`)
  } catch (error) {
    next(error)
  }
});

module.exports = router;