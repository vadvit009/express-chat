const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  senderId: {type: mongoose.ObjectId, ref: 'User'},
  msg: String,
}, {
  timestamp: true
});

module.exports = mongoose.model("Message", Message, "message");