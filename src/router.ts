import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Index from "./pages/index.vue";
import xEmpty from "./pages/xEmpty.vue";
import xHelp from "./pages/xHELP.vue";
import xCard from "./pages/xcard.vue";
import xCard2 from "./pages/xcard2.vue";
import xCarousel from "./pages/xcarousel.vue";
import xEdit from "./pages/xedit.vue";
import xNew from "./pages/xnew.vue";
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
    path: "/xcard2",
    name: "xcard2",
    component: xCard2,
  },
  {
    path: "/xedit",
    name: "xedit",
    component: xEdit,
  },
  {
    path: "/xnew",
    name: "xnew",
    component: xNew,
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
