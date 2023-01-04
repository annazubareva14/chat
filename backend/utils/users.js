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
function getRoomUsers(room) {
  return new Map(
    [...users].filter((user) => {
      user.room === room;
    })
  );
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
