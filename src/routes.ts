import Index from "@pages/index.vue";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "index",
		component: Index,
	},
	{
		path: "/empty",
		name: "empty",
		component: () => import("@pages/xEmpty.vue"),
	},
	{
		path: "/xtable",
		name: "xtable",
		component: () => import("@pages/xtable.vue"),
	},
	{
		path: "/xcarousel",
		name: "xcarousel",
		component: () => import("@pages/xcarousel.vue"),
	},
	{
		path: "/xcard",
		name: "xcard",
		component: () => import("@pages/xcard.vue"),
	},
	{
		path: "/xhelp",
		name: "qhelp",
		component: () => import("@pages/xHELP.vue"),
	},
];

export default routes;
