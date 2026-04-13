const mongoose = require("mongoose")

/** _________________________PURPOSE__________________________
 *  Schema: name,description, createBy, timestamps. +TAGS and memberCount?
 *  Supports: Subscribe, community list, community post filtering? 
 */

const CommunitySchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  descsription: {
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