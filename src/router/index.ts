import { createRouter, createWebHistory } from "vue-router";
import compRoutes from "./compRoutes";
import noteRoutes from "./noteRoutes";
const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/layout/index.vue"),
    redirect: compRoutes[0].path,
    children: [
      {
        path: "/comp",
        name: "组件",
        children: compRoutes,
      },
      {
        path: "/note",
        name: "笔记",
        children: noteRoutes,
      },
    ],
  },
];
const env = import.meta.env;
const router = createRouter({
  history: createWebHistory(env.VITE_BASE_PATH),
  routes,
});
export default router;
