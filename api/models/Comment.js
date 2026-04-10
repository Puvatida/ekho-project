const mongoose = require("mongoose")
/** _________________________PURPOSE__________________________
 *  Store comment data on posts
 *  Schema: post, autor, usersnapshot?, content, timetamps
 *  - posts comments, view comment under posts, upvote , down vote. +DELETE own comments.
 */

const CommentSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Comment", CommentSchema)