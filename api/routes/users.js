var express = require('express');
var router = express.Router();


const User = require("../models/User")


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

// REGISTER
router.post("/register", async function (req, res) {

  try {
  const { username, email, password } = req.body

  if(!username || !email || !password){
    return res.status(400).json({
      error: "All fields required"
    })
  }

  if(password.length < 6){
    return res.status(400).json({
      error: "Password must be at least 6 characters"
    })
  }

  const user = new User({
    username,
    email,
    password
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

router.get("/me", function (req, res) {
  res.json({
    session: req.session,
    userId: req.session.userId || null
  });
});

module.exports = router