const { faker } = require('@faker-js/faker');

const users = new Map();

// Join user to chat
function userJoined({ username, room }) {
  const user = { userID: faker.datatype.uuid(), username, room };

  users.set(user.userID, user);

  return users;
}

// Get current user
function getUserData(userID) {
  return users.get(userID);
}

// Get users in room
function getRoomUsers(roomName) {
  // console.log(users, 'users');
  // console.log(roomName, 'room');
  const roomUsers = new Map(
    [...users].filter(([key, value]) => {
      value.room === roomName;
    })
  );
  // console.log(roomUsers, 'roomUsers');

  return users;
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

module.exports = {
  userJoined,
  getUserData,
  userLeave,
  getRoomUsers,
};
