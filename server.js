const express = require('express')
const app = express()
const middleware = require('./middlewares')
const route = require('./routes')
require('dotenv').config()
const connection = require('./connection')

middleware(app)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

route(app)

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
