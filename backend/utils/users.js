const { faker } = require("@faker-js/faker");

const users = new Map();

// Join user to chat
function userJoined(user) {
  return users.set(user.userId, user);
}

// User leaves chat
function leaveRoom(userId) {
  const { room } = users.get(userId);
  users.delete(userId);

  return { room, users };
}

// Get current user
function getUserData(userId) {
  return users.get(userId);
}

// Get users in room
function getRoomUsers(roomName) {
  const roomUsers = Array.from(users.values()).filter(
    (value) => value.room === roomName
  );

  return roomUsers;
}

module.exports = {
  userJoined,
  getUserData,
  getRoomUsers,
  leaveRoom,
};
