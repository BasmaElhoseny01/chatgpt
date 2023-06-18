const mongoose = require("mongoose");
// const Url = require("mongoose-type-url");
const validator = require("validator");



//chat=conversation
const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ["system", "assistant", "user"],
    default:"user"
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
