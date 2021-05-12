const mongodb = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exerciseSchema = Schema({
  _id : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  count : {
    type: Number,
    default: 0
  },
  logs : [
    {
    description: String,
    duration: Number,
    date: {
      type: Date,
      default: new Date()
    }
  }
  ]
})

module.exports = mongoose.model('Exercise', exerciseSchema)