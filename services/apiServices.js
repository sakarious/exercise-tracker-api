//require database model
const userModel = require('../model/userModel')

module.exports = class apiController {
    static sayHello () {
        return "Hello Sakarious, I am working perfectly"
    }

    static async getAllUsers() {
        try{
            const allUsers = await userModel.find()
            

            const filterObjsInArr = (arr, selection) => {
                const filteredArray = [];
                arr.map((obj) => {
                  const filteredObj = {};
                  for (let key in obj) {
                    if (selection.includes(key)) {
                      filteredObj[key] = obj[key];
                    };
                  };
                  filteredArray.push(filteredObj);
                })
                return filteredArray;
              }
              return (filterObjsInArr(allUsers, ["_id", "username", "__v"]));


            //return allUsers
        }catch(err){
            return (`Something went wrong ${err.message}`)
        }
    }

    static async addAUser (username) {
        try{
            let user = username

            let foundUser = await userModel.findOne({username: user})
            if(foundUser){
                return "Username exists"
            } else {
                let newUser = await userModel.create({username: user})
                return newUser
            }
        } catch(err){
            console.log( err.message)
        }
        
    }
}