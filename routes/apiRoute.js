const express = require('express')
const router = express.Router()
const exerciseController = require('../controllers/exerciseController')

router.get('/', (req, res) => {
    exerciseController.testIndexEndpoint(req, res)
})

//POST to /api/users with form data username to create a new user.
router.post('/users', (req, res) => {
    exerciseController.addNewUser(req, res)
})

//GET request to /api/users to get an array of all users
router.get('/users', (req, res) => {
    exerciseController.getAllUsers(req, res)
})

//POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used.
router.post('/users/:id/exercises', (req, res) => {
    exerciseController.addExercise(req, res)
})

//GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
//(/api/users/:_id/logs) returns an object with a count property representing the number of exercises returned.
router.get('/users/:id/logs', (req, res) => {
    exerciseController.getUserLog(req, res)
})

module.exports = router