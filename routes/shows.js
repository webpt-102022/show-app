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

/* GET form view */
/* ROUTE /shows/new */
router.get('/new', function (req, res, next) {
  res.render('newShow');
});

/* POST get users show inputs */
/* ROUTE /shows/new */
router.post('/new', async function (req, res, next) {
  const { title, year, image, description } = req.body;
  try {
    const createdShow = await Show.create({ title, year, image, description });
    res.redirect(`/shows/${createdShow._id}`);
  } catch (error) {
    next(error)
  }
});

/* GET delete show */
/* ROUTE /shows/delete/:id */
router.get('/delete/:id', async function (req, res, next) {
  const { id } = req.params;
  try {
    await Show.findByIdAndDelete(id);
    res.redirect(`/shows`);
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