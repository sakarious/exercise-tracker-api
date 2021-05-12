const mongodb = require('mongodb')
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}, (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log('Successfully connected to database');
    }
  });
