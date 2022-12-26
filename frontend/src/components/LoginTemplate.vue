<template>
  <div class="login__wrapper">
    <div class="login">
      <div class="login__logo">
        <img alt="Vue logo" src="@/assets/logo.svg" width="125" height="125" />
      </div>
      <slot name="inputs" />

      <MainButton :text="props.text" @onClick="$emit('onClick')" />
    </div>
  </div>
</template>

<script setup>
import MainButton from "@/components/MainButton.vue";

const props = defineProps({
  text: String,
});
</script>

<style lang="scss">
.login {
  width: 400px;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 40px;
  }

  &__logo {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
