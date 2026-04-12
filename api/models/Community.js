const mongoose = require("mongoose")

/** _________________________PURPOSE__________________________
 *  Schema: name,description, createBy, timestamps. +TAGS and memberCount?
 *  Supports: Subscribe, community list, community post filtering? 
 */

const CommunitySchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

//   completed: {
//     type: Boolean,
//     default: false
//   },

//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   }

})

module.exports = mongoose.model("Community", CommunitySchema)