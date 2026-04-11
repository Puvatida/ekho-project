const Comment = require("../models/Comment") //import
//determins if it can continue to route
async function commentOwner(req, res, next){ //commentOwner middleware function

    try{
        //find comment infomation after wait
        const comment = await Comment.findById(req.params.id)
        //check if comment exist for debugging
        if(!comment){
            return res.status(400).json({
                error: "There's no comment"
            });
        }
        //check for ownership
        if (comment.authorId.toString() !== req.session.userId.id){
            return res.status(403).json({
                error: "You do not have permission on this comment"
            });
        }
        next(); //proceed if theres ownership 
    } catch (err){
    console.error(err);
    res.status(500).json({ error: "Server error"})
      }
}
module.exports = commentOwner; 