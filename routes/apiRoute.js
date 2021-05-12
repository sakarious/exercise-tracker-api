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

module.exports = router