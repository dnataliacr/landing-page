import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "blog",
    component: () => import("../views/BlogView.vue"),
  },
  {
    path: "/post/:id",
    name: "post",
    component: () => import("../views/SinglePostView.vue"),
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
