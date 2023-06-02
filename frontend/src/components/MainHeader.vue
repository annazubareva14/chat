<template>
  <div class="header__wrapper">
    <div class="header__logo" @click="goToStart">
      <img alt="Vue logo" src="@/assets/logo.svg" width="85" height="85" />
    </div>
    <div class="header__buttons">
      <MainButton text="Leave Room" @onClick="$emit('leave')" />
    </div>
  </div>
</template>

<script setup>
import MainButton from "@/components/MainButton.vue";

import { useRouter } from "vue-router";
const router = useRouter();

const goToStart = () => {
  router.push("/");
};
</script>

<style lang="scss">
.header {
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 20px;
    height: 100px;
    border-bottom: 2px solid #e7e7e7;
  }

  &__logo {
    cursor: pointer;
  }

  &__btn {
    font-size: 24px;
    background-color: #40b883;
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: 700;
  }
}
</style>
