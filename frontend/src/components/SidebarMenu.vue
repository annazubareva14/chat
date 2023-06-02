<template>
  <div class="sidebar">
    <div class="sidebar__content">
      <div>{{ currentUser?.username }}</div>
      <div class="sidebar__rooms">
        <h2>Room name</h2>
        <div class="sidebar__rooms__item">{{ roomName }}</div>
      </div>
      <div class="sidebar__users">
        <h2>Users</h2>
        <div
          v-for="user in users"
          :key="user.userId"
          class="sidebar__users__item"
        >
          {{ user.username }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  roomName: String,
  users: Array,
  currentUser: Object
});
</script>

<style lang="scss">
.sidebar {
  flex: none;
  width: 350px;
  height: 100%;
  //background-color: #40b883;
  //background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  border-right: 2px solid #e7e7e7;

  &__content {
    padding: 20px 30px;
    height: 100%;
    font-size: 26px;
    color: #35495e;
  }

  &__rooms {
    margin-bottom: 80px;
  }
}
</style>
