import { defineStore } from "pinia";
import socket from "@/socket";

export const useChatRooms = defineStore("chatRooms", {
  state: () => {
    return {
      chatRooms: [],
      connected: false,
    };
  },

  actions: {
    async getChatRooms() {
      try {
        const response = await fetch("http://localhost:3000/chatrooms");
        const { chatRooms } = await response.json();

        if (chatRooms) {
          this.chatRooms = chatRooms;
        }
      } catch (err) {
        console.error(err);
      }
    },

    selectUsername(username) {
      socket.auth = { username };
      socket.connect();
    },

    joinRoom(username, room) {
      socket.emit("joinRoom", { username, room });
    },
  },
});
