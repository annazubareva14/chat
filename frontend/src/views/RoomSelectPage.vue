<template>
  <LoginTemplate text="Join Chat" @onClick="selectRoom">
    <template #inputs>
      <select
        v-model="selectedRoom"
        name="room"
        label="room"
        class="login__select"
      >
        <option value="" hidden selected>Select the room</option>
        <option
          v-for="room in chatRooms.chatRooms"
          :key="room.id"
          :value="room.name"
        >
          {{ room.name }}
        </option>
      </select>
    </template>
  </LoginTemplate>
</template>

<script setup>
import LoginTemplate from "@/components/LoginTemplate.vue";

import { ref } from "vue";

import { useChatRooms } from "@/stores/chatRooms";

const chatRooms = useChatRooms();

const selectedRoom = ref("");

chatRooms.getChatRooms();

const selectRoom = () => {
  console.log(selectedRoom.value, "selectedRoom");
};
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
