const mongoose = require("mongoose");

//User Schema
const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "Please add an user_id"],
    unique: true,
    trim: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: [true, "Please add an user_name"],
  },
  email: {
    type: String,
    required: [true, "Please add an Email"],
    unique: true,
    match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Please add a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  logging: {
    type: String,
    enum: ["on", "off"],
    default: "off",
  },
  friends: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      unique: true,
    },
  ],
});
//CASCADE DELETE

//Exports
module.exports = mongoose.model("User", UserSchema);
