const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator"); //check express validation docs
const gravatar = require("gravatar");
const Users = require("../../Models/Users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route  POST api/users
//@desc   Register Route
//@access public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email ID is required").isEmail(),
    check(
      "password",
      "Please enter a password with 7 or more characters"
    ).isLength({ min: 7 }),
    check("type", "type is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, type } = req.body;
    //see if user exist

    const initial = name.split(" ");
    const initials = initial[0][0] + initial[1][0];
    try {
      let user = await Users.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist!" }] });
      }

      user = new Users({
        name,
        email,
        type,
        password,
        initials,
      });

      //Encrypt Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //Return JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(400).send("server error");
    }
  }
);

module.exports = router;
