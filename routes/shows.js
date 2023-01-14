const express = require('express');
const router = express.Router();
const Show = require('../models/Show');
const Season = require('../models/Season');
const Review = require('../models/Review');

/* GET all shows */
/* ROUTE /shows */
router.get('/', async function (req, res, next) {
  try {
    const shows = await Show.find({}).sort({ title: 1 });
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

/* GET edit form view */
/* ROUTE /shows/edit/:showId */
router.get('/edit/:showId', async function (req, res, next) {
  const { showId } = req.params;
  try {
    const show = await Show.findById(showId);
    res.render('editShow', show);
  } catch (error) {
    next(error)
  }
});

/* POST get users show inputs */
/* ROUTE /shows/new */
router.post('/edit/:showId', async function (req, res, next) {
  const { title, year, image, description } = req.body;
  const { showId } = req.params;
  try {
    const editedShow = await Show.findByIdAndUpdate(showId, { title, year, image, description }, { new: true });
    res.redirect(`/shows/${editedShow._id}`);
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
router.get('/delete/:showId', async function (req, res, next) {
  const { showId } = req.params;
  try {
    const show = await Show.findById(showId);
    await Season.deleteMany({ _id: { $in: show.seasons } });
    await Review.deleteMany({ show: showId })
    await Show.deleteOne({ _id: showId })
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
    const show = await Show.findById(showId).populate('seasons');
    const reviews = await Review.find({ show: showId });
    res.render('detail', { show, reviews });
  } catch (error) {
    next(error)
  }
});

module.exports = router;