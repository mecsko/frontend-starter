import { createRouter, createWebHistory } from "vue-router";
import routes from "../routes";
import type { App } from "vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export const install = (app: App) => {
	app.use(router);
};
