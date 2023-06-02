<template>
  <div class="bottom-bar">
    <div class="chat-input__wpapper">
      <input
        v-model="preparedText"
        class="chat-input"
        type="text"
        ref="input"
        placeholder="Type a message..."
      />
      <button class="chat-button" type="submit" @click="sendMessage">
        <font-awesome-icon icon="paper-plane" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  newText: String,
});

const emit = defineEmits(["send"]);

const text = ref("");
const preparedText = computed({
  get() {
    return text.value;
  },
  set(val) {
    text.value = val;
  },
});

const sendMessage = () => {
  emit("send", text.value);
};
</script>

<style lang="scss">
.chat-input {
  height: 300px;
  width: 100%;
  border-top: 2px solid #e7e7e7;
}

.chat-input {
  font-size: 24px;
  padding: 10px 100px 10px 20px;
  width: 100%;
  height: 100%;
  border: 1px solid #e7e7e7;
  border-radius: 10px;

  &__wpapper {
    padding: 10px;
    height: 150px;
  }
}

.chat-input::placeholder {
  color: gray;
  top: 20px;
  position: absolute;
}

.chat-input:focus {
  color: black;
  outline: 0;
}

.chat-button {
  position: absolute;
  padding: 0;
  border: 0;
  width: 60px;
  height: 60px;
  font-size: 30px;
  color: #3cb5bd;
  top: 20px;
  opacity: 0.8;
  right: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #48ce93 25%, #2fa2e4);
  background-attachment: fixed;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  outline: 0;
  &:hover {
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
    background: #e7e7e7;
    color: #44c89f;
  }
}
</style>
