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

            let username = await response.username
            let _id = await response._id

            res.json({username, _id})
       } catch(err) {
           res.json({json: err.message})
       }
   }
}