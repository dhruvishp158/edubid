const express = require("express");
const connectDB = require("./config/db");

const app = express();
//connect database
connectDB();
//Init middleware i.e=BodyParser
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API..");
});

//Define routes from api folder
app.use("/api/users", require("./routes/api/users.api"));
app.use("/api/auth", require("./routes/api/auth.route"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
