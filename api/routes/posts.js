var express = require('express');
var router = express.Router();

const Post = require("../models/Post")
const auth = require("../middleware/auth") //for check 
const postOwner = require("../middleware/postOwner")

//_______________________CREATE post____________________
//Post method/ request a sent of data/post to the server
router.post("/", auth, async function (req, res) { //need auth 
  
  try{
    //users can post: titles, content etc.. 
    const{ title, content, tags, community} = req.body; 

    if( !title || !content){ //there must be content in the content space
      return res.status(400).json({//couldnt be processed
        error: "Content is required in this section"
      });
    }

    //create new post
    const post = new Post({ //set things that are in a post
      title,
      authorId: req.session.userId.id, //request the user id for this
      authorName: req.session.userId.usernameGenerated,
      content,
      tags: tags || [], //should be array
      community: community || null
    })

    await post.save()
    //201 request status code for created sucess status
    res.status(201).json({
      message: "Post created!",
      post
    });
  
  } catch (err){ //for unexpected errors
    console.error(err);
    res.status(500).json({ error: "Server error"})
  }
});


//__________________GET_FEED_______(EVERYONE)_______________
//when user login app, they get newest feed
router.get("/", async function (req, res){ //get that request
  try{
    const posts = await Post.find().populate("community", "name").sort({ createdAt: -1}); //newest bru

    //.populate("author", "usernameGenerated") -maybe? 

    res.json(posts); 
  } catch (err){//catch unexpected errors
    console.error(err);
    res.status(500).json({ error: "Server error"})
}

});

//_____________GET_ONE_POST (SEARCH)_____________
router.get("/search", async function (req, res){ //anyone can search request
  try{
    const {title} = req.query //title is the query request

    //always check if  theres a query or a post
    if( !title || title.trim() === ""){
      return res.status(400).json({
        error: "Enter your search"
      });
    }
    //find post after wait
    const post = await Post.find({
      //find by title that contains the keyword not case sensitive
      title: {$regex: title.trim(), $options: "i"} 
    }).populate("community", "name").sort({createdAt: -1}).limit(20);

    res.json(post) 

  }catch (err){//catch unexpected errors
    console.error(err);
    res.status(500).json({ error: "Server error"})
}
})


//___________UPDATE post______(POST OWNER ONLY)________
router.patch("/:id", auth, postOwner, async function (req, res){
  //check for user id if they sign in and is the owner of post
  try{
    //users can UPDATEpost: titles, content etc.. 
    const{ title, content, tags, community} = req.body; 
    const post = await Post.findById(req.params.id)
    
    //we only want to update fields that have been changed by the user
    if(title !== undefined){
      post.title = title;
    }
    if(content !== undefined){
      post.content = content;
    }
    if(tags !== undefined){
      post.tags = tags;
    }
    if(community !== undefined){
      post.community = community;
    }

    //save
    await post.save();

    //sending return message
    res.json({
      message: "Post Updated!",
      post
    });

  }catch (err){ //catch unexpected errors
    console.error(err);
    res.status(500).json({ error: "Server error"})
      }
});


//___________DELETE own Post _____________________________
//only post owner so far getting delete request
router.delete("/:id", auth, postOwner, async function (req, res){
 
  try{
    //find and delete the post by the post id
    const post = await Post.findByIdAndDelete(req.params.id);
    //for debugging
    if( !post){
      return res.status(404).json({
        error: "There's no post to delete"
      });
    }
    res.json({ //return message 
      message: "You've deleted a post"
    });

  }catch (err){
    console.error(err);//catch unexpected errors
    res.status(500).json({ error: "Server error"})
      }
});

module.exports = router