<template>
  <div class="chat-window__wrapper">
    <div class="message">message</div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.chat-window {
  &__wrapper {
    height: 100%;
  }
}

.message {
  padding: 20px 50px;
  width: 500px;
  height: 100px;
  background: #f1f1f1;
  margin: 30px;
  color: #476582;
  font-size: 22px;
}
</style>
