const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const app = express();
const { Chat } = require("./models/Chat.model");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
connectDB();

io.on("connect", (socket) => {
  socket.on("Input chat message", async (msg) => {
    try {
      let mesRetreived = await Chat.findOne({ user: msg.userId });

      const message = {
        text: msg.chatMessage,
      };

      if (!mesRetreived) {
        mesRetreived = new Chat({
          user: msg.userId,
          to: [
            {
              id: msg.tId,
              messages: [message],
            },
          ],
        });
      } else {
        let exist = false;
        mesRetreived.to.forEach((to) => {
          if (to.id.toString() === msg.tId) {
            to.messages.unshift(message);
            exist = true;
            return;
          }
        });

        if (!exist) {
          mesRetreived.to.unshift({
            id: msg.tId,
            messages: [message],
          });
        }
      }

      mesRetreived.save();
      return io.emit("Output chat message", mesRetreived);
    } catch (error) {
      console.error(error);
    }
  });
});

app.use(cors());
//Init middleware i.e=BodyParser
app.use(express.json({ extended: false }));
// app.use(cors({ credentials: false, origin: "http://localhost:7000" }));
app.use("/uploads", express.static("uploads"));

//Define routes from api folder
app.use("/api/users", require("./routes/api/users.api"));
app.use("/api/auth", require("./routes/api/auth.route"));
app.use("/api/profile", require("./routes/api/profile.route"));
app.use("/api/post", require("./routes/api/post.route"));
app.use("/api/chat", require("./routes/api/chat.route"));

//server static assests and production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 7000;
server.listen(PORT, () => console.log(`server started on port ${PORT}`));
