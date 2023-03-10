const mongoose = require('mongoose');
const { Schema } = mongoose;

const showSchema = new Schema({
  title: {
    type: String,
    required: [true, 'You must introduce a title to insert new show']
  },
  year: Number,
  image: {
    type: String,
    default: 'https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg'
  },
  description: {
    type: String,
    default: 'No description was provided yet'
  },
  seasons: {
    type: [Schema.Types.ObjectId],
    ref: 'Season'
  }
},
  {
    timestamps: true
  });

const Show = mongoose.model('Show', showSchema);

module.exports = Show;