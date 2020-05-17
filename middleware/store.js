// const Store = require("../models/Store");
// // const Profile = require("../models/Profile.model");
// //get
// exports.getAddress = async (req, res, next) => {
//   try {
//     const stores = await Store.find();
//     return res
//       .status(200)
//       .json({ success: true, count: stores.length, data: stores });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).json("server error");
//   }
// };

// //post
// // exports.createAddress = async (req, res, next) => {
// //   try {
// //     const stores = await Store.create(req.body);
// //     return res.status(200).json({
// //       success: true,
// //       data: stores,
// //     });
// //   } catch (err) {
// //     console.log(err.message);
// //     res.status(500).json("server error");
// //   }
// // };
// exports.createAddress = async (req, res, next) => {
//   try {
//     const addresses = await Profile.create(req.body);
//     return res.status(200).json({
//       success: true,
//       data: stores,
//     });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).json("server error");
//   }
// };
