const path = require("path");
const http = require("http");
const express = require("express");
const chatRooms = require("./database/chatRooms");

const { getRoomMessages, sendMessage } = require("./utils/messages");
const {
  userJoined,
  getUserData,
  leaveRoom,
  getRoomUsers,
} = require("./utils/users");


const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,DELETE,OPTIONS,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/chatrooms", (req, res) => {
  res.json(chatRooms);
});

//users

app.post("/chatrooms/join", (req, res) => {
  try {
    const user = req.body;
    const users = userJoined(user);
    const userSocket = io.of("/").sockets.get(user.socketId);
    userSocket.join(user.room);
    io.to(user.room).emit("onUsersUpdate", Array.from(users.values()));
    res.status(200).send({});
  } catch (err) {
    console.log(err);
    res.status(400).send("Error");
  }
});

app.get("/chatrooms/:room", (req, res) => {
  const roomName = req.params.room;
  const users = getRoomUsers(roomName);
  const messages = getRoomMessages(roomName)

  const currentRoom = {
    name: roomName,
    users,
    messages
  };
  //io.emit("onUsersUpdate", Array.from(users.values()))
  res.status(200).json(currentRoom);
});

app.post("/chatrooms/leave", (req, res) => {
  const userId = req.body.userId;
  const user = getUserData(userId);
  const userSocket = io.of("/").sockets.get(user.socketId);
  userSocket.leave(user.room);
  const { users, room } = leaveRoom(userId);
  io.to(room).emit("onUsersUpdate", Array.from(users.values()));
  res.status(200).send({});
});

//messages
app.post("/chatrooms/:room", (req, res) => {
  const message = req.body;
  sendMessage(message)
  io.to(message.room).emit("onMessageSent", message);
  res.status(201).send({});
}) 


io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});



io.on("connection", (socket) => {});

// io.on("connection", (socket) => {
//   console.log(io.of("/").adapter);
//   console.log("sockes");
//   socket.on("joinRoom", ({ username, room }) => {
//     const user = userJoin(socket.id, username, room);

//     socket.join(user.room);

//     // Welcome current user
//     // socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

//     // // Broadcast when a user connects
//     // socket.broadcast
//     //   .to(user.room)
//     //   .emit(
//     //     "message",
//     //     formatMessage(botName, `${user.username} has joined the chat`)
//     //   );

//     // // Send users and room info
//     // io.to(user.room).emit("roomUsers", {
//     //   room: user.room,
//     //   users: getRoomUsers(user.room),
//     // });
//   });

//   // Listen for chatMessage
//   // socket.on("chatMessage", (msg) => {
//   //   const user = getCurrentUser(socket.id);

//   //   io.to(user.room).emit("message", formatMessage(user.username, msg));
//   // });

//   // // Runs when client disconnects
//   // socket.on("disconnect", () => {
//   //   const user = userLeave(socket.id);

//   //   if (user) {
//   //     io.to(user.room).emit(
//   //       "message",
//   //       formatMessage(botName, `${user.username} has left the chat`)
//   //     );

//   //     // Send users and room info
//   //     io.to(user.room).emit("roomUsers", {
//   //       room: user.room,
//   //       users: getRoomUsers(user.room),
//   //     });
//   //   }
//   // });
// });

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
