const Post = require("../models/Post");
const Community = require("../models/Community");

async function postOwnerOrAdmin(req, res, next) {
  try {
    //find post infomation
    const post = await Post.findById(req.params.id);

    //post does not exist
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    //Post owner
    if (post.authorId.toString() === req.session.userId.id) {
      return next();
    }

    //admin
    //checks in what community the post is on
    const community = await Community.findById(post.community);
        
    //checks if the requestre is the admin of the community
    const communityAdmin = community.createdBy.toString() === req.session.userId.id;

    //community does not exist
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    if (communityAdmin.createdBy.toString() === req.session.userId.id) {
      return next();
    }

    //if user is not admin thenit is not allowed
    return res.status(403).json({ error: "Not authorized" });

  } 
  
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = postOwnerOrAdmin;