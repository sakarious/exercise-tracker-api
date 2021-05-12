const apiRoute = require('./apiRoute')

module.exports = (app) => {
    app.use('/api', apiRoute)
    
    app.get('/', (req, res) => {
        res.render('index')
      });

}