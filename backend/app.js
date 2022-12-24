const path = require("path");
const http = require("http");
const express = require("express");
const formatMessage = require("./utils/messages");
const { chatRooms } = require("./database/chatRooms");

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.get("/chatrooms", (req, res) => {
  console.log("i receive a GET request");
  res.json(chatRooms);
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
