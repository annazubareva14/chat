<template>
  <div class="chat-page__wrapper">
    <MainHeader @leave="leaveRoom" />
    <div class="chat-page__content">
      <SidebarMenu
        :room-name="currentRoom?.name"
        :users="currentRoom?.users"
        :current-user="currentUser"
      />
      <div class="chat-page__chat">
        <ChatWindow
          :messages="preparedMessages"
          :current-user="currentUser?.username"
        />
        <ChatInput @send="sendMessage" :new-text="text" />
      </div>
    </div>
  </div>
</template>

<script setup>
import MainHeader from "@/components/MainHeader.vue";
import SidebarMenu from "@/components/SidebarMenu.vue";
import ChatWindow from "@/components/ChatWindow.vue";
import ChatInput from "@/components/ChatInput.vue";

import socket from "@/socket";
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { useChatRooms } from "@/stores/chatRooms";

const router = useRouter();
const route = useRoute();
const chatRooms = useChatRooms();

const { currentRoom, currentUser } = storeToRefs(useChatRooms());

const roomName = route.params.room;
const text = ref("");

onMounted(async () => {
  await chatRooms.getRoomInfo(roomName);

  socket.on("onUsersUpdate", (users) => {
    chatRooms.updateUserList(users);
  });
});

const leaveRoom = () => {
  router.push("/rooms");
  chatRooms.leaveRoom();
};

const preparedMessages = computed(() => {
  return currentRoom.value?.messages?.map((message) => {
    return {
      ...message,
      class:
        message.username === currentUser?.value?.username ? "send" : "receive",
    };
  });
});

const sendMessage = (text) => {
  try {
    chatRooms.sendMessage({
      room: roomName,
      username: currentUser.value.username,
      text,
    });
    console.log("success");
  } catch (err) {
    console.error(err);
  }
};

socket.on("onMessageSent", (message) => {
  chatRooms.updateMessagesList(message);
});
</script>

<style lang="scss">
.chat-page {
  &__wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  &__content {
    display: flex;
    height: 100%;
  }

  &__chat {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
