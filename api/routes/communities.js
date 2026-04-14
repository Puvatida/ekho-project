var express = require('express');
var router = express.Router();

const Community = require("../models/Community");
const Post = require("../models/Post");
const User = require("../models/User");
const communityOwner = require("../middleware/communityOwner");

// Get all communities
router.get('/', async (req, res) => {
  try {
    const communities = await Community.find();
    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search communities
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;

    const communities = await Community.find({
      title: { $regex: query, $options: 'i' }
    });

    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific community
router.get('/:id', async (req, res) => {
  try {
    const community = await Community.findById(req.params.id)
      .populate('createdBy', 'username email');

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create community
router.post('/', async (req, res) => {
  try {
    if (!req.session.userId){
      return res.status(401).json({ error: "Not Authenticated" });
    }
    const { title, description, creator } = req.body;

    const newCommunity = new Community({
      title,
      description,
      createdBy: req.session.userId.id,
      subscribers: [req.session.userId.id]
    });

    await newCommunity.save();
    res.status(201).json(newCommunity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete community
router.delete('/:id', communityOwner, async (req, res) => {
  try {
    const community = await Community.findByIdAndDelete(req.params.id);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.status(200).json({ message: "Community deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get community posts
router.get('/:id/posts', async (req, res) => {
  try {
    const posts = await Post.find({ community: req.params.id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
  router.post('/:id/subscribe', async (req, res) => {
  try {

    if(!req.session.userId){
      return res.status(401).json({ error: "NotAuthenticated" });
    }
    
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const userId = req.body.userId.id;

    if (community.subscribers.includes(userId)) {
      return res.status(400).json({ message: "User already subscribed" });
    }

    community.subscribers.push(userId);
    await community.save();

    res.status(200).json({ message: "Subscribed to community successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;