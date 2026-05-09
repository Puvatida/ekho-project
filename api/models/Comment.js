const mongoose = require("mongoose")
/** _________________________PURPOSE__________________________
 *  Store comment data on posts
 *  Schema: post, autor, usersnapshot?, content, timetamps
 *  - posts comments, view comment under posts, upvote , down vote. +DELETE own comments.
 */

const CommentSchema = new mongoose.Schema({

  //schema for a comment
  content: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 150,
    required: true
  },

  //for ownership checks
  authorId: {
    type: mongoose.Schema.Types.ObjectId, //store in mongoDB ID 
    ref: "User",
    required: true
  },
  
//username for public users
  authorName: {
    type: String,
    required: true,
    trim: true
  },
  //id that was made when each post is created
  postId: {
    type: mongoose.Schema.Types.ObjectId, //store in mongoDB ID 
    ref: "Post",
    required: true
  },
}, {timestamps: true}
);

module.exports = mongoose.model("Comment", CommentSchema)