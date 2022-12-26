import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import RoomSelectPage from "@/views/RoomSelectPage.vue";

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
  ],
});

export default router;
