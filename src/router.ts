import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Index from "./pages/index.vue";
import xEmpty from "./pages/xEmpty.vue";
import xHelp from "./pages/xHELP.vue";
import xCard from "./pages/xcard.vue";
import xCarousel from "./pages/xcarousel.vue";
import xTable from "./pages/xtable.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/empty",
    name: "empty",
    component: xEmpty,
  },
  {
    path: "/xtable",
    name: "xtable",
    component: xTable,
  },
  {
    path: "/xcarousel",
    name: "xcarousel",
    component: xCarousel,
  },
  {
    path: "/xcard",
    name: "xcard",
    component: xCard,
  },
  {
    path: "/xhelp",
    name: "qhelp",
    component: xHelp,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});
export default router;
