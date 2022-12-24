<template>
  <div class="login__wrapper">
    <div class="lonig__logo">
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/logo.svg"
        width="125"
        height="125"
      />
    </div>
    <input type="input" label="Username" class="login__input" />
    <select name="room">
      <option
        v-for="room in chatRooms.chatRooms"
        :key="room.id"
        :value="room.name"
      >
        {{ room.name }}
      </option>
    </select>
    <button class="login__btn">Join Chat</button>
  </div>
</template>

<script setup>
import { useChatRooms } from "@/stores/chatRooms";

const chatRooms = useChatRooms();

chatRooms.getChatRooms();
</script>

<style lang="scss">
.login {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__input {
    margin-bottom: 20px;
  }

  &__btn {
    padding: 5px 10px;
    cursor: pointer;
  }
}
</style>
