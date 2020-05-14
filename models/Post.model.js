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
  profilePicture: {
    data: Buffer,
    contentType: String,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
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
      name: {
        type: String,
      },
      profilePicture: {
        data: Buffer,
        contentType: String,
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
