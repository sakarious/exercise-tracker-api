const mongodb = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema


  const userSchema = Schema({
    username: {
      type: String,
      required: "Required",
      unique: true
    },
    count : {
      type: Number,
      default: 0
    },
    logs :[
        {
        description: String,
        duration: Number,
        date: String
      }
    ]
  })

  
module.exports = mongoose.model('User', userSchema)