const mongoose = require("mongoose")

/** _________________________PURPOSE__________________________
 *  Store User acct data
 *  Schema fiels: email, passwrd(Hashed), username(generated), communitySubs, FavTags
 */

const UserSchema = new mongoose.Schema({
// Each user has a username, email, and password. In a real application, you would want to hash the password before saving it to the database for security reasons, but for simplicity, we're storing it as plain text here 
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },

  password: { //should be hash 
    type: String,
    required: true,
  },

  usernameGenerated: { //should be generate it 
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },

  communitySub: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community'
  },
],

  tags: [
    {
    type: String,
    trim: true,
  },
],
}, 
{ timestamps: true}
);

module.exports = mongoose.model("User", UserSchema)