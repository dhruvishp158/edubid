const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);
const Chat = mongoose.model("Chat", ChatSchema);

module.exports = { Chat };
