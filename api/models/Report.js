const mongoose = require("mongoose")
/** _________________________PURPOSE__________________________
 *  Schema: reportBy, reportType, targetId, reason, timesteps
 *  support: reporting posts and comments, moderation review 
 */

const ReportSchema = new mongoose.Schema({

  //report generatedNmae and userId of the person who report
  reportByName: {
    //whatt name report it
    type: String,
    required: true,
    trim: true
  },

  //to check for who
  reportBy: {
    type: mongoose.Schema.Types.ObjectId, //store in mongoDB ID 
    ref: "User",
    required: true
  },

  //id of the content being reported
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,

  },
  //catagory of the reported object
  targetType: {
    type: String,
    enum: ["post", "comment", "community"],
    required: true
  },

  resonOfReport: {
    type: String,
    required: true,
    trim: true, 
    minlength: 4,
    maxlength: 100
  }
}, {timestamps : true}
);

module.exports = mongoose.model("Report", ReportSchema)