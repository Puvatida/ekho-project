var express = require('express');
var router = express.Router();


const Report = require("../models/Report")
const auth = require("../middleware/auth") //for check 
const Comment = require("../models/Comment");
const Post = require("../models/Post")
const User = require("../models/User")
//will need community here*******


//________REPORT_POST________
//post request check if user is login to report first
router.post("/post", auth, async function (req, res) { //need auth 
  
  try{
    //content for a report:  title(or, the id of that report) and reason
    const{ targetId, reasonOfReport} = req.body; 

    if(!targetId || !reasonOfReport){ //there must be a reason in the content space
      return res.status(400).json({//couldnt be processed
        error: "You need a reason to report"
      });
    }
    //create a report
    const report = new Report({ 
        //all the things that is required to have in a report
      targetId,
      reportBy: req.session.userId.id, //request the user id for this
      reportByName: req.session.userId.usernameGenerated,
      targetType: "post",
      reasonOfReport
    });

    //save to mongoDB
    await report.save()
    //201 request status code for created sucess status
    res.status(201).json({
      message: "Thankn you for your report, we will investigate this",
      report
    });
  
  } catch (err){ //for unexpected errors
    console.error(err);
    res.status(500).json({ error: "Server error"})
  }
});

//________REPORT_COMMENT________
//post request check if user is login to report first
router.post("/comment", auth, async function (req, res) { //need auth 
  
  try{
    //content for a report:  title(or, the id of that report) and reason
    const{ targetId, reasonOfReport } = req.body; 

    if( !targetId || !reasonOfReport){ //there must be a reason in the content space
      return res.status(400).json({//couldnt be processed
        error: "You need a reason to report"
      });
    }
    //create a report
    const report = new Report({ 
        //all the things that is required to have in a report
      targetId,
      reportBy: req.session.userId.id, //request the user id for this
      reportByName: req.session.userId.usernameGenerated,
      targetType: "comment",
      reasonOfReport
    });

    //save to mongoDB
    await report.save()
    //201 request status code for created sucess status
    res.status(201).json({
      message: "Thankn you for your report, we will investigate this",
      report
    });
  
  } catch (err){ //for unexpected errors
    console.error(err);
    res.status(500).json({ error: "Server error"})
  }
});


//________REPORT_USER________
//post request check if user is login to report first
router.post("/user", auth, async function (req, res) { //need auth 
  
  try{
    //content for a report:  title(or, the id of that report) and reason
    const{ targetId, reasonOfReport } = req.body; 

    if( !targetId || !reasonOfReport){ //there must be a reason in the content space
      return res.status(400).json({//couldnt be processed
        error: "You need a reason to report"
      });
    }
    //after wait we find user by id
    const user = await User.findById(targetId)

    if(!user) {
        return res.status(404).json({
             error: "User does not exists"
        }) 
    }

    //create a report
    const report = new Report({ 
        //all the things that is required to have in a report
      targetId,
      reportBy: req.session.userId.id, //request the user id for this
      reportByName: req.session.userId.usernameGenerated,
      targetType: "user",
      reasonOfReport
    });

    //save to mongoDB
    await report.save()
    //201 request status code for created sucess status
    res.status(201).json({
      message: "You've reported a user",
      report
    });
  
  } catch (err){ //for unexpected errors
    console.error(err);
    res.status(500).json({ error: "Server error"})
  }
});

//________REPORT_COMMUNITY________

//--------------Get all for admin-----------//
//________GET_ALL_REPORTS_FOR_ADMIN________
router.get("/", async function (req, res) {
  try {
    const reports = await Report.find()
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = router