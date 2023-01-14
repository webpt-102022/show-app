const express = require('express');
const router = express.Router();
const Season = require('../models/Season');
const Show = require('../models/Show');

/* POST new season */
/* ROUTE /seasons/new/:showId */
router.post('/new/:showId', async function (req, res, next) {
  const { number, releaseYear, numberOfEpisodes, title } = req.body;
  const { showId } = req.params;
  try {
    const newSeason = await Season.create({ number, releaseYear, numberOfEpisodes, title });
    await Show.findByIdAndUpdate(showId, { $push: { seasons: newSeason._id } });
    res.redirect(`/shows/${showId}`);
  } catch (error) {
    next(error)
  }
});

module.exports = router;