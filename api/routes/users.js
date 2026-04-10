var express = require('express');
var router = express.Router();


const User = require("../models/User")
//auth that only login user can access profile
const auth = require("../middleware/auth")

//GET/view own profile
router.get("/me", auth, async (req, res) => { //retrieveing current login user
  try{
    //take user ID without retunring the passwordd
    const user = await User.findById(req.session.userId.id).select("-password")

    res.json({
      session: req.session,
      // userId: req.session.userId || null,
      user
    })
  }catch (err){
    console.error(err);
    res.status(500).json({ error: "Server error"})
  }
});

//view my posts
/**
 * 
 * 
 * 
 * 
 * 
 */

//view/search others profile
// router.get("/search", async function (req, res) {
//   try{
//     const query = req.query.q; //quewry eg api/users/search/q=bob

//     if(!query){
//       return res.status(400).json({
//         error: "Search query is required"
//       })
//     }

//     const user = await User.find({
//       $or: [
//         { usernameGenerated: { $regex: query, $options: "i"}} //case sensitive search by username 
//       ]
//     }).select("-password") //again no password returning
   
//     res.json(user)
//   }catch (err){
//     console.error(err);
//     res.status(500).json({ error: "Server error"})
//   }
// });


//delete your own profile
router.delete("/me", auth, async function (req, res){
  
  try{
    await User.findByIdAndDelete(req.session.userId.id)

    req.session.destroy((err) =>{
      if(err){
        console.error(err)
        return res.status(500).json({
          error: "Account deleted but sessons is not cleared"
        });
      }
      res.clearCookie("connect.sid")
      res.json({
        message: "Account deleted!"
      });
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: "Server error"
    });
  }
});

module.exports = router

