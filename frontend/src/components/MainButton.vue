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
  background-color: #40b883;
  color: #fff;
  /* text-transform: uppercase; */
  border: 0;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  font-weight: 600;
}
</style>
