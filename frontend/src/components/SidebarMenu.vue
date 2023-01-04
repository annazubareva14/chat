<template>
  <div class="sidebar">
    <div class="sidebar__content">
      <div class="sidebar__rooms">
        <h2>Room name</h2>
        <div class="sidebar__rooms__item">title</div>
      </div>
      <div class="sidebar__users">
        <h2>Users</h2>
        <div class="sidebar__users__item">user1</div>
        <div class="sidebar__users__item">user2</div>
      </div>
    </div>
  </div>
</template>

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
