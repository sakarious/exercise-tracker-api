const express = require('express')
const router = express.Router()
//const apiController = require('../controllers/apiController')

const UserModel = require('../model/userModel')
const ExerciseModel = require('../model/exerciseModel')
const mongoose = require('mongoose')
const { json } = require('express')

//Test /api endpoint
router.get('/', (req, res) => {
    res.send('Hello API')
})

//Get all users in db
router.get('/users', (req, res) => {

    UserModel.find({}, {count : 0, logs : 0}, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.json(docs)
        }
    })
})

//Add new user
router.post('/users', (req, res) => {
    //apiController.addAUser(req, res)
    let username1 = req.body.username
    let username = username1.toLowerCase()
    UserModel.findOne({username: username}, (err, docs) => {
      if (err) {
        console.log(err);
      }
      if (docs){
        res.send('Username already taken')
      } else {
        let response = new UserModel({
          username: username,
          _id: new mongoose.Types.ObjectId()
        })
        response.save((err, docs) => {
          if (err) {
            console.log(err)
          } else{
              let username = (docs.username);
              let _id = (docs._id);
            res.json({username, _id})
          }
        })
      }
    })
})

//Add exercises === //POST /api/:_id/exercises. BODY: description, duration, date ----- optional
router.post('/users/:_id/exercises', (req, res) => {
    let id = req.params._id
    let description = req.body.description
    let duration = req.body.duration
    let date = (req.body.date) ? new Date(req.body.date).toDateString(): new Date().toDateString()
    let log = {
        description,
        duration,
        date
    }
    console.log(log);
    UserModel.findByIdAndUpdate(id, { $push: {"logs": log}, $inc: {"count": 1}}, {new: true}, (err, docs) => {
        if (err) {
            res.send(err.message)
        } else {
            let _id = (docs._id);
            let username = (docs.username);
            let date = (docs.logs[docs.logs.length - 1].date)
            let duration = (docs.logs[docs.logs.length - 1].duration)
            let description = (docs.logs[docs.logs.length - 1].description)
            console.log(_id, username, date, duration, description);
            res.json({_id, username, date, duration, description})
        }
    })
})

//GET /api/users/:_id/logs == TO RETRIVE A FULL LOG OF ANY USER. THE RETURNED RESPONSE WILL BE THE USER OBJECT WITH A LOG ARRAY OF ALL THE EXERCISES ADDED
router.get('/users/:id/logs/:from?/:to?/:limit?', (req, res) => {
    console.log(req.params);
    let id = req.params.id
    let from = req.params.from
    let to = req.params.to
    let limit = req.params.limit
    if (from && to && limit){
        UserModel.findById(id, {'logs.date' : {'$gte': from, '$lte': to}}, (err, docs) => {
            if(err){
                console.log(err);
            } else{
                res.json(docs)
            }
        })
    } else if (from && to) {
        res.send('Got FROM and TO')
    } else {
    UserModel.findById(id, {'__v' : 0, 'logs._id' : 0}, (err, docs) => {
        if (err) {
            res.send(err.message)
        } else {
            res.json(docs)
        }
    })
    }
})



module.exports = router