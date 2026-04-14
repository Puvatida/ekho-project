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

        await User.findByIdAndDelete(userId);
        await Post.deleteMany({ createdBy: userId });

        res.status(200).json({ message: "User and associated content deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//________DELETE_POST________
router.delete('/posts/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//________DELETE_COMMENT________
router.delete('/comments/:id', async (req, res) => {
    try {
        const commentId = req.params.id;
        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//________DELETE_COMMUNITY________
router.delete('/communities/:id', async (req, res) => {
    try {
        const communityId = req.params.id;
        await Community.findByIdAndDelete(communityId);

        res.status(200).json({ message: "Community deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;