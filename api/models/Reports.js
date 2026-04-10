const mongoose = require("mongoose")
/** _________________________PURPOSE__________________________
 *  Schema: reportBy, reportType, targetId, reason, timesteps
 *  support: reporting posts and comments, moderation review 
 */

const ReportSchema = new mongoose.Schema({
// Each task has a title, a completed status, and a reference to the user who created it (userId)
  title: {
    type: String,
    required: true
  },

//   completed: {
//     type: Boolean,
//     default: false
//   },

//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   }

})

module.exports = mongoose.model("Report", ReportSchema)