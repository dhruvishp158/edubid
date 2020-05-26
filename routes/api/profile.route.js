const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../Models/Profile.model");
const Users = require("../../Models/Users.model");
const { check, validationResult } = require("express-validator"); //check express validation docs
const request = require("request");
const config = require("config");
const Post = require("../../Models/Post.model");

//for store location
// const Store = require("../../models/Store");
// const { getAddress, createAddress } = require("../../middleware/store");
// router.route("/address").get(getAddress).post(createAddress);

//Image
const multer = require("multer");
const path = require("path");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".jpeg" || ext !== "png") {
      return cb(res.status(400).end("only image please!"), end);
    }
    cb(null, true);
  },
});
var upload = multer({ storage: storage }).single("file");

//@route  POST api/profile/image
//@desc   upload profile Picture
//@access private
router.post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });
    console.log(res.req.file.filename);
    return res.json({
      success: true,
      image: res.req.file.path,
      filename: res.req.file.filename,
    });
  });
});

//@route  get api/profile/search
//@desc   serach for topics
//@access private
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
router.get("/search", async (req, res) => {
  try {
    console.log(req.query.search);
    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), "gi");
      component = await Profile.find({ topics: regex }, function (err, found) {
        if (err) {
          console.log(err);
        } else {
          console.log("something");
          return res.json(found);
        }
      });
    } else {
      component = await Profile.find({}, function (err, found) {
        if (err) {
          console.log(err);
        } else {
          console.log("nothing");
          return res.json(found);
        }
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});

//@route  GET api/profile/me
//@desc   get current user profile
//@access private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("users", ["name", "avatar", "type"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route  POST api/profile
//@desc  create or update user profile
//@access private
router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required").not().isEmpty(),
      check("topics", "topics is required").not().isEmpty(),
      check("bio", "bio is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      profilePicture,
      website,
      address,
      bio,
      status,
      topics,
      youtube,
      facebook,
      twitter,
      instagram,
      linkdin,
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (profilePicture) profileFields.profilePicture = profilePicture;
    if (website) profileFields.website = website;
    if (address) profileFields.address = address;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (topics) {
      profileFields.topics = topics.split(",").map((topic) => topic.trim());
    }

    //build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkdin) profileFields.social.linkdin = linkdin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      //update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //create
      profile = new Profile(profileFields);
      await profile.save();
      res.send(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route  GET api/profile
//@desc  get all profiles
//@access public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "type"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("servre error");
  }
});

//@route  GET api/profile/user/:user_id
//@desc  get  profile  by user id
//@access public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "type"]);

    if (!profile) {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
    res.status(500).send("servre error");
  }
});

//@route  Delete api/profile
//@desc  Delete profile ,user and post
//@access private
router.delete("/", auth, async (req, res) => {
  try {
    //Delete post

    // await Post.deleteMany({ user: req.user.id });
    //delete profile
    await Profile.findOneAndRemove({
      user: req.user.id,
    });

    //delete user
    await Users.findOneAndRemove({
      _id: req.user.id,
    });

    res.json({ msg: "User has been removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("servre error");
  }
});

//@route  Put api/profile/experience
//@desc  add profile experience
//@access private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("company", "company is required").not().isEmpty(),
      check("from", "from is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { title, company, from, to, current, description } = req.body;

    const newExp = {
      title,
      company,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.address = profile.location.formattedAddress;
      console.log(profile.address);
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

//@route  Put api/profile/  education
//@desc  add profile education
//@access private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "degree is required").not().isEmpty(),
      check("from", "from is required").not().isEmpty(),
      check("fieldofstudy", "fieldofstudy is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.address = profile.location.formattedAddress;
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

//@route  delete api/profile/experience/:exp_id
//@desc  delete particular experience
//@access private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "type"]);
    profile.address = profile.location.formattedAddress;
    //get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//@route  delete api/profile/education/:edu_id
//@desc  delete particular education
//@access private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "type"]);
    profile.address = profile.location.formattedAddress;
    //get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.get("/address", async (req, res) => {
  try {
    const data = await Profile.find();
    const stores = [];
    for (let i = 0; i < data.length; i++) {
      stores.push(data[i].location);
    }
    console.log(stores);

    return res
      .status(200)
      .json({ success: true, count: stores.length, data: stores });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("server error");
  }
});
module.exports = router;
