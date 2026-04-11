const Post = require("../models/Post") //import
//determins if it can continue to route
async function postOwner(req, res, next){ //postOwner middleware function

    try{
        //find post infomation 
        const post = await Post.findById(req.params.id)
        //check if post exist for debugging
        if(!post){
            return res.status(400).json({
                error: "There's no post"
            });
        }
        //check for ownership
        if (post.authorId.toString() !== req.session.userId.id){
            return res.status(403).json({
                error: "You don't have permission to this post"
            });
        }
        next(); //proceed if theres ownership 
    } catch (err){
    console.error(err);
    res.status(500).json({ error: "Server error"})
      }
}
module.exports = postOwner; 