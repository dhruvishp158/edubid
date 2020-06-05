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
    const toUser = await Chat.findOne({ user: req.user.id }).populate("user", [
      "name",
      "type",
    ]);
    const fromUser = await Chat.findOne({
      user: req.params.toId,
    }).populate("user", ["name", "type"]);
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

    // const messages = {
    //   user: null,
    //   friend: null,
    // };
    const messages = [];
    if (fromMessages.length != 0) {
      //   console.log(typeof fromMessages[0]);
      //   messages.user = fromMessages[0];
      fromMessages = fromMessages[0].messages.map((m) => {
        const { date, _id, text } = m;
        return { date, text, _id, id: req.params.toId };
      });
      messages.push(...fromMessages);
    }
    if (toMessages.length != 0) {
      //   messages.friend = toMessages[0];
      toMessages = toMessages[0].messages.map((m) => {
        const { date, _id, text } = m;
        return { date, text, _id, id: req.user.id };
      });
      messages.push(...toMessages);
    }

    messages.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    return res.send(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
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
