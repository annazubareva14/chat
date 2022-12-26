<template>
  <div v-if="isLoading">loading</div>
  <LoginTemplate v-else text="Next" @onClick="goNext">
    <template #inputs>
      <input
        v-model="userName"
        type="input"
        label="Username"
        placeholder="Enter you name"
        class="login__input"
      />
    </template>
  </LoginTemplate>
</template>

<script setup>
import LoginTemplate from "@/components/LoginTemplate.vue";
import socket from "@/socket";

import { useRouter } from "vue-router";
import { ref, onUnmounted } from "vue";

import { useChatRooms } from "@/stores/chatRooms";

const router = useRouter();
const chatRooms = useChatRooms();

const isLoading = ref(false);
const userName = ref("");

const goNext = () => {
  chatRooms.selectUsername(userName.value);

  socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
      isLoading.value = true;
    }
  });

  router.push("/rooms");
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
