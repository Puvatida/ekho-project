const mongoose = require("mongoose");

/** _________________________PURPOSE__________________________
 *  Schema: title, description, createdBy, subscribers, timestamps.
 *  Supports: Subscribe, list all communities, community posts.
 */

const CommunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 100
    },
    description: {
      type: String,
      default: "",
      maxlength: 500
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    subscribers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
  },
  { timestamps: true } // enables createdAt and updatedAt
);

module.exports = mongoose.model("Community", CommunitySchema);