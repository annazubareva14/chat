<template>
  <button class="button" @click="$emit('onClick')">{{ props.text }}</button>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  text: String,
});
</script>

<style lang="scss">
.button {
  padding: 15px 30px;
  width: 100%;
  font-size: 28px;
  //background-color: #40b883;
  background: linear-gradient(135deg, #48ce93 25%, #2fa2e4);
  background-attachment: fixed;
  color: #fff;
  /* text-transform: uppercase; */
  border: 0;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  font-weight: 600;
}
</style>
