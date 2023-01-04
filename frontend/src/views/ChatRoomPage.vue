<template>
  <div class="chat-page__wrapper">
    <MainHeader />
    <div class="chat-page__content">
      <SidebarMenu />
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
import { useRouter, useRoute } from "vue-router";
import { useChatRooms } from "@/stores/chatRooms";

const router = useRouter();
const route = useRoute();
const chatRooms = useChatRooms();

console.log(route.params.room);

chatRooms.getRoomInfo();
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
