const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  messages: [{type: mongoose.ObjectId, ref: 'Message'}]
}, {
  timestamp: true
});

module.exports = mongoose.model("User", User, "users");