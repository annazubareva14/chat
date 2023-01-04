import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import RoomSelectPage from "@/views/RoomSelectPage.vue";
import ChatRoomPage from "@/views/ChatRoomPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/rooms",
      name: "rooms",
      component: RoomSelectPage,
    },
    {
      path: "/:room",
      name: "chat",
      component: ChatRoomPage,
    },
  ],
});

export default router;
