const express = require("express");
const router = express.Router();
const config = require("config");
const { Chat } = require("../../models/Chat.model");
const auth = require("../../middleware/auth");
const multer = require("multer");
const fs = require("fs");
//@route  get api/chat/getChats
//@desc   get all chat
//@access private
// router.get("/getChats", auth, (req, res) => {
//   Chat.find()
//     .populate("sender")
//     .exec((err, chats) => {
//       if (err) return res.status(400).send(err);
//       res.status(200).send(chats);
//     });
// });

// @route   GET api/message/:id
// @desc    get messages
// @access  private
router.get("/:toId", auth, async (req, res) => {
  try {
    // const user = await Chat.findOne({ user: req.user.id });

    // let to = user.to.filter((to) => to.id.toString() === req.params.toId);

    // if (to.length > 0) {
    //   return res.json(to);
    // }

    // return res.send(null);
    const toUser = await Chat.findOne({ user: req.user.id }).populate("user", [
      "name",
      "type",
    ]);
    const fromUser = await Chat.findOne({
      user: req.params.toId,
    }).populate("user", ["name", "type"]);
    console.log(fromUser);
    let fromMessages = [];
    let toMessages = [];

    if (toUser) {
      toMessages = toUser.to.filter(
        (to) => to.id.toString() === req.params.toId
      );
    }
    if (fromUser) {
      fromMessages = fromUser.to.filter(
        (to) => to.id.toString() === req.user.id
      );
    }

    const messages = {
      user: null,
      friend: null,
    };
    if (fromMessages.length != 0) {
      messages.user = fromMessages[0];
      // messages.info.user = toUser.user;
      // console.log(messages.info.user);
    }
    if (toMessages.length != 0) {
      messages.friend = toMessages[0];
      // messages.info.friend = fromUser;
    }

    return res.send(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route   GET api/message/:id
// @desc    s

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname);
  //   if (ext !== ".jpg" || ext !== ".jpeg" || ext !== "png") {
  //     return cb(res.status(400).end("only image please!"), end);
  //   }
  //   cb(null, true);
  // },
});

var upload = multer({ storage: storage }).single("file");
///@route  get api/chat/uploadFiles
//@desc   upload files
//@access private
router.post("/uploadFiles", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({ success: true, url: res.req.file.path });
  });
});

module.exports = router;
