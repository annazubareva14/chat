const messages = new Map();

function getRoomMessages(room) {
  return messages.get(room);
}

function sendMessage(message) {
  if(messages.has(message.room)) {
    const room = messages.get(message.room)
    room.push({ ...message, time: new Date() })
    messages.set(message.room, room)
    return
  }
  messages.set(message.room, [{
    ...message,
    time: new Date(),
  }]);

  console.log(messages);
}

module.exports = {
  getRoomMessages,
  sendMessage,
};
