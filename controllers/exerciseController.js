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

            let _id = response._id
            let username = response.username
            let __v = response.__v

            //console.log([_id, username, __v]);
            
            res.json(response)

        } catch (err) {
            return err.message
        }
   }
}