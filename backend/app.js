const path = require("path");
const http = require("http");
const express = require("express");
const formatMessage = require("./utils/messages");
const chatRooms = require("./database/chatRooms");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const {
  userJoined,
  getUserData,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

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
  console.log("i receive a GET request");
  res.json(chatRooms);
});

app.post("/chatrooms/join", (req, res) => {
  try {
    console.log("i receive a POST request");
    const user = req.body
    userJoined(user);
    res.status(200).json(getRoomUsers(user.room));
  } catch (err) {
    console.log(err);
    res.status(400).send('Error');
  }
});

app.get("/chatrooms/room", (req, res) => {
  const user = req.body;
  res.status(200).json(getRoomUsers(user.room));
})

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  //const user = userJoined({ userID: socket.id, username: socket.username, room: null });
  // users.forEach((user) => {
  //   socket.emit("joinRoom", { ...user, room });
  // });
  // socket.on("joinRoom", ({ userID, username, room }) => {
  //   const user = userJoin(userID, username, room);
  //   socket.join(user.room);
  //   console.log(socket);
  // Welcome current user
  // socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));
  // // Broadcast when a user connects
  // socket.broadcast
  //   .to(user.room)
  //   .emit(
  //     "message",
  //     formatMessage(botName, `${user.username} has joined the chat`)
  //   );
  // // Send users and room info
  // io.to(user.room).emit("roomUsers", {
  //   room: user.room,
  //   users: getRoomUsers(user.room),
  // });
  // });
});

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
