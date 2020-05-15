const express = require("express");
const connectDB = require("./config/db");

const app = express();
//connect database
connectDB();
//Init middleware i.e=BodyParser
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API is running 7000..");
});

//Define routes from api folder
app.use("/api/users", require("./routes/api/users.api"));
app.use("/api/auth", require("./routes/api/auth.route"));
app.use("/api/profile", require("./routes/api/profile.route"));
app.use("/api/post", require("./routes/api/post.route"));
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
