<template>
  <LoginTemplate text="Next" @onClick="goNext">
    <template #inputs>
      <input
        v-model="name"
        type="input"
        placeholder="Enter you name"
        class="login__input"
      />
    </template>
  </LoginTemplate>
</template>

<script setup>
import LoginTemplate from "@/components/LoginTemplate.vue";
import socket from "@/socket";
import { ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";

import { useChatRooms } from "@/stores/chatRooms";

const router = useRouter();
const chatRooms = useChatRooms();

const name = ref("");

const goNext = () => {
  chatRooms.setUsername(name.value);

  socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
      console.error(err.message);
    }
  });

  router.push({ name: "rooms", params: { userName: name.value } });
};

onUnmounted(() => {
  socket.off("connect_error");
});
</script>

<style lang="scss">
.login {
  &__input,
  &__select {
    margin-bottom: 20px;
    width: 100%;
    font-size: 40px;
    padding: 5px 10px;
    border: none;
    outline: none;
    border-bottom: 1px solid #40b883;
    color: #34495e;
  }
}
</style>
