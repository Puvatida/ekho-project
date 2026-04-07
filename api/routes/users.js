var express = require('express');
var router = express.Router();


const User = require("../models/User")
const auth = require("../middleware/auth") 


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

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

  const user = new User({
    email, 
    password,
    usernameGenerated: "anon" + Date.now(), //after register an anonymouse name is generated for each user only during registration. 
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

  if(!user || user.password !== password){
    return res.status(400).json({
      error: "Invalid credentials"
    })
  }

  // SESSION
  req.session.userId = user._id

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

//--------------------------------------REMOVE BEFORE SUBMISSION!!!!!!!!!!__________________-
router.get("/me", function (req, res) {
  res.json({
    session: req.session,
    userId: req.session.userId || null
  });
});

module.exports = router