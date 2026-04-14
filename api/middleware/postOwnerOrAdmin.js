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
    const community = await Community.findById(post.communityId);

    //community does not exist
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    if (community.createdBy.toString() === req.session.userId.id) {
      return next();
    }

    //if user is not admin then it is not allowed
    return res.status(403).json({ error: "Not authorized" });

  } 
  
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = postOwnerOrAdmin;