const mongodb = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exerciseSchema = Schema({
    description: String,
    duration: Number,
    date: Date
})

let exerciseModel = mongoose.model('Exercise', exerciseSchema)
let modelSchema = exerciseSchema

module.exports = {exerciseModel, modelSchema}