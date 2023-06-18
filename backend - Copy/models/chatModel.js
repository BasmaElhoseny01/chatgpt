const mongoose = require("mongoose");
// const Url = require("mongoose-type-url");
const validator = require("validator");



//chat=conversation
const chatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    default:"New chat"
    },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true
    },
   messages: [
       {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Message",
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
