const Comment = require("../models/Comment");
const Post = require("../models/Post");
const Community = require("../models/Community");

async function commentOwnerOrAdmin(req, res, next) {
  try {
    //find comment infomation
    const comment = await Comment.findById(req.params.id);

    //comment does not exist 
    if (!comment) {
      return res.status(404).json({
        error: "Comment not found"
      });
    }

    //Comment owner
    if (comment.authorId.toString() === req.session.userId.id) {
      return next();
    }

    //Find post
    const post = await Post.findById(comment.postId);

    if (!post) {
      return res.status(404).json({
        error: "Post not found"
      });
    }

    //find community
    const community = await Community.findById(post.communityId);

    if (!community) {
      return res.status(404).json({
        error: "Community not found"
      });
    }

    //admin
    if (community.createdBy.toString() === req.session.userId.id) {
      return next();
    }

    //if not admin then not allowed
    return res.status(403).json({
      error: "Not authorized"
    });

  } 
  
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = commentOwnerOrAdmin;