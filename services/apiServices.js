//Import User & Exercise Models
const User = require('../model/userModel')
const { exerciseModel } = require('../model/exerciseModel')
module.exports = class exerciseService {
    static testEndpoint(){
        return 'Live and Direct from the Model, featuring the controller, We are almost ready to go live'
    }

    static async createUser(username){
        try{
            let takenUsername = await User.find({username: username})

            if(takenUsername.length != 0){
                return 'Username already taken'
            }

            let newUser = await new User({
                username
            })

            let userDetails = newUser.save()
            return userDetails
        } catch(err) {
            return err.message
        }
    }
}