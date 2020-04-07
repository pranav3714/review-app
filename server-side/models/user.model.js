const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    required: true,
    default: "https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png",
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
})
let User = module.exports = mongoose.model('user', userSchema);
