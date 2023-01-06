<template>
  <div class="chat-window__wrapper">
    <div class="send messages">
      <div class="message">Dude</div>
    </div>
    <div class="receive messages">
      <div class="message">Hey!</div>
      <div class="message">You there?</div>
      <div class="message">Hello, how's it going?</div>
    </div>
    <div class="send messages">
      <div class="message">Great thanks!</div>
      <div class="message">How about you?</div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.chat-window {
  &__wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 30px;
  }
}

.messages {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}

.message {
  width: 500px;
  color: #35495e;
  font-size: 24px;
  border-radius: 20px;
  padding: 8px 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: inline-block;
}

.receive {
  align-items: flex-start;
}

.receive .message {
  margin-right: 25%;
  background-color: #eee;
  position: relative;
}

.receive .message:last-child:before {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: -7px;
  height: 20px;
  width: 20px;
  background: #eee;
  border-bottom-right-radius: 15px;
}
.receive .message:last-child:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: -10px;
  width: 10px;
  height: 20px;
  background: white;
  border-bottom-right-radius: 10px;
}

.send {
  align-items: flex-end;
}

.send .message {
  color: white;
  margin-left: 25%;
  background: linear-gradient(135deg, #48ce93 25%, #2fa2e4);
  background-attachment: fixed;
  position: relative;
}

.send .message:last-child:before {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  right: -8px;
  height: 20px;
  width: 20px;
  background: linear-gradient(135deg, #48ce93 25%, #2fa2e4);
  background-attachment: fixed;
  border-bottom-left-radius: 15px;
}

.send .message:last-child:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: -10px;
  width: 10px;
  height: 20px;
  background: white;
  border-bottom-left-radius: 10px;
}
</style>
