import { defineStore } from "pinia";
import Api from "@/utils/api.js";
import socket from "@/socket";

export const useChatRooms = defineStore("chatRooms", {
  state: () => {
    return {
      chatRooms: [],
      currentRoom: null,
      users: [],
    };
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

    setUsername(username) {
      socket.auth = { username };
      socket.connect();
    },

    async joinRoom(userData) {
      const { users } = await Api.post("chatrooms/join", userData);

      this.users = users;
    },

    async getRoomInfo() {
      const { currentRoom } = await Api.get("chatrooms/room");

      // const response = await fetch(`http://localhost:3000/chatrooms/room`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json;charset=utf-8",
      //   },
      //   body: JSON.stringify(room) ?? null,
      // });

      // const { currentRoom } = await response.json();

      this.currentRoom = currentRoom;
    },
  },
});
