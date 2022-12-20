const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Show = require('../models/Show');
const MONGO_URL = 'mongodb://localhost:27017/showDB';
const shows = require('../data/shows');

mongoose.connect(MONGO_URL)
  .then(response => console.log(`Connected to the database ${response.connection.name}`))
  .then(() => {
    return Show.create(shows)
  })
  .then(createdShows => console.log(`Inserted ${createdShows.length} shows in the database`))
  .then(() => mongoose.connection.close())
  .catch(err => console.error(err))
