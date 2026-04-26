var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs") 

const User = require("../models/User")
const uniqueUsernameGenerate = require("../utils/generateUsername")
// const auth = require("../middleware/auth") 


//__________PURPOSE_________---
/* Account creation (reg)
acct login
call uniqueUsernameGenerated func in utils/gernerateUsername.js
profile data
*/

// REGISTER
router.post("/register", async function (req, res) {



  try {
  const { email, password } = req.body

  if(!email || !password){
    return res.status(400).json({
      error: "All fields required"
    })
  }
  //must contain a lowercase/uppercase/1digit/1special char/ at least 8 letters long
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  if(!regex.test(password)){
    return res.status(400).json({
      error: "Password must be at least 8 characters long, including a number, special charecter and must contain at least one uppercase and lowercase char."
    })
  }

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return res.status(400).json({
      error: "This email has already been used"
    })
  }

  //hasing the password
  const hashedPassword = await bcrypt.hash(password, 10)
  
  //for the generate username function in util/generateUsername.js
  const usernameGenerated = await uniqueUsernameGenerate();

  const user = new User({
    email, 
    password: hashedPassword,
    usernameGenerated, //after register an anonymouse name is generated for each user only during registration. 
    role: "user"
})

  await user.save()

  res.json({ message: "User registered" })

  } catch (err) {
    console.error(err)
    res.status(500).json({
    error: "Server error"
    })
  }
})


// LOGIN
router.post("/login", async function (req, res){
try {
  const { email, password } = req.body

  if(!email || !password){
    return res.status(400).json({
      error: "All fields required"
    })
  }

  const user = await User.findOne({ email })
   if(!user){
    return res.status(400).json({
      error: "Invalid credentials"
    })
  }
  
  const isMatched = await bcrypt.compare(password, user.password)
  if (!isMatched){
    return res.status(400).json({
        error: "Invalid credentials"
    })
  }
  // SESSION
  req.session.userId = {
    id : user._id,
    email: user.email,
    usernameGenerated: user.usernameGenerated,
    role: user.role
  }

  //FIX need to save session first:::::
  req.session.save((err) => {
    if (err){
      console.error(err)
      return res.status(500).json({error: "Session save failed"})
    }
    res.json({message: "Logged in"})
  })
  // res.json({ message: "Logged in" })
} catch (err) {
  console.error(err)
  res.status(500).json({
    error: "Server error"
  })}
})



// LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy()
    res.clearCookie("connect.sid"); // important for cookies and session that may still exist 
  res.json({ message: "Logged out" })
})

module.exports = router