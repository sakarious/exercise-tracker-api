const apiiRoute = require('./apiRoute')

module.exports = (app) => {
    app.use('/api', apiiRoute)
    
    app.get('/', (req, res) => {
        res.render('index')
      });

}