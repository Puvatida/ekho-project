var express = require('express');
var router = express.Router();

const User = require("../models/User");
const Post = require("../models/Post");
const Report = require("../models/Report");
const Comment = require("../models/Comment");
const Community = require("../models/Community");

//________GET_REPORTS________
//fetches all the users reports 
router.get('/reports', async (req, res) => {
    try {

        const userId = req.params.id;

        //prevents unotharized users to get reports  
        if(req.session.userId.id !== userId){
            return res.status(403).json({ error: "You cannot access"});
        }

        const reports = await Report.find()
            .populate('reportedBy', 'username email')
            .populate('reportedContent');

        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//________DELETE_USER________(ban)
//deletes the user and the content they poted 
router.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        //prevents random deletes 
        if(req.session.userId.id !== userId){
            return res.status(403).json({ error: "You cannot delete other users"});
        }
        
        //delete the user
        await User.findByIdAndDelete(userId);
        
        //delete the post of user
        await Post.deleteMany({ createdBy: userId });
        
        //commented. yet to decide if comments will also be delted when user is deleted or will stay (e.g. Reddit)
        //await Comment.deleteMany({ createdBy: userId});

        res.status(200).json({ message: "User and associated content deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//________DELETE_POST________
router.delete('/posts/:id', async (req, res) => {
    try {
        //finds the posts
        const postId = req.params.id;
        const post = await Post.findById(postId);

        //post does not exist
        if (!post){
            return res.status(404).json({ error: "Post Not Found" });
        }

        //checks if the requestre is the owner of the post
        const isOwner = post.createdBy.toString() === req.session.userId.id;
        
        //checks in what community the post is on
        const community = await Community.findById(post.community);
        
        //checks if the requestre is the admin of the community
        const communityAdmin = community.createdBy.toString() === req.session.userId.id;

        //deny access if neither owner nor admin
        if (!isOwner && !communityAdmin){
            return res.status(403).json({ error: "Not Authorized" });
        }

        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({ postId: req.params.id });

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//________DELETE_COMMENT________
router.delete('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        //comment does not exist 
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        //checks if the one making the request is the owner of the comment
        const isOwner = comment.authorId.toString() === req.session.userId.id;

        //checks which post the comment is in
        const post = await Post.findById(comment.postId);

        //checks what community the post is in
        const community = await Community.findById(post.community);

        //checks if the requestre is the admin of the community
        const CommunityAdmin = community.createdBy.toString() === req.session.userId.id;

        //if neither owner or admin deny it
        if (!isOwner && !CommunityAdmin) {
            return res.status(403).json({ error: "Not authorized" });
        }

        //deltes comment
        await Comment.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Comment deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//________DELETE_COMMUNITY________
router.delete('/communities/:id', async (req, res) => {
    try {
       const community = await Community.findById(req.params.id);

       //community does not exist
        if (!community) {
            return res.status(404).json({ error: "Community not found" });
        }

        //the request is not made by the creator of the community
        if (community.createdBy.toString() !== req.session.userId.id) {
            return res.status(403).json({ error: "Not authorized" });
        }

        //deletes everything in the community
        await Community.findByIdAndDelete(req.params.id);
        //post
        await Post.deleteMany({ communityId: req.params.id });
        //comments
        await Comment.deleteMany({ postId: req.params.id });

        res.status(200).json({ message: "Community deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;