const mongoose = require('mongoose');
const { Schema } = mongoose;

const seasonSchema = new Schema({
  number: {
    type: Number,
    required: [true, 'You must introduce a season number']
  },
  releaseYear: {
    type: Number,
    required: [true, 'You must introduce a season release year']
  },
  numberOfEpisodes: {
    type: Number,
    required: [true, 'You must introduce a number of episodes for this season']
  },
  title: {
    type: String
  }
},
  {
    timestamps: true
  });

const Season = mongoose.model('Season', seasonSchema);
module.exports = Season;