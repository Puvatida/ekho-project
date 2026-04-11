const mongoose = require("mongoose")
/** _________________________PURPOSE__________________________
 *  Store posts func data
 *  Func: creation, tags, homepage feed, keyward search?, view posts, user profile posts?
 *  Schema fields: author/creator, title, content, tags, community, upvotes, timesteps
 *  -should allow search posts? tag filtering? 
 */
const PostSchema = new mongoose.Schema({
// Each task has a title, a completed status, and a reference to the user who created it (userId)
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    maxlength: 50
  },

  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 1000
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

  //for now.. (DELETE THIS COMMENT LATER****)- 
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    default: null
  },

  //arry of tags
  tags: [
    {
      type: String,
      trim: true,
      lowercase: true
    }
  ]
}, { timestamps: true} //time of upload and update
)

module.exports = mongoose.model("Post", PostSchema)