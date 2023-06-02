import { defineStore } from "pinia";
import Api from "@/utils/api.js";
import socket from "@/socket";

export const useChatRooms = defineStore("chatRooms", {
  state: () => {
    return {
      chatRooms: [],
      currentRoom: null,
    };
  },

  getters: {
    currentUser: () => ({
      username: socket?.auth?.username,
      userId: socket?.auth?.userId,
    }),
  },

  actions: {
    async getChatRooms() {
      try {
        const { chatRooms } = await Api.get("chatrooms");

        if (chatRooms) {
          this.chatRooms = chatRooms;
        }
      } catch (err) {
        console.error(err);
      }
    },

    setUsername({ username, userId }) {
      socket.auth = { username, userId };
      socket.connect();
    },

    async joinRoom(userData) {
      const { users } = await Api.post("chatrooms/join", userData);

      this.users = users;
    },

    async getRoomInfo(room) {
      const currentRoom = await Api.getWithParams(`chatrooms/${room}`);

      console.log(currentRoom, "currentRoom");

      this.currentRoom = currentRoom;
    },

    updateUserList(users) {
      this.currentRoom.users = users;
    },

    async leaveRoom() {
      const { users } = await Api.post("chatrooms/leave", {
        userId: this.currentUser.userId,
      });

      this.users = users;
    },

    async sendMessage(message) {
      console.log(message, "message");
      const messages = await Api.post(`chatrooms/${message.room}`, message);

      console.log(messages, "messages");

      this.currentRoom.messages = messages;
    },

    updateMessagesList(message) {
      this.currentRoom.messages.push(message);
    },
  },
});
