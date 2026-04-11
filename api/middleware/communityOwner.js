const Community = require("../models/Community") //import
//determins if it can continue to route
async function communityOwner(req, res, next){ //communityOwner middleware function

    try{
        //find community infomation 
        const community = await Community.findById(req.params.id)
        //check if post exist for debugging
        if(!community){
            return res.status(400).json({
                error: "Community not found"
            });
        }
        //check for ownership
        if (community.authorId.toString() !== req.session.userId.id){
            return res.status(403).json({
                error: "You don't have permission over this community"
            });
        }
        next(); //proceed if theres ownership 
    } catch (err){
    console.error(err);
    res.status(500).json({ error: "Server error"})
      }
}
module.exports = communityOwner; 