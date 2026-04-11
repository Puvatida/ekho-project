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

  targetType: {
    type: String,
    enum: ["post", "comment", "community"],
    required: true
  }

})

module.exports = mongoose.model("Report", ReportSchema)