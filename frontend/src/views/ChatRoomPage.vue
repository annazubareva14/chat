<template>
  <div class="chat-page__wrapper">
    <MainHeader @leave="leaveRoom" />
    <div class="chat-page__content">
      <SidebarMenu :room-name="currentRoom?.name" :users="currentRoom?.users" />
      <div class="chat-page__chat">
        <ChatWindow />
        <ChatInput />
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
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { useChatRooms } from "@/stores/chatRooms";

const router = useRouter();
const route = useRoute();
const chatRooms = useChatRooms();

const { currentRoom } = storeToRefs(useChatRooms());

const roomName = route.params.room;

const currentUser = computed(() => {
  return currentRoom?.value.users.find(
    (user) => user.username === socket?.auth?.username
  );
});

chatRooms.getRoomInfo(roomName);
socket.emit("getRoomUsers", roomName);

const leaveRoom = () => {
  router.push("/");
};
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
