const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const user = mongoose.model('User', userSchema)

module.exports = user
