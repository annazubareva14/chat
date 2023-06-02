<template>
  <div class="chat-window__wrapper">
    <div
      v-for="(message, index) in messages"
      :key="message.time + message.username"
      :class="[currentClass(message.class, index), 'messages']"
    >
      <div v-if="isNameVisible(message.username, index)" class="username">
        {{ message.username }}
      </div>
      <div class="message">
        {{ message.text }}
        <span class="message__time">{{ formatedDate(message.time) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  messages: Array,
  currentUser: String,
});

const currentClass = (currentClass, index) => {
  const classes = [];
  classes.push(currentClass);
  currentClass !== props.messages[index + 1]?.class
    ? classes.push("last")
    : null;
  return classes;
};

const isNameVisible = (username, index) => {
  return index === 0 ? true : username === props.messages[index - 1]?.username;
};

const formatedDate = (date) => {
  const isToday = moment(date).isSame(new Date(), "day");

  return isToday
    ? moment(date).format("HH:mm")
    : moment(date).format("DD.MM HH:mm");
};
</script>

<style lang="scss" scoped>
.chat-window {
  &__wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 30px;
  }
}

.messages {
  display: flex;
  flex-direction: column;
}

.last {
  margin-bottom: 30px;
}

.message {
  width: 500px;
  color: #35495e;
  font-size: 24px;
  border-radius: 20px;
  padding: 8px 15px;
  margin-bottom: 10px;
  display: inline-block;

  &__time {
    position: absolute;
    bottom: 4px;
    right: 10px;
    font-size: 16px;
    color: #818181;
  }
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
.send .username {
  float: right;
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
