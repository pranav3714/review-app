const mongoose = require('mongoose')

let commentSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true
  },
  commentBody: {
    type: String,
    required: true,
    trim: true
  },
  movieId: {
    type: Number,
    required: true
  }
})
let Comment = module.exports = mongoose.model('comment', commentSchema);
