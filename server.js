const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
// const { Server } = require("socket.io");
// const io = new Server(server);

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Run When a client connect
io.on("connection", (socket) => {
  // when a user connect to the socketio server
  console.log("a user connected");
  socket.on("disconnect", () => {
    // when a user disconnect
    io.emit("message", "user disconnected");
  });
  socket.emit("message", "Wellcome to chat"); //Emit message to the user who joined
  socket.broadcast.emit("message", "A user has joined the chat"); //Emit message to the allthe user except who joined

  //Listern to a chat message
  socket.on("chatMessage", (msg) => {
    io.emit("message", msg);
  });
});
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
