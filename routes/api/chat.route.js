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
router.get("/getChats", auth, (req, res) => {
  Chat.find()
    .populate("sender")
    .exec((err, chats) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(chats);
    });
});

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
