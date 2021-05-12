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
                return false
            }

            let newUser = await new User({
                username
            })

            let userDetails = await newUser.save()
            return userDetails
        } catch(err) {
            return err.message
        }
    }

    static async getAllUsers(){
        try{

            return User.find({}, {count: 0, log: 0})
            //return allUsers

        }catch(err){
            return err.message
        }
    }

    static async addExercise(id, description, duration, date){

        let newExercise = await new exerciseModel({
            description,
            duration,
            date
        })

        let updatedUser = await User.findByIdAndUpdate(id, { $push: {log: newExercise}, $inc: {count: 1}}, {new: true})

        return updatedUser
    }
}