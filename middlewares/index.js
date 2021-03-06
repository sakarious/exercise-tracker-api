const express = require('express')
const cors = require('cors')
const path = require('path')

module.exports = (app) => {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(express.static('public'))
}