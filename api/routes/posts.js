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


//__________________GET_FEED______________________________
//when user login app, they get newest feed
router.get("/", async function (req, res){ //get that request
  try{
    const posts = await Post.find().populate("community", "name").sort({ createdAt: -1}); //newest bru

    //.populate("author", "usernameGenerated") -maybe? 

    res.json(posts); 
  } catch (err){
    console.error(err);
    res.status(500).json({ error: "Server error"})
}

});

//GET_ONE_POST

//UPDATE post
//DELETE own Post

module.exports = router