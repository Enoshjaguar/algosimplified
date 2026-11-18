const express = require("express")
const SystemDesign = require("../models/SystemDesign.js")


const router = express.Router();

// Get all System Design topics
router.get("/", async (req, res) => {
  try {
    const topics = await SystemDesign.find().sort({ order: 1 });

    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch System Design topics",
      error: error.message
    });
  }
});

// Get a single topic by slug
router.get("/:slug", async (req, res) => {
  try {
    const topic = await SystemDesign.findOne({
      slug: req.params.slug
    });

    if (!topic) {
      return res.status(404).json({
        message: "System Design topic not found"
      });
    }

    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch topic",
      error: error.message
    });
  }
});

module.exports = router
