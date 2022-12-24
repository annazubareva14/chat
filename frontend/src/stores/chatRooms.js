import { defineStore } from "pinia";
// import { sockets } from '@/plugins/socket'

export const useChatRooms = defineStore("chatRooms", {
  state: () => {
    return {
      chatRooms: [],
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

    // joinRoom() {
    //   socket.emit("joinRoom", { username, room });
    // },
  },
});
