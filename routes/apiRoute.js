const express = require('express')
const router = express.Router()
const exerciseController = require('../controllers/exerciseController')

router.get('/', (req, res) => {
    exerciseController.testIndexEndpoint(req, res)
})

module.exports = router