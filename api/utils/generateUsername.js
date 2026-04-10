//genrated username once registered pakage 
const { generateUsername: createUsername } = require("unique-username-generator")
const User = require("../models/User")

async function uniqueUsernameGenerate(){
    let usernameGenerated;
    let exists = true;

    while(exists){ //check if it exists already
          //2= 2 words, 10 = lengeth limit 
        usernameGenerated =  createUsername("-", 2, 15)
        const existingUser = await User.findOne({ usernameGenerated})

        if (!existingUser){ //if no user have that username. 
            exists = false
        }
    }
    return usernameGenerated
}
//let other files import and use this func.
module.exports = uniqueUsernameGenerate;