const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { modelSchema } = require('./exerciseModel')


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
    log :[
        modelSchema
    ]
  })

  
module.exports = mongoose.model('User', userSchema)