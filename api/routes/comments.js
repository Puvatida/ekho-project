var express = require('express');
var router = express.Router();


const Comment = require("../models/Comment");
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const commentOwner = require("../middleware/commentOwner");
const commentOwnerOrAdmin = require('../middleware/commnetOwnerOrAdmin');

//__________GET_COMMENTS________
router.get("/post/:postId", async function (req, res){ //get that request
  //load all comments on certain posts that user wishes
  try{
    //request by the postID
    const comments = await Comment.find({ postId: req.params.postId}).sort({ createdAt: -1}); //newest comments first

    res.json(comments); 

  } catch (err){//catch unexpected errors
    console.error(err);
    res.status(500).json({ error: "Server error"})
}
});

// CREATE_COMMENT
router.post("/", auth, async function (req, res) {
  console.log("Request body:", req.body);  // Log the request body
  try {
    const { content, postId } = req.body;

    if (!content || !postId) {
      return res.status(400).json({ error: "Content and PostId are required" });
    }

    // Create new comment
    const comment = new Comment({
      content,
      authorId: req.session.userId.id,
      authorName: req.session.userId.usernameGenerated,
      postId,
    });

    await comment.save();
    console.log("New Comment Added:", comment); // Log the saved comment
    res.status(201).json({
      message: "You posted a comment!",
      comment,
    });
  } catch (err) {
    console.error("Error while adding comment:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//________UPDATE_COMMENT________(COMMENT OWNER )
router.patch("/:id", auth, commentOwner, async function (req, res){
  //check for user id if they sign in and is the owner of comment
  try{
    //users can UPDATE comment 
    const{content} = req.body; 

    //if user saves without entering any changes or content. 
    if (!content) {
      return res.status(400).json({
        error: "enter your content first"
      });
    }
    //comment iD to change the comment but after it stays the same just changed content only. 
    const comment = await Comment.findById(req.params.id)
    
    comment.content = content; //create
    await comment.save() //save to DB

    //sending return message
    res.json({
      message: "Your comment is updated!",
      comment
    });

  }catch (err){ //catch unexpected errors
    console.error(err);
    res.status(500).json({ error: "Server error"})
      }
});

//________DELETE_COMMENT______comment_owner__
router.delete("/:id", auth, commentOwnerOrAdmin, async function (req, res){
 
  try{
    //find and delete the comment by the comment id
    const comment = await Comment.findByIdAndDelete(req.params.id);
    //for debugging
    if( !comment ){
      return res.status(404).json({
        error: "Comment not found"
      });
    }
    res.json({ //return message 
      message: "Comment deleted!"
    });

  }catch (err){
    console.error(err);//catch unexpected errors
    res.status(500).json({ error: "Server error"})
      }
});

module.exports = router