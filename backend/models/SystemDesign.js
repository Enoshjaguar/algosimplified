const mongoose = require("mongoose")

const systemDesignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true
    },

    category: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    explanation: {
      type: String,
      required: true
    },

    imageUrl: {
      type: String,
      default: ""
    },

    order: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const SystemDesign = mongoose.model(
  "SystemDesign",
  systemDesignSchema
);

module.exports = SystemDesign
