var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

const Community = require("../models/Community");
const communityOwner = require("../middleware/communityOwner");

/** _________________________GET ALL COMMUNITIES__________________________
 * Returns all communities with _id and title only.
 */
router.get("/", async (req, res) => {
  try {
    const communities = await Community.find({}, "title _id").sort({ title: 1 });
    res.json(communities);
  } catch (err) {
    console.error("Error fetching communities:", err);
    res.status(500).json({ error: err.message });
  }
});

/** _________________________GET COMMUNITY BY ID__________________________
 * Returns full community info by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const community = await Community.findById(req.params.id)
      .populate('createdBy', 'usernameGenerated'); // match your User schema

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const currentUserId = req.session.userId || null;

    res.status(200).json({
      ...community.toObject(),
      currentUserId
    });
  } catch (error) {
    console.error("Error fetching community by ID:", error);
    res.status(500).json({ error: error.message });
  }
});

/** _________________________CREATE COMMUNITY__________________________
 * Create a new community
 */
router.post('/', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not Authenticated" });
    }

    const { title, description } = req.body;

    const newCommunity = new Community({
      title,
      description,
      createdBy: req.session.userId.id || req.session.userId,
      subscribers: [req.session.userId.id || req.session.userId]
    });

    await newCommunity.save();

    res.status(201).json(newCommunity);
  } catch (error) {
    console.error("Error creating community:", error);
    res.status(500).json({ error: error.message });
  }
});

/** _________________________SUBSCRIBE TO COMMUNITY__________________________
 * Add user to subscribers
 */
router.post('/:id/subscribe', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not Authenticated" });
    }

    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const userId = req.session.userId.id || req.session.userId;

    if (community.subscribers.includes(userId)) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    community.subscribers.push(userId);
    await community.save();

    res.status(200).json({ message: "Subscribed successfully" });
  } catch (error) {
    console.error("Error subscribing to community:", error);
    res.status(500).json({ error: error.message });
  }
});

/** _________________________GET COMMUNITY BY TITLE__________________________
 * Use query ?title= to search
 */
router.get("/by-title", async (req, res) => {
  try {
    const title = req.query.title;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const community = await Community.findOne({
      title: { $regex: `^${title.trim()}$`, $options: "i" }
    });

    if (!community) return res.status(404).json({ error: "Community not found" });

    res.json(community);
  } catch (err) {
    console.error("Error fetching community by title:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;