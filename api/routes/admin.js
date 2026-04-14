var express = require('express');
var router = express.Router();

const User = require("../models/User");
const Post = require("../models/Post");
const Report = require("../models/Report");
const Comment = require("../models/Comment");
const Community = require("../models/Community");

//________GET_REPORTS________
router.get('/reports', async (req, res) => {
    try {
        const reports = await Report.find()
            .populate('reportedBy', 'username email')
            .populate('reportedContent');

        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//________DELETE_USER________(ban)
router.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        //prevents random deletes 
        if(req.session.userId.id !== userId){
            return res.status(403).json({ error: "You cannot delete other users"});
        }

        await User.findByIdAndDelete(userId);
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
        const postId = req.params.id;
        await Post.findBy(postId);

        if (!post){
            return res.status(404).json({ error: "Post Not Found" });
        }

        const isOwner = post.createdBy.toString() === req.session.userId.id;
        const community = await Community.findById(this.post.communityId);
        const communityAdmin = community.createdBy.toString() === req.session.userId.id;

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

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        const isOwner =
            comment.authorId.toString() === req.session.userId.id;

        const post = await Post.findById(comment.postId);

        const community = await Community.findById(post.communityId);

        const isCommunityAdmin =
            community.createdBy.toString() === req.session.userId.id;

        if (!isOwner && !isCommunityAdmin) {
            return res.status(403).json({
                error: "Not authorized"
            });
        }

        await Comment.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Comment deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//________DELETE_COMMUNITY________
router.delete('/communities/:id', async (req, res) => {
    try {
       const community = await Community.findById(req.params.id);

        if (!community) {
            return res.status(404).json({ error: "Community not found" });
        }

        if (community.createdBy.toString() !== req.session.userId.id) {
            return res.status(403).json({ error: "Not authorized" });
        }

        await Community.findByIdAndDelete(req.params.id);
        await Post.deleteMany({ communityId: req.params.id });

        res.status(200).json({ message: "Community deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;