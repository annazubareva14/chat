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
  padding: 10px 20px;
  width: 100%;
  font-size: 30px;
  background-color: #40b883;
  color: #fff;
  text-transform: uppercase;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
}
</style>
