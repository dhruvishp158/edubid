const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profile",
  },
  img: {
    type: Array,
    default: [],
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  profilePicture: {
    type: Array,
    default: [],
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      profile: {
        type: Schema.Types.ObjectId,
        ref: "profile",
      },
      text: {
        type: String,
        required: true,
      },
      type: {
        type: String,
      },
      name: {
        type: String,
      },
      profilePicture: {
        type: Array,
        default: [],
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
