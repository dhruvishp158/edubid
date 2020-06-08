const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    to: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        messages: [
          {
            text: {
              type: String,
              required: true,
            },
            date: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);
const Chat = mongoose.model("Chat", ChatSchema);

module.exports = { Chat };
