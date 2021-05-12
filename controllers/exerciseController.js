const exerciseService = require('../services/apiServices')

module.exports = class exerciseModel {
    static async testIndexEndpoint(req, res) {
        let response = await exerciseService.testEndpoint()

        res.json({response});
   }

   static async addNewUser(req, res) {
       try{
            let newUsername = req.body.username
            let response = await exerciseService.createUser(newUsername)

            if (!response){
                res.send('Username already taken')
                return
            }

            let username = await response.username
            let _id = await response._id

            res.json({username, _id})
        } catch(err) {
            res.send(err.message)
        }
    
   }

   static async getAllUsers(req, res) {
       try{
            let response = await exerciseService.getAllUsers()

            res.json(response)

        } catch (err) {
            return err.message
        }
   }

   static async addExercise(req, res){
       try{
           let id = req.params.id
           let description = req.body.description
           let duration = parseInt(req.body.duration)
           let date = (req.body.date) ? new Date(req.body.date).toISOString().substring(0, 10) : new Date().toISOString(0, 10)

           let response = await exerciseService.addExercise(id, description, duration, date)

           let result = {}
           result['_id'] = await response._id
           result['username'] = await response.username
           result['date'] = new Date(date).toDateString()
           result['duration'] = duration
           result['description'] = description

           res.json({"_id" : result._id, "username" : result.username, "date" : result.date, "duration" : result.duration, "description" : result.description})

       }catch(err) {
           res.send(err.message)
       }
   }

   static async getUserLog(req, res){
       let id = req.params.id
       let response = await exerciseService.getUserLog(id)

       let result = await response

       let from = req.query.from
       let to = req.query.to

       if(from || to) {
           let fromDate = new Date(0)
           let toDate = new Date()

           if(from){
               fromDate = new Date(from)
           }

           if(to){
               toDate = new Date(to)
           }

           fromDate = fromDate.getTime()
           toDate = toDate.getTime()

           result.log = result.log.filter(exercise => {
               let exerciseDate = new Date(exercise.date).getTime

               return exerciseDate >= fromDate && exerciseDate <= toDate
           })
       }

        let limit = req.query.limit
       if(limit){
           result.log = result.log.slice(0, limit)
       }

       res.json(result)
   }
}