const express = require('express');
const router = express.Router();
const Show = require('../models/Show');

/* GET all shows */
/* ROUTE /shows */
router.get('/', async function (req, res, next) {
  try {
    const shows = await Show.find({});
    res.render('showView', { shows });
  } catch (error) {
    next(error)
  }
});

/* GET search results */
/* ROUTE /shows/search */
router.get('/search', async function (req, res, next) {
  const { title } = req.query;
  try {
    const show = await Show.findOne({ title: title });
    res.render('search', { query: title, show: show });
  } catch (error) {
    next(error)
  }
});

/* GET one show */
/* ROUTE /shows/:showId */
router.get('/:showId', async function (req, res, next) {
  const { showId } = req.params;
  try {
    const show = await Show.findById(showId);
    res.render('detail', show);
  } catch (error) {
    next(error)
  }
});

module.exports = router;